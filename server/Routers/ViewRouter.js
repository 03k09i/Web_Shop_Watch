const express = require("express")
const router = express.Router()

const ViewController1=require('../Controllers/ViewController');

router.get('/statistics',ViewController1.Statistics);

router.get('/inventory',ViewController1.Inventory);

router.get('/top10watch',ViewController1.Top10watch);

router.get('/top10user',ViewController1.Top10user);

router.get('/month/:month',ViewController1.Month);

router.get('/month/',ViewController1.allMonth);

router.get('/brand/',ViewController1.Brand);

module.exports = router;