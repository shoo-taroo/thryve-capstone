const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // ✅ consistent use of bcryptjs

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['owner', 'specialist', 'itadmin'],
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Automatically hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
