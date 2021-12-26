import React, { Component } from "react";
import {connect} from 'react-redux'
import { getUserItemAction, fixUser } from "../../store/actions/user.action";

class UserItem extends Component {
    state = {
        Name : this.props.user.Name,
        DayOfBirth : this.props.user.DayOfBirth ,
        Address : this.props.user.Address ,
        Email : this.props.user.Email ,
        PhoneNumber : this.props.user.PhoneNumber ,
        UserName : this.props.user.UserName ,
        Password : this.props.user.Password ,
        Role: this.props.user.Role 
    }
    onDelete = (id) => {
        this.props.onDelete(id);
    }
    getId = async(id) => {
        await this.props.dispatch(getUserItemAction(id))
        const {userItem} = this.props
        this.setState({
            Name : userItem.Name,
            DayOfBirth : userItem.DayOfBirth,
            Address : userItem.Address,
            Email : userItem.Email,
            PhoneNumber : userItem.PhoneNumber,
            UserName : userItem.UserName,
            Password : userItem.Password,
            Role : userItem.Role
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
    onSubmit = (event) => {
        event.preventDefault()
        const {userItem} = this.props
        this.props.dispatch(fixUser(userItem.ID, this.state))
    }
    render() {
        const {user, index} = this.props
        let {Name, DayOfBirth, Address, Email, PhoneNumber, UserName, Password, Role} = this.state
        return (
            <tr>
                <th className = "text-center">{index + 1}</th>
                <th className = "text-center">{user.ID}</th>
                <th><a>{user.Name}</a></th>
                <th className = "text-center"><span >{user.DayOfBirth.slice(0,10)}</span></th>
                <th className = "text-center"><span >{user.Address}</span></th>
                <th className = "text-center"><span >{user.Email}</span></th>
                <th className = "text-center"><span >{user.PhoneNumber}</span></th>
                <th className = "text-center"><span >{user.UserName}</span></th>
                <th className = "text-center"><span >{user.Password}</span></th>
                <th className = "text-center"><span >{user.Role}</span></th>
                <th className = "text-center">
                <button type="button" className="btn btn-outline-warning py-1" data-toggle="modal" data-target={"#modelId"+index+'user'} onClick = {() => this.getId(user.ID)} style={{fontSize:'1.6rem', fontWeight:500}}><i className='bx bx-pen'></i>Sửa</button>&nbsp;
                    <div className="modal fade" id={"modelId"+index+'user'} tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                        <div className="modal-dialog" role="document" style = {{maxWidth : "1000px"}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2 className="modal-title">Cập nhật</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit = {this.onSubmit} className='mx-auto' style={{width:'80%'}}>
                                        <div className="form-row">
                                            <label>Tên người dùng: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3" 
                                                name = "Name"
                                                value = {Name}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label >Ngày sinh: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "DayOfBirth"
                                                value = {DayOfBirth.slice(0,10)}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label>Địa chỉ:</label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "Address"
                                                value = {Address}
                                                onChange = {this.onChange}
                                            />
                                        </div>  
                                        <div className="form-row mt-4">  
                                            <label>Email: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "Email"
                                                value = {Email}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label>Số điện thoại: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "PhoneNumber"
                                                value = {PhoneNumber}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label>Tên đăng nhập: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "UserName"
                                                value = {UserName}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label>Mật khẩu: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "Password"
                                                value = {Password}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label>Vai trò: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "Role"
                                                value = {Role}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <button type="button" className="btn btn-primary mt-4" data-dismiss="modal" onClick = {this.onSubmit}><h2>Lưu lại</h2></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-danger py-1" onClick = {() => this.onDelete(user.ID)} style={{fontSize:'1.6rem', fontWeight:500}}><i className='bx bx-x'></i>Xóa </button>
                </th>
            </tr>
        );
    }
}
const mapStateToProps = state => {
    return {
        userItem : state.user.userItem,
    }
}
export default connect(mapStateToProps)(UserItem);
