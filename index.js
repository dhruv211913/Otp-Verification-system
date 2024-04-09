const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
require('./db/conn')
const users = require('./db/Users');
const UsersOtp = require('./db/UsersOtp');
const port = process.env.PORT
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

app.use(cors());

app.use(express.json());

app.post('/register', async (req, resp) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        resp.status(400).send({ error: "Please Enter All Input Data" })
    }
    const preuser = await users.findOne({ email: email })
    if (preuser) {
        resp.status(400).send({ error: "User Already Exists" })
    }
    else {
        const userregister = new users({
            name, email, password
        });
        let result = await userregister.save();

        console.log(result);
        resp.status(200).send(result);
    }
})

app.post('/sendotp', async (req, resp) => {
    const { email } = req.body;
    if (!email) {
        resp.status(400).send({ error: "Please Enter Your Email" });
        return; // Ensure the function stops execution here
    }
    try {
        const preuser = await users.findOne({ email: email });
        if (preuser) {
            const OTP = Math.floor(100000 + Math.random() * 900000);
            const existEmail = await UsersOtp.findOne({ email: email });
            if (existEmail) {
                const updateData = await UsersOtp.findByIdAndUpdate({ _id: existEmail._id }, { otp: OTP }, { new: true });
                await updateData.save();
            } else {
                const saveOtpData = new UsersOtp({ email, otp: OTP });
                await saveOtpData.save();
            }
            const mailoptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email otp Verification",
                text: `OTP:- ${OTP}`
            };
            transporter.sendMail(mailoptions, (error, info) => {
                if (error) {
                    console.log("Error", error);
                    resp.status(400).send({ error: "Email not sent" });
                } else {
                    console.log("Email sent" + info.response);
                    resp.status(200).send({ message: "Email sent Successfully" });
                }
            });
        } else {
            resp.status(400).send({ error: "User Not Found" });
                
        }
    } catch (error) {
        resp.status(500).send({ error: "Internal Server Error", details: error });
    }
});


app.post('/userverify',async(req,resp)=>{
    const {email,otp}=req.body;
    if(!otp || !email){
        resp.status(400).send({ error: "Please Enter Your Otp and Email" });

    }
    try {
        const otpVerification =await UsersOtp.findOne({email:email})
        if(otpVerification.otp === otp){
            //generating token to login  a user

            const preuser= await users.findOne({email:email})
            const token=await preuser.generateAuthtoken();
            resp.status(200).send({message:"User Login Successfully",token})
           

        }else{
            resp.status(400).send({error:"Invalid Otp"})
        }
        
    } catch (error) {
        resp.status(400).send({error:"Inalid Details", error})
        
    }
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})