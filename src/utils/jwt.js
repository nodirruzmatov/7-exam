import jwt from 'jsonwebtoken'

export const sing = payload => jwt.sign(payload, process.env.SECRET_KEY)