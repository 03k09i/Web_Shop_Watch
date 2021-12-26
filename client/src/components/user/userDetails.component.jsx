import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "../../../node_modules/js-cookie/dist/js.cookie";
import { fixUser, getInfoUser } from "../../store/actions/user.action";

class UserDetails extends Component {
    state = {
        Name : '',
        DayOfBirth : '',
        Address : '',
        Email : '',
        PhoneNumber : '',
        UserName : '',
        Password : '',
        Role : '',
        editProfile : 0,
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
        this.props.dispatch(fixUser(this.props.infoUser.ID, this.state))
        this.setState({
            editProfile : 1
        })
    }
    render() {
        const {Name, DayOfBirth, Address, PhoneNumber, Email, editProfile} = this.state
        return (
                <div className="login-form">
                    <form onSubmit = {this.onSubmit}>
                        <div className="group">
                            <label for="pass" className="label">Họ tên</label>
                            <input 
                                id="pass" 
                                type="text"
                                className="input"
                                name = 'Name'
                                value = {Name}
                                onChange = {this.onChange}
                            />
                        </div>
                        <div className="group">
                            <label for="pass" className="label">Số điện thoại</label>
                            <input 
                                id="pass" 
                                type="number" 
                                className="input"
                                name = 'PhoneNumber'
                                value = {PhoneNumber}
                                onChange = {this.onChange}
                            />
                        </div>
                        <div className="group">
                            <label for="pass" className="label">Ngày sinh</label>
                            <input 
                                id="pass" 
                                type="date" 
                                className="input"
                                name = 'DayOfBirth'
                                value = {DayOfBirth.slice(0,10)}
                                onChange = {this.onChange}
                            />
                        </div>
                        <div className="group">
                            <label for="pass" className="label">Địa chỉ</label>
                            <input 
                                id="pass" 
                                type="text" 
                                className="input"
                                name = 'Address'
                                value = {Address}
                                onChange = {this.onChange}
                            />
                        </div>
                        <div className="group">
                            <label for="pass" className="label">Địa chỉ Email</label>
                            <input 
                                id="pass" 
                                type="email" 
                                className="input"
                                name = 'Email'
                                value = {Email}
                                onChange = {this.onChange}
                            />
                        </div>
                        {editProfile == 0 ? '' : <div className ="alert alert-success">
                                                        <strong>Cập nhật thành công :v</strong>
                                                    </div>}
                        <div className="group">
                            <input type="submit" className="button" value="Cập nhật thông tin"/>
                        </div>
                    </form>
                </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        infoUser : state.user.infoUser
    }
}
export default connect(mapStateToProps)(UserDetails);
