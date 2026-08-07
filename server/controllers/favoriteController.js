import Favorite from "../models/Favorite.js";

export const getFavorites = async (req, res) => {
    try{
        const favorites = await Favorite.find({ user: req.user.id });
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.create({
            ...req.body,
            user: req.user.id
        });

        res.status(201).json(favorite);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "This game is already in your favorites."
            });
        }

        res.status(400).json({ message: err.message });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        await Favorite.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.status(200).json({ message: "Removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};