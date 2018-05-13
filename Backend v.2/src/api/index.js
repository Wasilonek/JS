import {Router} from 'express'
import student from './student'
import room from './room'

const router = new Router();
router.use('/students', student);
router.use('/rooms', room);

export default router
