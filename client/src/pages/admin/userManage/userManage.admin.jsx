import React, { Component } from "react";
import {connect} from 'react-redux'
import UserItem from "../../../components/admin/userItem.component";
import {getUserListAction} from '../../../store/actions/user.action'
import {deleteUserListAction} from '../../../store/actions/user.action'

class UserManage extends Component {
    state = {
        searchName : '',
        addUser : '',
        fixUser : ''
    }
    componentDidMount(){
        this.props.dispatch(getUserListAction())
    }
    componentDidUpdate(){
        if((this.props.addUser !== this.state.addUser)||(this.props.fixUser !== this.state.fixUser)){
            this.props.dispatch(getUserListAction())
            this.setState({
                addUser : this.props.addUser,
                fixUser : this.props.fixUser
            })
        }
    }
    onDelete = (id) => {
        this.props.dispatch(deleteUserListAction(id))
    }
    showUser = (users) => {
        var result = null
        if(users.length > 0)
        {
            result = users.map((user, index) => {
                return (
                    <UserItem 
                        key = {index}
                        user = {user}
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
        let {users} = this.props
        return (
            <div>
                <div className="row d-flex justify-content-center">
                    <table className="table table-bordered" style={{backgroundColor:'white'}}>
                        <thead>
                            <tr>
                                <th className = "text-center">STT</th>
                                <th className = "text-center">ID</th>
                                <th className = "text-center">Name</th>
                                <th className = "text-center">Ng??y sinh</th>
                                <th className = "text-center">?????a ch???</th>
                                <th className = "text-center">Email</th>
                                <th className = "text-center">S??? ??i???n tho???i</th>
                                <th className = "text-center">T??n ????ng nh???p</th>
                                <th className = "text-center">M???t kh???u</th>
                                <th className = "text-center">Vai tr??</th>
                                <th className = "text-center">H??nh ?????ng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUser(users)}
                        </tbody>
                    </table> 
                </div>
            </div>
        );
    }
    
}
const mapStateToProps = state => {
    return {
        users : state.user.userList,
        addUser : state.user.addUser,
        fixUser : state.user.fixUser,
    }
}
export default connect(mapStateToProps)(UserManage);
