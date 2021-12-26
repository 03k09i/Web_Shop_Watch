
const ViewModel=require('../Models/ViewModel');

//get all Cart
exports.Statistics= (req, res)=> {
    ViewModel.Statistics().then(result =>{
        console.log(result);
        res.json(result[0]);
    })
}

exports.Inventory= (req, res)=>{
    ViewModel.Inventory().then(result =>{
        console.log(result);
        res.json(result[0]);
    });
}

exports.Top10watch = (req, res) =>{
    ViewModel.Top10watch().then(result =>{
        console.log(result);
        res.json(result[0]);
    })
}

exports.Top10user = (req, res) =>{
    ViewModel.Top10user().then(result =>{
        console.log(result);
        res.json(result[0]);
    })
}

exports.Month = (req, res) =>{
    const month = parseInt(req.params.month) + parseInt(1)
    ViewModel.Month(month).then(result =>{
        console.log(result);
        res.json(result[0]);
    })
}

exports.allMonth = (req, res) =>{
    ViewModel.allMonth().then(result =>{
        console.log(result);
        res.json(result[0]);
    })
}

exports.Brand = (req, res) =>{
    ViewModel.Brand().then(result =>{
        console.log(result);
        res.json(result[0]);
    })
}
