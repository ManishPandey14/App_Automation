exports.config = {
  runner: 'local',
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 12000000
  },
  sync: true,
  logLevel: 'debug',
  deprecationWarnings: true,
  bail: 1,
  waitforTimeout: 30000,
  reporters: ['spec'],

  port: 4723,
  services: ['appium'],
  appium: {
    command: './node_modules/.bin/appium',

    /**
     * @see {@link http://appium.io/docs/en/writing-running-appium/server-args/index.html}
     */
    args: {
      debugLogSpacing: true,

      /** @see {@link http://appium.io/docs/en/advanced-concepts/memory-collection/} */
      enableHeapdump: true
    }
  },

  suites: {
    login: ['./tests/mobile-employee/specs/login.spec.js'],
    claims: ['./tests/mobile-employee/specs/claims.spec.js'],
    health: ['./tests/mobile-employee/specs/health.spec.js'],
    health2: ['./tests/mobile-employee/specs/health.spec2.js']
  },

  beforeSession: (/* config, capabilities, specs */) => {
    require('@babel/register');
  }
};
