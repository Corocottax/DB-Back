const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    age: { type: Number, required: false },
    rol: {type: String, enum: ["admin", "user"], default: "user"},
    firstName: { type: String, required: false, trim: true },
    lastName: { type: String, required: false, trim: true },
    characters: [{ type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'characters' }],
    photo: { type: String, required: false, trim: true },
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function (next) {

    this.password = bcrypt.hashSync(this.password, 10);
    next();

})

const User = mongoose.model('users', userSchema);
module.exports = User;