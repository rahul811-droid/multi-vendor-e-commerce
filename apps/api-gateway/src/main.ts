/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';

import cors from 'cors'
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan'
import rateLimit from 'express-rate-limit';
import proxy from 'express-http-proxy';
import axios from 'axios'






const app = express();

app.use(
  cors({
    origin:["http://localhost:3000"],
    allowedHeaders:["Authorization","Content-Type"],
    credentials:true
  })
)


app.use(morgan("dev"))
app.use(express.json({limit:"100mb"}))
app.use(express.urlencoded({limit:"100mb",extended:true}))
app.use(cookieParser());
app.set("trust proxy",1);




const limiter =rateLimit({
  windowMs:15 * 60 *1000,
  max:(req:any)=>(req.user ? 1000 : 100),
  message:{error:"Too many request,please try again later!"},
  standardHeaders:true,
  legacyHeaders:true,
  keyGenerator:(req:any)=>req.ip,
})

app.use(limiter);
app.get('/gatway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});
app.use("/",proxy("http://localhost:6001"));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
