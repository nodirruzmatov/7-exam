import { ErrorHandler } from "../error/ErrorHandler.js"

export const verifyRole = (role) => {
  return (req, res, next) => {

    const { userRole } = req

    if (role != userRole) {
      return next(new ErrorHandler('You are not permitted to perform this task', 401))
    }

    next()
  }
}