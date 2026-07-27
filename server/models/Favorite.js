import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rawgId: {type: Number, required: true },
    title: String,
    releaseDate: String
}, { timestamps: true });

favoriteSchema.index({ user: 1, rawgId: 1}, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);