import React, { Component } from "react";
import { connect } from "react-redux";
import { checkSignInUser, getInfoUser } from "../../store/actions/user.action";
import Cookies from "../../../node_modules/js-cookie/dist/js.cookie";
import { withRouter } from "react-router";

class SignIn extends Component {
    state = {
        UserName : '',
        Password : '',
        checkLogin : {},
    }
    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value
        })
    }
    onSubmit = async(e) => {
        e.preventDefault()
        await this.props.dispatch(checkSignInUser(this.state))
        const {checkUser} = this.props
        this.setState({
            checkLogin : checkUser
        })
        if (this.state.checkLogin.token) {
            Cookies.set("token", this.state.checkLogin.token, {expires : 1});
            this.props.dispatch(getInfoUser(Cookies.get().token))
            this.props.history.goBack();
            // this.props.history.push('/')
        }
    }
    render() {
        const {checkLogin} = this.state
        return (
            <div className="sign-in-htm">
                {checkLogin.status == 'OK' ? <div className="alert alert-success" role="alert">
                                        {checkLogin.message}!
                                    </div>:''}
                <form onSubmit = {this.onSubmit}>
                    <div className="group">
                        <label htmlFor="user" className="label">Tên đăng nhập</label>
                        <input 
                            id="user" 
                            type="text" 
                            className="input" 
                            name = "UserName"
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Mật khẩu</label>
                        <input 
                            id="pass" 
                            type="password" 
                            className="input" 
                            data-type="password" 
                            name = "Password"
                            onChange = {this.onChange}
                        />
                    </div>
                    <div className="group">
                        <input id="check" type="checkbox" className="check" defaultChecked />
                        <label htmlFor="check"><span className="icon" /> Giữ đăng nhập</label>
                    </div>
                    {checkLogin.status && checkLogin.status != 'OK' ? <div className ="alert alert-warning">
                                                <strong>Warning!</strong> {checkLogin.message} .
                                            </div>:''}
                    <div className="group">
                        <input type="submit" className="button" defaultValue="Đăng Nhập" />
                    </div>
                    <div className="foot-lnk">
                        <a href="#forgot">Quên mật khẩu?</a>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        checkUser : state.user.checkUser,
    }
}
export default connect(mapStateToProps)(withRouter(SignIn));
