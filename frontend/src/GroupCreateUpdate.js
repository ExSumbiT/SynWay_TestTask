import React, { Component } from 'react';
import GroupsApi from "./Groups";
import {useParams} from "react-router-dom";

const groupsApi = new GroupsApi();

class GroupCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { params } = this.props;
        if(params && params.pk)
        {
          groupsApi.getGroup(params.pk).then((c)=>{
            this.refs.id.value = c.id;
            this.refs.name.value = c.name;
            this.refs.description.value = c.description;
          })
        }
      }

      handleCreate(){
        groupsApi.createGroup(
          {
            "name": this.refs.name.value,
            "description": this.refs.description.value
        }
        ).then((result)=>{
          alert("Group created!");
          window.location = "/"
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        groupsApi.updateGroup(
          {
            "id": pk,
            "name": this.refs.name.value,
            "description": this.refs.description.value
        }
        ).then((result)=>{
          console.log(result);
          alert("Group updated!");
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
          <div className="form-group">
            <label>
              Name:</label>
              <input className="form-control" type="text" ref='name' />
            <label>
              Description:</label>
              <textarea className="form-control" ref='description' ></textarea>


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
export default withRouter(GroupCreateUpdate);