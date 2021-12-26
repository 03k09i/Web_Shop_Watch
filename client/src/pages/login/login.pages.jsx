import React, { Component } from "react";
import SignUp from '../../components/signUp/signUp.component'
import SignIn from '../../components/signIn/signIn.component'
class Login extends Component {
    render() {
        return (
            <div class="login__model">
                <div className="login-wrap">
                    <div className="login-html">
                        <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Đăng Nhập</label>
                        <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Đăng Kí</label>
                        <div className="login-form">
                            {/* FORM ĐĂNG NHẬP */}
                            <SignIn/>
                            {/* FORM ĐĂNG KÍ */}
                            <SignUp/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
