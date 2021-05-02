import "../App.css";
import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import UserInfo from "./UserInfo";


/* Admin function uses functions from the AuthContext to check users in DB and display them to the admin who can then make users
an admin or delete them from MOngo */
export default function Admin() {
  const { userAdmin, userList, getAllUsers } = useAuth();

  useEffect(() => {
    console.log(userList)
  })

  return (
    <>
    <div className="admin-body">
      <Navbar render={false} userAdmin={userAdmin}/>
    </div>
    <Card>
    <Card.Body>
      <div className="admin-header">
        <h3 className="admin-username">Username</h3>
        <h3 className="admin-admin-switch">Admin</h3>
        <h3 className="admin-remove-user">Remove User</h3>
      </div>
      {userList.map(user => 
        <UserInfo 
          key={user.id}
          username={user.username} 
          role={user.role}
          getAllUsers={() => getAllUsers()}>
        </UserInfo>
      )}
    </Card.Body>
  </Card>
  </>
  );
}
