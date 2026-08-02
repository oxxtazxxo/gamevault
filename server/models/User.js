import mongoose from "mongoose";

// user has two objects here. 
// one with username and password together, and then the second being the timestamps
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: { type: String, required: true, }
}, { timestamps: true});

export default mongoose.model("User", userSchema);