interface WelcomeChannels {
  channel_id: string;
  description: string;
  emoji_id: string | null;
  emoji_name: string | null;
}

export default interface WelcomeScreen {
  description: string | null;
  welcome_channels: WelcomeChannels[];
}
