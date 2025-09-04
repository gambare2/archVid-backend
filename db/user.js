import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phoneno: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Custom validation: At least one of email or phoneno is required
userSchema.pre("validate", function (next) {
  if (!this.email && !this.phoneno) {
    this.invalidate("email", "Either email or phone number is required");
    this.invalidate("phoneno", "Either email or phone number is required");
  }
  next();
});

const UserModal = mongoose.model("User", userSchema);

export default UserModal;
