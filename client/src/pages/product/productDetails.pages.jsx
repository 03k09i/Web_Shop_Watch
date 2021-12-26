import React, { Component } from "react";
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import { getWatchItemAction } from "../../store/actions/watch.action";
import { fixCart, getCartListAction, postCartListAction } from "../../store/actions/cart.action";
import Cookies from "../../../node_modules/js-cookie/dist/js.cookie";
import Slider from "react-slick";

class ProductDetails extends Component {
    state = {
        number : 1,
        idImg : 0,
        confirmModal : ''
    }
    async componentWillMount(){
        const {ID} = this.props.match.params
        await this.props.dispatch(getWatchItemAction(ID))
    }
    quantity = (inde) => {
        let maxQuantity = parseInt(this.props.watchItem.QuantityInStock) + 1
        let value = parseInt(this.state.number) + inde
        if(value != 0 && value != maxQuantity)
        {
            this.setState({
                number : value
            })
        }
        
    }
    onShopping = async(watch, nextPage) => {
        const {number} = this.state
        let maxQuantity = parseInt(this.props.watchItem.QuantityInStock) + 1
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
                        if(maxQuantity > cartList[i].Quantity + number)
                        {
                            let newCart = {
                                UserID : infoUser.ID,
                                Watch_ID : watch.ID,
                                Quantity : cartList[i].Quantity + number
                            }
                            this.setState({
                                confirmModal : ''
                            })
                            this.props.dispatch(fixCart(newCart))
                            if(nextPage == 1)
                            {
                                this.props.history.push('/cart')
                            }
                            
                        }
                        else{
                            // alert(`Bạn đã có ${cartList[i].Quantity} sản phẩm trong giỏ hàng. Không thể thêm số lượng đã chọn vào giỏ hàng vì sẽ vượt quá giới hạn mua hàng của bạn.`)
                            this.setState({
                                confirmModal : 'confirm'
                            })
                        }
                        break;
                    }
                }
                if(notExist == 0)
                {
                    let newCart = {
                        UserID : infoUser.ID,
                        Watch_ID : watch.ID,
                        Quantity : number
                    }
                    this.props.dispatch(postCartListAction(newCart))
                    if(nextPage == 1)
                    {
                        this.props.history.push('/cart')
                    }
                }
            }
            else{
                let newCart = {
                    UserID : infoUser.ID,
                    Watch_ID : watch.ID,
                    Quantity : number
                }
                this.props.dispatch(postCartListAction(newCart))
                if(nextPage == 1)
                {
                    this.props.history.push('/cart')
                }
            }
            
        }
        else
        {
            if(nextPage == 1)
            {
                this.props.history.push('/login')
            }
        }
    }
    onChange = (e) => {
        let maxQuantity = parseInt(this.props.watchItem.QuantityInStock) + 1
        let target = e.target;
        let name = target.name;
        let value = target.value
        if(value > 0 && value < maxQuantity){
            this.setState({
                [name] : value
            })
        }
    }
    getListPhotos = () => {
        let {watchItem} = this.props;
        let result = null;
        if(watchItem.Photos)
        {
            const photos = JSON.parse(watchItem.Photos);
            if(photos.length)
            {
                result =  photos.map((photo, index) => {
                    if(this.state.idImg == index)
                    {
                        return (
                            <li key = {index} 
                                data-target="#carouselExampleIndicators" 
                                data-slide-to={index} className="active" 
                                onClick={() => this.setState({idImg : index})} 
                                style = {{width:250, height:95 , display:"flex", justifyContent:"space-evenly"}}>
                                <img src={photo} style = {{width:'100%', height:'100%'}} />
                            </li>
                        )
                    }
                    else
                    {
                        return (
                            <li key = {index} 
                                data-target="#carouselExampleIndicators" 
                                data-slide-to={index} 
                                onClick={() => this.setState({idImg : index})} 
                                style = {{width:250, height:95, display:"flex", justifyContent:"space-evenly" }}>
                                <img src={photo} style = {{width:'100%', height:'100%'}} />
                            </li>
                        )
                    }
                })
            }
        }
        return result;
    }
    getListPhotos1 = () => {
        let {watchItem} = this.props;
        let result = null;
        if(watchItem.Photos)
        {
            const photos = JSON.parse(watchItem.Photos);
            if(photos.length)
            {
                result =  photos.map((photo, index) => {
                    console.log(index);
                    if(this.state.idImg == index)
                    {
                        return (
                            <div key = {index} className="carousel-item active" style = {{width:400, height:600 }}>
                                <img className="d-block w-100" src={photo} style = {{width:'100%', height:'100%', objectFit:"contain"}} />
                            </div>
                        )
                    }
                    else
                    {
                        return (
                            <div key = {index} className="carousel-item" style = {{width:400, height:600 }}>
                                <img className="d-block w-100" src={photo} style = {{width:'100%', height:'100%', objectFit:"contain"}} />
                            </div>
                        )
                    }
                })
            }
        }
        return result;
    }
    render() {
        const {confirmModal} = this.state
        let {watchItem} = this.props;
        let {number} = this.state
        return (
            <div className="productDetails grid">
            <div className="row">
                <div className="col-4">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators" style = {{width:'100%', margin : 5}}>
                        {this.getListPhotos()}
                    </ol>
                    <div className="carousel-inner">
                        {this.getListPhotos1()}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </a>
                    </div>
                </div>
                <div className="col-6 product__info">
                <div className="product-info__name">ĐỒNG HỒ {watchItem.Brand} {watchItem.Name}</div>
                {/* <div class="rate justify-content-end align-items-center">
                    <input type="radio" id="star5" name="rate" value="5" />
                    <label for="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" />
                    <label for="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" />
                    <label for="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" />
                    <label for="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" />
                    <label for="star1" title="text">1 star</label>
                    <p class="title-rate mb-0 me-3">Đánh giá: </p>
                </div> */}
                <span className="card-prize-old">2.000.000₫</span>
                <span className="product-info__discount">-50%</span>
                <div className="card-prize-new">1.000.000₫</div>
                <div className="product-info__promote">
                    <div className="promote__name">
                    KHUYẾN MÃI:
                    </div>
                    <div>
                    <box-icon name="check" animation="tada" color="#3a2ede" />
                    <span>Tặng gói Bảo hiểm Gold trị giá 3.000.000đ.</span>
                    </div>
                    <div>
                    <box-icon name="check" animation="tada" color="#3a2ede" />
                    <span>Freeship mọi lúc, mọi nơi</span>
                    </div>
                    <div>
                    <box-icon name="check" animation="tada" color="#3a2ede" />
                    <span>1 đổi 1 trong vòng 30 ngày nếu lỗi của nhà sản xuất</span>
                    </div>
                    <div>
                    <box-icon name="check" animation="tada" color="#3a2ede" />
                    <span>Đền gấp 10 lần nếu phát hiện fake</span>
                    </div>
                </div>
                <div className="product-info__quality">
                    <span>Số Lượng: </span>
                    <div className="number-input">
                    <button onClick={() => this.quantity(-1)} className="minus" />
                    <input 
                        className="quantity" 
                        min={0} max={999} 
                        name="number" 
                        value={number} 
                        type="number" 
                        onChange = {this.onChange}
                    />
                    <button onClick={() => this.quantity(1)} className="plus" />
                    </div>
                </div>
                <button className="btn btn-danger btn-buynow" data-bs-toggle="modal" data-bs-target="#confirm" onClick = {() => this.onShopping(watchItem, 1)}>MUA NGAY</button>
                <button className="btn btn-danger btn-buynow" data-bs-toggle="modal" data-bs-target="#confirm" onClick = {() => this.onShopping(watchItem, 0)}>THÊM VÀO GIỎ HÀNG</button>
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
            </div>
            <div className="product__tab row">
                <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link link-warning active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">THÔNG TIN SẢN PHẨM</button>
                    <button className="nav-link link-warning" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">CHẾ ĐỘ BẢO HÀNH</button>
                    <button className="nav-link link-warning" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">HƯỚNG DẪN SỬ DỤNG</button>
                </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <table className="product-tab__details">
                    <tbody><tr>
                        <th>Nhãn hiệu:</th>
                        <td>Olym Pianus</td>
                        </tr>
                        <tr>
                        <th>Nguồn gốc:</th>
                        <td>Nhật Bản</td>
                        </tr>
                        <tr>
                        <th>Giới tính:</th>
                        <td>Nam</td>
                        </tr>
                        <tr>
                        <th>Loại dây:</th>
                        <td>5 năm cả lỗi người dùng tại PK Store</td>
                        </tr>
                        <tr>
                        <th>Loại máy:</th>
                        <td>2 năm</td>
                        </tr>
                        <tr>
                        <th>Bảo hiểm:</th>
                        <td>5 năm cả lỗi người dùng tại PK Store</td>
                        </tr>
                        <tr>
                        <th>Bảo hành quốc tế:</th>
                        <td>2 năm</td>
                        </tr>
                    </tbody></table>
                </div>
                <div className="product-tab__insurance tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="row">
                    <div className="col-1">
                        <img src="/assets/img/insurance-logo.jpg" alt="Bao Hanh Gold" width="100px" />
                    </div>
                    <div className="col product-tab__insurance-gold">
                        <h2>TẶNG KÈM GÓI BẢO HÀNH</h2>
                        <h2>BẢO HIỂM GOLD</h2>
                        <h2>TRỊ GIÁ 3.000.000 Đ</h2>
                    </div>
                    </div>
                    <div className="row mt-5">
                    <h2>BẢO HIỂM CẢ LỖI NGƯỜI DÙNG TRONG 5 NĂM</h2>
                    <p>Chi tiết: https://baohiem.pkstore.vn/</p>
                    <h2 className=" mt-5">TRUNG TÂM BẢO HÀNH PKSTORE</h2>
                    <p>- Địa chỉ: Số 3/4/5 Lê Văn Chí, Thủ Đức, Hồ Chí Minh
                    </p><p>- Địa chỉ: Số 3/4/5 Võ Thị Sáu, An Khê, Đà Nẵng
                    </p><p>- Địa chỉ: Số 3/4/5 Trương Định, Cầu Giấy, Hà Nội
                    </p><p>- Hotline: 19000001</p>
                    <p>- Giờ làm việc: 10h00 - 18h00</p>
                    </div>
                </div>
                <div className="product-tab__guide tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <h3>
                    <box-icon name="check" animation="tada" color="#3a2ede" />
                    HƯỚNG DẪN VỆ SINH ĐỒNG HỒ DÂY DA
                    </h3>
                    <p>- Dùng vải ẩm lau sạch sẽ và để khô hoặc dùng xà phòng, dầu oliu làm sạch.</p>
                    <p>- Để dây da cùng gói hút ẩm trong hộp kín để khử mùi hôi.</p>
                    <p>* Chú ý: </p>
                    <p>- Không nên xả nước trực tiếp vào dây da đồng hồ vì sẽ làm dây da thấm nước và kém bền.</p>
                    <p>- Khi dây da bị ẩm, không nên dùng máy sấy vì dây đồng hồ có thể bị cong vênh, cứng lại.</p>
                    <h3>
                    <box-icon name="check" animation="tada" color="#3a2ede" />
                    HƯỚNG DẪN VỆ SINH ĐỒNG HỒ DÂY KIM LOẠI
                    </h3>
                    <p>
                    <box-icon name="info-circle" animation="tada" color="#e8d10c" /> Đối với đồng hồ có
                    khả năng chống nước tốt:
                    </p>
                    <p>- Chuẩn bị nước ấm, nhiệt độ tầm 50 độ C, pha với một chút nước rửa bát.</p>
                    <p>- Nhúng toàn bộ đồng hồ vào dung dịch này, ngâm trong vòng 3 - 5 phút.</p>
                    <p>- Sử dụng bàn chải lông mềm cọ rửa các kẽ hở trên dây đồng hồ rồi rửa lại bằng nước sạch.
                    </p>
                    <p>
                    <box-icon name="info-circle" animation="tada" color="#e8d10c" /> Đối với đồng hồ có
                    khả năng chống nước kém:
                    </p>
                    <p>- Lấy một chiếc tăm nhỏ để lấy đi các vết bẩn trong các khe hở. </p>
                    <p>- Xoa đều kem đánh răng lên dây đồng hồ, sử dụng bàn chải mềm làm sạch rồi rửa lại với nước
                    sạch.</p>
                    <h3>
                    <box-icon name="check" animation="tada" color="#3a2ede" />
                    HƯỚNG DẪN VỆ SINH ĐỒNG HỒ DÂY NATO/DÂY VẢI
                    </h3>
                    <p>
                    <box-icon name="info-circle" animation="tada" color="#e8d10c" /> Khi dây vải bị
                    dính dầu mỡ:
                    </p>
                    <p>- Xịt ướt dây đồng hồ với oxi già.</p>
                    <p>- Rắc đều bột nở lên dây đồng hồ, dùng bàn chải lông mềm cọ sạch.</p>
                    <p>- Sau 30 phút xả qua nước và phơi khô.</p>
                    <p>
                    <box-icon name="info-circle" animation="tada" color="#e8d10c" /> Khi dây vải bị
                    dính mực bút bi:
                    </p>
                    <p>- Bôi kem đánh răng và xà phòng vào vết mực dính trên dây đồng hồ.</p>
                    <p>- Dùng bàn chải lông mềm cọ sạch.</p>
                    <p>- Thoa thêm một ít cồn lên vết bẩn rồi vò lại với nước sạch."</p>
                </div>
                </div>
            </div>
            </div>
        );
    }
    
}
const mapStateToProps = state => {
    return {
        watchItem : state.watch.watchItem,
        addWatch : state.watch.addWatch,
        fixWatch : state.watch.fixWatch,
        infoUser : state.user.infoUser,
        cartList : state.cart.cartList
    }
}
export default connect(mapStateToProps)(withRouter(ProductDetails));
