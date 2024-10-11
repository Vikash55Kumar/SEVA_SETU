import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            sparse: true,
            default: null,
          },
        password: {
            type: String,
            trim: true,
        },
        refreshToken: {
            type: String,
        },
        providerId: {
            type: String,
            unique: true,
            sparse: true,
        },
        provider: {
            type: String,
            default: 'local',
        },
        image: {
            url: String,
            filename: String,
        },
        avatar: {
            type :String,
        },

        coverImage: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default : Date.now,
        },
        Token: {
            type: String,
        },
    },
    { timestamps: true }
);

// Assuming this is a part of your userSchema
userSchema.pre('save', async function(next) {
    if (this.provider === 'google' || !this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        return next(err);
    }
    next();
});



userSchema.methods.isPasswordCorrect = async function(password) {
    console.log("Stored password:", this.password);
    console.log("Provided password:", password);
    return await bcrypt.compare(password, this.password);
};

// In your user.model.js or wherever you define these functions
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' } // Default to '15m'
    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' } // Default to '7d'
    );
};


export const User = mongoose.model("User", userSchema);
