import "../App.css";
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";

//function to handle the userinfo anabling the admin to set user roles or delete user form Mongo DB
export default function UserInfo(props) {

  async function userRoleSwitch () {
    let newRole;
    if (props.role === 'user') {
      newRole = 'admin'
    } else {
      newRole = 'user'
    }
    console.log(newRole)
    await fetch(`/users/edit?username=` + props.username + `&role=` + newRole, {
      method: "PUT",
    })
    .then(res => {
      if(res.status === 200){
        props.getAllUsers();
      }
    })       
  };

  async function deleteUser(){
    await fetch(`/users/delete?username=` + props.username, {
      method: "DELETE",
    })
    .then(res => {
      if(res.status === 200){
        props.getAllUsers();
      }
    }) 
  }

  return (
    <div className="user-info-body">
      <h5 className="username">{props.username}</h5>
      <label className="switch">
        <input type="checkbox" checked={props.role === 'admin' ? 'checked' : ''} onClick={userRoleSwitch}></input>
        <span className="slider round"></span>
      </label>
      <Button className="delete-user-button" onClick={deleteUser}>Remove User</Button>
    </div>
  );
}
