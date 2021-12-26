import React, { Component } from "react";
import {connect} from 'react-redux'
import { deleteCartListAction, fixCart, getCartListAction } from "../../store/actions/cart.action";
import CartItem from "../../components/user/cartItem.component";
import { getInvoiceListAction, postInvoiceListAction } from "../../store/actions/invoice.action";
import { postInvoiceDetailListAction } from "../../store/actions/invoiceDetail.action";

class Cart extends Component {
    state = {
        addCart : '',
        fixCart : '',
        Invoice_ID : '',
        Quantity : '',
        listCart : '',
        Watch_ID: "",    
    }
    async componentWillMount(){
        const {infoUser} = this.props
        await this.props.dispatch(getCartListAction(infoUser.ID))
        await this.setState({
            listCart : this.props.listCart
        })
    }
    async componentDidUpdate(){
        if((JSON.stringify(this.props.addCart) !== JSON.stringify(this.state.addCart))||(JSON.stringify(this.props.fixCart) !== JSON.stringify(this.state.fixCart))){
            const {infoUser} = this.props
            await this.props.dispatch(getCartListAction(infoUser.ID))
            await this.setState({
                addCart : this.props.addCart,
                fixCart : this.props.fixCart,
                listCart : this.props.listCart
            })
        }
    }
    onDelete = (id) => {
        const {infoUser} = this.props
        this.props.dispatch(deleteCartListAction(infoUser.ID, id))
    }
    onFix = async(itemCart, inde) => {
        const quantity = parseInt(itemCart.Quantity) + parseInt(inde)
        if(quantity <= itemCart.QuantityInStock)
        {
            if(quantity > 0 && quantity <= itemCart.QuantityInStock){
                this.props.dispatch(fixCart({Name: itemCart.Name,
                                            Photos: itemCart.Photos,
                                            Price: itemCart.Price,
                                            Quantity: quantity,
                                            QuantityInStock: itemCart.QuantityInStock,
                                            UserID: itemCart.UserID,
                                            Watch_ID: itemCart.Watch_ID}))
            }
        }
    }
    showCart = (listCart) => {
        var result = null
        if(listCart.length > 0)
        {
            result = listCart.map((cartItem, index) => {
                return (<CartItem 
                    key = {index}
                    cartItem = {cartItem}
                    index = {index}
                    onFix = {this.onFix}
                    onDelete = {this.onDelete}
                />)
            })
        }
        return result
    }
    onPay = async() => {
        const {listCart} = this.state
        if(listCart.length>0){
            await this.props.dispatch(postInvoiceListAction(this.props.infoUser.ID))
            await this.props.dispatch(getInvoiceListAction(this.props.infoUser.ID))
            const {invoiceList} = this.props
            for(let i = 0;i < listCart.length;i++)
            {
                await this.setState({
                    Invoice_ID : invoiceList[0].ID,
                    Watch_ID : listCart[i].Watch_ID,
                    Quantity : listCart[i].Quantity,
                })
                await this.props.dispatch(postInvoiceDetailListAction(this.state))
                await this.props.dispatch(deleteCartListAction(this.props.infoUser.ID, listCart[i].Watch_ID))
            }
        }
        
    }
    sumMoney = (listCart) => {
        let result = 0
        if(listCart.length > 0)
        {
            for(let i = 0;i<listCart.length;i++)
            {
                result = result + listCart[i].Price*listCart[i].Quantity;
            }
        }
        return result.toLocaleString('vi', {style : 'currency', currency : 'VND'});
    }
    render() {
        const {listCart, infoUser} = this.props
        return (
            <div className="container bigsize my-5" >
                <section className="section">
                    <div className="table-responsive">
                        <span className="header-title">Thông tin người nhận</span>
                        <table className="table table-borderless mx-auto my-5" style={{width:'50%'}}>
                        <tbody>
                            <tr>
                            <th scope="row">Tên người nhận: </th>
                            <td>{infoUser.Name}</td>
                            </tr>
                            <tr>
                            <th scope="row">Số điện thoại: </th>
                            <td>{infoUser.PhoneNumber}</td>
                            </tr>
                            <tr>
                            <th scope="row">Địa chỉ: </th>
                            <td>{infoUser.Address}</td>
                            </tr>
                        </tbody>
                        </table>
                        <span className="header-title">Sản phẩm</span>
                        <table className="table product-table my-5">
                            <thead>
                                <tr>
                                    <th className="col-md-2 text-center"></th>
                                    <th className="text-center">Sản Phẩm</th>
                                    <th className="text-center">Giá</th>
                                    <th className="text-center">Số Lượng</th>
                                    <th className="text-center">Tổng Cộng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showCart(listCart)}
                                <tr>
                                    <td colSpan="3"></td>
                                    <td className='align-middle'>
                                        <h1>
                                            <strong>Tổng Tiền</strong>
                                        </h1>
                                    </td>
                                    <td className='align-middle'>
                                        <h1>
                                            {this.sumMoney(listCart)}
                                        </h1>
                                    </td>
                                    <td colSpan="3">
                                        <div>
                                            <button type="button" className="btn btn-danger waves-effect waves-light btn-lg" data-bs-toggle="modal" data-bs-target="#confirmModal">
                                                <h1>THANH TOÁN</h1>
                                            </button>
                                            {/* Modal */}
                                            <div className="modal fade" id="confirmModal" tabIndex={-1} aria-labelledby="confirmModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                    <h3 className="modal-title" id="confirmModalLabel">Thông Báo</h3>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                    </div>
                                                    <div className="modal-body">
                                                        Xác nhận đặt hàng ?
                                                    </div>
                                                    <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><h2>Thoát</h2></button>
                                                    <button type="button" className="btn btn-primary" onClick={this.onPay}><h2>Xác nhận</h2></button>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        );
    }
    
}
const mapStateToProps = state => {
    return {
        listCart : state.cart.cartList,
        infoUser : state.user.infoUser,
        addCart : state.cart.addCart,
        fixCart : state.cart.fixCart,
        invoiceList : state.invoice.invoiceList
    }
}
export default connect(mapStateToProps)(Cart);
