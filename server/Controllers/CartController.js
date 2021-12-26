
const CartModel=require('../Models/CartModel');

//get all Cart
exports.GetAllList= (req, res)=> {
    CartModel.Get().then(result =>{
        console.log(result);
        res.json(result);
    })
}
//get one Cart
exports.GetOneRecord= (req, res)=>{
    const UserID=req.params.UserID;
    console.log(UserID);
    CartModel.GetById(UserID).then(result =>{
        console.log(result);
        res.json(result[0]);
    });
}
// create new Cart
exports.createNewRecord = (req, res) =>{
    let CartReqData=req.body;
    console.log(CartReqData);
    CartModel.Create(CartReqData).then(result =>{
        console.log(result);
        res.json(result);
    })
}

//update Cart
exports.updateRecord=(req, res)=>{
    let CartReqData=req.body
    console.log(CartReqData);
    CartModel.Update(CartReqData).then(result =>{
        res.status(200).json(result);
    })
}

//Delete Cart
exports.deleteRecord=(req, res)=>{
    const UserID=req.params.UserID;
    const WatchID=req.params.WatchID;
    console.log(UserID, WatchID);
    CartModel.Delete(UserID,WatchID).then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
}