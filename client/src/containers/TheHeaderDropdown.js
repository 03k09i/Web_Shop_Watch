import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {CHeaderNavLink} from '@coreui/react'
import Cookies from "../../node_modules/js-cookie/dist/js.cookie";

const TheHeaderDropdown = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src='../assets/img/logo.jpg'
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong style={{fontSize:'1.7rem'}}>Tài khoản</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user"className="mfe-2" />
          <CHeaderNavLink to="/" style={{fontSize:'1.7rem'}}>Trang chủ</CHeaderNavLink>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          <CHeaderNavLink to="/login" style={{fontSize:'1.7rem'}} onClick={()=>{Cookies.remove('token')}}>Đăng xuất</CHeaderNavLink>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
