import "../App.css";
import React, { useState, useEffect } from "react";
import ResultBox from "./ResultBox";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";

function Dashboard() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const { currentUser, userAdmin, logout, favourites } = useAuth();
  const history = useHistory();
  let classToReturn = "fav-btn";

  //function either takes the user back to the logout page or displays an error when log out fails
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  // Function fetches results from the backend according to the term the user inputs and displays them
  function search(term) {
    if (!term || /^ *$/.test(term)){
      setResults([])
    } else {
      fetch('/search/' + term)
      .then((response) => response.json())
      .then((res) => {
        if(!res.Search) {
          setResults([]);
        } else {
          setResults(res.Search);
        }
      })
    }
  }

  //if no favs for the current user displays "No results...", if user has favs in Mongo ResultBox componets are rendered for each
  //fav in the fav array. Also checks which className the heart icon must display
    return (
    <div className="app-body">
      <Navbar render={true} search={search} userAdmin={userAdmin}/>
      <div className="results-div">
      {results.length === 0 ? (
        <h3 className="subheading" style={{ color: "black" }}>No results...</h3>
      ) : (
        results.map(result =>
          <ResultBox
            key={result.imdbID}
            title={result.Title}
            year={result.Year}
            image={result.Poster}
            id={result.imdbID}
            _id={result._id}
            viewType={true}
            clicked={favourites.some(favourite => (favourite.id === result.imdbID)) ? "fav-btn-click" : "fav-btn"}
          />
        )
      )}
      </div>
      <Card>
        <Card.Body className="update-div text-center justify-content-center align-items-center">
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>User Email:</strong> {currentUser.email}
          <Link to="/update-profile" style={{ height: "2em", margin: "auto", fontSize: "0.8em", paddingBottom: "25px" }} className="btn btn-info w-30 ml-3">            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
