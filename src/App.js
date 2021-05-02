import React from "react";
import Signup from "./Components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import UpdateProfile from "./Components/UpdateProfile";
import Dashboard from "./Components/Dashboard";
import Admin from "./Components/Admin";
import Favourites from "./Components/Favourites";

//App function that returns all the compenents needed in the UI, we specify which paths and which components to use for each route
function App() {
  return (
        <div>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/admin" component={Admin} />
                <Route path="/favourites" component={Favourites} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
  );
}

export default App;
