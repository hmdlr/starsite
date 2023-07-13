import { Microservice, LocalPaths, DeployedPaths } from '@hmdlr/utils/dist/Microservice';

export default {
  version: {
    number: 0.8,
    name: 'Sat 🛰',
    needsPurge: true,
  },
  api: {
    [Microservice.Authphish]: process.env.NODE_ENV === 'development'
        ? `${LocalPaths[Microservice.Authphish]}`
        : `${DeployedPaths[Microservice.Authphish]}`,
    [Microservice.Scanphish]: process.env.NODE_ENV === 'development'
        ? `${LocalPaths[Microservice.Scanphish]}`
        : `${DeployedPaths[Microservice.Scanphish]}`,
  },
  commPort: 'starph1sh',
  tokenLocation: 'starphish-token',
  chromeStoreUrl: 'https://chrome.google.com/webstore/detail/heimdallr/mgcclljnboinjppelonolbhklnnljonp',
  localStarconfigPort: process.env.REACT_APP_LOCAL_STARCONFIG_PORT,
  nodeEnv: process.env.NODE_ENV,
};
