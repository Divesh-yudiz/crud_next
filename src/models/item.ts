import mongoose, { Schema, models } from 'mongoose';

const ItemSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const UserDetailSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: false }
});

export const UserDetail = models.user_detail || mongoose.model('user_detail', UserDetailSchema);