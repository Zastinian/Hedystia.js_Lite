export const VerificationLevel = createEnum(["None", "Low", "Medium", "High", "Very_High"]);
export const DefaultMessageNotifications = createEnum(["All_Messages", "Only_Mentions"]);
export const ExplicitContentFilter = createEnum(["Disabled", "Members_Without_Roles", "All_Members"]);
export const MfaLevel = createEnum(["None", "Elevated"]);

function createEnum(keys: string[]) {
  let obj: {[key: string]: number | string} = {};
  for (let [index, value] of keys.entries()) {
    if (keys[index] === null) continue;
    obj[index] = value;
    obj[value] = index;
  }

  return obj;
}

export const CDN: {
  root: string;
  DefaultAvatarURL: (id: string | number, format?: string) => string;
  UserAvatar: (avatar: string, dynamic: boolean, size: number, format?: string, userId?: string) => string;
  UserBanner: (banner: string, dynamic: boolean, size: number, format?: string, userId?: string) => string;
  GuildMemberBanner: (banner: string, dynamic: boolean, size: number, format?: string, memberId?: string, guildId?: string) => string;
  TeamIcon: (icon: string, dynamic: boolean, size: number, format?: string, teamId?: string) => string;
  ApplicationIcon: (icon: string, dynamic: boolean, size: number, format?: string, applicationId?: string) => string;
  ChannelBanner: (banner: string, dynamic: boolean, size: number, format?: string, channelId?: string) => string;
  GuildIcon: (icon: string, dynamic: boolean, size: number, format?: string, guildId?: string) => string;
  GuildBanner: (banner: string, dynamic: boolean, size: number, format?: string, guildId?: string) => string;
  GuildSplash: (splash: string, dynamic: boolean, size: number, format?: string, guildId?: string) => string;
  GuildDiscoverySplash: (discoverySplash: string, dynamic: boolean, size: number, format?: string, guildId?: string) => string;
  RoleIcon: (roleIcon: string, dynamic: boolean, size: number, format?: string, roleId?: string) => string;
  GuildMemberAvatar: (avatar: string, dynamic: boolean, size: number, format?: string, memberId?: string, guildId?: string) => string;
  GuildScheduledEventCoverImage: (coverImage: string, dynamic: boolean, size: number, format?: string, eventId?: string) => string;
  StickerPackBanner: (bannerId: string, size: number, format?: string) => string;
  StickerImage: (stickerId: string, size: number, format?: string) => string;
  WebhookAvatar: (avatar: string, dynamic: boolean, size: number, format?: string, webhookId?: string) => string;
  UserAvatarDecoration: (decoration: string, size: number, format?: string, userId?: string) => string;
  EmojiURL: (emojiId: string, dynamic: boolean, size: number, format?: string, quality?: string) => string;
} = {
  root: `https://cdn.discordapp.com`,
  DefaultAvatarURL: (id, format = "png") => {
    return `${CDN.root}/embed/avatars/${(BigInt(id) >> 22n) % 6n}.${format}`;
  },
  UserAvatar: (avatar, dynamic, size, format = "png", userId) => {
    if (dynamic) format = avatar.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/avatars/${userId}/${avatar}.${format}${size ? `?size=${size}` : ""}`;
  },
  UserBanner: (banner, dynamic, size, format = "png", userId) => {
    if (dynamic) format = banner.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/banners/${userId}/${banner}.${format}${size ? `?size=${size}` : ""}`;
  },
  GuildMemberBanner: (banner, dynamic, size, format = "png", memberId, guildId) => {
    if (dynamic) format = banner.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/guilds/${guildId}/users/${memberId}/banners/${banner}.${format}${size ? `?size=${size}` : ""}`;
  },
  TeamIcon: (icon, dynamic, size, format = "png", teamId) => {
    if (dynamic) format = icon.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/team-icons/${teamId}/${icon}.${format}${size ? `?size=${size}` : ""}`;
  },
  ApplicationIcon: (icon, dynamic, size, format = "png", applicationId) => {
    if (dynamic) format = icon.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/app-icons/${applicationId}/${icon}.${format}${size ? `?size=${size}` : ""}`;
  },
  ChannelBanner: (banner, dynamic, size, format = "png", channelId) => {
    if (dynamic) format = banner.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/channel-banners/${channelId}/${banner}.${format}${size ? `?size=${size}` : ""}`;
  },
  GuildIcon: (icon, dynamic, size, format = "png", guildId) => {
    if (dynamic) format = icon.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/icons/${guildId}/${icon}.${format}${size ? `?size=${size}` : ""}`;
  },
  GuildBanner: (banner, dynamic, size, format = "png", guildId) => {
    if (dynamic) format = banner.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/banners/${guildId}/${banner}.${format}${size ? `?size=${size}` : ""}`;
  },
  GuildSplash: (splash, dynamic, size, format = "png", guildId) => {
    if (dynamic) format = splash.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/splashes/${guildId}/${splash}.${format}${size ? `?size=${size}` : ""}`;
  },
  GuildDiscoverySplash: (discoverySplash, dynamic, size, format = "png", guildId) => {
    if (dynamic) format = discoverySplash.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/discovery-splashes/${guildId}/${discoverySplash}.${format}${size ? `?size=${size}` : ""}`;
  },
  RoleIcon: (roleIcon, dynamic, size, format = "png", roleId) => {
    if (dynamic) format = roleIcon.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/role-icons/${roleId}/${roleIcon}.${format}${size ? `?size=${size}` : ""}`;
  },
  GuildMemberAvatar: (avatar, dynamic, size, format = "png", memberId, guildId) => {
    if (dynamic) format = avatar.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/guilds/${guildId}/users/${memberId}/avatars/${avatar}.${format}${size ? `?size=${size}` : ""}`;
  },
  GuildScheduledEventCoverImage: (coverImage, dynamic, size, format = "png", eventId) => {
    if (dynamic) format = coverImage.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/guild-events/${eventId}/${coverImage}.${format}${size ? `?size=${size}` : ""}`;
  },
  StickerPackBanner: (bannerId, size, format = "png") => {
    return `${CDN.root}/app-assets/710982414301790216/store/${bannerId}.${format}${size ? `?size=${size}` : ""}`;
  },
  StickerImage: (stickerId, size, format = "png") => {
    return `${CDN.root}/stickers/${stickerId}.${format}${size ? `?size=${size}` : ""}`;
  },
  WebhookAvatar: (avatar, dynamic, size, format = "png", webhookId) => {
    if (dynamic) format = avatar.startsWith("a_") ? "gif" : format;
    return `${CDN.root}/avatars/${webhookId}/${avatar}.${format}${size ? `?size=${size}` : ""}`;
  },
  UserAvatarDecoration: (decoration, size, format = "png", userId) => {
    return `${CDN.root}/avatar-decorations/${userId}/${decoration}.${format}${size ? `?size=${size}` : ""}`;
  },
  EmojiURL: (emojiId, dynamic, size, format = "png", quality) => {
    if (dynamic) format = "gif" ?? format;
    return `${CDN.root}/emojis/${emojiId}.${format}${size ? `?size=${size}` : ""}${quality ? `&quality=${quality}` : ""}`;
  },
};
