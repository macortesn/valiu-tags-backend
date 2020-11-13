import { Schema, model } from "mongoose";

const tagModel = new Schema({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

export default model("Tag", tagModel);