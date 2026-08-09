const IUserRepository = require("../../application/ports/IUserRepository");
const UserModel = require("../../../../models/User");
const UserEntity = require("../../domain/entities/UserEntity");

class UserRepositoryMongoImpl extends IUserRepository {
    
    _mapToEntity(doc) {
        if (!doc) return null;
        // Mapping Mongoose document to domain entity
        const obj = doc.toObject();
        obj.id = obj._id.toString();
        return new UserEntity(obj);
    }

    async findByEmail(email) {
        const doc = await UserModel.findOne({ email });
        return this._mapToEntity(doc);
    }

    async findByPrepPilotId(prepPilotId) {
        const doc = await UserModel.findOne({ prepPilotId });
        return this._mapToEntity(doc);
    }

    async findById(id) {
        const doc = await UserModel.findById(id);
        return this._mapToEntity(doc);
    }
    
    async findByVerificationToken(token) {
        const doc = await UserModel.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: new Date() },
        });
        return this._mapToEntity(doc);
    }

    async save(userEntity) {
        const data = { ...userEntity };
        // Clean up entity-specific fields for mongo
        delete data.id;
        
        let doc;
        if (userEntity.id) {
            // Update existing
            doc = await UserModel.findByIdAndUpdate(userEntity.id, data, { new: true, upsert: true });
        } else {
            // Create new
            doc = await UserModel.create(data);
        }
        return this._mapToEntity(doc);
    }
}

module.exports = UserRepositoryMongoImpl;
