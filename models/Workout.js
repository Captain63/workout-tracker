// Import mongoose module and Schema class
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create model for workout records
const WorkoutSchema = new Schema({
    day: {
       type: Date,
       required: "Day is required",
       default: new Date()
    },
    exercises: [
      {
        type: {
            type: String,
            required: "Type is required"
        },
        name: {
            type: String,
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
        }
      }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;