const router = require('express').Router();
const mongoose = require('mongoose');

const { AuthController, HospitalController } = require('Controllers');

// Auth Routes
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);

router.get('/hospital', HospitalController.getHospitalListing);
router.get('/hospital/nearyby', HospitalController.getNearyByHospitals);
router.get('/hospital/:hospitalId', HospitalController.getHospitalById);

module.exports = router;
