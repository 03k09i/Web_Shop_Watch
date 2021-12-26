import React, { Component } from "react";

class UserDetails extends Component {
    render() {
        return (
            <div>
                <div className="row d-flex justify-content-center">
                    Chi tiết đơn hàng: Phan Nguyễn Chu Kiệt
                </div>
                <div className="row d-flex justify-content-center">     {/*Quản lý người dùng*/}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className = "text-center">STT</th>
                                <th className = "text-center">Tên sản phẩm</th>
                                <th className = "text-center">số lượng</th>
                                <th className = "text-center">Đơn giá</th>
                                <th className = "text-center">Tổng giá</th>
                                <th className = "text-center">Ngày thanh toán</th>
                                <th className = "text-center">Phương thức thanh toán</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>
                                    <input type="text" className="form-control" aria-describedby="helpId"/>
                                </th>
                                <th>
                                    <input type="text" className="form-control" aria-describedby="helpId"/>
                                </th>
                                <th></th>
                                <th>
                                    <select className="form-control">
                                        <option>Tất cả</option>
                                        <option>Tăng dần</option>
                                        <option>Giảm dần</option>
                                    </select>
                                </th>
                                <th>
                                    <input type="text" className="form-control" aria-describedby="helpId"/>
                                </th>
                                <th>
                                    <select className="form-control">
                                        <option>Tất cả</option>
                                        <option>Tăng dần</option>
                                        <option>Giảm dần</option>
                                    </select>
                                </th>
                            </tr>
                            <tr>
                                <th className = "text-center">1</th>
                                <th>Guitar den</th>
                                <th className = "text-center">2</th>
                                <th className = "text-center"><span >1.500.000</span></th>
                                <th className = "text-center"><span >3.000.000</span></th>                            
                                <th className = "text-center"><span >30/08/2021</span></th>
                                <th className = "text-center"><span >Chuyển khoảng</span></th>
                            </tr>
                        </tbody>
                    </table>  
                </div>
            </div>
        );
    }
}

export default UserDetails;
