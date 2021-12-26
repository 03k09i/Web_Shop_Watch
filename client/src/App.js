import React, { Component } from 'react';
// import './scss/style.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cookies from "../node_modules/js-cookie/dist/js.cookie";
import Home from "./pages/home/home.pages";
import Cart from "./pages/cart/cart.pages"
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import ProductDetails from "./pages/product/productDetails.pages";
import ProductAll from "./pages/product/productAll.pages";
import Login from "./pages/login/login.pages";
import HistoryShopping from "./pages/historyShopping/historyShopping.pages"
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { useEffect, useState } from "react";
import User from "./pages/user/user.pages";
import News from "./pages/home/news.pages";
import Cskh from "./pages/home/cskh.pages";
import NotFound from "./pages/notFound/notFound.pages";
import TheLayout from './containers/TheLayout'

function App(props) {
    const [token, settoken] = useState();
    const verifyRole = () => {
        if (props.infoUser) {
            return (
                <Route path="/admin" exact={false}>
                    {props.infoUser.Role == "Admin" ? <TheLayout/>  : <Redirect to="/" />}
                </Route>
            )
        }
    }
    const verifyCart = () => {
        if (props.infoUser) {
            return (
                <Route path="/cart" exact={false}>
                    {routerHF(props.infoUser ? <Cart /> : <Redirect to="/login" />)}
                </Route>
            )
        }
    }
    const verifyUser = () => {
        if (props.infoUser) {
            return (
                <Route path="/user" exact={false}>
                    {routerHF(props.infoUser ? <User /> : <Redirect to="/login" />)}
                </Route>
            )
        }
    }
    const verifyHistory = () => {
        if (props.infoUser) {
            return (
                <Route path="/historyShopping" exact={false}>
                    {routerHF(props.infoUser ? <HistoryShopping /> : <Redirect to="/login" />)}
                </Route>
            )
        }
    }

    const verifyLogin = () => {
        if (!props.infoUser) {
            return (
                <Route path="/login" exact={false}>
                    {routerHF(!props.infoUser ? <Login /> : <Redirect to="/" /> )}
                </Route>
            )
        }
    }
    const routerHF = (pages) => {
        return (<><Header />
                {pages}
                <Footer /></>)
    }
    useEffect(() => {
        if(Cookies.get('token') && Cookies.get().token != token)
        {
            settoken(Cookies.get().token)
        }
    }, [token,props])
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true}>
                {routerHF(<Home/>)}
            </Route>
            {verifyRole()}
            {verifyUser()}
            {verifyCart()}
            {verifyHistory()}
            {/* {verifyLogin()} */}
            <Route path="/login" exact={false}>
                {routerHF(<Login />)}
            </Route>
            <Route path="/productDetails/:ID" exact={false}>
                {routerHF(<ProductDetails />)}
            </Route>
            <Route path="/productAll" exact={false}>
                {routerHF(<ProductAll />)}
            </Route>
            <Route path="/productSearch/:name" exact>
                {routerHF(<ProductAll />)}
            </Route>
            <Route path="/news" exact={false}>
                {routerHF(<News />)}
            </Route>
            <Route path="/cskh" exact={false}>
                {routerHF(<Cskh />)}
            </Route>
            
            <Route path='' exact={false}>
                {routerHF(<NotFound />)}
            </Route>
            
        </Switch>
    </BrowserRouter>
  );

}
const mapStateToProps = state => {
    return {
        infoUser : state.user.infoUser
    }
}
export default connect(mapStateToProps)(App);

