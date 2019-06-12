const mongoose = require('mongoose')
const crypto = require('crypto')
const uudiv1 = require('uudi/v1')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true })

userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uudiv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this.hashed_password
})

userSchema.method = {
    encryptPassword: function(password){
        if(!password) return ''
        try {
            return crypto.createHmac('sha1', thus.salt).update(password).digest('hex')
        } catch (err) {
            return ''
        }
    }
}

module.exports = mongoose.model('User', userSchema)