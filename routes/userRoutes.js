const express = require('express');
const router = express.Router();

// Приклад маршруту: GET запит на /api/users/test
router.get('/test', (req, res) => {
  res.send('User routes are working!');
});

// Тут ви будете додавати ваші реальні маршрути для користувачів
// router.post('/register', someController.register);
// router.post('/login', someController.login);

module.exports = router;