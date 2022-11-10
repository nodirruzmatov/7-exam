
import { ErrorHandler } from '../error/ErrorHandler.js'
import { read, write } from '../utils/Fs.utils.js'
import { newCoursValidation, newGroupValidation, newStudValodation, newTeachValidation } from '../validation/validation.js'

export const getAdmin = async (req, res, next) => {

  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allGroups = await read('groups.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allCourses = await read('courses.model.json').catch(err => next(new ErrorHandler(err.message, 500)))

  const allStudents = allUsers.filter(e => e.role == 'student')
  const allTeachers = allUsers.filter(e => e.role == 'teacher')

  let stuNum = allStudents.length
  let teachNum = allTeachers.length
  let coursNum = allCourses.length
  let groupNum = allGroups.length
  const link = '/admin'
  res.render('admin.ejs', { link, stuNum, teachNum, coursNum, groupNum })
}

// ! coures
export const getCours = async (req, res, next) => {
  const allCourses = await read('courses.model.json').catch(err => next(new ErrorHandler(err.message, 500)))

  const link = '/admin/cours'
  res.render("admin.ejs", { link, allCourses })
}

export const newCours = async (req, res, next) => {

  const { error, value } = newCoursValidation.validate(req.body)

  if (error) {
    return next(new ErrorHandler(error.message, 400))
  }

  const { coursName, desc, price } = value

  const allCourses = await read('courses.model.json').catch(err => next(new ErrorHandler(err.message, 500)))

  const foundCours = allCourses.find(e => e.coursName == coursName && e.price == price)
  if (foundCours) {
    return next(new ErrorHandler('This cours already has been created', 400))
  }

  allCourses.push({ id: allCourses.at(-1)?.id + 1 || 1, coursName, desc, price })

  const newCours = await write('courses.model.json', allCourses).catch(err => next(new ErrorHandler(err.message, 500)))

  if (newCours) res.redirect('/admin/cours')

}

export const delCours = async (req, res, next) => {

  const { id } = req.body

  const allCourses = await read('courses.model.json').catch(err => next(new ErrorHandler(err.message, 500)))

  const foundCours = allCourses.findIndex(e => e.id == id)


  if (foundCours == '-1') {
    return next(new ErrorHandler('Cours not found', 400))
  }

  allCourses.splice(foundCours, 1)

  const delCours = await write('courses.model.json', allCourses).catch(err => next(new ErrorHandler(err.message, 500)))

  if (delCours) res.redirect('/admin/cours')

}
// ! teacher
export const getTeach = async (req, res, next) => {

  const allCourses = await read('courses.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allTeachers = allUsers.filter(e => e.role == 'teacher')

  const link = '/admin/teach'

  res.render('admin.ejs', { link, allTeachers, allCourses })
}

export const newTeach = async (req, res, next) => {

  const { error, value } = newTeachValidation.validate(req.body)

  if (error) {
    return next(new ErrorHandler(error.message, 400))
  }

  const { name, password, cours, phoneNumber } = value
  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))

  const foundTeach = allUsers.find(e => e.name == name && e.password == password)

  if (foundTeach) {
    return next(new ErrorHandler('This teacher already has been created', 400))
  }

  allUsers.push({ id: allUsers.at(-1)?.id + 1 || 1, name, password, role: 'teacher', phoneNumber, cours, group: [] })

  const newTeach = await write('users.model.json', allUsers).catch(err => next(new ErrorHandler(err.message, 500)))

  if (newTeach) res.redirect('/admin/teach')
}


export const delTeach = async (req, res, next) => {
  const { id } = req.body

  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))

  const foundTeach = allUsers.findIndex(e => e.id == id)

  if (foundTeach == '-1') {
    return next(new ErrorHandler('Teacher not found', 400))
  }

  allUsers.splice(foundTeach, 1)

  const delTeach = await write('users.model.json', allUsers).catch(err => next(new ErrorHandler(err.message, 500)))

  if (delTeach) res.redirect('/admin/teach')
}

// ! groups
export const getGroup = async (req, res, next) => {

  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allGroups = await read('groups.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allCourses = await read('courses.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allTeachers = allUsers.filter(e => e.role == 'teacher')

  const link = '/admin/group'
  res.render("admin.ejs", { link, allTeachers, allCourses, allGroups })
}

export const newGroup = async (req, res, next) => {

  const { error, value } = newGroupValidation.validate(req.body)

  if (error) {
    return next(new ErrorHandler(error.message, 400))
  }

  const { groupName, courseId, teacher, day, time } = value
  const allGroups = await read('groups.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const foundTeacher = allUsers.filter(e => e.role == 'teacher').find(e => e.id == teacher)


  const foundGroup = allGroups.find(e => e.groupName == groupName)
  if (foundGroup) {
    return next(new ErrorHandler('This group already has been created', 400))
  }

  allGroups.push({ id: allGroups.at(-1)?.id + 1 || 1, groupName, courseId, teacher, day, time })

  const newGroup = await write('groups.model.json', allGroups).catch(err => next(new ErrorHandler(err.message, 500)))
  if (newGroup) foundTeacher.group = [...foundTeacher.group, newGroup.id]

  const upgGroup = await write('users.model.json', allUsers).catch(err => next(new ErrorHandler(err.message, 500)))

  if ((upgGroup)) res.redirect('/admin/group')
}

export const delGroup = async (req, res, next) => {

  const { id } = req.body

  const allGroups = await read('groups.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const foundTeacher = allUsers.filter(e => e.role == 'teacher').find(e => e.group.find(m => m == id))


  const foundGroup = allGroups.findIndex(e => e.id == id)
  if (foundGroup == '-1') {
    return next(new ErrorHandler('Group not found', 400))
  }

  allGroups.splice(foundGroup, 1)

  const delGroup = await write('groups.model.json', allGroups).catch(err => next(new ErrorHandler(err.message, 500)))
  const groupIndex = foundTeacher.group.findIndex(e => e == id)

  foundTeacher.group.splice(groupIndex, 1)

  const upgTeacher = await write('users.model.json', allUsers).catch(err => next(new ErrorHandler(err.message, 500)))


  if (upgTeacher) res.redirect('/admin/group')

}

// ! student

export const getStud = async (req, res, next) => {

  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allGroups = await read('groups.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allStudent = allUsers.filter(e => e.role == 'student')

  const link = '/admin/student'

  res.render('admin.ejs', { link, allStudent, allGroups })
}

export const newStud = async (req, res, next) => {

  const { error, value } = newStudValodation.validate(req.body)

  if (error) {
    return next(new ErrorHandler(error.message, 400))
  }

  const { name, password, phoneNumber, groupId } = value

  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const foundUser = allUsers.find(e => e.name == name && e.password == password)

  if (foundUser) return next(new ErrorHandler('this user already has been created', 400))

  allUsers.push({ id: allUsers.at(-1)?.id + 1 || 1, name, password, role: 'student', phoneNumber, groupId })

  const newStudent = await write('users.model.json', allUsers).catch(err => next(new ErrorHandler(err.message, 500)))

  if (newStudent) res.redirect('/admin/student')
}

export const delStud = async (req, res, next) => {

  const { id } = req.body

  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const foundStud = allUsers.findIndex(e => e.id == id)

  if (foundStud == '-1') {
    return next(new ErrorHandler('Student not found', 400))
  }

  allUsers.splice(foundStud, 1)

  const delStud = await write('users.model.json', allUsers).catch(err => next(new ErrorHandler(err.message, 500)))

  if (delStud) res.redirect('/admin/student')
}