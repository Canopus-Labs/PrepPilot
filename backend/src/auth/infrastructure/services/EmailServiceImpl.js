const IEmailService = require("../../application/ports/IEmailService");
const { sendVerificationEmail } = require("../../../../utils/sendEmail");

class EmailServiceImpl extends IEmailService {
    async sendVerificationEmail(to, verificationUrl) {
        return await sendVerificationEmail(to, verificationUrl);
    }
}

module.exports = EmailServiceImpl;
