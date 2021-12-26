const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken");

const UserController=require('../Controllers/UserController');

router.get('/',UserController.GetAllList);

router.get('/info', (req, res, next) => {
    const token = req.header("token");
    try{
        const secretKey = "watch";
        const decode = jwt.verify(token, secretKey)
        req.user = decode;
        next();
    }
    catch (error) {
        res.send({ message: "Bạn chưa đăng nhập" });
    }
}
,UserController.Info);

router.get('/:id',UserController.GetOneRecord);

router.post('/',UserController.createNewRecord);

router.post('/signin',UserController.checkSignIn);

router.put('/:id',UserController.updateRecord);

router.delete('/:id',UserController.deleteRecord);

module.exports = router;