const express = require('express');
const router = express.Router();
const {UserTask, Task} = require('../../../models');
const withAuth = require('../../../utils/auth');



router.post('/',withAuth, async (req, res) => {
if(req.session.role!=='admin'){
res.status(401).json({message: 'Unauthorized'})
}
    try {
const usertasks = req.body.usertasks;//{userid:4, usertasks:[cascas,47gu5uy,49gi54g549k,]}
const myUserTask = []
for (const element of usertasks) {
  let usertasktofind = await Task.findOne({where: {TaskCode: element}})
  if (usertasktofind) {
    myUserTask.push({TaskID: usertasktofind.dataValues.id, UserID: req.body.userid, isApproved: true, isRequested: true})
  }
}

await UserTask.bulkCreate(myUserTask);

        res.status(201).json({
          message: 'Se agregaron las tareas del usuario correctamente.',
         
        });
      } catch (error) {
        console.error('Error creating schedules:', error.message);
        res.status(500).json({ message: 'Failed to create schedules', error: error.message });
      }
    });
    
    module.exports = router;
