const express = require("express")
const router = express.Router()

const DiscountController1=require('../Controllers/DiscountController');

router.get('/', DiscountController1.GetAllList);

router.get('/:id',DiscountController1.GetOneRecord);

router.post('/', DiscountController1.createNewRecord);

router.put('/:id', DiscountController1.updateRecord); 

router.delete('/:id',DiscountController1.deleteRecord);

module.exports = router;    