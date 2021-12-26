const {config} = require('../connect');
const sql=require('mssql');

var Watch=function(W)
{
    this.ID=W.ID;
    this.Name=W.Name;
    this.TypeOfWatch_ID=W.TypeOfWatch_ID;
    this.Price=W.Price;
    this.QuantityInStock=W.QuantityInStock
}

//get all TypeOfWatch
async function Get()
{
  try{
    let pool = await config;
    return await (await pool.request().query("SELECT * FROM dbo.Watch, dbo.DiscountWatch WHERE Watch.ID = DiscountWatch.Watch")).recordset;
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
    .input('ID',sql.VARCHAR(10),ID)
    .query(`SELECT * from Watch where ID = @ID`);
    return await Record.recordset;
  }
  catch(error){
    console.log(error);
  }
}

// create new TypeOfWatch
async function Create(WatchData, WatchImg)
{
  try{
    let pool=await config;
    let insertrecord=await pool.request()
    .input('Name',sql.NVARCHAR(50),WatchData.Name)
    .input('Brand', sql.NVARCHAR(50),WatchData.Brand)
    .input('MachineType', sql.NVARCHAR(10),WatchData.MachineType)
    .input('WireType', sql.NVARCHAR(30),WatchData.WireType)
    .input('Price',sql.INT,WatchData.Price)
    .input('QuantityInStock',sql.INT,WatchData.QuantityInStock)
    .input('Photos',sql.NVARCHAR(1000), WatchImg)
    .query('INSERT INTO dbo.Watch (Name, Brand, MachineType, WireType, Price, QuantityInStock, Photos) OUTPUT inserted.ID VALUES (@Name, @Brand, @MachineType, @WireType, @Price, @QuantityInStock, @Photos)')
    return insertrecord.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

//update TypeOfWatch
async function Update(ID,WatchData, Img){
    try{
        let pool=await config;
        let updaterecord=await pool.request()
        .input('ID',sql.VARCHAR(10),ID)
        .input('Name',sql.NVARCHAR(50),WatchData.Name)
        .input('Brand', sql.NVARCHAR(50),WatchData.Brand)
        .input('MachineType', sql.NVARCHAR(10),WatchData.MachineType)
        .input('WireType', sql.NVARCHAR(30),WatchData.WireType)
        .input('Price',sql.INT,WatchData.Price)
        .input('QuantityInStock',sql.INT,WatchData.QuantityInStock)
        .input('Photos',sql.NVARCHAR(1000),Img)
        .execute('sp_Update_Watch')
        return updaterecord.recordsets;
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
        .input('ID',sql.VARCHAR(10),ID)
        .execute('sp_Delete_Watch')
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