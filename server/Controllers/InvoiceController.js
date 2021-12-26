
const InvoiceModel=require('../Models/InvoiceModel');

//get all Invoice
exports.GetAllList= (req, res)=> {
    const ID=req.params.id;
    InvoiceModel.Get(ID).then(result =>{
        console.log(result);
        res.json(result[0]);
    })
}
//get one Invoice
exports.GetOneRecord= (req, res)=>{
    const ID=req.params.id;
    InvoiceModel.GetById(ID).then(result =>{
        console.log(result);
        res.json(result[0]);
    });
}
// create new Invoice
exports.createNewRecord = (req, res) =>{
    const ID=req.params.id;
    InvoiceModel.Create(ID).then(result =>{
        console.log(result);
        res.status(201).json(result);
    })
}

//Delete Invoice
exports.deleteRecord=(req, res)=>{
    const ID=req.params.id;
    InvoiceModel.Delete(ID).then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
}