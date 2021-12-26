const express = require("express")
const router = express.Router()

const InvoiceController1=require('../Controllers/InvoiceController');

router.get('/one/:id',InvoiceController1.GetAllList);

router.get('/:id',InvoiceController1.GetOneRecord);

router.post('/:id',InvoiceController1.createNewRecord);

router.delete('/:id',InvoiceController1.deleteRecord);

module.exports = router;