import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class WatchItem extends Component {
    onShopping = (watch) => {
        this.props.onShopping(watch);
    }
    render() {
        const {watch, index} = this.props
        let photo = JSON.parse(watch.Photos) 
        let price = watch.Price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        let prices = (watch.Price*100/(100-watch.discount)).toLocaleString('vi', {style : 'currency', currency : 'VND'});
        return (
            <div className="card col-md-3 border-0 overflow-hidden my-4">
                <div className="discount-tag">-{watch.discount}%</div>
                    <Link to = {`/productDetails/${watch.ID}`}><img src={photo[0]} className="card-img-top overflow-hidden"/></Link>
                    <div className="card-body text-center">
                    <h2 className="card-title" style={{whiteSpace:"nowrap", overflow:"hidden"}}>{watch.Name}</h2>
                    <h4 className="card-title">{watch.Brand}</h4>
                    <p className="card-text card-text__info">{watch.Brand} Nam - 40.5mm - Kính cứng</p>
                    <p className="card-prize-old">{prices}</p>
                    <p className="card-prize-new">{price}</p>
                    <a className="btn btn-danger btn-buynow text-white" onClick={() => this.onShopping(watch)}>MUA NGAY</a>
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
export default connect(mapStateToProps)(WatchItem);
