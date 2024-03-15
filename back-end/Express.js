const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 3001
 
const app = express()

const authRoute = require("./Routes/AuthRoute")
const userRoute = require("./Routes/UserRoute")
 
app.use('/auth', authRoute)
app.use('/user', userRoute)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))  