import React, {Component} from 'react'
import { Switch, Route } from 'react-router';
import UserManage from '../pages/admin/userManage/userManage.admin';
import WatchManage from '../pages/admin/watchManage/watchManage.admin';
import Dashboard from '../views/Dashboard';
import {TheHeader} from './index'
import { CContainer} from '@coreui/react'
import './TheLayout.scss'
import '../scss/style.scss';
import Report from '../pages/admin/reportManage/report.pages';

class TheLayout extends Component {
  
  render() {
    const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )
    return (
      
        <div className="c-app c-default-layout layoutCSS" style={{fontSize:16}}>
        <div className="c-wrapper">
          <TheHeader/>
          <div className="c-body">
            <main className="c-main">
            <CContainer fluid>
            {/* <TheContent/> */}
            {/* <WatchManage/> */}
            <Switch>
              <Route path='/admin/dashboard' exact={false}><Dashboard/></Route>
              <Route path='/admin/watch' exact={false}><WatchManage/></Route>
              <Route path='/admin/user' exact={false}><UserManage/></Route>
              <Route path='/admin/report' exact={false}><Report/></Route>
            </Switch>
            </CContainer>
          </main>
          </div>
        </div>
      </div>
      
    );
  }
}
export default TheLayout