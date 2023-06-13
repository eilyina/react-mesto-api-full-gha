const router = require('express').Router();
const { celebrate, errors } = require('celebrate');
const errorHandler = require('../middlewares/errorHandler');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { userRegistrationSchema, userLoginSchema } = require('../utils/celebrateSchema');
const NotFoundError = require('../utils/NotFoundError');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post(
  '/signup',
  celebrate(userRegistrationSchema),
  createUser,
);

router.post('/signin', celebrate(userLoginSchema), login);

router.use(auth);
router.use('/cards', require('./cards'));
router.use('/users', require('./users'));

router.use(errorLogger);

router.use(
  '/',
  (req, res, next) => next(new NotFoundError('Неверный url')),
);

router.use(errors());
router.use(errorHandler);

module.exports = router;
