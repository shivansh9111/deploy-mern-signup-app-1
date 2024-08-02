const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoutes= require('./Routes/authRoutes')
const productRouter = require('./Routes/productRouter.js')
require('dotenv').config();
require('./Models/db.js')

const PORT = process.env.PORT || 8080;

app.get("/pingpong", (req,res)=> {
res.send("shivansh pong")
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRoutes)
app.use('/products', productRouter)


app.listen(PORT , () => {
  console.log(`server is running on ${PORT}`);
})