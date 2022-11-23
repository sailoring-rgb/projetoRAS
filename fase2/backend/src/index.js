const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const http = require("http")
const cors = require("cors")
const routes = require('./routes')

const port = process.env.PORT || 3001
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
// app.get("/", (_req, res) => {
//     res.send({ response: "I am alive" }).status(200);
// });

server.listen(port, () => console.log(`Listening on port ${port}`));