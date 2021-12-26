import React, { Component } from "react";

class Cskh extends Component {
    render() {
        return (
            <div className="home grid">
                <div className="home__contact margin">
                    <div className="row">
                    <div className="header-title text-center">
                        LIÊN HỆ
                    </div>
                    <table className="table table-borderless contact__table">
                        <tbody>
                        <tr>
                            <th scope="row">
                            <box-icon name="phone-call" animation="tada" color="#e11316" />
                            TƯ VẤN MUA HÀNG:
                            </th>
                            <th>
                            19000003
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">
                            <box-icon name="phone-call" animation="tada" color="#e11316" /> HỖ TRỢ DỊCH
                            VỤ:
                            </th>
                            <th>19000002</th>
                        </tr>
                        <tr>
                            <th scope="row">
                            <box-icon name="phone-call" animation="tada" color="#e11316" /> TƯ VẤN KỸ
                            THUẬT:
                            </th>
                            <th>19000003</th>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    <div className="row">
                    <div className="header-title text-center py-5">
                        ĐỊA CHỈ
                    </div>
                    <div className="row">
                        <div className="margin style col-5">
                        <ul className="footer-contact__list">
                            <li className="footer-contact__localicon text-black fs-3">
                            <i className="material-icons" style={{verticalAlign: 'middle'}}>location_on</i>
                            Số 3/4/5 Lê Văn Chí, Thủ Đức, Hồ Chí Minh
                            </li>
                            <li className="footer-contact__localicon text-black fs-3">
                            <i className="material-icons" style={{verticalAlign: 'middle'}}>location_on</i>
                            Số 3/4/5 Võ Thị Sáu, An Khê, Đà Nẵng
                            </li>
                            <li className="footer-contact__localicon text-black fs-3">
                            <i className="material-icons" style={{verticalAlign: 'middle'}}>location_on</i>
                            Số 3/4/5 Trương Định, Cầu Giấy, Hà Nội
                            </li>
                        </ul>
                        </div>
                        <div className="col-7">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15676.106168156171!2d106.72666342380147!3d10.809278953843931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527ff2489f2b1%3A0xbd49afd78718b2aa!2sDALALAND%20Saigon%20Coffee!5e0!3m2!1svi!2s!4v1637744448660!5m2!1svi!2s" width="100%" height={450} style={{border: 0}} allowFullScreen loading="lazy">
                        </iframe>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Cskh;
