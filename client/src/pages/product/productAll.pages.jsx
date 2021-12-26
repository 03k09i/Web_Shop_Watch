import React, { Component } from "react";
import {connect} from 'react-redux'
import WatchItem from "../../components/watch/watchItem.component";
import {getWatchListAction} from '../../store/actions/watch.action'
import { fixCart, getCartListAction, postCartListAction } from "../../store/actions/cart.action";
import { withRouter } from "react-router";
import Cookies from "../../../node_modules/js-cookie/dist/js.cookie";

class ProductAll extends Component {
    state = {
        addWatch : '',
        fixWatch : '',
        radioBrand : '',
        radioMachineType : '',
        radioWireType : '',
        radioPrice : '',
        searchName : '',
        sortPrice : 0,
    }
    async componentWillMount() {
        await this.setState({
          searchName : this.props.match.params.name
        })
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
        if(this.state.searchName !== this.props.match.params.name)
        {
            this.setState({
                searchName : this.props.match.params.name
            })
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
                    if(cartList[i].Watch_ID === watch.ID)    // Kiểm tra watch có tồn tại trong giỏ hàng hay ko
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
                if(notExist === 0)
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
    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value
        this.setState({
            [name] : value,
            searchName : ''
        })
        this.props.history.push('/productAll')
    }
    render() {
        let {watchs} = this.props
        let {radioBrand, radioMachineType, radioWireType, radioPrice, searchName, sortPrice} = this.state;
        console.log(sortPrice);
        let chooseBrand, chooseMachineType, chooseWireType = null
        let listBrand = [];
        let listMachineType = [];
        let listWireType = [];
        if(watchs.length > 0)  
        {
            let temp = 0;
            for(let i = 0;i<watchs.length;i++) {           //lọc các Brand trong watch và lưu vào mảng listBrand
                if(watchs[i].QuantityInStock !== 0)
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
                    <div key = {index} className="form-check">
                    <input className="form-check-input" type="radio" name="radioBrand" value = {brand} onChange = {this.onChange} id="CheckBrand1" />
                    <label className="form-check-label" htmlFor="CheckBrand1">
                        {brand}
                    </label>
                    </div>
                )
            })
            chooseMachineType = listMachineType.map((machineType, index) => {   //Xuất ra các radio MachineType để người dùng chọn
            return (
                <div key = {index} className="form-check">
                    <input className="form-check-input" type="radio" name="radioMachineType" value = {machineType} onChange = {this.onChange} id="CheckBrand1" />
                    <label className="form-check-label" htmlFor="CheckBrand1">
                    {machineType}
                    </label>
                </div>
            )
            })
            chooseWireType = listWireType.map((wireType, index) => {            //Xuất ra các radio MachineType để người dùng chọn
            return (
                <div key = {index} className="form-check">
                    <input className="form-check-input" type="radio" name="radioWireType" value = {wireType} onChange = {this.onChange} id="CheckBrand1" />
                    <label className="form-check-label" htmlFor="CheckBrand1">
                    {wireType}
                    </label>
                </div>
            )
            })
            if(searchName)
            {
                let temp = 0;
                if (searchName.slice(0,5) == 'brand') {
                    watchs = watchs.filter((watch) => {
                        return watch.Brand.indexOf(listBrand[searchName[5]]) !== -1
                    });
                    temp = 1;
                }                         //Tìm sản phẩm có thương hiệu trùng với thương hiệu trên header
                if (searchName.slice(0,7) === 'machine') {
                    watchs = watchs.filter((watch) => {
                        return watch.MachineType.indexOf(listMachineType[searchName[7]]) !== -1
                    });
                    temp = 1;
                }
                if (searchName.slice(0,4) === 'wire') {
                    watchs = watchs.filter((watch) => {
                        return watch.WireType.indexOf(listWireType[searchName[4]]) !== -1
                    });
                    temp = 1;
                }
                if(searchName === '0-5000000')
                {
                    watchs = watchs.filter((watch) => {
                        return (watch.Price > 0 && watch.Price < 5000000);
                    });
                    temp = 1;
                } 
                if(searchName === '5-10000000')
                {
                    watchs = watchs.filter((watch) => {
                        return (watch.Price >= 5000000 && watch.Price < 10000000);
                    });
                    temp = 1;
                }                      
                if(searchName === '10-15000000')
                {
                    watchs = watchs.filter((watch) => {
                        return (watch.Price >= 10000000 && watch.Price < 15000000);
                    });
                    temp = 1;
                } 
                if(searchName === '15-20000000')
                {
                    watchs = watchs.filter((watch) => {
                        return (watch.Price >= 15000000 && watch.Price < 20000000);
                    });
                    temp = 1;
                } 
                if(searchName === '>20000000')
                {
                    watchs = watchs.filter((watch) => {
                        return (watch.Price >= 20000000);
                    });
                    temp = 1;
                } 
                if(temp === 0)
                {
                    watchs = watchs.filter((watch) => {
                        return ((watch.Brand.toLowerCase().indexOf(searchName.toLowerCase()) !== -1) 
                            || (watch.MachineType.toLowerCase().indexOf(searchName.toLowerCase()) !== -1) 
                            || (watch.WireType.toLowerCase().indexOf(searchName.toLowerCase()) !== -1) 
                            || (searchName.toLowerCase().indexOf(watch.Brand.toLowerCase()) !== -1) 
                            || (searchName.toLowerCase().indexOf(watch.MachineType.toLowerCase()) !== -1) 
                            || (searchName.toLowerCase().indexOf(watch.WireType.toLowerCase()) !== -1))
                    });
                }
            }
            
        }
        if(radioBrand){                     //lọc giá trị Brand
            watchs = watchs.filter((watch) => {
                return watch.Brand.indexOf(radioBrand) !== -1
            });
        }
        if(radioMachineType){               //lọc giá trị MachineType
            watchs = watchs.filter((watch) => {
                return watch.MachineType.indexOf(radioMachineType) !== -1
            });
        }
        if(radioWireType){                  //lọc giá trị WireType
            watchs = watchs.filter((watch) => {
                return watch.WireType.indexOf(radioWireType) !== -1
            });
        }
        if(radioPrice)                      //Lọc giá của sản phẩm
        {
            if(radioPrice == 1)
            {
            watchs = watchs.filter((watch) => {
                return (watch.Price > 0 && watch.Price < 5000000);
            });
            } 
            if(radioPrice == 2)
            {
            watchs = watchs.filter((watch) => {
                return (watch.Price >= 5000000 && watch.Price < 10000000);
            });
            }                      
            if(radioPrice == 3)
            {
            watchs = watchs.filter((watch) => {
                return (watch.Price >= 10000000 && watch.Price < 15000000);
            });
            } 
            if(radioPrice == 4)
            {
            watchs = watchs.filter((watch) => {
                return (watch.Price >= 15000000 && watch.Price < 20000000);
            });
            } 
            if(radioPrice == 5)
            {
            watchs = watchs.filter((watch) => {
                return (watch.Price >= 20000000);
            });
            } 
        }
        if(sortPrice === 1)
        {
            watchs.sort((a,b) => {
                return a.Price - b.Price;
            })
        }
        if(sortPrice === -1)
        {
            watchs.sort((a,b) => {
                return b.Price - a.Price;
            })
        }
        let showWatchs = null
        if(watchs.length > 0)               //show ra các watch item
        {
            showWatchs = watchs.map((watch, index) => {
              if(watch.QuantityInStock != 0)
              {
                return (<WatchItem 
                    key = {index}
                    watch = {watch}
                    index = {index}
                    onShopping = {this.onShopping}
                />)
              }
            })
        } else
        {
            showWatchs = <div class="alert alert-info">
                            <strong>Info!</strong> Không tìm thấy sản phẩm.
                        </div>
        }
        return (
            <div className="product-main grid">
              <div className="product-brand margin">
                <div className="header-title">Thương hiệu</div>
                <a className="product-brand__link"><img src="/assets/img/brand1.png" className="product-brand__img" /></a>
                <a className="product-brand__link"><img src="/assets/img/brand2.png" className="product-brand__img" /></a>
                <a className="product-brand__link"><img src="/assets/img/brand3.png" className="product-brand__img" /></a>
                <a className="product-brand__link"><img src="/assets/img/brand4.png" className="product-brand__img" /></a>
                <a className="product-brand__link"><img src="/assets/img/brand5.png" className="product-brand__img" /></a>
                <a className="product-brand__link"><img src="/assets/img/brand6.png" className="product-brand__img" /></a>
                <a className="product-brand__link"><img src="/assets/img/brand7.png" className="product-brand__img" /></a>
                <a className="product-brand__link"><img src="/assets/img/brand8.png" className="product-brand__img" /></a>
                <a className="product-brand__link"><img src="/assets/img/brand9.png" className="product-brand__img" /></a>
                <a className="product-brand__link"><img src="/assets/img/brand10.png" className="product-brand__img" /></a>
                <a className="product-brand__link"><img src="/assets/img/brand11.png" className="product-brand__img" /></a>
              </div>
              <div className="product-cat row">
                <div className="product-cat-left col-3">
                  <div className="product-cat-left__filter">
                    <div className="filter__name">
                      THƯƠNG HIỆU
                    </div>
                    <div className="filter__select">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="radioBrand" value = '' onChange = {this.onChange} id="CheckBrand1" />
                        <label className="form-check-label" htmlFor="CheckBrand1">
                          Tất cả
                        </label>
                      </div>
                      {chooseBrand}
                    </div>
                    <div className="filter__name">
                      MỨC GIÁ
                    </div>
                    <div className="filter__select">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="radioPrice" value = {0} onChange = {this.onChange} id="CheckBrand1" />
                        <label className="form-check-label" htmlFor="CheckBrand1">
                          Tất cả
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="radioPrice" value = {1} onChange = {this.onChange} id="CheckBrand1" />
                        <label className="form-check-label" htmlFor="CheckBrand1">
                          0đ -> 5.000.000đ
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="radioPrice" value = {2} onChange = {this.onChange} id="CheckBrand1" />
                        <label className="form-check-label" htmlFor="CheckBrand1">
                          5.000.000đ -> 10.000.000đ
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="radioPrice" value = {3} onChange = {this.onChange} id="CheckBrand1" />
                        <label className="form-check-label" htmlFor="CheckBrand1">
                          10.000.000đ -> 15.000.000đ
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="radioPrice" value = {4} onChange = {this.onChange} id="CheckBrand1" />
                        <label className="form-check-label" htmlFor="CheckBrand1">
                          15.000.000đ -> 20.000.000đ
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="radioPrice" value = {5} onChange = {this.onChange} id="CheckBrand1" />
                        <label className="form-check-label" htmlFor="CheckBrand1">
                          > 20.000.000đ 
                        </label>
                      </div>
                    </div>
                    <div className="filter__name">
                      LOẠI MÁY
                    </div>
                    <div className="filter__select">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="radioMachineType" value = '' onChange = {this.onChange} id="CheckBrand1" />
                        <label className="form-check-label" htmlFor="CheckBrand1">
                          Tất cả
                        </label>
                      </div>
                      {chooseMachineType}
                    </div>
                    <div className="filter__name">
                      LOẠI DÂY
                    </div>
                    <div className="filter__select">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="radioWireType" value = '' onChange = {this.onChange} id="CheckBrand1" />
                        <label className="form-check-label" htmlFor="CheckBrand1">
                          Tất cả
                        </label>
                      </div>
                      {chooseWireType}
                    </div>
                  </div>
                </div>
                <div className="product-cat-right col-9">
                  <div className="product-cat-right__header">
                    <span>Sắp xếp theo</span>
                    <div className="dropdown">
                      <a className="dropdown--modify btn btn-outline-warning dropdown-toggle btn-lg" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Giá
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a className="dropdown-item btn-lg" onClick={() => this.setState({sortPrice : 1})}>Tăng dần</a></li>
                        <li><a className="dropdown-item btn-lg" onClick={() => this.setState({sortPrice : -1})}>Giảm dần</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="home-products__container container">
                    <div className="row py-5">
                      {showWatchs}
                    </div>
                  </div>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                      <li className="page-item disabled">
                        <a className="page-link">Trang trước</a>
                      </li>
                      <li className="page-item"><a className="page-link">1</a></li>
                      <li className="page-item"><a className="page-link">2</a></li>
                      <li className="page-item"><a className="page-link">3</a></li>
                      <li className="page-item">
                        <a className="page-link">Trang sau</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        watchs : state.watch.watchList,
        addWatch : state.watch.addWatch,
        fixWatch : state.watch.fixWatch,
        infoUser : state.user.infoUser,
        cartList : state.cart.cartList
  }
}
export default connect(mapStateToProps)(withRouter(ProductAll));
