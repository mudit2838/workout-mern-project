const express = require('express');
const Workout = require('../models/workoutsModels');
const { createWorkout, getWorkout, getWorkouts, deleteWorkout,updateWorkout } = require('../controllers/workoutControllers');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require auth for all workout routes.
router.use(requireAuth); 

/** 
* Route: /api/workouts
* Method: GET
* Description: Get all workouts
* Access: Public
* Parameters: None
*/

router.get('/', getWorkouts);

/** 
* Route: /api/workouts/:id
* Method: GET
* Description: Get a single workouts by its id 
* Access: Public
* Parameters: None
*/

router.get('/:id', getWorkout);


/** 
* Route: /api/workouts
* Method: POST
* Description: Create a new workout 
* Access: Public
* Parameters: None
*/

router.post('/', createWorkout);


/** 
* Route: /api/workouts/:id
* Method: DELETE
* Description: Delete/Remove a single workouts by its id 
* Access: Public
* Parameters: None
*/

router.delete('/:id', deleteWorkout);



/** 
* Route: /api/workouts/:id
* Method: PATCH
* Description: Update a single workouts by its id 
* Access: Public
* Parameters: None
*/

router.patch('/:id',updateWorkout);



module.exports = router;  