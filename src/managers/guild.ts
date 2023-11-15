import Base from "../base";
import Client from "../client";
import GuildStruct from "../structures/guild";
import Guild from "../types/guild";
import Collection from "../util/collection";
import {VerificationLevel, DefaultMessageNotifications, ExplicitContentFilter} from "../util/constants";

const col = new Collection<string, GuildStruct>();

export default class GuildManager extends Base {
  constructor(client: Client) {
    super(client);
  }
  _add(guildData: Guild) {
    if (!guildData) return null;
    let guild;
    const guildId = guildData.id;
    if (this.cache.has(guildId)) {
      guild = this.cache.get(guildId) as GuildStruct;
    } else {
      const newGuild: GuildStruct = new GuildStruct(this.client, guildData);
      this.cache.set(guildId, newGuild);
      guild = newGuild;
    }
    return guild;
  }
  get cache() {
    return col;
  }
  async fetch(guildId: string) {
    const guild = (await this.client.api.get(`/guilds/${guildId}`)) as Guild;
    return new GuildStruct(this.client, guild);
  }
  async edit(
    guildId: string,
    options: {
      name: string | undefined;
      verificationLevel: string | undefined;
      defaultMessageNotifications: string | undefined;
      explicitContentFilter: string | undefined;
      afkChannel: {
        id: string | undefined;
      };
      afkTimeout: number | undefined;
      systemChannel: {
        id: string | undefined;
      };
      systemChannelFlags: number | undefined;
      rulesChannel: {
        id: string | undefined;
      };
      publicUpdatesChannel: {
        id: string | undefined;
      };
      preferredLocale: string | undefined;
      description: string | undefined;
      premiumProgressBar: boolean | undefined;
      safetyAlertsChannelId: string | undefined;
      features: string[] | undefined;
      owner: {
        id: string | undefined;
      };
    },
    reason: string | undefined
  ) {
    let guilds;
    const body = await GuildManager.transformPayload(options);
    guilds = (await this.client.api.patch(`/guilds/${guildId}`, {body, reason})) as Guild;
    return this._add(guilds);
  }
  static async transformPayload(payload: {
    name: string | undefined;
    verificationLevel: string | undefined;
    defaultMessageNotifications: string | undefined;
    explicitContentFilter: string | undefined;
    afkChannel: {
      id: string | undefined;
    };
    afkTimeout: number | undefined;
    systemChannel: {
      id: string | undefined;
    };
    systemChannelFlags: number | undefined;
    rulesChannel: {
      id: string | undefined;
    };
    publicUpdatesChannel: {
      id: string | undefined;
    };
    preferredLocale: string | undefined;
    description: string | undefined;
    premiumProgressBar: boolean | undefined;
    safetyAlertsChannelId: string | undefined;
    features: string[] | undefined;
    owner: {
      id: string | undefined;
    };
  }) {
    return {
      name: payload.name ?? undefined,
      verification_level: typeof payload.verificationLevel === "string" ? VerificationLevel[payload.verificationLevel] : undefined,
      default_message_notifications:
        typeof payload.defaultMessageNotifications === "string" ? DefaultMessageNotifications[payload.defaultMessageNotifications] : undefined,
      explicit_content_filter: typeof payload.explicitContentFilter === "string" ? ExplicitContentFilter[payload.explicitContentFilter] : undefined,
      afk_channel_id: typeof payload.afkChannel === "string" ? payload.afkChannel : payload.afkChannel?.id ?? undefined,
      afk_timeout: payload.afkTimeout ?? undefined,
      icon: undefined,
      discovery_splash: undefined,
      splash: undefined,
      banner: undefined,
      system_channel_id: typeof payload.systemChannel === "string" ? payload.systemChannel : payload.systemChannel?.id ?? undefined,
      system_channel_flags: payload.systemChannelFlags ?? undefined,
      rules_channel_id: typeof payload.rulesChannel === "string" ? payload.rulesChannel : payload.rulesChannel?.id ?? undefined,
      public_updates_channel_id:
        typeof payload.publicUpdatesChannel === "string" ? payload.publicUpdatesChannel : payload.publicUpdatesChannel?.id ?? undefined,
      preferred_locale: payload.preferredLocale ?? "en-US",
      description: payload.description ?? undefined,
      premium_progress_bar_enabled: payload.premiumProgressBar ?? undefined,
      safety_alerts_channel_id: payload.safetyAlertsChannelId ?? undefined,
      features: payload.features ?? undefined,
      owner_id: typeof payload.owner === "string" ? payload.owner : payload.owner?.id ?? undefined,
    };
  }
}
