const { handleError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );
    if (!checkValueRol) {
      handleError(res, "No valid permissions", 403);
      return;
    }
    next();
  } catch (e) {
    handleError(res, "Permission error", 403);
  }
};

module.exports = checkRol;
