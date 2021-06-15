const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');
const commentRoutes = require('./comment-routes');

router.use('/pizza', pizzaRoutes);
router.use('/comment', commentRoutes);

module.exports = router;