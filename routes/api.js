// Reworking this page. 
// It's just made from an outline from another project.
// Need to set up then api routes.

// Requiring our Workout model
const router = require("express").Router();
const Workout = require("../models/workout.js");

// Routes
// =============================================================

// Read route for getting all of the Workouts to display on page.
router.get("/api/workouts/", (req, res) => {
    Workout.find({})
        .then(workoutDb => {
            res.json(workoutDb)
        }).catch(err => {
            res.json(err)
        })
});

// Create 
router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(workoutDb => {
            res.json(workoutDb);
        })
});

// Update
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        {
            $push: {
                excercises: body
            }
        },
        {
            new: true,
            runValidators: true
        }
    ).then(workoutDb => {
        res.json(workoutDb);
    })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;

// DELETE route for deleting posts
// router.delete("/api/posts/:id", ({ body, params ), res => {
//     Workout.findByIdAndDestroy(
//         params.id, {
            // not sure about this line below
//             id: req.params.id
//         }
//     ).then(workoutDb => {
//             res.json(workoutDb);
//         });
// });

