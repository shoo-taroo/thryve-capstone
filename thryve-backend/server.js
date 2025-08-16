const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const plantRoutes = require('./routes/plantRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const accessLogsRoutes = require('./routes/accessLogsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/plants', plantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/logs', accessLogsRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
