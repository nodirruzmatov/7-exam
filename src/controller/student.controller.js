import { read } from '../utils/Fs.utils.js'

export const getStudent = async (req, res, next) => {

  const { userId } = req

  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))
  const allHomework = await read('homework.model.json').catch(err => next(new ErrorHandler(err.message, 500)))

  const foundUser = allUsers.find(e => e.id == userId)
  const foundHomework = allHomework.filter(e => e.groupId == foundUser.groupId)

  res.render('student.ejs', { foundHomework, foundUser })
}