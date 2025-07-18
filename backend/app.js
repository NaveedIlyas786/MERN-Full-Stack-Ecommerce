const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const errorMiddleware = require('./middleware/error')

app.use(express.json()) //its main purpose is to automatically convert JSON request bodies into JavaScript objects that you can access via req.body.
app.use(cookieParser())

//! Routes are importing here after setting of product_Controller in Product_Routes and others also

const productRoute = require('./routes/ProductRoutes')
const userRoute = require('./routes/UserRoutes')
const orderRoute = require('./routes/OrderRoutes')

app.use('/api/v1', productRoute) //? We add here string "/api/v1/" that is using everytime
app.use('/api/v1', userRoute)
app.use('/api/v1', orderRoute)

//! Middleware for global Error handling
app.use(errorMiddleware)
module.exports = app //? export from here and will import in "Server.js"
