const express = require('express');
const cors = require('cors'); // Mengimport library cors
const app = express();
const sequelize = require('./src/configs/database');
const customerRoutes = require('./src/routes/customerRoutes');

// Mengaktifkan CORS untuk semua rute
app.use(cors());

app.use(express.json());
app.use('/api', customerRoutes);

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

sequelize.sync()
    .then(() => console.log('Tables synced...'))
    .catch(err => console.log('Error: ' + err));

// Mengubah port yang digunkan dari 5000 ke 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
