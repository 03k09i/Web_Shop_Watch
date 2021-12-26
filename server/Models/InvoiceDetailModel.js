const {config} = require('../connect');
const sql=require('mssql');

var InvoiceDetail=function(I)
{
    this.Invoice_ID=I.Invoice_ID;
    this.Watch_ID=I.Watch_ID;
    this.Quantity=I.Quantity;
}

//get all TypeOfWatch
async function Get()
{
  try{
    let pool=await sql.connect(config);
    let Records=await pool.request().query("SELECT * from InvoiceDetail")
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
    let pool=await sql.connect(config);
    let Record=await pool.request()
    .input('input_parameter',sql.VARCHAR(15),ID)
    .query("SELECT * from InvoiceDetail where Invoice_ID = @input_parameter");
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

// create new TypeOfWatch
async function Create(Data)
{
  try{
    let pool=await config;
    let insertrecord=await pool.request()
    .input('Invoice_ID',sql.VARCHAR(15),Data.Invoice_ID)
    .input('Watch_ID',sql.VARCHAR(10),Data.Watch_ID)
    .input('Quantity',sql.INT,Data.Quantity)
    .execute('sp_Insert_InvoiceDetail')
    return insertrecord.recordsets;
  }
  catch(error){
    console.log(error);
  }
}
async function Update(Invoice_ID,Watch_ID,Data){
    try{
        let pool=await sql.connect(config);
        let updaterecord=await pool.request()
        .input('Invoice_ID',sql.VARCHAR(15),Invoice_ID)
        .input('Watch_ID',sql.VARCHAR(10),Watch_ID)
        .input('Quantity',sql.INT,Data.Quantity)
        .execute('sp_Update_InvoiceDetail')
        return updaterecord.recordsets;
      }
      catch(error){
        console.log(error);
      }
}
//delete TypeOfWatch
async function Delete(Invoice_ID,Watch_ID){
    try{
        let pool=await sql.connect(config);
        let deleterecord=await pool.request()
        .input('Invoice_ID',sql.VARCHAR(15),Invoice_ID)
        .input('Watch_ID',sql.VARCHAR(10),Watch_ID)
        .execute('sp_Delete_InvoiceDetail')
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
    Update:Update,
    Delete:Delete
}