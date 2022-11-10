import { LoginValidation } from '../validation/validation.js'
import { ErrorHandler } from '../error/ErrorHandler.js'
import { read } from '../utils/Fs.utils.js'
import { sing } from '../utils/jwt.js'

export const login = async (req, res, next) => {

  const { error, value } = LoginValidation.validate(req.body)

  if (error) {
    return next(new ErrorHandler(error.message, 400))
  }

  const { name, password } = value

  const allUsers = await read('users.model.json').catch(err => next(new ErrorHandler(err.message, 500)))

  const foundUser = allUsers.find(e => e.name == name && e.password == password)

  if (!foundUser) {
    return next(new ErrorHandler('User not found', 404))
  }

  if (foundUser.role == 'admin') {
    res.cookie("access_token", sing({ id: foundUser?.id, role: foundUser?.role }))
    res.redirect('/admin')
    return
  }

  if (foundUser.role == 'student') {
    res.cookie("access_token", sing({ id: foundUser?.id, role: foundUser?.role }))
    res.redirect('/student')
    return
  }

  if (foundUser.role == 'teacher') {
    res.cookie("access_token", sing({ id: foundUser?.id, role: foundUser?.role }))
    res.redirect('/teacher')
    return
  }

}

export const getlogin = (req, res, next) => {
  res.render('login.ejs')
}