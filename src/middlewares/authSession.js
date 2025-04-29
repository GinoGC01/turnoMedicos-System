import { JWT_KEY } from '../config.js'
import jwt from 'jsonwebtoken'

export const authSession = (req, res, next) => {
  const token = req.cookies.access_token
  req.session = {
    user: null
  }

  try {
    const data = jwt.verify(token, JWT_KEY)
    req.session.user = data
  } catch {}

  next()
}
