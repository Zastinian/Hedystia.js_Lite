import Client from "../..";
import APPLICATION_COMMAND_PERMISSIONS_UPDATE from "./events/APPLICATION_COMMAND_PERMISSIONS_UPDATE";
import AUTO_MODERATION_ACTION_EXECUTION from "./events/AUTO_MODERATION_ACTION_EXECUTION";
import AUTO_MODERATION_RULE_CREATE from "./events/AUTO_MODERATION_RULE_CREATE";
import AUTO_MODERATION_RULE_DELETE from "./events/AUTO_MODERATION_RULE_DELETE";
import AUTO_MODERATION_RULE_UPDATE from "./events/AUTO_MODERATION_RULE_UPDATE";
import CHANNEL_CREATE from "./events/CHANNEL_CREATE";
import CHANNEL_DELETE from "./events/CHANNEL_DELETE";
import CHANNEL_PINS_UPDATE from "./events/CHANNEL_PINS_UPDATE";
import CHANNEL_UPDATE from "./events/CHANNEL_UPDATE";
import GUILD_AUDIT_LOG_ENTRY_CREATE from "./events/GUILD_AUDIT_LOG_ENTRY_CREATE";
import GUILD_BAN_ADD from "./events/GUILD_BAN_ADD";
import GUILD_BAN_REMOVE from "./events/GUILD_BAN_REMOVE";
import GUILD_CREATE from "./events/GUILD_CREATE";
import GUILD_DELETE from "./events/GUILD_DELETE";
import GUILD_EMOJIS_UPDATE from "./events/GUILD_EMOJIS_UPDATE";
import GUILD_INTEGRATION_UPDATE from "./events/GUILD_INTEGRATION_UPDATE";
import GUILD_MEMBERS_CHUNK from "./events/GUILD_MEMBERS_CHUNK";
import GUILD_MEMBER_ADD from "./events/GUILD_MEMBER_ADD";
import GUILD_MEMBER_UPDATE from "./events/GUILD_MEMBER_UPDATE";
import GUILD_SCHEDULED_EVENT_ADD from "./events/GUILD_SCHEDULED_EVENT_ADD";
import GUILD_SCHEDULED_EVENT_DELETE from "./events/GUILD_SCHEDULED_EVENT_DELETE";
import GUILD_SCHEDULED_EVENT_UPDATE from "./events/GUILD_SCHEDULED_EVENT_UPDATE";
import GUILD_SCHEDULED_EVENT_USER_ADD from "./events/GUILD_SCHEDULED_EVENT_USER_ADD";
import GUILD_SCHEDULED_EVENT_USER_REMOVE from "./events/GUILD_SCHEDULED_EVENT_USER_REMOVE";
import GUILD_UPDATE from "./events/GUILD_UPDATE";
import INTEGRATION_CREATE from "./events/INTEGRATION_CREATE";
import INTEGRATION_DELETE from "./events/INTEGRATION_DELETE";
import INTEGRATION_UPDATE from "./events/INTEGRATION_UPDATE";
import INTERACTION_CREATE from "./events/INTERACTION_CREATE";
import INVITE_CREATE from "./events/INVITE_CREATE";
import INVITE_DELETE from "./events/INVITE_DELETE";
import MESSAGE_CREATE from "./events/MESSAGE_CREATE";
import MESSAGE_DELETE from "./events/MESSAGE_DELETE";
import MESSAGE_DELETE_BULK from "./events/MESSAGE_DELETE_BULK";
import MESSAGE_REACTION_ADD from "./events/MESSAGE_REACTION_ADD";
import MESSAGE_REACTION_REMOVE from "./events/MESSAGE_REACTION_REMOVE";
import MESSAGE_REACTION_REMOVE_EMOJI from "./events/MESSAGE_REACTION_REMOVE_EMOJI";
import MESSAGE_UPDATE from "./events/MESSAGE_UPDATE";
import PRESENCE_UPDATE from "./events/PRESENCE_UPDATE";
import READY from "./events/READY";
import ROLE_CREATE from "./events/ROLE_CREATE";
import ROLE_DELETE from "./events/ROLE_DELETE";
import ROLE_PROMPT_CREATE from "./events/ROLE_PROMPT_CREATE";
import ROLE_UPDATE from "./events/ROLE_UPDATE";
import STAGE_INSTANCE_CREATE from "./events/STAGE_INSTANCE_CREATE";
import STAGE_INSTANCE_DELETE from "./events/STAGE_INSTANCE_DELETE";
import STAGE_INSTANCE_UPDATE from "./events/STAGE_INSTANCE_UPDATE";
import STICKERS_UPDATE from "./events/STICKERS_UPDATE";
import THREAD_CREATE from "./events/THREAD_CREATE";
import THREAD_DELETE from "./events/THREAD_DELETE";
import THREAD_LIST_SYNC from "./events/THREAD_LIST_SYNC";
import THREAD_MEMBERS_UPDATE from "./events/THREAD_MEMBERS_UPDATE";
import THREAD_UPDATE from "./events/THREAD_UPDATE";
import USER_UPDATE from "./events/USER_UPDATE";
import VOICE_STATE_UPDATE from "./events/VOICE_STATE_UPDATE";
import WEBHOOKS_UPDATE from "./events/WEBHOOKS_UPDATE";

export default class ActionsManager {
  client: Client;
  constructor(
    client: Client,
    message: {
      t: string;
      d: any;
    },
  ) {
    this.client = client;
    this._patch(message);
  }

  _patch(message: {t: string; d: any}) {
    switch (message.t) {
      case "APPLICATION_COMMAND_PERMISSIONS_UPDATE":
        return APPLICATION_COMMAND_PERMISSIONS_UPDATE(this.client, message);
      case "AUTO_MODERATION_ACTION_EXECUTION":
        return AUTO_MODERATION_ACTION_EXECUTION(this.client, message);
      case "AUTO_MODERATION_RULE_CREATE":
        return AUTO_MODERATION_RULE_CREATE(this.client, message);
      case "AUTO_MODERATION_RULE_DELETE":
        return AUTO_MODERATION_RULE_DELETE(this.client, message);
      case "AUTO_MODERATION_RULE_UPDATE":
        return AUTO_MODERATION_RULE_UPDATE(this.client, message);
      case "CHANNEL_CREATE":
        return CHANNEL_CREATE(this.client, message);
      case "CHANNEL_DELETE":
        return CHANNEL_DELETE(this.client, message);
      case "CHANNEL_PINS_UPDATE":
        return CHANNEL_PINS_UPDATE(this.client, message);
      case "CHANNEL_UPDATE":
        return CHANNEL_UPDATE(this.client, message);
      case "GUILD_AUDIT_LOG_ENTRY_CREATE":
        return GUILD_AUDIT_LOG_ENTRY_CREATE(this.client, message);
      case "GUILD_BAN_ADD":
        return GUILD_BAN_ADD(this.client, message);
      case "GUILD_BAN_REMOVE":
        return GUILD_BAN_REMOVE(this.client, message);
      case "GUILD_CREATE":
        return GUILD_CREATE(this.client, message);
      case "GUILD_DELETE":
        return GUILD_DELETE(this.client, message);
      case "GUILD_EMOJIS_UPDATE":
        return GUILD_EMOJIS_UPDATE(this.client, message);
      case "GUILD_INTEGRATION_UPDATE":
        return GUILD_INTEGRATION_UPDATE(this.client, message);
      case "GUILD_MEMBER_ADD":
        return GUILD_MEMBER_ADD(this.client, message);
      case "GUILD_MEMBER_UPDATE":
        return GUILD_MEMBER_UPDATE(this.client, message);
      case "GUILD_MEMBERS_CHUNK":
        return GUILD_MEMBERS_CHUNK(this.client, message);
      case "GUILD_SCHEDULED_EVENT_ADD":
        return GUILD_SCHEDULED_EVENT_ADD(this.client, message);
      case "GUILD_SCHEDULED_EVENT_DELETE":
        return GUILD_SCHEDULED_EVENT_DELETE(this.client, message);
      case "GUILD_SCHEDULED_EVENT_UPDATE":
        return GUILD_SCHEDULED_EVENT_UPDATE(this.client, message);
      case "GUILD_SCHEDULED_EVENT_USER_ADD":
        return GUILD_SCHEDULED_EVENT_USER_ADD(this.client, message);
      case "GUILD_SCHEDULED_EVENT_USER_REMOVE":
        return GUILD_SCHEDULED_EVENT_USER_REMOVE(this.client, message);
      case "GUILD_UPDATE":
        return GUILD_UPDATE(this.client, message);
      case "INTEGRATION_CREATE":
        return INTEGRATION_CREATE(this.client, message);
      case "INTEGRATION_DELETE":
        return INTEGRATION_DELETE(this.client, message);
      case "INTEGRATION_UPDATE":
        return INTEGRATION_UPDATE(this.client, message);
      case "INTERACTION_CREATE":
        return INTERACTION_CREATE(this.client, message);
      case "INVITE_CREATE":
        return INVITE_CREATE(this.client, message);
      case "INVITE_DELETE":
        return INVITE_DELETE(this.client, message);
      case "MESSAGE_CREATE":
        return MESSAGE_CREATE(this.client, message);
      case "MESSAGE_DELETE_BULK":
        return MESSAGE_DELETE_BULK(this.client, message);
      case "MESSAGE_DELETE":
        return MESSAGE_DELETE(this.client, message);
      case "MESSAGE_REACTION_ADD":
        return MESSAGE_REACTION_ADD(this.client, message);
      case "MESSAGE_REACTION_REMOVE_EMOJI":
        return MESSAGE_REACTION_REMOVE_EMOJI(this.client, message);
      case "MESSAGE_REACTION_REMOVE":
        return MESSAGE_REACTION_REMOVE(this.client, message);
      case "MESSAGE_UPDATE":
        return MESSAGE_UPDATE(this.client, message);
      case "PRESENCE_UPDATE":
        return PRESENCE_UPDATE(this.client, message);
      case "READY":
        return READY(this.client, message);
      case "ROLE_CREATE":
        return ROLE_CREATE(this.client, message);
      case "ROLE_DELETE":
        return ROLE_DELETE(this.client, message);
      case "ROLE_PROMPT_CREATE":
        return ROLE_PROMPT_CREATE(this.client, message);
      case "ROLE_UPDATE":
        return ROLE_UPDATE(this.client, message);
      case "STAGE_INSTANCE_CREATE":
        return STAGE_INSTANCE_CREATE(this.client, message);
      case "STAGE_INSTANCE_DELETE":
        return STAGE_INSTANCE_DELETE(this.client, message);
      case "STAGE_INSTANCE_UPDATE":
        return STAGE_INSTANCE_UPDATE(this.client, message);
      case "STICKERS_UPDATE":
        return STICKERS_UPDATE(this.client, message);
      case "THREAD_CREATE":
        return THREAD_CREATE(this.client, message);
      case "THREAD_DELETE":
        return THREAD_DELETE(this.client, message);
      case "THREAD_LIST_SYNC":
        return THREAD_LIST_SYNC(this.client, message);
      case "THREAD_MEMBERS_UPDATE":
        return THREAD_MEMBERS_UPDATE(this.client, message);
      case "THREAD_UPDATE":
        return THREAD_UPDATE(this.client, message);
      case "USER_UPDATE":
        return USER_UPDATE(this.client, message);
      case "VOICE_STATE_UPDATE":
        return VOICE_STATE_UPDATE(this.client, message);
      case "WEBHOOKS_UPDATE":
        return WEBHOOKS_UPDATE(this.client, message);
    }
  }
}
