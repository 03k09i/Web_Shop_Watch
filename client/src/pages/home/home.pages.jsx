import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import WatchItem from "../../components/watch/watchItem.component";
import { fixCart, getCartListAction, postCartListAction } from "../../store/actions/cart.action";
import {getWatchListAction} from '../../store/actions/watch.action'
import { withRouter } from "react-router";
import Cookies from "../../../node_modules/js-cookie/dist/js.cookie";

class Home extends Component {
    state = {
        addWatch : '',
        fixWatch : ''
    }
    componentDidMount() {
        this.props.dispatch(getWatchListAction());
    }
    componentDidUpdate() {
        if (this.props.addWatch !== this.state.addWatch || this.props.fixWatch !== this.state.fixWatch) {
            this.props.dispatch(getWatchListAction());
            this.setState({
                addWatch: this.props.addWatch,
                fixWatch: this.props.fixWatch,
            });
        }
    }
    onShopping = async(watch) => {
        let maxQuantity = parseInt(watch.QuantityInStock) + 1
        if(Cookies.get().token)
        {  
            const {infoUser} = this.props
            await this.props.dispatch(getCartListAction(infoUser.ID))
            const {cartList} = this.props
            if(cartList.length > 0)
            {
                let notExist = 0;
                for(let i=0;i<cartList.length;i++)
                {
                    if(cartList[i].Watch_ID == watch.ID)    // Kiểm tra watch có tồn tại trong giỏ hàng hay ko
                    {
                        notExist = 1
                        if(maxQuantity > cartList[i].Quantity + 1)
                        {
                            let newCart = {
                                UserID : infoUser.ID,
                                Watch_ID : watch.ID,
                                Quantity : cartList[i].Quantity + 1
                            }
                            this.props.dispatch(fixCart(newCart))
                            this.props.history.push('/cart')
                        }
                        else{
                            alert(`Bạn đã có ${cartList[i].Quantity} sản phẩm trong giỏ hàng. Không thể thêm số lượng đã chọn vào giỏ hàng vì sẽ vượt quá giới hạn mua hàng của bạn.`)
                        }
                        break;
                    }
                }
                if(notExist == 0)
                {
                    let newCart = {
                        UserID : infoUser.ID,
                        Watch_ID : watch.ID,
                        Quantity : 1
                    }
                    this.props.dispatch(postCartListAction(newCart))
                    this.props.history.push('/cart')
                }
            }
            else{
                let newCart = {
                    UserID : infoUser.ID,
                    Watch_ID : watch.ID,
                    Quantity : 1
                }
                this.props.dispatch(postCartListAction(newCart))
                this.props.history.push('/cart')
            }
        }
        else
        {
            this.props.history.push('/login')
        }
    }
    showWatch = (watchs) => {
        var result = null
        let temp = 0;
        if(watchs.length >= 8)
        {
            // watchs = watchs.slice(0,8)
            result = watchs.map((watch, index) => {
                if(temp != 8)
                {
                    if(watch.QuantityInStock != 0)
                    {
                        temp = temp + 1;
                        return (<WatchItem 
                            key = {index}
                            watch = {watch}
                            index = {index}
                            onShopping = {this.onShopping}
                        />)
                        
                    }
                }
            })
        }
        return result
    }
    render() {
        const {watchs} = this.props
        return (
            <main>
                <div className="home grid">
                <div className="home__slider">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                        </div>
                        <div className="carousel-inner">
                        <div className="carousel-item active">
                            <a href="#">
                            <img src="/assets/img/slider1.jpg" className="d-block w-100 img-responsive" alt="#" />
                            </a>
                        </div>
                        <div className="carousel-item">
                            <a href="#">
                            <img src="/assets/img/slider2.jpg" className="d-block w-100 img-responsive" alt="#" />
                            </a>
                        </div>
                        <div className="carousel-item">
                            <a href="#">
                            <img src="/assets/img/slider4.jpg" className="d-block w-100 img-responsive" alt="#" />
                            </a>
                        </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    </div>

                    <div className="home__products margin">
                        <div className="home-products__header">
                            <span className="header-title">Sản phẩm nổi bật nhất</span>
                            <div className="home-products__header-list">
                                <span className="badge rounded-pill home-products__header-item">
                                    <Link to = "/productAll/">Xem tất cả...</Link>
                                </span>
                            </div>
                        </div>
                        <div className="home-products__container container">
                            <div className="row p-5">
                                {this.showWatch(watchs)}
                            </div>
                            <div className="display__more mt-5 mb-5">
                                <Link to = "/productAll/">
                                <i className="material-icons search__btn-icon">
                                    keyboard_arrow_right
                                </i>
                                <span>XEM TẤT CẢ SẢN PHẨM</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="home__feedback margin">
                        <span className="header-title mt-5">
                            KHÁCH HÀNG NÓI VỀ CHÚNG TÔI
                        </span>
                        <div className="testimonial row mt-5">
                        <figure className="testimonial__card">
                            <blockquote>
                            Tôi ủng hộ những người đặt lợi ích của khách hàng làm mục tiêu phấn đấu. Vì vậy, tôi đã ủng hộ và lựa chọn PKSTORE.
                            <div className="arrow" />
                            </blockquote>
                            <img
                            src="https://icdn.dantri.com.vn/thumb_w/640/2020/07/29/tranthanhmc-1596011017099.jpg"
                            alt="sq-sample3"
                            />
                            <div className="author">
                            <h5>
                                Pelican Steve <span> LIttleSnippets.net</span>
                            </h5>
                            </div>
                        </figure>
                        <figure className="testimonial__card hover">
                            <blockquote>
                            Điều mà tôi ấn tượng nhất là chế độ bảo hành 5 năm theo tiêu chuẩn Thuỵ Sĩ cho cả lỗi người dùng. Điều này không ...
                            <div className="arrow" />
                            </blockquote>
                            <img
                            src="https://image-us.24h.com.vn/upload/2-2021/images/2021-04-12/Ninh-Duong-Lan-Ngoc-khoe-anh-chup-bang-app-lanngoc-1618221417-167-width660height880.jpg"
                            alt="sq-sample27"
                            />
                            <div className="author">
                            <h5>
                                Max Conversion<span> LIttleSnippets.net</span>
                            </h5>
                            </div>
                        </figure>
                        <figure className="testimonial__card">
                            <blockquote>
                            Tôi thực sự an tâm và tin tưởng vào chất lượng dịch vụ của PKSTORE. Cái ấn tượng với tôi đầu tiên là CSKH và hậu mãi cực kì chu đáo.
                            <div className="arrow" />
                            </blockquote>
                            <img
                            src="https://static2.yan.vn/YanNews/2167221/202006/thieu-bao-tram-bat-trend-doi-gioi-tinh-hoa-ra-lai-hao-hao-son-tung-46b55739.jpg"
                            alt="sq-sample17"
                            />
                            <div className="author">
                            <h5>
                                Eleanor Faint<span> LIttleSnippets.net</span>
                            </h5>
                            </div>
                        </figure>
                        <div className="display__more mt-5 mb-5">
                            <a href="#">
                            <i className="material-icons search__btn-icon">
                                keyboard_arrow_right
                            </i>
                            <span>XEM TẤT CẢ</span>
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="home__news margin">
                        <div className="home-products__header">
                        <span className="header-title">
                            PK Store - Tin tức và khuyến mãi
                        </span>
                        <div className="home-products__header-list">
                            <span className="badge rounded-pill home-products__header-item">
                            <a href="#">Xem tất cả...</a>
                            </span>
                        </div>
                        </div>
                        <div className="home-news__list row mt-5 mb-5">
                        <div className="card" style={{ width: "25rem" }}>
                            <a href="#">
                            <img
                                src="./assets/img/promote2.jpg"
                                className="card-img-top"
                                alt="..."
                            />
                            </a>
                            <div className="card-body">
                            <div className="card-body__date mt-3">
                                <i className="material-icons">event</i>
                                <span className="home-news__list--size">01/01/2021</span>
                            </div>
                            <p className="card-text home-news__list--size">
                                Some quick example text to build on the card title and make
                                up the bulk of the card's content.
                            </p>
                            </div>
                        </div>
                        <div className="card" style={{ width: "25rem" }}>
                            <a href="#">
                            <img
                                src="./assets/img/promote3.jpg"
                                className="card-img-top"
                                alt="..."
                            />
                            </a>
                            <div className="card-body">
                            <div className="card-body__date mt-3">
                                <i className="material-icons">event</i>
                                <span className="home-news__list--size">01/01/2021</span>
                            </div>
                            <p className="card-text home-news__list--size">
                                Some quick example text to build on the card title and make
                                up the bulk of the card's content.
                            </p>
                            </div>
                        </div>
                        <div className="card" style={{ width: "25rem" }}>
                            <a href="#">
                            <img
                                src="./assets/img/promote4.jpg"
                                className="card-img-top"
                                alt="..."
                            />
                            </a>
                            <div className="card-body">
                            <div className="card-body__date mt-3">
                                <i className="material-icons">event</i>
                                <span className="home-news__list--size">01/01/2021</span>
                            </div>
                            <p className="card-text home-news__list--size">
                                Some quick example text to build on the card title and make
                                up the bulk of the card's content.
                            </p>
                            </div>
                        </div>
                        <div className="card" style={{ width: "25rem" }}>
                            <a href="#">
                            <img
                                src="./assets/img/promote1.jpg"
                                className="card-img-top"
                                alt="..."
                            />
                            </a>
                            <div className="card-body">
                            <div className="card-body__date mt-3">
                                <i className="material-icons">event</i>
                                <span className="home-news__list--size">01/01/2021</span>
                            </div>
                            <p className="card-text home-news__list--size">
                                Some quick example text to build on the card title and make
                                up the bulk of the card's content.
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="home__partner margin">
                        <div className="header-title">thương hiệu đối tác</div>
                        <div className="home-partner__marquee mt-5">
                            <div className="home-partner__track">
                                <img className="home-partner__img" src="./assets/img/lo1.png" />
                                <img className="home-partner__img" src="./assets/img/lo2.png" />
                                <img className="home-partner__img" src="./assets/img/lo3.png" />
                                <img className="home-partner__img" src="./assets/img/lo4.png" />
                                <img className="home-partner__img" src="./assets/img/lo5.png" />
                                <img className="home-partner__img" src="./assets/img/lo6.png" />
                                <img className="home-partner__img" src="./assets/img/lo7.png" />
                                <img className="home-partner__img" src="./assets/img/lo8.png" />
                                <img className="home-partner__img" src="./assets/img/lo9.png" />
                                <img className="home-partner__img" src="./assets/img/lo10.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
const mapStateToProps = state => {
    return {
        watchs : state.watch.watchList,
        infoUser : state.user.infoUser,
        cartList : state.cart.cartList
    }
}
export default connect(mapStateToProps)(withRouter(Home));
