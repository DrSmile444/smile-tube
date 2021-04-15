export const botLocalesEn = {
  welcome: (username, message) => `👋 Hello, @${username}!\n🔍 Searching for a passed channel\n\n*${message}*`,
  foundChannel: (title, videoCount) => '🔍 Found the channel!\n*'
    + title + '* with *' + videoCount + '* videos.\n\n'
    + '🎲 Showing random 10 videos:',
  error: (message) => `Cannot find ${message} channel. Please, try another`,
}
