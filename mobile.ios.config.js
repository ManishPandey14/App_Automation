const { join } = require('path');
const { config } = require('./mobile.shared.config');

exports.config = {
  ...config,
  specs: ['./tests/mobile-employee/specs/**/*.spec.js'],
  capabilities: [
    {
      deviceName: 'iPhone XR',
      platformName: 'iOS',
      platformVersion: '12.1',
      maxInstances: 1,
      app: join(process.cwd(), 'app', 'app-debug.app'),
      useNewWDA: true,
      waitForQuiescence: false,
      automationName: 'XCUITest'
    }
  ]
};