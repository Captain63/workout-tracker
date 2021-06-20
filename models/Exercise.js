// Import mongoose module and Schema class
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    day: {
       type: Date,
       required: "Day is required"
    },
    exercises: [
      {
        type: {
            type: String,
            trim: true,
            required: "Type is required"
        },
        name: {
            type: String,
            trim: true,
            required: "Name is required"
        },
        duration: {
            type: Number,
            required: "Duration is required"
        },
        distance : {
            type: Number
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
      },
    ],
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;