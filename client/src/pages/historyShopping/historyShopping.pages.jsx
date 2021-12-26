import React, { Component } from "react";
import {connect} from 'react-redux'
import { getInvoiceOneListAction } from "../../store/actions/invoice.action";
import InvoiceItem from "../../components/user/invoiceItem.component"

class HistoryShopping extends Component {
    async componentWillMount(){
        const {infoUser} = this.props
        this.props.dispatch(getInvoiceOneListAction(infoUser.ID))
    }
    showInvoice = (listShopping) => {
        var result = null
        if(listShopping.length > 0)
        {
            result = listShopping.map((invoiceItem, index) => {
                return (<InvoiceItem 
                    key = {index}
                    invoiceItem = {invoiceItem}
                    index = {index}
                />)
            })
        }
        return result
    }
    
    render() {
        const {listShopping} = this.props
        return (
            <div className="container bigsize">
                <section className="section">
                    <div className="table-responsive">
                        <table className="table product-table">
                            <thead>
                                <tr>
                                    <th className="col-md-2"></th>
                                    <th className="col-md-2">Sản Phẩm</th>
                                    <th className="col-md-2">Giá</th>
                                    <th className="col-md-2">Số Lượng</th>
                                    <th className="col-md-2">Tổng Cộng</th>
                                    <th className="col-md-2">Ngày đặt hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showInvoice(listShopping)}
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
        infoUser : state.user.infoUser,
        listShopping : state.invoice.listShopping
    }
}
export default connect(mapStateToProps)(HistoryShopping);
