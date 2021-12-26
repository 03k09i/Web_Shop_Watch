const express = require("express")
const router = express.Router()

const WatchController1=require('../Controllers/WatchController');
const { upLoadImgMainAndList } = require("../middlewares/upLoadImgWatch");

router.get('/', WatchController1.GetAllList);

router.get('/:id',WatchController1.GetOneRecord);

router.post('/',upLoadImgMainAndList(), WatchController1.createNewRecord);

router.put('/:id',upLoadImgMainAndList(), WatchController1.updateRecord); 

router.delete('/:id',WatchController1.deleteRecord);

module.exports = router;    