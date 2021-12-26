import React, { Component } from "react";
import {connect} from 'react-redux'
import WatchAdd from "../../../components/admin/watchAdd.component";
import WatchItem from "../../../components/admin/watchItem.component";
import {getWatchListAction} from '../../../store/actions/watch.action'
import {deleteWatchListAction} from '../../../store/actions/watch.action'
import { deleteDiscountListAction } from "../../../store/actions/discount.action";

class WatchManage extends Component {
    state = {
        searchName : '',
        addWatch : '',
        fixWatch : '',
        watchs : '',
        checkAdd : -1,
    }
    async componentWillMount(){
        await this.props.dispatch(getWatchListAction())
        this.setState({
            watchs : this.props.watchs,
        })
    }
    async componentDidUpdate(){
        if((this.props.addWatch !== this.state.addWatch)||(this.props.fixWatch !== this.state.fixWatch)){
            await this.props.dispatch(getWatchListAction())
            this.setState({
                addWatch : this.props.addWatch,
                fixWatch : this.props.fixWatch,
                watchs : this.props.watchs
            })
        }
    }
    onDelete = async(id) => {
        await this.props.dispatch(deleteDiscountListAction(id))
        this.props.dispatch(deleteWatchListAction(id))
    }
    showWatch = (watchs) => {
        var result = null
        if(watchs.length > 0)
        {
            result = watchs.map((watch, index) => {
                return (
                    <WatchItem 
                        key = {index}
                        watch = {watch}
                        index = {index}
                        onDelete = {this.onDelete}
                    />
                )
            })
        }
        return result;
    }
    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name] : value
        })
    }
    render() {
        let {watchs, checkAdd} = this.state
        const {searchName} = this.state
        if(searchName){
            watchs = watchs.filter((watch) => {
                return watch.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1
            });
        }
        return (
            <div>
                <div className="row d-block justify-content-center my-5 align-middle">
                    <button type="button" className="btn btn-danger" style={{width:200}} onClick = {() => this.setState({
                        checkAdd : -checkAdd
                    })}><h3><box-icon name='plus'></box-icon>Thêm sản phẩm</h3></button>
                </div>
                <div className="row d-flex justify-content-center grid-form mx-auto">     {/*Quản lý sản phẩm*/}
                    {checkAdd == '1'?<WatchAdd />:''}
                </div>
                    
                <div className="row d-flex justify-content-center">     {/*Quản lý sản phẩm*/}
                    <table className="table table-bordered" style={{backgroundColor:'white'}}>
                        <thead>
                            <tr>
                                <th className = "text-center">STT</th>
                                <th className = "text-center">ID</th>
                                <th className = "text-center">Tên đồng hồ</th>
                                <th className = "text-center">Thương hiệu</th>
                                <th className = "text-center">Loại máy</th>
                                <th className = "text-center">Loại dây</th>
                                <th className = "text-center">Giá</th>
                                <th className = "text-center">Khuyến mãi</th>
                                <th className = "text-center">Số lượng</th>
                                <th className = "text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showWatch(watchs)}
                        </tbody>
                    </table> 
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
    }
}
export default connect(mapStateToProps)(WatchManage);
