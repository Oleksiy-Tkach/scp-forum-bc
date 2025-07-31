// server.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

// Налаштування CORS, щоб дозволити підключення з вашого фронтенду
app.use(cors({
    origin: 'https://scp-forum-fc.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json()); // Для парсингу JSON-тіл запитів


// Ваш код для підключення до MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Підключено до MongoDB');
})
.catch(err => {
    console.error('Помилка підключення до MongoDB:', err);
    process.exit(1);
});

// --- Маршрути API ---
app.use('/api/users', userRoutes);

// Тестовий маршрут
app.get('/', (req, res) => {
    res.send('Бекенд SCP Foundation працює!');
});

// --- Запуск сервера ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});

