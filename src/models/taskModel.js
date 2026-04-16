import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["todo", "doing", "done"],
        default: "todo"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    annotation:{
        type: String
    }
});

export const Task = new mongoose.model("tasks", taskSchema)