import React, { Component } from "react";
import {FileView} from '../../../components/admin/fileView.component'
import {getWatchListAction} from '../../../store/actions/watch.action'
import { GetStatistics, GetInventory, GetTop10watch, GetTop10user } from "../../../store/actions/view.action"
import { connect } from "react-redux";

class Report extends Component {
    state = {
        watchs : '',
        statistics : '',
        inventory : '',
        top10watch : '',
        top10user : '',
    }
    async componentWillMount(){
        await this.props.dispatch(getWatchListAction())
        await this.props.dispatch(GetStatistics())
        await this.props.dispatch(GetInventory())
        await this.props.dispatch(GetTop10watch())
        await this.props.dispatch(GetTop10user())
        this.setState({
            watchs : this.props.watchs,
            statistics : this.props.statistics,
            inventory : this.props.inventory,
            top10watch : this.props.top10watch,
            top10user : this.props.top10user,
        })
    }
    render() {
        const {watchs, statistics, inventory, top10watch, top10user} = this.state
        return (
            <div className='report-list'>
                <div className="d-flex justify-content-around report">
                    {watchs ? <FileView data={this.state.watchs} fileName='THÔNG TIN ĐỒNG HỒ' color='warning'/> : ''}
                    {statistics ? <FileView data={this.state.statistics} fileName='THỐNG KÊ HÓA ĐƠN' color='warning'/> : ''}
                    {inventory ? <FileView data={this.state.inventory} fileName='SỐ LƯỢNG ĐỒNG HỒ' color='warning'/> : ''}
                </div>
                <div className="d-flex justify-content-around report my-5">
                    {top10watch ? <FileView data={this.state.top10watch} fileName='TOP 10 ĐỒNG HỒ' color='warning'/> : ''}
                    {top10user ? <FileView data={this.state.top10user} fileName='TOP 10 USER' color='warning'/> : ''}
                    <button type="button" className="btn btn-outline-info">...</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        watchs : state.watch.watchList,
        statistics : state.view.statistics,
        inventory : state.view.inventory,
        top10watch : state.view.top10watch,
        top10user : state.view.top10user,
    }
}
export default connect(mapStateToProps)(Report);
