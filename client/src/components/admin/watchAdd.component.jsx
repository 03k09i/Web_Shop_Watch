import React, { Component } from "react";
import {connect} from 'react-redux'
import { postDiscountListAction } from "../../store/actions/discount.action";
import {postWatchListAction} from '../../store/actions/watch.action'
class WatchAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            Name : "",
            Brand : "",
            MachineType : "",
            WireType : "",
            Price : "",
            QuantityInStock : "",
            Photos : null,
            discount : ''
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
        await this.props.dispatch(postWatchListAction(data))
        console.log(this.props.addWatch);
        let Discount = {
            Watch : this.props.addWatch,
            discount : this.state.discount
        }
        await this.props.dispatch(postDiscountListAction(Discount))
        event.target.reset()
    }
    render() {
        return (
            <form onSubmit = {this.onSubmit} encType="multipart/form-data" >
                <div className="form-row">
                        <label>Tên sản phẩm: </label>
                        <input 
                            type="text" 
                            className="form-control fs-3" 
                            name = "Name"
                            onChange = {this.onChange}
                        />
                </div>
                <div className="form-row mt-4">
                        <label >Thương hiệu: </label>
                        <input 
                            type="text" 
                            className="form-control fs-3"
                            name = "Brand"
                            onChange = {this.onChange}
                        />
                </div>
                <div className="form-row mt-4">
                        <label>Loại máy:</label>
                        <input 
                            type="text" 
                            className="form-control fs-3"
                            name = "MachineType"
                            onChange = {this.onChange}
                        />
                </div>
                <div className="form-row mt-4">
                        <label>Loại dây: </label>
                        <input 
                            type="text" 
                            className="form-control fs-3"
                            name = "WireType"
                            onChange = {this.onChange}
                        />
                </div>
                <div className="form-row mt-4">
                        <label>Giá: </label>
                        <input 
                            type="text" 
                            className="form-control fs-3"
                            name = "Price"
                            onChange = {this.onChange}
                        />
                </div>
                <div className="form-row mt-4">
                        <label>Số lượng: </label>
                        <input 
                            type="text" 
                            className="form-control fs-3"
                            name = "QuantityInStock"
                            onChange = {this.onChange}
                        />
                </div>
                <div className="form-row mt-4">
                        <label>Khuyến mãi: </label>
                        <input 
                            type="text" 
                            className="form-control fs-3"
                            name = "discount"
                            onChange = {this.onChange}
                        />
                </div>
                <div className="form-row mt-4">
                    <label>Hình ảnh: </label>
                    <input type="file" className="form-control fs-3" name="Photos" onChange = {this.onChange} multiple/>
                </div>
                <button type="submit" className="btn btn-outline-primary my-4" style={{fontSize:'1.7rem', fontWeight:600}} >Lưu lại</button>
            </form>
        );
    }
}
const mapStateToProps = state => {
    return {
        addWatch : state.watch.addWatch,
    }
}
export default connect(mapStateToProps)(WatchAdd);
