//const defaultTimeoutInterval = process.env.DEBUG ? 60 * 60 * 500 : 90000;

exports.config = {
  runner: 'local',
  specs: ['./tests/web-employee/specs/*.js'],
  baseUrl: 'https://twclient3.cxapalawandev.com',
  maxInstances: 15,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      'goog:chromeOptions': {}
    }
  ],
  logLevel: 'debug',
  deprecationWarnings: true,
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],

  // sync: true,
  // services: ['docker'],
  // dockerOptions: {
  //   image: 'selenium/standalone-chrome-debug',
  //   healthCheck: 'http://localhost:4444',
  //   options: {
  //     p: ['4444:4444', '5900:5900'],
  //     shmSize: '2g'
  //   }
  // },

  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    expectationResultHandler: function(/*passed, assertion*/) {}
  },

  beforeSession: function(/*config, capabilities, specs*/) {
    require('@babel/register');
  },
  before: function(/*capabilities, specs*/) {},
  afterTest: function(test) {
    if (test.error !== undefined) {
      browser.takeScreenshot();
    }
  }
};
