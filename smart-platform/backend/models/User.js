const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


// ===============================
// 👤 USER SCHEMA
// ===============================
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false // hide password by default
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    avatar: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);


// ===============================
// 🔐 HASH PASSWORD BEFORE SAVE
// ===============================
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// ===============================
// 🔑 COMPARE PASSWORD
// ===============================
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);