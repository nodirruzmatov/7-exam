import express from 'express'
import ejs from 'ejs'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler.js'
import resolt from './routes/router.js'

dotenv.config()


const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3232'
}))

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'view'))


app.use('/assets', express.static(path.join(process.cwd(), 'src', 'assets')))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(resolt)

app.use(errorHandler)

app.use('/*', (req, res, next) => res.render('notFound.ejs'))

app.listen(3232, console.log(3232))