import {Schema, model} from "mongoose";
import validator from "validator/es";

const adminSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
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
    permissions: {
        election: {
            create: {
                type: Boolean,
                required: false
            },
            read: {
                type: Boolean,
                required: false
            },
            update: {
                type: Boolean,
                required: false
            },
            delete: {
                type: Boolean,
                required: false
            }
        },
        candidate: {
            create: {
                type: Boolean,
                required: false
            },
            read: {
                type: Boolean,
                required: false
            },
            update: {
                type: Boolean,
                required: false
            },
            delete: {
                type: Boolean,
                required: false
            }
        },
        electionResult: {
            create: {
                type: Boolean,
                required: false
            },
            read: {
                type: Boolean,
                required: false
            },
            update: {
                type: Boolean,
                required: false
            },
            delete: {
                type: Boolean,
                required: false
            },
            beforeElectionEnd: {
                type: Boolean,
                required: false
            }
        },
        vote: {
            create: {
                type: Boolean,
                required: false
            },
            read: {
                type: Boolean,
                required: false
            },
            update: {
                type: Boolean,
                required: false
            },
            delete: {
                type: Boolean,
                required: false
            },
        },
        admin: {
            create: {
                type: Boolean,
                required: false
            },
            read: {
                type: Boolean,
                required: false
            },
            update: {
                type: Boolean,
                required: false
            },
            delete: {
                type: Boolean,
                required: false
            },
        },
        user: {
            create: {
                type: Boolean,
                required: false
            },
            read: {
                type: Boolean,
                required: false
            },
            update: {
                type: Boolean,
                required: false
            },
            delete: {
                type: Boolean,
                required: false
            },
        },
        department: {
            create: {
                type: Boolean,
                required: false
            },
            read: {
                type: Boolean,
                required: true
            },
            update: {
                type: Boolean,
                required: false
            },
            delete: {
                type: Boolean,
                required: false
            },
        },
        course: {
            create: {
                type: Boolean,
                required: false
            },
            read: {
                type: Boolean,
                required: true
            },
            update: {
                type: Boolean,
                required: false
            },
            delete: {
                type: Boolean,
                required: false
            },
        }
    },
    nationality: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true,
        min: Date.now()
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
}, {timestamps: {createdAt: true, updatedAt: true}});

const Admin = model('Admin', adminSchema);

export default Admin;
