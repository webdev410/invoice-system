const router = require('express').Router();
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');
const contactRoutes = require('./contactRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const itemRoutes = require('./itemRoutes');
const projectRoutes = require('./projectRoutes');
const profileRoutes = require('./profileRoutes');

// declaring api routes
router.use('/users', userRoutes);
router.use('/company', companyRoutes);
router.use('/contacts', contactRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/item', itemRoutes);
router.use('/project', projectRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
