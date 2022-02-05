import {Schema, model} from "mongoose";
import validator from "validator/es";

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new  Error(`Invalid email: ${value}`);
            }
        },
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new  Error(`Invalid phone: ${value}`);
            }
        },
    },
    image: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new  Error(`Enter a strong password`);
            }
        },
    },
    authInfo: {
        token: {
            type: String,
            trim: true
        },
        otp: {
            type: String,
            trim: true
        }
    },
    settings: {
        showBirthday: {
            type: Boolean,
            default: false
        },
        showGender: {
            type: Boolean,
            default: false
        },
        showPhoneNumber: {
            type: Boolean,
            default: false
        },
        showLevel: {
            type: Boolean,
            default: false
        }
    },
    permissions: {},
    nationality: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true,
        min: Date.now()
    },
    interest: {
        type: [String]
    },
    social: {
        twitter: {
            type: String,
            trim: true
        },
        facebook: {
            type: String,
            trim: true
        },
        tiktok: {
            type: String,
            trim: true
        },
        instagram: {
            type: String,
            trim: true
        },
        website: {
            type: String,
            trim: true
        },
        youtube: {
            type: String,
            trim: true
        },
        linkedIn: {
            type: String,
            trim: true
        }
    },
    status: {
        type: String,
        enum: ['pending', 'verified', 'active', 'suspended'],
        default: 'pending'
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    admissionYear: {
        type: String,
        enum: ['freshmen', 'junior', 'sophomore', 'senior'],
        required: true
    },
    bio: {
        type: String
    },
    devices: {
        type: [{
            token: {
                type: String,
                required: true
            },
            ip: {},
            browser: {},
            isMobile: {},
            isDesktop: {},
            os: {}
        }]
    },
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const User = model('User', userSchema);

export default User;
