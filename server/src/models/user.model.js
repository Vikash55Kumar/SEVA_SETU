import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {        
        aadharNumber: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        otrId: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
            index: true,
        },
        phoneNumber: {
            type: String,
            sparse: true,
            default: null,
            required:true
          },
        caste: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        fatherName: {
            type: String,
            required: true,
        },
        religion: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        isVerified: {
            type: String,
            required: true,
            default: "Pending",
            enum: ["Pending", "Verified", "Rejected"] // Only allow these values
        },
        motherOtr: {
            type: String,
        },
        fatherOtr: {
            type: String,
        },
        avatar: {
            type :String,
            required:true
        },
        avatarAdharCard: {
            type :String,
        },
        avatarIncome: {
            type :String,
        },
        avatarPanCard: {
            type :String,
        },        
        avatarCaste: {
            type :String,
        },
        avatarResidential: {
            type :String,
        },
        avatar10thMarksheet: {
            type :String,
        },
        avatar12thMarksheet: {
            type :String,
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        refreshToken: {
            type: String,
        },
        provider: {
            type: String,
            default: 'User',
        },
        certificate: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Certificate"
            }
        ],
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
