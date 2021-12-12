import React, { Component } from 'react';
import UsersApi from "./Users";
import GroupsApi from "./Groups";
import {useParams} from "react-router-dom";

const usersApi = new UsersApi();
const groupApi = new GroupsApi();

class UserCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        var  self  =  this;
      groupApi.getGroups().then(function (result) {
        console.log(result);
        self.setState({ groups:  result.data})
    });
        const { params } = this.props;
        if(params && params.pk)
        {
          usersApi.getUser(params.pk).then((c)=>{
            this.refs.username.value = c.username;
            this.refs.group_id.value = c.group_id;
          })
        }
      }

      handleCreate(){
        usersApi.createUser(
          {
            "username": this.refs.username.value,
            "group_id": this.refs.group_id.value,
        }
        ).then((result)=>{
          alert("User created!");
          window.location = "/users"
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        usersApi.updateUser(
          {
            "id": pk,
            "username": this.refs.username.value,
            "group_id": this.refs.group_id.value,
        }
        ).then((result)=>{
          console.log(result);
          alert("User updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { params } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-User">
            <label>
              Name:</label>
              <input className="form-control" type="text" ref='username' />
              <label>
              Group:</label>
              <select className="form-control" ref='group_id'>
              {this.state.groups.map( c  =>
                <option key={c.id} value={c.id}>{c.name}</option>
              )}</select>

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}
const withRouter = WrappedComponent => props => {
  const params = useParams();
  return (
      <WrappedComponent
          {...props}
        params={params} />
  );
};
export default withRouter(UserCreateUpdate);