import {Application} from 'express'
import {Request, Response} from 'express'

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Recaptcha = require('express-recaptcha').RecaptchaV2
const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const {check, validationResult} = require('express-validator')
require('dotenv').config()

const validation = [
    check('name', 'A valid name is required.').not().isEmpty().trim().escape(),
    check( 'email', 'Please provide a valid email.').isEmail(),
    check('subject').optional().trim().escape(),
    check( 'message', 'A message').trim().escape().isLength({min: 1, max: 2000})
]
const app: Application = express()
app.use(morgan('dev'))
app.use(express.json)
app.use(bodyParser.urlendocded({extended: false}))
app.use(bodyParser.json())

const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY)

const mailgunClient = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY})

const handleGetRequest = (request: Request, response: Response) => {
    return response.json('This works')
}

const indexRoute = express.Router()
indexRoute.route('/')
    .get(handleGetRequest)
app.use('/apis', indexRoute)


app.listen(4200, () => {
    console.log('Express Successfully Built')
})

