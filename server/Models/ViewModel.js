const {config} = require('../connect');
const sql=require('mssql');

//get all TypeOfWatch
async function Statistics()
{
  try{
    let pool=await config;
    let Records=await pool.request().query("SELECT * from ThongKeChiTiet")
    return Records.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

// get TypeOfWatch by ID for Search Data by ID 
async function Inventory()
{
  try{
    let pool=await config;
    let Record=await pool.request().query("SELECT * from ThongKeHangTon")
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

// create new TypeOfWatch
async function Top10watch()
{
  try{
    let pool=await config;
    let Record=await pool.request().query("SELECT * from Top10sanphambanchay")
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

async function Top10user()
{
  try{
    let pool=await config;
    let Record=await pool.request().query("SELECT * from Top10khachhang")
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

async function Month(month)
{
  try{
    let pool=await config;
    let Record=await pool.request()
    .input('month', sql.Int, month)
    .query("SELECT * FROM dbo.Invoice WHERE month(TimeOrder) = @month")
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

async function allMonth()
{
  try{
    let pool=await config;
    let Record=await pool.request()
    .query("SELECT thongke.mth, SUM(TotalMoney) AS TotalMoney FROM (SELECT TotalMoney, Month(TimeOrder) AS mth FROM dbo.Invoice) AS thongke GROUP BY thongke.mth")
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

async function Brand()
{
  try{
    let pool=await config;
    let Record=await pool.request()
    .query("SELECT Brand, SUM(Quantity) AS Quantity FROM dbo.InvoiceDetail, dbo.Watch WHERE dbo.InvoiceDetail.Watch_ID = dbo.Watch.ID Group by Brand")
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

module.exports={
  Statistics:Statistics,
  Inventory:Inventory,
  Top10watch:Top10watch,
  Top10user:Top10user,
  Month:Month,
  allMonth:allMonth,
  Brand:Brand
}