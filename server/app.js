const express = require("express");
const bodyParser = require('body-parser');
const {config, sql} = require('./connect')
const app = express();
var cors=require('cors');
const path = require("path");

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
const publicPathDirectory = path.join(__dirname, "/public");
app.use("/public", express.static(publicPathDirectory));
app.listen(4080, () => {
    console.log("run port 4080")
})
//import Watch router
const WatchRouter=require('./Routers/WatchRouter')
app.use('/admin/watch',WatchRouter);
//import User router
//không được phép truy cập (chỉ tạo router để kiểm tra) 
const UserRouter=require('./Routers/UserRouter')
app.use('/root/user',UserRouter);
//import Cart router
const CartRouter=require('./Routers/CartRouter')
app.use('/Cart',CartRouter);
//import Invoice router
const InvoiceRouter=require('./Routers/InvoiceRouter')
app.use('/Invoice',InvoiceRouter);
//import InvoiceDetail router
const InvoiceDetailRouter=require('./Routers/InvoiceDetailRouter')
app.use('/InvoiceDetail',InvoiceDetailRouter);
//Thống kê
const View=require('./Routers/ViewRouter')
app.use('/detail',View);
//Thống kê
const DiscountRouter=require('./Routers/DiscountRouter')
app.use('/discountRouter',DiscountRouter);