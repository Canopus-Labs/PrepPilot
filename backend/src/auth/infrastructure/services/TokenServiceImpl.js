const generateAccessToken = require("../../../../utils/generateAccessToken");
const generateRefreshToken = require("../../../../utils/generateRefreshToken");

class TokenServiceImpl {
    generateAccessToken(userId, tokenVersion) {
        return generateAccessToken(userId, tokenVersion);
    }
    generateRefreshToken(userId) {
        return generateRefreshToken(userId);
    }
}
module.exports = TokenServiceImpl;
