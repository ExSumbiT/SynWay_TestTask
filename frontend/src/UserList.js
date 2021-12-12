import React, {Component} from 'react';
import UsersApi from "./Users";
import GroupsApi from "./Groups";

const userApi = new UsersApi();
const groupApi = new GroupsApi();


function getGroupName(group_list ,id) {
    for(const g in group_list){
        if(group_list[g].id === id){
            return group_list[g].name
        }
    }
}

function splitDate(c_date){
    const c_date_obj = new Date(c_date)
    return c_date_obj.toISOString().split('T')[0] + ' ' + c_date_obj.toISOString().split('T')[1].split('.')[0]
}


class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            groups: []
        };
        this.handleDelete = this.handleDelete.bind(this)
    }
    
    componentDidMount() {
    var  self  =  this;
    groupApi.getGroups().then(function (result) {
        console.log(result);
        self.setState({ groups:  result.data})})
    userApi.getUsers().then(function (result) {
        console.log(result);
        self.setState({ users:  result.data})
    });
}
handleDelete(e,pk){
    var  self  =  this;
    userApi.deleteUser({id :  pk}).then(()=>{
        var  newArr  =  self.state.users.filter(function(obj) {
            return  obj.id  !==  pk;
        });

        self.setState({users:  newArr})
    });
}

render() {

    return (
        <div  className="Users_list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Created At</th>
                <th>Group</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.users.map( c  =>
                <tr  key={c.id}>
                <td>{c.id}  </td>
                <td>{c.username}</td>
                <td>{splitDate(c.created_at)}</td>
                <td>{getGroupName(this.state.groups, c.group_id)}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.id) }> Delete</button>
                <a  href={"/user/" + c.id}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
        </div>
        );
  }
}

export default UsersList;