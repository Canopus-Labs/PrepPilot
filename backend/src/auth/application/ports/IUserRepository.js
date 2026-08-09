/**
 * Interface representing the outbound port for User persistence.
 * Note: Since JS does not have interfaces, this class serves as documentation
 * and throws "Not Implemented" errors if methods are not overridden.
 */
class IUserRepository {
    async findByEmail(email) {
        throw new Error("Method not implemented.");
    }
    
    async findByPrepPilotId(prepPilotId) {
        throw new Error("Method not implemented.");
    }

    async findById(id) {
        throw new Error("Method not implemented.");
    }
    
    async findByVerificationToken(token) {
        throw new Error("Method not implemented.");
    }

    async save(userEntity) {
        throw new Error("Method not implemented.");
    }
}

module.exports = IUserRepository;
