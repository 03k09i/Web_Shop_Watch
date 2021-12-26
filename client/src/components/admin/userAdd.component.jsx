import React, { Component } from "react";
import {connect} from 'react-redux'
import {postUserListAction} from '../../store/actions/user.action'
class UserAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            Name : "",
            Brand : "",
            MachineType : "",
            WireType : "",
            Price : "",
            QuantityInStock : "",
            Photos : null
        }
    }
    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = (name==="Photos")?target.files:target.value;
        this.setState({
            [name] : value
        })
    }
    onSubmit = async(event) => {
        await event.preventDefault()
        const data = new FormData();
        if(this.state.Photos)
        {
            for (let i = 0; i < this.state.Photos.length; i++) {
                data.append("PhotosList", this.state.Photos[i]);
            }
        }
        data.append("Name", this.state.Name);
        data.append("Brand", this.state.Brand);
        data.append("MachineType", this.state.MachineType);
        data.append("WireType", this.state.WireType);
        data.append("Price", this.state.Price);
        data.append("QuantityInStock", this.state.QuantityInStock);
        this.props.dispatch(postUserListAction(data))
        event.target.reset()
    }
    render() {
        return (
            <form onSubmit = {this.onSubmit} encType="multipart/form-data">
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label>Tên người dùng: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name = "Name"
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label >Ngày sinh: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            name = "Brand"
                            onChange = {this.onChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Địa chỉ:</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name = "MachineType"
                            onChange = {this.onChange}
                        />
                    </div>
                </div>  
                <div className="form-row">  
                    <div className="form-group col-md-8">
                        <label>Email: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            name = "WireType"
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Số điện thoại: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            name = "Price"
                            onChange = {this.onChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Tên đăng nhập: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            name = "QuantityInStock"
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Mật khẩu: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            name = "QuantityInStock"
                            onChange = {this.onChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Hình đại diện: </label>
                        <input type="file" className="form-control" name="Photos" onChange = {this.onChange} multiple/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" >Lưu lại</button>
            </form>
        );
    }
}
export default connect()(UserAdd);
