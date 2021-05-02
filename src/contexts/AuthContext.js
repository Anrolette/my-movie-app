import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import firebase from "firebase/app";


/* AuthContext includes all the functions needed for all 3 login methods as well as sign up, reset password, logout, update email,
update password, check which user is logged in to get their favourites list as saved in MongoDB, gets the user role as saved in Mongo (
  including the users favorites list) and adds a user from the login to the user list on MongoDB.  */
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userAdmin, setUserAdmin] = useState(false);
  const [userList, setUserList] = useState([]);
  const [favourites, setFavourites] = useState([]);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  async function loginGoogleRef() {
    let provider = new firebase.auth.GoogleAuthProvider();
    await tryLogin(provider);
  }

  async function loginFacebookRef() {
    let provider = new firebase.auth.FacebookAuthProvider();
    await tryLogin(provider);
  }

  function logout() {
    sessionStorage.clear()
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  async function tryLogin(provider){
      await auth.signInWithPopup(provider)
      .then(() => {
      }).catch((error) => {
          console.log(error)
      });
  }

  function getAllUsers() {
    fetch(`/users/all`)
    .then(res => res.json())
    .then(response => setUserList(response))
  }

  async function getUserRole(email) {
    console.log('get role')
    await fetch(`/users/login?username=${email}`)
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      )
      .then(
        async (response) => {
          if (response.status === 404) {
            if(email){
              await addUserToMongo(email);
            }            
          } else if (response.status === 500) {
            console.log("server error");
          } else {
            sessionStorage.setItem("token", response.body.token);
            let payload = JSON.parse(atob(response.body.token.split(".")[1]));
            if (payload.role === 'admin'){
              setUserAdmin(true);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async function addUserToMongo(email) {
    console.log('Add to mongo')
    await fetch(`/users/register?username=${email}`, {
      method: "POST",
    }).then(
      (response) => {
        if (response.status === 500) {
          console.log("server error");
        } else {
          console.log("user added");
          getUserRole();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function getFavourites(email){
    fetch(`/favourite/all/` + email)
    .then(res => res.json())
    .then(response => {
      console.log(response)
      if (response == 'status: 404' || response == 'status: 500') {
        setFavourites([])
      } 
      else {
        setFavourites(response)
      }
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      if (user){
        getUserRole(user.email)      
        getFavourites(user.email)
      }
      setLoading(false)
      getAllUsers()
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userAdmin,
    userList,
    favourites,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    loginGoogleRef,
    loginFacebookRef,
    setUserAdmin,
    getFavourites,
    getAllUsers
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}