import Favorite from "../models/Favorite.js";

export const getFavorites = async (req, res) => {
    console.log('in GET /api/favorites/')
    try{
        const favorites = await Favorite.find({ user: req.user.id });
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addFavorite = async (req, res) => {
    console.log('in POST /api/favorites/')
    try {
        const favorite = await Favorite.create({ ...req.body, user: req.user.id });
        res.status(201).json(favorite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const removeFavorite = async (req, res) => {
    console.log('in DELETE /api/favorites/')
    try {
        await Favorite.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.status(200).json({ message: "Removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};