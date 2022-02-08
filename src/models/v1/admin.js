import validator from "validator";

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

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
                default: false
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
        admin: {
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
        invitation: {
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
            revoke: {
                type: Boolean,
                default: false
            }
        },
        electionRegistration: {
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
    status: {
        type: String,
        enum: ['pending', 'verified', 'active', 'suspended', 'deactivated'],
        default: 'verified'
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    devices: {
        type: [{
            token: {type: String,},
            geoIp: {type: Object,},
            platform: {type: String,},
            browser: {type: String,},
            isMobile: {type: Boolean,},
            isDesktop: {type: Boolean},
            os: {type: String},
            isWindows: {type: Boolean},
            isLinux: {type: Boolean},
            isMac: {type: Boolean},
        }]
    },
}, {timestamps: {createdAt: true, updatedAt: true}});

adminSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

adminSchema.virtual('initials').get(function () {
    return `${this.firstName[0]}${this.lastName[0]}`;
});

const Admin = model('Admin', adminSchema);

export default Admin;
