import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "../../../node_modules/js-cookie/dist/js.cookie";
import {getInfoUser, postUserListAction} from '../../store/actions/user.action'
class Header extends Component {
    state = {
        Name : '',
        DayOfBirth : '',
        Address : '',
        Email : '',
        PhoneNumber : '',
        UserName : '',
        Password : '',
        Password1 : '',
        Role : 'User',
        token : '',
        search : '',
    }
    async componentWillMount(){
        if(Cookies.get().token){
            await this.props.dispatch(getInfoUser(Cookies.get().token))
            this.setState({
                token : Cookies.get().token,
            })
        }
    }
    componentDidUpdate(){
        if(Cookies.get().token && Cookies.get().token != this.state.token)
        {
            this.props.dispatch(getInfoUser(Cookies.get().token))
            this.setState({
                token : Cookies.get().token,
            })
        }
    }
    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value
        })
    }
    onLogout = () => {
        Cookies.remove('token')
        this.setState({
            token : ''
        })
    }
    render() {
        let {watchs, infoUser} = this.props
        console.log(infoUser);
        let {search} = this.state
        let chooseBrand, chooseMachineType, chooseWireType = null
        let listBrand = [];
        let listMachineType = [];
        let listWireType = [];
        if(watchs.length > 0)  
        {
          let temp = 0;
            for(let i = 0;i<watchs.length;i++)           //lọc các Brand trong watch và lưu vào mảng listBrand
            {
              if(watchs[i].QuantityInStock != 0)
              {
                listBrand[temp] = watchs[i].Brand;
                listMachineType[temp] = watchs[i].MachineType;
                listWireType[temp] = watchs[i].WireType;
                temp = temp + 1;
              }
            }
            listBrand = Array.from(new Set(listBrand));             //Xóa các Brand trùng nhau 
            listMachineType = Array.from(new Set(listMachineType)); //Xóa các loại máy trùng nhau
            listWireType = Array.from(new Set(listWireType));       //Xóa các loại dây trùng nhau
            chooseBrand = listBrand.map((brand, index) => {                     //Xuất ra các radio Brand để người dùng chọn
                return (
                    <li key = {index} className="container-dropdown__item"> <Link to={`/productSearch/brand${index}`}>{brand}</Link></li>
                )
            })
            chooseMachineType = listMachineType.map((machineType, index) => {   //Xuất ra các radio MachineType để người dùng chọn
                return (
                    <li key = {index} className="container-dropdown__item"> <Link to={`/productSearch/machine${index}`}>{machineType}</Link></li>
                )
            })
            chooseWireType = listWireType.map((wireType, index) => {            //Xuất ra các radio MachineType để người dùng chọn
                return (
                    <li key = {index} className="container-dropdown__item"> <Link to={`/productSearch/wire${index}`}>{wireType}</Link></li>
                )
            })
        }
    return (
        <header className="header">
            <div className="grid">
                <nav className="header__navbar">
                    <Link className="header-nav__logo" to = '/'>
                        <img className="header-nav__logo-img" src="../assets/img/logo.jpg" alt="PK logo" />
                        <p className="header-nav__logo-name">STORE</p>
                    </Link>
                    <div className="header-nav__search">
                        <input type="text" 
                            className="search__input" 
                            placeholder="Nhập để tìm kiếm sản phẩm" 
                            name='search'
                            onChange = {this.onChange}
                        />
                        {search ? 
                        <Link to={`/productSearch/${search}`} className="search__btn">
                            <i className="material-icons search__btn-icon" style={{verticalAlign: 'middle'}}>search</i>
                        </Link> : 
                        <button className="search__btn">
                            <i className="material-icons search__btn-icon" style={{verticalAlign: 'middle'}}>search</i>
                        </button>}
                        
                    </div>
                    <div className="header-nav__list d-flex">
                        {!Cookies.get().token ? <div>
                            <Link type="button" className="btn btn--mod me-3" data-modal="login__model" to ='/login'>
                                <i className="material-icons" style={{verticalAlign: 'middle'}}>login</i>
                                ĐĂNG NHẬP
                            </Link>
                            <Link type="button" className="btn btn--mod" data-modal="signup__model" to ='/login'>
                                <i className="material-icons" style={{verticalAlign: 'middle'}}>app_registration</i>
                                ĐĂNG KÍ
                            </Link>
                        </div>:<div className="header-nav__list">
                            <Link to='/cart' type="button" className="btn btn--mod me-3" data-modal="login__model">
                                <i className="material-icons me-0" style={{verticalAlign: 'middle'}}>shopping_bag</i>
                            </Link>
                            {infoUser? infoUser.Role == 'Admin'?
                            <Link type="button" className="btn btn--mod me-3" data-modal="login__model" to ='/admin/dashboard'>
                                <i className="material-icons" style={{verticalAlign: 'middle'}}>admin_panel_settings</i>
                                ADMIN
                            </Link>:'' :''}
                            <div className="dropdown">
                                <a className="btn dropdown-toggle btn--mod" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons" style={{verticalAlign: 'middle'}}>person_outline</i> 
                                <span>TÀI KHOẢN</span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><Link className="dropdown-item" to='/user'>Chỉnh sửa thông tin</Link></li>
                                <li><Link className="dropdown-item" to='/historyShopping'>Lịch sử mua hàng</Link></li>
                                <li><a className="dropdown-item" href="#" onClick = {this.onLogout}>Đăng xuất</a></li>
                                </ul>
                            </div>
                        </div>}
                        
                    </div> 
                </nav>
            </div>
            <nav className="header__container">
                <ul className="header-container__list grid grid__row">
                <li className="header-container__item">
                    <Link className="header-container__link" to='/'>
                        PK STORE
                    </Link>
                </li>
                <li className="header-container__item">
                    <a href="#" className="header-container__link">ĐỒNG HỒ</a>
                    <div className="container__dropdown grid grid__row">
                    <ul className="container-dropdown__list">
                        <li className="container-dropdown__item container-dropdown__title">THƯƠNG HIỆU</li>
                        <hr className="line" />
                        {chooseBrand}
                    </ul>
                    <ul className="container-dropdown__list">
                        <li className="container-dropdown__item container-dropdown__title">MỨC GIÁ</li>
                        <hr className="line" />
                        <li className="container-dropdown__item"><Link to={`/productSearch/0-5000000`}>0->5.000.000đ</Link></li>
                        <li className="container-dropdown__item"><Link to={`/productSearch/5-10000000`}>5.000.000đ->10.000.000đ</Link></li>
                        <li className="container-dropdown__item"><Link to={`/productSearch/10-15000000`}>10.000.000đ->15.000.000đ</Link></li>
                        <li className="container-dropdown__item"><Link to={`/productSearch/15-20000000`}>15.000.000đ->20.000.000đ</Link></li>
                        <li className="container-dropdown__item"><Link to={`/productSearch/>20000000`}>> 20.000.000đ</Link></li>
                    </ul>
                    <ul className="container-dropdown__list">
                        <li className="container-dropdown__item container-dropdown__title">BỘ MÁY</li>
                        <hr className="line" />
                        {chooseMachineType}
                        
                    </ul>
                    <ul className="container-dropdown__list">
                        <li className="container-dropdown__item container-dropdown__title">LOẠI DÂY</li>
                        <hr className="line" />
                        {chooseWireType}
                    </ul>
                    </div>
                </li>
                <li className="header-container__item">
                    <Link to='/news' className="header-container__link">TIN TỨC</Link>
                </li>
                <li className="header-container__item">
                    <Link to='/cskh' className="header-container__link">CSKH</Link>
                </li>
                </ul>
            </nav>
        </header>
    );
}
}
const mapStateToProps = state => {
    return {
        infoUser : state.user.infoUser,
        watchs : state.watch.watchList,
    }
}
export default connect(mapStateToProps)(Header);
