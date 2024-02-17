import WebSocket from "ws";
import Client from "..";
import ActionsManager from "./actions";
import WebsocketError from "../../errors/WebsocketError";
import {Opcodes, WebsocketReadyState} from "../../util/constants";

export default class WebsocketManager extends WebSocket {
  status: null | string;
  interval: NodeJS.Timeout | undefined;
  isHeartbeatAcked: null | boolean;
  lastHeartbeatAck: null | Date;
  client: any;
  reconnected: any;
  reconnect: boolean | undefined;
  resumeGatewayURL: string | undefined;
  constructor(client: Client, resumeGatewayURL: string | undefined) {
    super(client.websocketURL);
    Object.defineProperty(this, "client", {value: client});
    this.resumeGatewayURL = resumeGatewayURL;
    this.status = null;
    this.interval = undefined;
    this.isHeartbeatAcked = null;
    this.lastHeartbeatAck = null;
    this.handleOpen();
  }

  async connect() {
    if (this.readyState !== WebsocketReadyState.Open) {
      this.client.debug(`[Websocket]: Websocket isn't ready. Remaking Websocket connection`);
      return this._handleNewInstance();
    }
    const {url, shards, session_start_limit} = (await this.client.api.get(`/gateway/bot`)) || {};
    if (!url || (session_start_limit?.remaining ?? 1) < 1) {
      this.client.debug("[Websocket]: Unable to get bot gateway info, or exceeded daily login limit");
      return process.exit();
    }
    const debug = `[Websocket Info]:\nURL: ${url}\nShards: ${shards}\nRemaining: ${session_start_limit?.remaining}/${session_start_limit?.total}`;
    this.send({
      op: Opcodes.Identify,
      d: {
        token: `Bot ${this.client.token}`,
        intents: this.client.intents.toString(),
        presence: this.client.presence,
        properties: {
          $os: process.platform,
          $browser: "Hedystia",
          $device: "Hedystia",
        },
      },
    });

    this.client.debug(debug);
  }

  handleConnect() {
    if (this.readyState === this.CLOSED) {
      this.client.debug("[Websocket]: Websocket has been closed due to unknown reasons");
      return;
    }
    this.on("message", (data) => new ActionsManager(this.client, JSON.parse(data.toString())));
    this.on("close", (data) => this.handleClose(data));
  }

  handleClose(err: number) {
    this.status = "CLOSED";
    return this.handleError(err) ?? null;
  }

  handleOpen() {
    this.on("open", () => {
      const msg = this.reconnected
        ? `[Websocket]: Successfully reconnected to Discord Gateway. Now resuming missed events`
        : `[Websocket]: Connected to Discord Gateway`;
      this.client.debug(msg);
      this.handleConnect();
    });
  }

  _handleNewInstance() {
    this.status = "RECONNECTING";
    this.removeAllListeners();
    setTimeout(() => {
      this.client.debug(`[Websocket]: Closing the previous WebSocket connection then making a new one`);
      if (this.readyState !== this.CLOSED) {
        this.destroy(4000);
        this.client.debug(`[Websocket]: Successfully closed previous WebSocket connection`);
      }
      if (this.readyState === this.CLOSED) this.client.debug(`[Websocket]: Websocket has been already closed. So this should be easy`);
      this.client.debug(`[Websocket]: Now connecting to resume gateway url: ${this.client.resumeGatewayURL}`);
      this.client.ws = new WebsocketManager(this.client, this.client.resumeGatewayURL);
      this.client.closeSequence = this.client.seq;
      this.client.ws.reconnected = true;
    }, 5_000).unref();
  }

  handleResume() {
    if (!this.client.sessionId) {
      this.client.debug(`[Websocket]: No session ID found, cannot resume events. Re-identifying.`);
      return this.connect();
    }

    this.client.debug(`[Websocket]: Attempting to resume connection with session ID: ${this.client.sessionId}`);

    this.send({
      op: Opcodes.Resume,
      d: {
        token: `Bot ${this.client.token}`,
        session_id: this.client.sessionId,
        seq: this.client.seq,
      },
    });
  }

  handleReconnect() {
    if (!this.client.resumeGatewayURL) {
      this.client.debug(`[Websocket]: Tried to reconnect but there's no resume gateway url found. Re-identifying`);
      return this.connect();
    }
    if (this.status !== "CLOSED" && this.reconnect) {
      this.client.debug(`[Websocket]: Received a request for a Reconnect. Reconnecting`);
      this.client.debug(`[Websocket]: Making a close timeout of 5s for a clean reconnect`);
    }
    return this._handleNewInstance();
  }

  destroy(closeCode: number | undefined) {
    this.status = "CLOSING";
    return this.close(closeCode, "destroy");
  }

  async handleError(error: number) {
    switch (error) {
      case 4000:
        throw new WebsocketError({
          message: "Unknown error",
          code: 4000,
        });
      case 4001:
        throw new WebsocketError({
          message: "Opcode unknown",
          code: 4001,
        });
      case 4002:
        throw new WebsocketError({
          message: "Decoding error",
          code: 4002,
        });
      case 4003:
        return new WebsocketError({
          message: "Not authenticated",
          code: 4003,
        });
      case 4004:
        throw new WebsocketError({
          message: "Authentication failure",
          code: 4004,
        });
      case 4005:
        throw new WebsocketError({
          message: "Already authenticated",
          code: 4005,
        });
      case 4006:
        throw new WebsocketError({
          message: "Invalid sequence",
          code: 4006,
        });
      case 4008:
        throw new WebsocketError({
          message: "Limited rate",
          code: 4008,
        });
      case 4009:
        throw new WebsocketError({
          message: "The session has ended",
          code: 4009,
        });
      case 4010:
        throw new WebsocketError({
          message: "Invalid Shards",
          code: 4010,
        });
      case 4011:
        throw new WebsocketError({
          message: "Need for shards",
          code: 4011,
        });
      case 4012:
        throw new WebsocketError({
          message: "Invalid API version",
          code: 4012,
        });
      case 4013:
        throw new WebsocketError({
          message: "Invalid Intents",
          code: 4013,
        });
      case 4014:
        throw new WebsocketError({
          message: "Intents not allowed",
          code: 4014,
        });
      default:
        this.client.emit("debug", `[Websocket]: Disconnected due to unknown error`);
        this.handleReconnect();
        break;
    }
  }

  send(payload: any) {
    let p = WebsocketManager.transformPayload(payload);
    if (!p) return;
    return super.send(JSON.stringify(p));
  }

  static transformPayload(payload: any) {
    if (!payload.op) return null;
    return {
      op: payload.op,
      d: payload.d,
    };
  }
}
