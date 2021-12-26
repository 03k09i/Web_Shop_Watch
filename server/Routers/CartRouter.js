const express = require("express")
const router = express.Router()

const CartController1=require('../Controllers/CartController');

router.get('/',CartController1.GetAllList);

router.get('/:UserID',CartController1.GetOneRecord);

router.post('/',CartController1.createNewRecord);

router.put('/',CartController1.updateRecord);

router.delete('/:UserID/:WatchID',CartController1.deleteRecord);

module.exports = router;