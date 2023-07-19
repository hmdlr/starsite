export default {
  version: {
    number: 0.8,
    name: 'Sat 🛰',
    needsPurge: true,
  },
  commPort: 'starph1sh',
  tokenLocation: 'starphish-token',
  chromeStoreUrl: 'https://chrome.google.com/webstore/detail/heimdallr/mgcclljnboinjppelonolbhklnnljonp',
  localStarconfigPort: process.env.REACT_APP_LOCAL_STARCONFIG_PORT,
  nodeEnv: process.env.NODE_ENV,
};
