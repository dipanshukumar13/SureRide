const dotenv=require ('dotenv');
dotenv.config();
const express=require ('express');
const app=express();
const cors=require ('cors');
const cookieParser=require ('cookie-parser');
const connectToDb=require('./db/db');
app.use(cors());
connectToDb();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
module.exports=app;