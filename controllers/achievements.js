//initialize express router
const express = require('express');
const router = express.Router();
const {db} = require("../models/user");
const User = require('../models/user');

const Achievements = db.collection('Achievements');


// Based on the user's progress, achievements are unlocked

exports.getAllAchievements = async (req, res) => {
    const achievementObj = await Achievements.find().toArray();
    console.log(achievementObj);
    res.status(200).json({ Achievements : achievementObj });
}

exports.getunlockedAchievement = async (req, res) => {
    const userObj = await User.findOne({ _id: req.userId });
    const achievementsUnlocked = userObj.achievementsUnlocked;

    res.status(200).json({ "achievementsUnlocked": achievementsUnlocked });
}