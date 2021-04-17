export const botLocalesEn = {
  welcome: (username, message) => `👋 Hello, @${username}!\n🔍 Searching for a passed channel\n\n*${message}*`,
  foundChannel: (title, videoCount) => '🔍 Found the channel!\n*'
    + title + '* with *' + videoCount + '* videos.',
  error: (message) => `Cannot find ${message} channel. Please, try another`,
  fetchVideo: (videoCount, fetchedCount) => `Fetched ${fetchedCount} of ${videoCount} videos...`,
  fetchAllVideos: (videoCount) => `Done! Fetched last ${videoCount} videos.\nFinding random videos...`,
};
