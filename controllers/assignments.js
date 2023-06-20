//initialize express router
const express = require('express');
const { db } = require('../models/user');
const router = express.Router();

//import DB 
const User = require('../models/user');
const user = require('../models/user');
const Assignments = db.collection('Assignments')
const Achievements = db.collection('Achievements');

exports.getAssigment = async (req, res) => {
    const chosenTopic = req.body.topic;
    const assignmentObj = await Assignments.findOne({ topic: chosenTopic });
    console.log(assignmentObj.questions);
    res.status(200).json({ assignments: assignmentObj.questions });
};

exports.getSpecificAssigment = async (req, res) => {

    if (req.method === "GET") {
        const topic = req.body.topic;
        const questionNum = req.body.questionNum;
        const questionObj = await Assignments.findOne({ topic: topic });

        for (let i = 0; i < questionObj.questions.length; i++) {
            if (questionObj.questions[i].questionNum === questionNum) {
                console.log(questionObj.questions[i].question);
                res.status(200).json({ question: questionObj.questions[i] });
                return;
            }
        }
        res.status(404).json({ message: "Question not found" });
    }

    if (req.method === "PATCH") {
        const topic = req.body.topic;
        const title = req.body.title;
        const completed = req.body.completed;

        if (topic === "PHP") {
            const achievementObj = await Achievements.findOne({"Topic" : title});
            console.log(achievementObj);
            const userObj = await User.findOne({ _id: req.userId });
            if (userObj.completedPHPAssigments.includes(title)) {
                if(achievementObj !== null && userObj.achievementsUnlocked.includes(achievementObj.title)){
                    res.status(200).json({ message: "Already completed this assignment and achievement unlocked" });
                    return;
                } else {
                    res.status(200).json({ message: "Already completed this assignment" });
                    return;
                }
            } else if(achievementObj === null){
                await User.findOneAndUpdate({ _id: req.userId }, { $push: { completedPHPAssigments: title } });
                res.status(200).json({ message: "Assignment completed" });
                return;
            }
            else if (title === achievementObj.Topic) {
                console.log(achievementObj);
                await User.findOneAndUpdate({ _id: req.userId }, { $push: { completedPHPAssigments: title } });
                await User.findOneAndUpdate({ _id: req.userId }, { $push: { achievementsUnlocked : achievementObj.title } });
                res.status(200).json({ message: "Assignment completed and achievement unlocked" });
            } 
            

        } else if (topic === "JAVA") {
            const achievementObj = await Achievements.findOne({"Topic" : title});
            const userObj = await User.findOne({ _id: req.userId });
            if (userObj.completedJAVAAssigments.includes(title)) {
                if(achievementObj !== null && userObj.achievementsUnlocked.includes(achievementObj.title)){
                    res.status(200).json({ message: "Already completed this assignment and achievement unlocked" });
                    return;
                } else {
                    res.status(200).json({ message: "Already completed this assignment" });
                    return;
                }

            } else if(achievementObj === null){
                await User.findOneAndUpdate({ _id: req.userId }, { $push: { completedJAVAAssigments: title } });
                res.status(200).json({ message: "Assignment completed" });
                return;
            }
            else if (title === achievementObj.Topic) {
                console.log(achievementObj);
                await User.findOneAndUpdate({ _id: req.userId }, { $push: { completedJAVAAssigments: title } });
                await User.findOneAndUpdate({ _id: req.userId }, { $push: { achievementsUnlocked : achievementObj.title } });
                res.status(200).json({ message: "Assignment completed and achievement unlocked" });
                return;
            } 
            
        } else if (topic === "HTML/CSS") {
            
            const achievementObj = await Achievements.findOne({"Topic" : title});
            const userObj = await User.findOne({ _id: req.userId });
            console.log(userObj.completedHTMLCSSAssigments);
            if (userObj.completedHTMLCSSAssigments.includes(title)) {
                if(achievementObj !== null && userObj.achievementsUnlocked.includes(achievementObj.title)){
                    res.status(200).json({ message: "Already completed this assignment and achievement unlocked" });
                    return;
                } else {
                    res.status(200).json({ message: "Already completed this assignment" });
                    return;
                }
            } else if(achievementObj === null){
                await User.findOneAndUpdate({ _id: req.userId }, { $push: { completedHTMLCSSAssigments: title } });
                res.status(200).json({ message: "Assignment completed" });
                return;
            }
            else if (title === achievementObj.Topic) {
                console.log(achievementObj);
                await User.findOneAndUpdate({ _id: req.userId }, { $push: { completedHTMLCSSAssigments: title } });
                await User.findOneAndUpdate({ _id: req.userId }, { $push: { achievementsUnlocked : achievementObj.title } });
                res.status(200).json({ message: "Assignment completed and achievement unlocked" });
                return;
            } 
        }

    } else {
        res.status(404).json({ message: "Assignment not found" });
    }
};

exports.getNumberOfQuestions = async (req, res) => {
    const PHPObj = await Assignments.findOne({ topic: "PHP" });
    const JAVAObj = await Assignments.findOne({ topic: "JAVA" });
    const HTMLObj = await Assignments.findOne({ topic: "HTML/CSS" });

    const PHPNum = PHPObj.questions.length;
    const JAVANum = JAVAObj.questions.length;
    const HTMLNum = HTMLObj.questions.length;

    res.status(200).json({ PHPNum: PHPNum, JAVANum: JAVANum, HTMLNum: HTMLNum });
}
