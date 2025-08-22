const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // adjust the path if needed

mongoose.connect('mongodb://127.0.0.1:27018/thryve', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedAdmins() {
  try {
    const admins = [
      { username: 'owneradmin', role: 'owner' },
      { username: 'psadmin', role: 'specialist' },
      { username: 'itadmin', role: 'itadmin' },
    ];

    const password = 'Sample123$';

    for (const admin of admins) {
      const hash = await bcrypt.hash(password, 10);
      await User.updateOne(
        { username: admin.username }, // find by username
        { $set: { role: admin.role, password: hash } },
        { upsert: true } // insert if not found
      );
    }

    console.log('Admin users seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admins:', err);
    process.exit(1);
  }
}

seedAdmins();
