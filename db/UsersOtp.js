const mongoose = require('mongoose');
const validator = require('validator');

const userotpschema = new mongoose.Schema({

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
    otp:{
        type:String,
        required:true
    }

});

module.exports=new mongoose.model("userotp",userotpschema);