const app = require('./app') //? Import from "App.js"

const dotenv = require('dotenv')
const connectDatabase = require('./config/Mydatabase') //? make sure call the "connectDatabase" after //Config below

//! Handling unCaught error/Exception  (means if you put anything without defined then this error happen)
//! like --> console.log(youtube)  but "youtube" is not defined
process.on('uncaughtException', (err) => {
  // *uncaughtException* it is event name
  //process.on is a Node.js method used to listen for events on the global process object
  console.log('Error: ', err.message)
  console.log('Shutting down the Server due to unCaught Error/Exception!')
  //? After giving message on console we have to close the Server
  process.exit(1)
})

//!Config
dotenv.config({ path: 'backend/config/config.env' })

//!Connecting to database
connectDatabase()

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is Working on port http://localhost:${process.env.PORT}`)
})

//! unhandled promise rejection (in case of incorrect DB string, or any other string used in config.env file)

process.on('unhandledRejection', (err) => {
  console.log('Error:', err.message)
  console.log('Shutting down the Server due to Unhandled Promise Rejection!')

  //? After giving message on console we have to close the Server

  server.close(() => {
    process.exit(1)
  })

  //! So Now we don't need to use the catch section in "Mydatabase.js" file after .then,
  //! reason is that if we use catch there the promise would be handled there properly, but
  //! we are talking about the "unhandled promise rejection" which is handled here!
})
