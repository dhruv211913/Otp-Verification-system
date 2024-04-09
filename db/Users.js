const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const jwt_key='abcdef'

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid Email")
            }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },

    tokens: [{
        token: {
            type: String,
            required: true,

        }
    }
    ]
})

userschema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const saltRounds = 10; // Number of salt rounds for hashing
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
    }
    next();
});

//generating token

userschema.methods.generateAuthtoken=async function(){
    try {
        let newtoken=jwt.sign({_id:this._id},jwt_key,{expiresIn:'1d'})
        this.tokens=this.tokens.concat({token:newtoken})
        await this.save();
        return newtoken;    
        
    } catch (error) {
        resp.status(400).send(error)
        
    }

}

module.exports = new mongoose.model("users", userschema);