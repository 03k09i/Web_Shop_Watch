const {config} = require('../connect');
const sql=require('mssql');

var Invoice=function(I)
{
    this.ID=I.ID;
    this.UserID=I.UserID;
    this.TypeOfWatch_ID=I.TypeOfWatch_ID;
    this.TimeOrder=I.TimeOrder;
    this.TotalMoney=I.TotalMoney;
}

//get all TypeOfWatch
async function Get(ID)
{
  try{
    let pool=await config;
    let Records=await pool.request()
    .input('input_parameter',sql.VARCHAR(10),ID)
    .query("SELECT * from Invoice, InvoiceDetail, Watch WHERE UserID = @input_parameter AND InvoiceDetail.Invoice_ID = Invoice.ID AND InvoiceDetail.Watch_ID = Watch.ID")
    return Records.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

// get TypeOfWatch by ID for Search Data by ID 
async function GetById(ID)
{
  try{
    let pool=await config;
    let Record=await pool.request()
    .input('input_parameter',sql.VARCHAR(10),ID)
    .query("SELECT * from Invoice where UserID = @input_parameter AND TotalMoney IS NULL");
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

// create new TypeOfWatch
async function Create(ID)
{
  try{
    let pool=await config;
    let insertrecord=await pool.request()
    .input('UserID',sql.VARCHAR(10),ID)
    .execute('sp_Insert_Invoice')
    return insertrecord.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

//delete TypeOfWatch
async function Delete(ID){
    try{
        let pool=await config;
        let deleterecord=await pool.request()
        .input('ID',sql.VARCHAR(15),ID)
        .execute('sp_Delete_Invoice')
        return deleterecord.recordsets;
      }
      catch(error){
        console.log(error);
      }
}
module.exports={
  Get:Get,
  GetById:GetById,
  Create:Create,
  Delete:Delete
}