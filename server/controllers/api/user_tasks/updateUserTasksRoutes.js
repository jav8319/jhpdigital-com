const express = require('express');
const router = express.Router();
const {UserTask} = require('../../../models');
const withAuth = require('../../../utils/auth');
const { Op } = require('sequelize');



router.post('/',withAuth, async (req, res) => {

    try {
const usertasks = req.usertasks.body;//{userid:4, tasks: [1,2,]}
const myUserTask = usertasks.tasks
for (const element of myUserTask) {
    await UserTask.update(  {where: {
      [Op.and]: [
        {  UserID:usertasks.userid },
        {  taskID: element }
      ]
    },isApproved: true,  })
  }
        res.status(200).json({
          message: 'Se agregaron las tareas del usuario correctamente.',
         
        });
      } catch (error) {
        console.error('Error updating tasks:', error.message);
        res.status(500).json({ message: 'Failed to update tasks', error: error.message });
      }
    });
    
    module.exports = router;












