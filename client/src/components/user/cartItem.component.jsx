import React, { Component } from "react";
import {connect} from 'react-redux'
import { fixCart } from "../../store/actions/cart.action";

class CartItem extends Component {
    state = {
        confirmModal : ''
    }
    onFix = async(itemCart, inde) => {
        console.log(itemCart);
        const quantity = parseInt(itemCart.Quantity) + parseInt(inde)
        if(quantity <= itemCart.QuantityInStock)
        {
            console.log(1);
            await this.setState({
                confirmModal : ''
            })
        }
        else
        {
            await this.setState({
                confirmModal : 'confirm'
            })
        }
        this.props.onFix(itemCart, inde)
    }
    onDelete = (id) => {
        this.props.onDelete(id)
    }
    render() {
        const {confirmModal} = this.state
        const {cartItem} = this.props 
        let photo = JSON.parse(cartItem.Photos) 
        let price = cartItem.Price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        let prices = (cartItem.Price*cartItem.Quantity).toLocaleString('vi', {style : 'currency', currency : 'VND'});
        return (
            <tr>
                <th scope="row">
                    <img src={photo[0]} alt="" className="img-fluid z-depth-0" style={{width:'70%'}}/>
                </th>
                <td className='align-middle'>
                    <h3>
                        <strong>{cartItem.Name}</strong>
                    </h3>
                </td>
                <td className='align-middle text-center'>{price}</td>
                <td className="center-on-small-only align-middle  text-center">
                    <span className="qty px-2">{cartItem.Quantity} </span>
                    <div className="btn-group radio-group" data-toggle="buttons">
                        <label className="btn btn-sm btn-primary
                            btn-rounded waves-effect waves-light" onClick = {() => this.onFix(cartItem, -1)}>
                            <a><h3>-</h3></a>
                        </label>
                        
                        <label className="btn btn-sm btn-primary
                            btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#confirm" onClick = {() => this.onFix(cartItem, 1)}>
                            <a><h3>+</h3></a>
                        </label>
                        <div className="modal fade" id={confirmModal} tabIndex={-1} aria-labelledby="confirmModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h2 className="modal-title" id="confirmModalLabel">Thông Báo</h2>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <h3>Số lượng sản phẩm không đủ !!!</h3>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td className='align-middle text-center'>{prices}</td>
                <td className='align-middle text-center'>
                    <button type="button" onClick = {() => this.onDelete(cartItem.Watch_ID)} className="btn btn-sm btn-warning waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="" data-original-title="Remove item">
                    <h3>Xóa</h3>
                    </button>
                </td>
            </tr>
        );
    }
    
}
export default connect()(CartItem);
