import { ErrorHandler } from "../error/ErrorHandler.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const { access_token } = req.cookies

  if (!access_token) {
    return next(new ErrorHandler('Povide token', 401))
  }

  jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {

    if (err instanceof jwt.JsonWebTokenError) {
      return next(new ErrorHandler('Token invalid', 401))
    }

    if (err instanceof jwt.TokenExpiredError) {
      return next(new ErrorHandler('Token expired', 401))
    }

    req.userId = decode.id
    req.userRole = decode.role
    next()

  })

}