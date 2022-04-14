import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const RoleSchema = new mongoose.Schema(
    {
        display_name: {type: String, required: true},
        system_name: {type: String, required: true, unique: true}
    }
)

const Role = mongoose.model("role", RoleSchema)

const UserSchema = new mongoose.Schema(
    {
        login: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        email: {type: String, required: true},
        roles: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "role",
                    autopopulate: true
                }
            ],
        },
        isGoogleAuth: {type: Boolean, default: true},
        isVkAuth: {type: Boolean, default: true},
        pageLink: {type: String, required: false, unique: true}
    }
)

UserSchema.plugin(mongooseAutoPopulate)

const User = mongoose.model("user", UserSchema)

function generateCode(length) {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const EmailTokenSchema = new mongoose.Schema(
    {
        code: {type: String, default: () => generateCode(10), unique: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, autopopulate: true}
    }
)

EmailTokenSchema.plugin(mongooseAutoPopulate)

const EmailToken = mongoose.model("emailtoken", EmailTokenSchema)

const OrderSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        status: {
            type: String,
            enum: ['not_complete', 'complete', 'approved', 'not_approved', 'in_waiting'],
            default: 'in_waiting'
        },
        money: {type: Number, required: false},
        date: {type: mongoose.Schema.Types.Date, default: Date.now},
        deadline: {type: mongoose.Schema.Types.Date, required: false},
        builder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: false,
            autopopulate: true
        },
        /*
            {
                "name": "",
                "count": 53,
                "price": 5553.24
            }
         */
        products: {
            type: [{type: mongoose.Schema.Types.Mixed}],
            required: false
        }
    }
)
OrderSchema.plugin(mongooseAutoPopulate)

const Order = mongoose.model("order", OrderSchema)

const FileSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true}
    }
)

const File = mongoose.model("file", FileSchema)

export {
    User,
    EmailToken,
    Role,
    Order,
    File
}