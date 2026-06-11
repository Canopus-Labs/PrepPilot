const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        profileImageUrl: {
            type: String,
            default: null,
            match: [
                /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i,
                "Please provide a valid image URL",
            ],
        },
    },
    { timestamps: true }
);

// Index for frequently queried field
UserSchema.index({ email: 1 });

module.exports = mongoose.model("User", UserSchema);