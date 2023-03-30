const { Router } = require('express');
const { getUsers, register, login } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const router = Router();

// login route
router.post('/login', loginValidation, validationMiddleware, login);

// register route
router.post('/register', registerValidation, validationMiddleware, register);

// get users
router.get('/get-users', getUsers);

module.exports = router;
