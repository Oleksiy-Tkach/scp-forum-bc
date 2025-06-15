// server.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // <--- Додайте цей рядок


const app = express();

// CORS Configuration - Додайте цей блок коду ПЕРЕД вашими маршрутами
// Для розробки можна дозволити всім, але для продакшну краще обмежити
app.use(cors({
    origin: 'https://ВАШ_ФРОНТЕНД_ДОМЕН.com', // <--- Замініть на реальний домен вашого фронтенду
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Дозволені методи HTTP
    credentials: true // Дозволяє надсилати cookie та HTTP-аутентифікацію
}));

// Або, якщо для розробки ви хочете дозволити ВСІМ підключення (НЕ РЕКОМЕНДУЄТЬСЯ ДЛЯ ПРОДАКШНУ)
// app.use(cors());


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
