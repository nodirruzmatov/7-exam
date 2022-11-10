
import { ErrorHandler } from '../error/ErrorHandler.js'
import { read, write } from '../utils/Fs.utils.js'
import { newHomeworkValidation } from '../validation/validation.js'

export const getTeacher = async (req, res, next) => {

  const { userId } = req

  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allGroups = await read('groups.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const foundTeacher = allUsers.find(e => e.id == userId)
  const foundGroup = allGroups.filter(e => foundTeacher.group.includes(e.id))

  const link = '/teacher'

  res.render('teacher.ejs', { link, foundGroup, foundTeacher })

}

export const getTeacherGroup = async (req, res, next) => {

  const id = req.url.split("/")[3]

  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allGroups = await read('groups.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const foundGroup = allGroups.find(e => e.id == id)
  const foundStudent = allUsers.filter(e => e.groupId == id)

  const link = '/teacher/group'

  res.render('teacher.ejs', { link, foundStudent, foundGroup })
}

export const newHomework = async (req, res, next) => {

  const { error, value } = newHomeworkValidation.validate(req.body)

  if (error) {
    return next(new ErrorHandler(error.message, 400))
  }

  const { desc, groupId } = value

  const allHomework = await read('homework.model.json').catch(err => next(new ErrorHandler(err.message, 500)))

  allHomework.push({ id: allHomework.at(-1)?.id + 1 || 1, desc, groupId })

  const newHomwork = write('homework.model.json', allHomework).catch(err => next(new ErrorHandler(err.message, 500)))

  if (newHomwork) res.redirect(`/teacher/group/${groupId}`)

}