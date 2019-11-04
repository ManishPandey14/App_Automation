'use strict';

const {
  config: { capabilities: iosCaps }
} = require('./mobile.ios.config');
const {
  config: { capabilities: androidCaps }
} = require('./mobile.android.config');

module.exports = function configure(homeDir) {
  // NOTE: it should be same length as webdriver `capabilities` setting
  const pre = {
    ios: [
      {
        devicetype: 'iPhone X'
      }
    ],

    android: [
      {
        api: '28',
        abi: 'google_apis/x86_64',
        device: 'Nexus 6P'
      }
    ]
  };

  return {
    ci: {
      ios: {
        auto: true,
        devices: iosCaps.map((cap, idx) => {
          return {
            ...pre.ios[idx],
            // if you want to change iOS version, the version should be installed from the Xcode
            // please ensure that before try new version
            runtime: cap.platformVersion,
            name: cap.deviceName
          };
        })
      },

      android: {
        sdk: {
          repos: `${homeDir}/.android/repositories.cfg`
        },

        auto: true,
        devices: androidCaps.map((cap, idx) => {
          return {
            ...pre.android[idx],
            name: cap.deviceName
          };
        })
      }
    },

    pkg: {
      ios: {
        id: 'com.cxagroup.mobile.EmployeePortal.development',
        to: iosCaps[0].app,
        rename: 'app-debug.app'
      },

      android: {
        id: 'com.employeefrontend.development',
        to: androidCaps[0].app,
        rename: 'app-debug.apk'
      }
    }
  };
};
