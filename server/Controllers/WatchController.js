
const WatchModel=require('../Models/WatchModel');
//get all Watch
exports.GetAllList= async(req, res)=> {
    WatchModel.Get().then(result =>{
        res.send(result);
    })
}
//get one Watch
exports.GetOneRecord= (req, res)=>{
    const ID=req.params.id;
    WatchModel.GetById(ID).then(result =>{
        res.json(result);
    })
}
// create new Watch
exports.createNewRecord = (req, res) =>{
    let WatchReqData=req.body;
    let WatchReqImg=req.files;
    let img = []
    if(WatchReqImg)
    {
        WatchReqImg.map((Img, index) => {
            img.push(`http://localhost:4080/${Img.path}`)
        })
    }
    img = JSON.stringify(img)
    WatchModel.Create(WatchReqData, img).then(result => {
        console.log(result);
        res.send(result[0][0].ID);
    })
}

//update Watch
exports.updateRecord=(req, res)=>{
    let WatchReqData=req.body
    const ID=req.params.id;
    let WatchReqImg=req.files;
    let img = req.body.Photos
    img = JSON.parse(img)
    if(WatchReqImg)
    {
        WatchReqImg.map((Img, index) => {
            img.push(`http://localhost:4080/${Img.path}`)
        })
    }
    img = JSON.stringify(img)
    WatchModel.Update(ID, WatchReqData, img).then(result =>{
        res.status(200).json(result);
    })
}

//Delete Watch
exports.deleteRecord=(req, res)=>{
    const ID=req.params.id;
    WatchModel.Delete(ID).then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
}