/*
//1.2 models/User.js
import mongoose from "mongoose"; // 👉 mongoose আনলাম

// User Schema বানালাম
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, // 👉 নাম স্ট্রিং হবে
      required: true, // 👉 নাম অবশ্যই দিতে হবে
    },
    email: {
      type: String, // 👉 ইমেইল স্ট্রিং হবে
      required: true, // 👉 অবশ্যই দিতে হবে
      unique: true, // 👉 ডুপ্লিকেট হবে না
    },
  },
  {
    timestamps: true, // 👉 createdAt, updatedAt স্বয়ংক্রিয়ভাবে যোগ হবে
  }
);

// মডেল বানালাম
const User = mongoose.model("User", userSchema);

// এক্সপোর্ট করলাম
export default User;
*/

// 4.2 models/User.js
import mongoose from "mongoose"; // 👉 mongoose ইমপোর্ট
import bcrypt from "bcryptjs"; // 👉 পাসওয়ার্ড হ্যাশিং এর জন্য

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "নাম দিতে হবে"], // 👉 Name বাধ্যতামূলক
    },
    email: {
      type: String,
      required: [true, "ইমেল দিতে হবে"], // 👉 Email বাধ্যতামূলক
      unique: true, // 👉 Duplicate ইমেল চলবে না
    },
    password: {
      type: String,
      required: [true, "পাসওয়ার্ড দিতে হবে"], // 👉 Password বাধ্যতামূলক
    },
  },
  { timestamps: true } // 👉 তৈরির এবং আপডেটের সময় স্বয়ংক্রিয়
);

// পাসওয়ার্ড হ্যাশ করার জন্য pre-save middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); // 👉 যদি পাসওয়ার্ড চেইঞ্জ না হয়, হ্যাশ করবেনা
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // 👉 পাসওয়ার্ড হ্যাশ
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // 👉 লগইন চেক
};

const User = mongoose.model("User", userSchema);

export default User;
