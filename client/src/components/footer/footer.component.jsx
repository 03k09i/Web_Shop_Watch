import React, { Component } from "react";
class Footer extends Component {
  render() {
    return (
      <footer className="footer">
            <div className="grid">
            <div className="row">
                <div className="footer__contact margin col">
                <ul className="footer-contact__list">
                    <li className="footer-contact__item">
                    <i className="material-icons" style={{verticalAlign: 'middle'}}>phone_in_talk</i>
                    TƯ VẤN MUA HÀNG: 19000001
                    </li>
                    <li className="footer-contact__item">
                    <i className="material-icons" style={{verticalAlign: 'middle'}}>comment</i>
                    HỖ TRỢ DỊCH VỤ: 19000002
                    </li>
                    <li className="footer-contact__item">
                    <i className="material-icons" style={{verticalAlign: 'middle'}}>handyman</i>
                    TƯ VẤN KỸ THUẬT: 19000003
                    </li>
                </ul>
                </div>
                <div className="margin col">
                <ul className="footer-contact__list">
                    <li className="footer-contact__service footer-contact__localicon-title">
                    CHĂM SÓC KHÁCH HÀNG
                    </li>
                    <li className="footer-contact__service">
                    <a href="#">Về PK Store</a>
                    </li>
                    <li className="footer-contact__service">
                    <a href="#">Hướng dẫn mua hàng</a>
                    </li>
                    <li className="footer-contact__service">
                    <a href="#">Chính sách đổi trả</a>
                    </li>
                    <li className="footer-contact__service">
                    <a href="#">Chính sách bảo hành</a>
                    </li>
                </ul>
                </div>
                <div className="margin col">
                <ul className="footer-contact__list">
                    <li className="footer-contact__localicon footer-contact__localicon-title">
                    ĐỊA CHỈ
                    </li>
                    <li className="footer-contact__localicon">
                    <i className="material-icons" style={{verticalAlign: 'middle'}}>location_on</i>
                    Số 3/4/5 Lê Văn Chí, Thủ Đức, Hồ Chí Minh
                    </li>
                    <li className="footer-contact__localicon">
                    <i className="material-icons" style={{verticalAlign: 'middle'}}>location_on</i>
                    Số 3/4/5 Võ Thị Sáu, An Khê, Đà Nẵng
                    </li>
                    <li className="footer-contact__localicon">
                    <i className="material-icons" style={{verticalAlign: 'middle'}}>location_on</i>
                    Số 3/4/5 Trương Định, Cầu Giấy, Hà Nội
                    </li>
                </ul>
                </div>
                <div className="margin col">
                <div className="footer-contact__localicon-title">JOIN WITH</div>
                <div className="footer__join">
                    <a href="#">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"/>
                    </a>
                    <a href="#">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" />
                    </a>
                    <a href="#">
                    <img src="https://www.pngkey.com/png/full/2-27646_twitter-logo-png-transparent-background-logo-twitter-png.png" />
                    </a>
                </div>
                <img src="../assets/img/dathongbao.png"/>
                </div>
                <span className="footer__license">© 2018. Công ty cổ phần PK Store. GPDKKD: 0303217354 do sở KH &amp; ĐT TP.HCM cấp ngày 02/01/2007. GPMXH: 238/GP-BTTTT do Bộ Thông Tin và Truyền Thông cấp ngày 04/06/2020.</span>
            </div>
            </div>
        </footer>
        
    );
  }
}

export default Footer;
