// Це має бути один з перших рядків у вашому server.js
require('dotenv').config();

// Тепер ви можете використовувати process.env.MONGO_URI
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Переконайтеся, що цей шлях коректний

const app = express();

// Middleware (проміжне ПЗ), якщо потрібно (наприклад, для парсингу JSON)
app.use(express.json());

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
    process.exit(1); // Виходимо з процесу, якщо не вдалося підключитися
});

// --- Маршрути API ---
// Всі запити до /api/users будуть оброблятися userRoutes
app.use('/api/users', userRoutes);

// Тестовий маршрут (можна видалити після перевірки)
app.get('/', (req, res) => {
    res.send('Бекенд SCP Foundation працює!');
});

// --- Запуск сервера ---
// Визначення порту: беремо з .env або використовуємо 5000 за замовчуванням
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});
