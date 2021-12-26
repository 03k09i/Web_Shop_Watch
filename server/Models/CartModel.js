const {config} = require('../connect');
const sql=require('mssql');

var ShoppingCart=function(SC)
{
    this.UserID=SC.UserID;
    this.Watch_ID=SC.Watch_ID;
    this.Quantity=SC.Quantity;
}

//get all 
async function Get()
{
  try{
    let pool=await config;
    let Records=await pool.request().query("SELECT * from ShoppingCart")
    return Records.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

// get by ID for Search Data by ID 
async function GetById(ID)
{
  try{
    let pool=await config;
    let Record=await pool.request()
    .input('input_parameter',sql.VARCHAR(10),ID)
    .query("SELECT UserID, Watch_ID, Quantity, Name, Price, Photos, QuantityInStock from ShoppingCart, Watch where UserID = @input_parameter AND ShoppingCart.Watch_ID = Watch.ID;");
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

// create new TypeOfWatch
async function Create(CartData)
{
  try{
    let pool=await config;
    let insertrecord=await pool.request()
    .input('UserID',sql.VARCHAR(10),CartData.UserID)
    .input('Watch_ID', sql.VARCHAR(10),CartData.Watch_ID)
    .input('Quantity',sql.INT,CartData.Quantity)
    .execute('sp_Insert_Cart')
    return insertrecord.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

//update TypeOfWatch
async function Update(CartData){
    try{
        let pool=await config;
        let updaterecord=await pool.request()
        .input('UserID',sql.VARCHAR(10),CartData.UserID)
        .input('Watch_ID', sql.VARCHAR(10),CartData.Watch_ID)
        .input('Quantity',sql.INT,CartData.Quantity)
        .execute('sp_Update_Cart')
        return updaterecord.recordsets;
      }
      catch(error){
        console.log(error);
      }
}
//delete TypeOfWatch
async function Delete(UserID,WatchID){
    try{
        let pool=await config;
        let deleterecord=await pool.request()
        .input('UserID',sql.VARCHAR(10),UserID)
        .input('Watch_ID', sql.VARCHAR(10),WatchID)
        .execute('sp_Delete_Cart')
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