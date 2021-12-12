import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'

import  GroupsList from './GroupList'
import GroupCreateUpdate from "./GroupCreateUpdate";
import  UsersList from './UserList'
import UserCreateUpdate from "./UserCreateUpdate";
import './App.css';


const BaseLayout = () => (
  <div className="container-fluid">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/">Test Task</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="navbar-brand" href="/">Groups</a>
      <a className="navbar-brand" href="/group">Create Group</a>
      <a className="navbar-brand" href="/users">Users</a>
      <a className="navbar-brand" href="/user">Create User</a>

    </div>
  </div>
</nav>

    <div className="content">
      <Routes>
      <Route path="/" exact element={<GroupsList />} />
      <Route path="/group/:pk"  element={<GroupCreateUpdate />} />
      <Route path="/group" exact element={<GroupCreateUpdate />} />
      <Route path="/users" exact element={<UsersList />} />
      <Route path="/user" exact element={<UserCreateUpdate />} />
      <Route path="/user/:pk"  element={<UserCreateUpdate />} />
      </Routes>
    </div>

  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
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
export default withRouter(App);