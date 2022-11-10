import { Router } from "express";
import { delCours, delGroup, delStud, delTeach, getAdmin, getCours, getGroup, getStud, getTeach, newCours, newGroup, newStud, newTeach } from "../controller/admin.controller.js";
import { getlogin, login } from "../controller/login.controller.js";
import { getStudent } from "../controller/student.controller.js";
import { getTeacher, getTeacherGroup, newHomework } from "../controller/teacher.controller.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { verifyToken } from "../middleware/verifyToken.js";

const resolt = Router()

export default resolt
  .get('/', getlogin)
  .post('/auth/login', login)

  .use(verifyToken)
  .get('/admin', verifyRole('admin'), getAdmin)
  .get('/admin/cours', verifyRole('admin'), getCours)
  .post('/admin/newCours', verifyRole('admin'), newCours)
  .post('/admin/delCours', verifyRole('admin'), delCours)
  .get('/admin/teach', verifyRole('admin'), getTeach)
  .post('/admin/newTeach', verifyRole('admin'), newTeach)
  .post('/admin/delTeach', verifyRole('admin'), delTeach)
  .get('/admin/group', verifyRole('admin'), getGroup)
  .post('/admin/newGroup', verifyRole('admin'), newGroup)
  .post('/admin/delGroup', verifyRole('admin'), delGroup)
  .get('/admin/student', verifyRole('admin'), getStud)
  .post('/admin/newStudent', verifyRole('admin'), newStud)
  .post('/admin/delStudent', verifyRole('admin'), delStud)

  .get('/teacher', verifyRole('teacher'), getTeacher)
  .get('/teacher/group/:id', verifyRole('teacher'), getTeacherGroup)
  .post('/teacher/homework', verifyRole('teacher'), newHomework)
  .get('/student', verifyRole('student'), getStudent)



