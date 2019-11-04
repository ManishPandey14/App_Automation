// general test data (supports "e-Health Card", and "My Benefits")
export const validCredentials = {
  companyName: 'cxadevclient1',
  emailAddress: 'test3@test.com',
  password: 'P@ssw0rd'
};

// secondary test data (supports "e-Health Card", and "My Benefits")
export const validCredentials2 = {
  companyName: 'cxadevclient1',
  emailAddress: 'cxademo0@test.com',
  password: 'P@ssw0rd'
};

// health data: age = 30
export const age30 = {
  companyName: 'cxadevclient1',
  emailAddress: 'age30@test.com',
  password: 'P@ssw0rd'
};

// health data: age = 45
export const age45 = {
  companyName: 'cxadevclient1',
  emailAddress: 'age45@test.com',
  password: 'P@ssw0rd'
};

// health data: age = 50
export const age50 = {
  companyName: 'cxadevclient1',
  emailAddress: 'age50@test.com',
  password: 'P@ssw0rd'
};

// health data: age = 65
export const age65 = {
  companyName: 'cxadevclient1',
  emailAddress: 'age65@test.com',
  password: 'P@ssw0rd'
};

// invalid test data credentials
export const invalidCredentials = {
  companyName: 'cxadevclient000',
  emailAddress: 'test3@test.com',
  password: 'P@ssw0rd'
};

export const forgotPwdEmail = {
  emailAddress: 'kumar@thoughtworks.com'
};

export const hrCredentials = {
  emailAddress: 'hradmin@test.com',
  password: 'P@ssw0rd'
};

export const csCredentials = {
  emailAddress: 'csadmin@test.com',
  password: 'P@ssw0rd'
};

/*
 *  Following lists of test datas should NOT be updated
 */

// account status = expired
export const expiredAccount = {
  companyName: 'cxadevclient1',
  emailAddress: 'expired@test.com',
  password: 'P@ssw0rd'
};

// account status = locked
export const lockedAccount = {
  companyName: 'cxadevclient1',
  emailAddress: 'locked@test.com',
  password: 'P@ssw0rd'
};

// account status = suspended
export const suspendedAccount = {
  companyName: 'cxadevclient1',
  emailAddress: 'suspended@test.com',
  password: 'P@ssw0rd'
};

// account status = terminated
export const terminatedAccount = {
  companyName: 'cxadevclient1',
  emailAddress: 'terminated@test.com',
  password: 'P@ssw0rd'
};

// landing page "only" account
export const landingCredentials = {
  companyName: 'cxadevclient1',
  emailAddress: 'landingpage@test.com',
  password: 'P@ssw0rd'
};

// health data: risk status = red
export const redRisk = {
  companyName: 'cxadevclient1',
  emailAddress: 'redrisk@test.com',
  password: 'P@ssw0rd'
};

// health data: risk status = amber
export const amberRisk = {
  companyName: 'cxadevclient1',
  emailAddress: 'amberrisk@test.com',
  password: 'P@ssw0rd'
};

// health data: risk status = green
export const greenRisk = {
  companyName: 'cxadevclient1',
  emailAddress: 'greenrisk@test.com',
  password: 'P@ssw0rd'
};

// health data: with only 1 graph
export const oneGraph = {
  companyName: 'cxadevclient1',
  emailAddress: 'graph1@test.com',
  password: 'P@ssw0rd'
};

// health data: with 6 graphs
export const sixGraph = {
  companyName: 'cxadevclient1',
  emailAddress: 'graph6@test.com',
  password: 'P@ssw0rd'
};

// claims data: pending, approved, and rejected claims for EE and DEP
export const claimsStatus = {
  companyName: 'cxadevclient1',
  emailAddress: 'claimsstatus@test.com',
  password: 'P@ssw0rd'
};
