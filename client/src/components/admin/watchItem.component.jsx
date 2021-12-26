import React, { Component } from "react";
import {connect} from 'react-redux'
import { fixDiscount } from "../../store/actions/discount.action";
import { getWatchItemAction, fixWatch } from "../../store/actions/watch.action";

class WatchItem extends Component {
    state = {
        Name : this.props.watch.Name,
        Brand : this.props.watch.Brand,
        MachineType : this.props.watch.MachineType,
        WireType : this.props.watch.WireType,
        Price : this.props.watch.Price,
        QuantityInStock : this.props.watch.QuantityInStock,
        Photos : this.props.watch.Photos,
        discount : this.props.watch.discount,
        selectMultiple: null
    }
    onDelete = (id) => {
        this.props.onDelete(id);
    }
    getId = async(id) => {
        await this.props.dispatch(getWatchItemAction(id))
        const {watchItem} = this.props
        this.setState({
            Name : watchItem.Name,
            Brand : watchItem.Brand,
            MachineType : watchItem.MachineType,
            WireType : watchItem.WireType,
            Price : watchItem.Price,
            QuantityInStock : watchItem.QuantityInStock,
            Photos : watchItem.Photos
        })
        
    }
    quantity = async(e) => {
        const {watch} = this.props
        const quantity = parseInt(this.state.QuantityInStock) + parseInt(e)
        if(quantity >= 0){
            await this.setState({
                QuantityInStock : quantity
            })
            await this.props.dispatch(fixWatch(watch.ID, this.state))
        }
    }
    getIdImg = (id) => {
        const newListImg = JSON.parse(this.state.Photos);
        newListImg.splice(id, 1);
        this.setState({ Photos: JSON.stringify(newListImg) });
    };
    getImgList = () => {
        let { Photos } = this.state;
        let photo = JSON.parse(Photos);
        if(photo)
        {
            return photo.map((value, index) => {
            return (
                <div key={index} className="col-md-2">
                    <button
                        type="button"
                        className="btn "
                        onClick={() => {
                        this.getIdImg(index);
                        }}
                    >
                        x
                    </button>
                    <img src={value} style={{ width: "60px", height: "80px", objectFit: "cover" }}/>
                    <span> {value.slice(value.lastIndexOf("\\")+1)}</span>
                    
                </div>
            );
            });
        }
        
      };
    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = (name==="selectMultiple")?target.files:target.value;
        this.setState({
            [name] : value
        })
    }
    onSubmit = (event) => {
        event.preventDefault()
        const {watch} = this.props
        const data = new FormData();
        if(this.state.selectMultiple){
            for (let i = 0; i < this.state.selectMultiple.length; i++) {
                data.append("PhotosList", this.state.selectMultiple[i]);
            }
        }
        data.append("Name", this.state.Name);
        data.append("Brand", this.state.Brand);
        data.append("MachineType", this.state.MachineType);
        data.append("WireType", this.state.WireType);
        data.append("Price", this.state.Price);
        data.append("QuantityInStock", this.state.QuantityInStock);
        data.append("Photos", this.state.Photos);
        this.props.dispatch(fixWatch(watch.ID, data))
        console.log(watch.ID, this.state.discount);
        this.props.dispatch(fixDiscount(watch.ID, this.state.discount))
    }
    render() {
        const {watch, index} = this.props
        let {Name, Brand, MachineType, WireType, Price, QuantityInStock, discount} = this.state
        return (
            <tr>
                <th className = "text-center">{index + 1}</th>
                <th className = "text-center">{watch.ID}</th>
                <th><a>{watch.Name}</a></th>
                <th className = "text-center"><span >{watch.Brand}</span></th>
                <th className = "text-center"><span >{watch.MachineType}</span></th>
                <th className = "text-center"><span >{watch.WireType}</span></th>
                <th className = "text-center"><span >{watch.Price}</span></th>
                <th className = "text-center"><span >{watch.discount}</span></th>
                <td className = "text-center">
                    <div>
                    <table className='table table-borderless'>
                        <tr>
                            <th className = "text-center col-md-6">
                                <span className="qty">{watch.QuantityInStock} </span>
                            </th>
                            <th className = "text-center col-md-6">
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className="btn btn-secondary active" onClick = {() => this.quantity(-1)}>
                                        <input type="radio" />-
                                    </label>
                                    <label className="btn btn-secondary" onClick = {() => this.quantity(1)}>
                                        <input type="radio" />+
                                    </label>
                                </div>
                            </th>
                        </tr>
                    </table>
                    </div>
                </td>
                <th className = "text-center">
                    <button type="button" className="btn btn-outline-warning py-1" data-toggle="modal" data-target={"#modelId"+index} onClick = {() => this.getId(watch.ID)} style={{fontSize:'1.7rem', fontWeight:600}}><i className='bx bx-pen'></i>Sửa</button>&nbsp;
                    <div className="modal fade" id={"modelId"+index} tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                        <div className="modal-dialog" role="document" style = {{maxWidth : "1000px"}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2 className="modal-title">Sửa sản phẩm</h2>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit = {this.onSubmit} encType="multipart/form-data" className='mx-auto' style={{width:'80%'}}>
                                        <div className="form-row mt-4">
                                            <label>Tên sản phẩm: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3" 
                                                name = "Name"
                                                value = {Name}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label >Thương hiệu: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "Brand"
                                                value = {Brand}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label>Loại máy:</label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "MachineType"
                                                value = {MachineType}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label>Loại dây: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "WireType"
                                                value = {WireType}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label>Giá: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "Price"
                                                value = {Price}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label>Số lượng: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "QuantityInStock"
                                                value = {QuantityInStock}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <label>Khuyến mãi: </label>
                                            <input 
                                                type="text" 
                                                className="form-control fs-3"
                                                name = "discount"
                                                value = {discount}
                                                onChange = {this.onChange}
                                            />
                                        </div>
                                        <div className="form-row mt-4">
                                            <div className="form-group col">
                                                <label>Hình ảnh: </label>
                                                <div className="row"> {this.getImgList()}</div>
                                                <input type="file" name="selectMultiple" onChange = {this.onChange} multiple />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" data-dismiss="modal" className="btn btn-success" onClick = {this.onSubmit}><h2>Lưu lại</h2></button>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-danger py-1" onClick = {() => this.onDelete(watch.ID)} style={{fontSize:'1.7rem', fontWeight:600}}><i className='bx bx-x'></i>Xóa </button>
                </th>
            </tr>
        );
    }
}
const mapStateToProps = state => {
    return {
        watchItem : state.watch.watchItem,
    }
}
export default connect(mapStateToProps)(WatchItem);
