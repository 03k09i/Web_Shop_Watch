
const UserModel=require('../Models/UserModel');
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");

//get all User
exports.GetAllList= (req, res)=> {
    UserModel.Get().then(result =>{
        console.log(result);
        res.json(result[0]);
    })
}
//get one User
exports.GetOneRecord= (req, res)=>{
    const ID=req.params.id;
    UserModel.GetById(ID).then(result =>{
        console.log(result);
        res.json(result[0]);
    });
}
// create new User
exports.createNewRecord = (req, res) =>{
    let UserReqData=req.body;
    let message = {
        email : '',
        phoneNumber : '',
        userName : ''
    };
    UserModel.CheckExistCondition(UserReqData).then(result =>{
        if(result[0][0])
        {
            result[0].map((value, index) => {
                if(value.Email == UserReqData.Email)
                {
                    message.email = 'Email đã tồn tại'
                }
                if(value.PhoneNumber == UserReqData.PhoneNumber)
                {
                    message.phoneNumber = 'Số điện thoại đã tồn tại'
                }
                if(value.UserName == UserReqData.UserName)
                {
                    message.userName = 'Tên đăng nhập đã tồn tại'
                }
            })
            console.log(message);
            res.send(message)
        }
        else{
            UserModel.Create(UserReqData).then(result =>{
                res.status(201).json(result);
            })
        }
    })
}
// create new User
exports.checkSignIn = (req, res) =>{
    let UserReqData=req.body;
    UserModel.CheckExistSignIn(UserReqData).then(result =>{
        if(result[0][0])
        {
            if(UserReqData.Password == result[0][0].Password)
            {
                message = 'Đăng nhập thành công'
                const payload = {
                    ID: result[0][0].ID,
                    Role: result[0][0].Role,
                };
                const secretKey = "watch";
                const token = jwt.sign(payload, secretKey, {
                    expiresIn: 60*60*24,
                });
                res.send({
                    message: "Đăng nhập thành công",
                    token,
                    status: "OK",
                });
            }
            else{
                message = 
                res.send({
                    message : 'Sai mật khẩu',
                    status : 'errorPass'
                })
            }
            
        }
        else{
            message = 
            res.send({
                message : 'Tài khoản không tồn tại',
                status : 'notExist'
            })
        }
    })
}
//update User
exports.updateRecord=(req, res)=>{
    let UserReqData=req.body
    const ID=req.params.id;
    UserModel.Update(ID,UserReqData).then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
}

//Delete User
exports.deleteRecord=(req, res)=>{
    const ID=req.params.id;
    UserModel.Delete(ID).then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
}

exports.Info = (req, res)=>{
    const ID=req.user.ID;
    UserModel.GetById(ID).then(result =>{
        console.log(result);
        res.json(result[0][0]);
    });
}