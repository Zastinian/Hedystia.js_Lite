import Base from "../base";
import Client from "../client";
import Emoji from "../types/emoji";
import Guild from "../types/guild";
import Role from "../types/role";
import Sticker from "../types/sticker";
import WelcomeScreen from "../types/welcomescreen";

export default class GuildStruct extends Base {
  id: string;
  name: string;
  icon: string | null;
  iconHash: string | null | undefined;
  splash: string | null;
  discoverySplash: string | null;
  owner: boolean | undefined;
  ownerId: string;
  permissions: string | null | undefined;
  afkChannelId: string | null;
  afkTimeout: number;
  widgetEnabled: boolean | undefined;
  widgetChannelId: string | null | undefined;
  verificationLevel: number;
  defaultMessageNotifications: number;
  explicitContentFilter: number;
  roles: Role[];
  emojis: Emoji[];
  features: string[];
  mfaLevel: number;
  applicationId: string | null;
  systemChannelId: string | null;
  systemChannelFlags: number;
  rulesChannelId: string | null;
  maxPresences: number | null | undefined;
  maxMembers: number | undefined;
  vanityUrlCode: string | null;
  description: string | null;
  banner: string | null;
  premiumTier: number;
  premiumSubscriptionCount: number | undefined;
  preferredLocale: string;
  publicUpdatesChannelId: string | null;
  maxVideoChannelUsers: number | undefined;
  maxStageVideoChannelUsers: number | undefined;
  approximateMemberCount: number | undefined;
  approximatePresenceCount: number | undefined;
  welcomeScreen: WelcomeScreen | undefined;
  nsfwLevel: number;
  stickers: Sticker[] | undefined;
  premiumProgressBarEnabled: boolean;
  safetyAlertsChannelId: string | null;
  constructor(client: Client, data: Guild) {
    super(client);
    this.id = data.id;
    this.name = data.name;
    this.icon = data.icon;
    this.iconHash = data.icon_hash;
    this.splash = data.splash;
    this.discoverySplash = data.discovery_splash;
    this.owner = data.owner;
    this.ownerId = data.owner_id;
    this.permissions = data.permissions;
    this.afkChannelId = data.afk_channel_id;
    this.afkTimeout = data.afk_timeout;
    this.widgetEnabled = data.widget_enabled;
    this.widgetChannelId = data.widget_channel_id;
    this.verificationLevel = data.verification_level;
    this.defaultMessageNotifications = data.default_message_notifications;
    this.explicitContentFilter = data.explicit_content_filter;
    this.roles = data.roles;
    this.emojis = data.emojis;
    this.features = data.features;
    this.mfaLevel = data.mfa_level;
    this.applicationId = data.application_id;
    this.systemChannelId = data.system_channel_id;
    this.systemChannelFlags = data.system_channel_flags;
    this.rulesChannelId = data.rules_channel_id;
    this.maxPresences = data.max_presences;
    this.maxMembers = data.max_members;
    this.vanityUrlCode = data.vanity_url_code;
    this.description = data.description;
    this.banner = data.banner;
    this.premiumTier = data.premium_tier;
    this.premiumSubscriptionCount = data.premium_subscription_count;
    this.preferredLocale = data.preferred_locale;
    this.publicUpdatesChannelId = data.public_updates_channel_id;
    this.maxVideoChannelUsers = data.max_video_channel_users;
    this.maxStageVideoChannelUsers = data.max_stage_video_channel_users;
    this.approximateMemberCount = data.approximate_member_count;
    this.approximatePresenceCount = data.approximate_presence_count;
    this.welcomeScreen = data.welcome_screen;
    this.nsfwLevel = data.nsfw_level;
    this.stickers = data.stickers;
    this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
    this.safetyAlertsChannelId = data.safety_alerts_channel_id;
  }
  async fetch() {
    return this.client.guilds.fetch(this.id);
  }
  async edit(
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
    return this.client.guilds.edit(this.id, options, reason);
  }
  async setName(name: string, reason?: string) {
    return await this.edit(
      {
        name,
        verificationLevel: undefined,
        defaultMessageNotifications: undefined,
        explicitContentFilter: undefined,
        afkChannel: {
          id: undefined,
        },
        afkTimeout: undefined,
        systemChannel: {
          id: undefined,
        },
        systemChannelFlags: undefined,
        rulesChannel: {
          id: undefined,
        },
        publicUpdatesChannel: {
          id: undefined,
        },
        preferredLocale: undefined,
        description: undefined,
        premiumProgressBar: undefined,
        safetyAlertsChannelId: undefined,
        features: undefined,
        owner: {
          id: undefined,
        },
      },
      reason
    );
  }
}
