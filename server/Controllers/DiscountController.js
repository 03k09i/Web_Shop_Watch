
const DiscountModel=require('../Models/DiscountModel');
//get all Watch
exports.GetAllList= async(req, res)=> {
    DiscountModel.Get().then(result =>{
        res.send(result);
    })
}
//get one Watch
exports.GetOneRecord= (req, res)=>{
    const ID=req.params.id;
    DiscountModel.GetById(ID).then(result =>{
        res.json(result);
    })
}
// create new Watch
exports.createNewRecord = (req, res) =>{
    let WatchReqData=req.body;
    DiscountModel.Create(WatchReqData).then(result => {
        res.send(result);
    })
}

//update Watch
exports.updateRecord=(req, res)=>{
    let Discount=req.body
    const Watch=req.params.id;
    DiscountModel.Update(Watch, Discount.discount).then(result =>{
        res.send(result);
    })
}

//Delete Watch
exports.deleteRecord=(req, res)=>{
    const ID=req.params.id;
    DiscountModel.Delete(ID).then(result =>{
        res.send(result);
    })
}