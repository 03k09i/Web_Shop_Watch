import React, { Component } from "react";
import {connect} from 'react-redux'

class InvoiceItem extends Component {
    
    
    render() {
        const {invoiceItem} = this.props 
        console.log(invoiceItem);
        let photo = JSON.parse(invoiceItem.Photos) 
        let price = invoiceItem.Price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        let prices = (invoiceItem.Price*invoiceItem.Quantity).toLocaleString('vi', {style : 'currency', currency : 'VND'});
        return (
            <tr>
                <th scope="row">
                    <img src={photo[0]} alt="" className="img-fluid z-depth-0" />
                </th>
                <td>
                    <h2>
                        <strong>{invoiceItem.Name}</strong>
                    </h2>
                </td>
                <td>{price}</td>
                <td className="center-on-small-only">
                    <span className="qty">{invoiceItem.Quantity} </span>
                </td>
                <td>{prices}</td>
                <td>
                    {invoiceItem.TimeOrder.slice(0,10)}
                </td>
            </tr>
        );
    }
    
}
export default connect()(InvoiceItem);
