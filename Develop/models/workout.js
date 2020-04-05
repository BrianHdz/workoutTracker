// Require mongoose and create a Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema with today's date and exercises with properties
const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {
                type:{
                    type: String,
                    trim: true,
                    required: "Enter Exercise Type"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Enter Excersise Name"
                },
                duration: {
                    type: Number,
                    required: " Enter Exercise Duration in Minutes"
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
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        // Object options within the Document. Apply virtual getters (can override getters options).
        toJSON: {
            virtuals: true
        }
    }
);

// Add properties to Schema
workoutSchema.virtual('totalDuration').get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;