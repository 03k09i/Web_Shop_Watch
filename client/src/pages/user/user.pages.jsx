import React, { Component } from "react";
import {Route,Link, Switch, BrowserRouter as Router} from "react-router-dom";
import {withRouter} from "react-router"
import UserDetails from "../../components/user/userDetails.component";
import ChangePass from "../../components/user/changePass.component";

class User extends Component {
    render() {
        const {url, path} = this.props.match;
        return (
            <div>
                <div className = 'container grid' style={{maxWidth:'50%'}}>
                    <div className="product__tab mt-5 row">
                        <nav> 
                            <div className="nav nav-tabs d-flex justify-content-center" id="nav-tab" role="tablist">
                                <button className="nav-link link-warning active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">THÔNG TIN NGƯỜI DÙNG</button>
                                <button className="nav-link link-warning" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">ĐỔI MẬT KHẨU</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <UserDetails />
                            </div>
                            <div className="product-tab__guide tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                <ChangePass/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <Router>
            //     <div className="product-main grid">
            //         <div className="product-cat row">
            //             <div className="product-cat-left col-3">
            //                 <div className="product-cat-left__filter">
            //                     <div className="filter__name">
            //                         Thông tin cá nhân
            //                     </div>
            //                     <div className="filter__select">
            //                         <div className="form-check">
            //                             <Link to = {`${url}/userDetails`} >Hồ sơ</Link>
            //                         </div>
            //                         <div className="form-check">
            //                             <Link to = {`${url}/changePass`} >Đổi mật khẩu</Link>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //             <div className="product-cat-right col-9">
            //                 <div className="login-wrap">
            //                     <div className="login-html">
            //                         <div className="login-form">
            //                             <Switch>
            //                                 <Route path={`${path}/userDetails`} exact={false}><UserDetails /></Route>
            //                                 <Route path={`${path}/changePass`} exact={false}><ChangePass/></Route>
            //                             </Switch>
            //                         </div>
            //                     </div> 
            //                 </div>    
            //             </div>
            //         </div>
            //     </div>
            // </Router>
    );
  }
}

export default withRouter(User);
