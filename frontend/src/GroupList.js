import React, { Component } from 'react';
import UsersApi from "./Users";
import GroupsApi from "./Groups";

const userApi = new UsersApi();
const groupApi = new GroupsApi();


function getUserGroup(user_list, id) {
    for(const u in user_list){
        if(user_list[u].group_id === id){
            return true
        }
    }
}

class GroupsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            users: []
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
    if(getUserGroup(this.state.users, pk)){
        alert('User found!')
    }
    else{
    groupApi.deleteGroup({id :  pk}).then(()=>{
        var  newArr  =  self.state.groups.filter(function(obj) {
            return  obj.id  !==  pk;
        });

        self.setState({ groups:  newArr})
    });}
}

render() {

    return (
        <div  className="groups_list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.groups.map( c  =>
                <tr  key={c.id}>
                <td>{c.id}  </td>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.id) }> Delete</button>
                <a  href={"/group/" + c.id}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
        </div>
        );
  }
}

export default GroupsList;