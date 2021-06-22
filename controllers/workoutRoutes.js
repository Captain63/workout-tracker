const db = require('../models');

const serveData = app => {
    // Retrieve previous workouts
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}, (err, data) => {
            if (err) {
              console.error(err);
            } else {
              res.status(200).send(data);
            }
        })
    })

    app.get("/api/workouts/range", async (req, res) => {
      try {
        const dbData = await db.Workout.aggregate([
          {
            $addFields: {
              totalDuration: { $sum: "$exercises.duration" }
            }
          }
        ])

        res.send(dbData);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    })

    // Create new workout
    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body)
          .then(dbUser => {
            res.status(200).send(dbUser);
          })
          .catch(err => {
            res.status(500).send(err);
          })
    })

    // Update existing workout
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
            if (err) {
              console.error(err);
            } else {
              res.status(200).send(data);
            }
        })
    })
}

module.exports = serveData;