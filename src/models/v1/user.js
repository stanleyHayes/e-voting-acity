import validator from "validator";

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(`Invalid email: ${value}`);
            }
        },
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error(`Invalid phone: ${value}`);
            }
        },
    },
    image: {
        type: String
    },
    rollNumberOrStaffID: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error(`Enter a strong password`);
            }
        },
    },
    authInfo: {
        token: {
            type: String,
            trim: true,
            required: true
        },
        otp: {
            type: String,
            trim: true,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true
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
        },
        showRole: {
            type: Boolean,
            default: true
        }
    },
    permissions: {
        election: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                required: false
            }
        },
        candidate: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                default: false
            }
        },
        electionResult: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                default: false
            },
            beforeElectionEnd: {
                type: Boolean,
                default: false
            }
        },
        vote: {
            create: {
                type: Boolean,
                default: true
            },
            read: {
                type: Boolean,
                default: true
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
                default: false
            },
            read: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                default: false
            },
        },
        user: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                default: false
            },
        },
        department: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                default: false
            },
        },
        course: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                default: false
            },
        },
        electionRegistration: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            delete: {
                type: Boolean,
                default: false
            },
        },
    },
    nationality: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true,
        max: Date.now()
    },
    interests: {
        type: [String]
    },
    socialMediaAccounts: {
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
    level: {
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
            },
            ip: {
                type: String,
            },
            browser: {
                type: String,
            },
            isMobile: {
                type: String,
            },
            isDesktop: {
                type: String
            },
            os: {
                type: String
            }
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
    },
    currentPosition: {
        type: String
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'staff'],
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});


userSchema.virtual('fullName').get(function (){
    if(this.middleName)
        return `${this.firstName} ${this.middleName} ${this.lastName}`;
    return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('initials').get(function (){
    return `${this.firstName[0]}${this.lastName[0]}`;
});


const User = model('User', userSchema);

export default User;
