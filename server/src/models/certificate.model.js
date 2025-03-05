import mongoose, { Schema } from "mongoose";

const certificateSchema = new Schema(
    {
        aadharNumber: {
            type: String,
            required: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        owner: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        certificateType: {
            type: String,
            required: true,
            default: "Caste Certificate"
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true
        },
        caste: {
            type: String,
            required: true,
            trim: true
        },
        dob: {
            type: String, 
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"], // Restrict to valid values
            trim: true
        },
        motherName: {
            type: String,
            required: true,
            trim: true
        },
        fatherName: {
            type: String,
            required: true,
            trim: true
        },
        religion: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        isVerified: {
            type: String,
            required: true,
            default: "Pending",
            enum: ["Pending", "Verified", "Rejected"] // Only allow these values
        },
        certificateNumber: {
            type: String
        },
        avatar: {
            type: String,
            required: true
        },
        avatarAffidavit: {
            type: String,
        },   
        avatarAdharCard: {
            type: String,
        },
        certificatePdf: {
            type: String,
        }
    },
    { timestamps: true }
);

export const Certificate = mongoose.model("Certificate", certificateSchema);
