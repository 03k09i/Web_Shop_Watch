import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "../../../node_modules/js-cookie/dist/js.cookie";
import { fixUser, getInfoUser } from "../../store/actions/user.action";

class ChangePass extends Component {
    state = {
        Name : '',
        DayOfBirth : '',
        Address : '',
        Email : '',
        PhoneNumber : '',
        UserName : '',
        Password : '',
        Role : '',
        password : '',
        password1 : '',
        changeSuccess : 0
    }
    async componentDidMount(){
        await this.props.dispatch(getInfoUser(Cookies.get().token))
        this.setState({
            Name : this.props.infoUser.Name,
            DayOfBirth : this.props.infoUser.DayOfBirth,
            Address : this.props.infoUser.Address,
            Email : this.props.infoUser.Email,
            PhoneNumber : this.props.infoUser.PhoneNumber,
            UserName : this.props.infoUser.UserName,
            Password : this.props.infoUser.Password,
            Role : this.props.infoUser.Role
        })
    }
    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value
        })
    }
    onSubmit = async(e) => {
        e.preventDefault();
        let {password, password1, Password} = this.state
        if(password && password == password1 && this.props.infoUser.Password == Password){
            await this.setState({
                Password : password,
                changeSuccess : 1
            })
            this.props.dispatch(fixUser(this.props.infoUser.ID, this.state))
        }
      
    }
    render() {
        const {password, password1, changeSuccess} = this.state
        return (
            <div className="login-form">
            <div>
                {changeSuccess == 1 ?   <div className ="alert alert-warning">
                                            <strong>Đổi mật khẩu thành công :))</strong>
                                        </div> :<form onSubmit = {this.onSubmit}><div className="group mt-5">
                        <label className="label">Mật khẩu cũ</label>
                        <input 
                            id="pass" 
                            type="password" 
                            className="input" 
                            name = 'Password'
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="group">
                        <label className="label">Mật khẩu mới</label>
                        <input 
                            id="pass" 
                            type="password" 
                            className="input" 
                            name = 'password'
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="group">
                        <label className="label">Nhập lại mật khẩu mới</label>
                        <input 
                            id="pass" 
                            type="password" 
                            className="input" 
                            name = 'password1'
                            onChange = {this.onChange}
                        />
                        {password1 == '' || password == password1 ? '' : <div className ="alert alert-warning">
                                                    <strong>Warning!</strong>Mật khẩu không trùng khớp.
                                                </div>}                     
                    </div>
                    <div className="group my-5">
                        <input type="submit" className = "button" value = "Đổi mật khẩu"/>
                    </div> 
                </form>}
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        infoUser : state.user.infoUser
    }
}
export default connect(mapStateToProps)(ChangePass) ;
