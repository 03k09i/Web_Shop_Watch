import React, { Component } from "react";
import { connect } from "react-redux";
import { postUserListAction } from "../../store/actions/user.action";

class SignUp extends Component {
    state = {
        Name : '',
        DayOfBirth : '',
        Address : '',
        Email : '',
        PhoneNumber : '',
        UserName : '',
        Password : '',
        Password1 : '',
        ConditionSignUp : 1,
        CheckEmail : 1,
        CheckPhoneNumber : 1,
        CheckUserName : 1,
        signUpSuccess : 0
    }
    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value
        })
    }
    CheckModel = () => {
        let {addUser} = this.props
        if(addUser.email)               //Kiểm tra email đã tồn tại hay chưa
        {
            this.setState({
                CheckEmail : 0,
                signUpSuccess : 0
            })
        }
        else {
            this.setState({
                CheckEmail : 1,
                signUpSuccess : 1 
            })
        }
        if(addUser.phoneNumber)         //Kiểm tra phoneNumber đã tồn tại hay chưa
        {
            this.setState({
                CheckPhoneNumber : 0, 
                signUpSuccess : 0
            })
        }
        else{
            this.setState({
                CheckPhoneNumber : 1,
                signUpSuccess : 1  
            })
        }
        if(addUser.userName)            //Kiểm tra userName đã tồn tại hay chưa
        {
            this.setState({
                CheckUserName : 0,
                signUpSuccess : 0 
            })
        }
        else{
            this.setState({
                CheckUserName : 1 ,
                signUpSuccess : 1 
            })
        }
    }
    onSubmit = async(event) => {
        event.preventDefault()
        const {Name, DayOfBirth, Address, Email, PhoneNumber, UserName ,Password, Password1} = this.state
        if(Name && DayOfBirth && Address && Email && PhoneNumber && UserName && Password && Password1) //Kiểm tra người dùng đã nhập đủ thông tin chưa
        {
            this.setState({
                ConditionSignUp : 1 
            })
            let phone = Math.floor(PhoneNumber);
            if(Password == Password1 && phone)
            {
                await this.props.dispatch(postUserListAction(this.state))
            }
            this.CheckModel()
        }
        else{
            this.setState({
                ConditionSignUp : 0
            })
        }
    }
    render() {
        const {ConditionSignUp, CheckEmail, CheckPhoneNumber, CheckUserName, Password, Password1, PhoneNumber, signUpSuccess} = this.state
        return (
            <div className="sign-up-htm">
                {signUpSuccess == 0 ?<form onSubmit = {this.onSubmit}>
                    <div className="group">
                        <label htmlFor="user" className="label">Tên đăng nhập</label>
                        <input 
                            id="user" 
                            type="text" 
                            className="input" 
                            name = "UserName"
                            onChange = {this.onChange}    
                        />
                        {CheckUserName == 0 ? <div className ="alert alert-warning">
                                                <strong>Warning!</strong>Tên đăng nhập đã tồn tại .
                                            </div>:''}
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Mật khẩu</label>
                        <input 
                            id="pass" 
                            type="password" 
                            className="input" 
                            data-type="password" 
                            name = "Password"
                            onChange = {this.onChange}    
                        />
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Nhập lại mật khẩu</label>
                        <input 
                            id="pass" 
                            type="password" 
                            className="input" 
                            data-type="password" 
                            name = "Password1"
                            onChange = {this.onChange}
                        />
                        {Password1 == '' || Password == Password1 ? '' : <div className ="alert alert-warning">
                                                <strong>Warning!</strong>Mật khẩu không trùng khớp.
                                            </div>}
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Họ tên</label>
                        <input 
                            id="pass" 
                            type="text" 
                            className="input" 
                            name = "Name"
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Ngày sinh</label>
                        <input 
                            id="pass" 
                            type="date" 
                            className="input" 
                            name = "DayOfBirth"
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Địa chỉ</label>
                        <input 
                            id="pass" 
                            type="text" 
                            className="input" 
                            name = "Address"
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Địa chỉ Email</label>
                        <input 
                            id="pass" 
                            type="email" 
                            className="input" 
                            name = "Email"
                            onChange = {this.onChange}
                        />
                        {CheckEmail == 0 ? <div className ="alert alert-warning">
                                                <strong>Warning!</strong>Email đã tồn tại vui lòng nhập email khác.
                                            </div>:''}
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Số điện thoại</label>
                        <input 
                            id="pass" 
                            type="text" 
                            className="input" 
                            name = "PhoneNumber"
                            onChange = {this.onChange}
                        />
                        {Math.floor(PhoneNumber) || PhoneNumber == '' ? '' : <div className ="alert alert-warning">
                                                <strong>Warning!</strong>Định dạng ko hợp lệ.
                                            </div>}
                        {CheckPhoneNumber == 0 ? <div className ="alert alert-warning">
                                                <strong>Warning!</strong>Số điện thoại đã tồn tại vui lòng thử số khác.
                                            </div>:''}
                    </div>
                    <div className="group">
                        <button type="submit" className="button" >Gửi</button>
                    </div>
                    {ConditionSignUp == 0 ? <div className ="alert alert-warning">
                                                <strong>Warning!</strong> Vui lòng điền đầy đủ thông tin.
                                            </div>:''}
                </form>:<div className ="alert alert-success">
                                                <strong>Đăng ký thành công</strong>.
                                            </div>}
                
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        addUser : state.user.addUser,
    }
}
export default connect(mapStateToProps)(SignUp);
