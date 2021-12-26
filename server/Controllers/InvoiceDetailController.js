
const InvoiceDetailModel=require('../Models/InvoiceDetailModel');

//get all InvoiceDetail
exports.GetAllList= (req, res)=> {
    InvoiceDetailModel.Get().then(result =>{
        console.log(result);
        res.json(result);
    })
}
//get one InvoiceDetail
exports.GetOneRecord= (req, res)=>{
    const InvoiceID=req.params.InvoiceID;
    InvoiceDetailModel.GetById(InvoiceID).then(result =>{
        console.log(result);
        res.json(result[0]);
    });
}
// create new InvoiceDetail
exports.createNewRecord = (req, res) =>{
    let InvoiceDetailReqData=req.body;
    console.log(InvoiceDetailReqData);
    InvoiceDetailModel.Create(InvoiceDetailReqData).then(result =>{
        console.log(result);
        res.status(201).json(result);
    })
}

//update InvoiceDetail
exports.updateRecord=(req, res)=>{
    let InvoiceDetailReqData=req.body
    const InvoiceID=req.params.InvoiceID;
    const WatchID=req.params.WatchID;
    InvoiceDetailModel.Update(InvoiceID,WatchID,InvoiceDetailReqData).then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
}

//Delete InvoiceDetail
exports.deleteRecord=(req, res)=>{
    const InvoiceID=req.params.InvoiceID;
    const WatchID=req.params.WatchID;
    InvoiceDetailModel.Delete(InvoiceID,WatchID).then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
}