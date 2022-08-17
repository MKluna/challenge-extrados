const testAuthFailLogin = {
  email: "unittest@test.com",
  password: "111111",
};

const testAuthSuccessful = {
  email: "testUnit@test.com",
  password: "123456",
};

const registerUserSuccessful = {
  username: "testUnit",
  email: "testUnit@test.com",
  password: "123456",
};

const registerUser = {
  username: "testUnit",
  email: "testUnit@test.com",
  password: "123456",
};

const adminUser = [{
  username: "uniqueadmin",
  email: "admin@admin.com",
  role: ["admin"],
}];

module.exports = {
  testAuthFailLogin,
  testAuthSuccessful,
  registerUserSuccessful,
  registerUser,
  adminUser,
};
