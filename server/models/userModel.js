const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        registrationDate: {
            type: Date,
            default: Date.now
        },
        lastLogin: {
            type: Date,
            default: null
        },
        startOfDay: {
            type: String,
            default: "08:00"
        },
        endOfDay: {
            type: String,
            default: "20:00"
        },

        currentStreak: {
            type: Number,
            default: 0
        },
        longestStreak: {
            type: Number,
            default: 0
        },
        bestScore: {
            type: Number,
            default: 0,
            date: Date
        },
        lvl: {
            type: Number,
            default: 1
        },
        currentXp: {
            type: Number,
            default: 0
        },
        nextLvlXp: {
            type: Number,
            default: 100
        },
        coins : {
            type: Number,
            default: 0
        },
        equippedAnimation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'animation',
            default: null
        },
        equippedIdiom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'idiom',
            default: null
        },
        equippedCharacter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'character',
            default: null
        },
        purchasedAnimations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'animation',
            default: []
        }],
        purchasedIdioms: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'idiom',
            default: []
        }],
        purchasedCharacters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'character',
            default: []
        }],
    }
)

const userModel = mongoose.model('user', userSchema)

module.exports = userModel