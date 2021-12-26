const {config} = require('../connect');
const sql=require('mssql');

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
async function Create(WatchData)
{
  try{
    let pool=await config;
    let insertrecord=await pool.request()
    .input('Watch',sql.NVARCHAR(50),WatchData.Watch)
    .input('discount', sql.INT ,WatchData.discount)
    .execute('sp_Insert_Discount')
    return insertrecord.recordsets;
  }
  catch(error){
    console.log(error);
  }
}

//update TypeOfWatch
async function Update(Watch, discount){
    try{
        let pool=await config;
        let updaterecord=await pool.request()
        .input('Watch',sql.NVARCHAR(50),Watch)
        .input('discount', sql.INT ,discount)
        .execute('sp_Update_Discount')
        return updaterecord.recordsets;
      }
      catch(error){
        console.log(error);
      }
}
//delete TypeOfWatch
async function Delete(Watch){
    try{
        let pool=await config;
        let deleterecord=await pool.request()
        .input('Watch',sql.VARCHAR(10),Watch)
        .execute('sp_Delete_DiscountWatch')
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