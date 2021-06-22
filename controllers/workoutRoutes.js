const db = require('../models');

const serveData = app => {
    // Retrieve previous workout
    app.get("/api/workouts", async (req, res) => {
        try {
          const dbData = await db.Workout.aggregate([
            {
              $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
              }
            }
          ]);

          res.status(200).send(dbData);
        } catch (err) {
          console.error(err);
          res.status(500).send(err);
        }
    })

    // 
    app.get("/api/workouts/range", async (req, res) => {
      try {
        const dbData = await db.Workout.aggregate([
          { $sort: { day: -1 } },
          { $limit: 7 },
          {
            $addFields: {
              totalDuration: { $sum: "$exercises.duration" }
            }
          }
        ])

        dbData.reverse();

        res.status(200).send(dbData);
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    })

    // Create new workout
    app.post("/api/workouts", async ({ body }, res) => {
      try {
        const dbData = await db.Workout.create(body);
        res.status(200).send(dbData);
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    })

    // Update existing workout
    app.put("/api/workouts/:id", async (req, res) => {
      try {
        const dbData = await db.Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body }});
        res.status(200).send(dbData);
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    })
}

module.exports = serveData;