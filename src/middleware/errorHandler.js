import http from 'http'

export const errorHandler = (err, req, res, next) => {

  if (process.env.NODE_ENV == 'development') {
    res.render('errors.ejs', { status: err.status, message: err.message })
    return
  }

  if (process.env.NODE_ENV == 'production') {
    res.render('errors.ejs', { status: err.status, message: http.STATUS_CODES[err.status] })
    return
  }
}