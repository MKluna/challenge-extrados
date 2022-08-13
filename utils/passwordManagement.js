const bcryptjs = require("bcryptjs");

const encrypt = async (password) => {
    const hash = await bcryptjs.hash(password, 10)
    return hash
};


const compare = async (password, hashPassword) => {
    return await bcryptjs.compare(password, hashPassword)
};

module.exports = { encrypt, compare };