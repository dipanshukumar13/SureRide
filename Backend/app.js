const dotenv=require ('dotenv');
dotenv.config();
const express=require ('express');
const app=express();
const cors=require ('cors');
const connectToDb=require('./db/db');
app.use(cors());
connectToDb();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const userRoutes=require('./routes/user.routes');

app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/users', userRoutes);
module.exports=app;