const {config} = require('../connect');
const sql=require('mssql');
const bcryptjs = require('bcryptjs')

var User=function(U)
{
    this.ID=U.ID;
    this.Name=U.Name;
    this.DayOfBirth=U.DayOfBirth;
    this.Address=U.Address;
    this.Email=U.Email;
    this.PhoneNumber=U.PhoneNumber;
}

//Lấy tất cả User
async function Get()
{
  try{
    let pool=await config;
    return await (await pool.request().query("SELECT * from Users")).recordsets;
  }
  catch(error){
    console.log(error);
  }
}
//Lấy User theo ID
async function GetById(ID)
{
  try{
    let pool=await config;
    let Record=await pool.request()
    .input('input_parameter',sql.VARCHAR(10),ID)
    .query("SELECT * from Users where ID = @input_parameter");
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}
//Kiểm tra email, phone, tên đăng nhập tồn tại
async function CheckExistCondition(User)
{
  try{

    let pool=await config;
    let Record=await pool.request()
    .input('Email',sql.VARCHAR(50),User.Email)
    .input('PhoneNumber',sql.VARCHAR(50),User.PhoneNumber)
    .input('UserName',sql.VARCHAR(50),User.UserName)
    .query("SELECT Email, PhoneNumber, UserName from Users where Email = @Email OR PhoneNumber = @PhoneNumber OR UserName = @UserName");
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}
//Kiểm tra tình trạng đăng nhập 
async function CheckExistSignIn(User)
{
  try{
    let pool=await config;
    let Record=await pool.request()
    .input('UserName',sql.VARCHAR(50),User.UserName)
    .query("SELECT ID, Password, UserName, Role from Users where UserName = @UserName");
    return Record.recordsets;
  }
  catch(error){
    console.log(error);
  }
}
// create new TypeOfWatch
async function Create(UserData)
{
  try{
    let pool=await config;
    let insertrecord=await pool.request()
    .input('Name',sql.NVARCHAR(50),UserData.Name)
    .input('DayOfBirth', sql.DATE,UserData.DayOfBirth)
    .input('Address',sql.NVarChar,UserData.Address)
    .input('Email', sql.VARCHAR(50),UserData.Email)
    .input('PhoneNumber', sql.VARCHAR(15),UserData.PhoneNumber)
    .input('UserName', sql.VARCHAR(28),UserData.UserName)
    .input('Password', sql.VARCHAR(50),UserData.Password)
    .input('Role', sql.VARCHAR(20),'User')
    .execute('sp_Insert_User')
    return insertrecord.recordsets;
  }
  catch(error){
    console.log(error);
  }
}
//update TypeOfWatch
async function Update(ID,UserData){
    try{
        let pool=await config;
        let updaterecord=await pool.request()
        .input('ID',sql.VARCHAR(10),ID)
        .input('Name',sql.NVARCHAR(50),UserData.Name)
        .input('DayOfBirth', sql.DATE,UserData.DayOfBirth)
        .input('Address',sql.NVARCHAR(100),UserData.Address)
        .input('Email', sql.VARCHAR(50),UserData.Email)
        .input('PhoneNumber', sql.VARCHAR(15),UserData.PhoneNumber)
        .input('UserName', sql.VARCHAR(28),UserData.UserName)
        .input('Password', sql.VARCHAR(50),UserData.Password)
        .input('Role', sql.VARCHAR(20),UserData.Role)
        .execute('sp_Update_User')
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
        .execute('sp_Delete_User')
        return deleterecord.recordsets;
      }
      catch(error){
        console.log(error);
      }
}
module.exports={
  Get,
  GetById,
  Create,
  Update,
  Delete,
  CheckExistCondition,
  CheckExistSignIn
}