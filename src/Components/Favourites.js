import "../App.css";
import React, { useEffect } from "react";
import ResultBox from "./ResultBox";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";

//function displays the list of favorites after getting the user from AuthCntext and displays them in ResultBox component, 
//for every fav in the fav array. If none just displays "No favourites yet"
export default function Favourites() {
  const { favourites, userAdmin } = useAuth();

  useEffect(() => {
    console.log(favourites)
  }, [])

  return (
    <div className="favs-body">
      <Navbar render={false} userAdmin={userAdmin}/>
        <h2 className="subheading" style={{ color: "black", marginLeft: "25px", marginBottom: "0px", marginTop: "20px" }}>Saved Favorites</h2>
      <div className="favs-list">
      {favourites.length === 0 ? (
      <h3>No favorites yet</h3>
      ) : (
        favourites.map((favourite) => (
          <ResultBox
          _id={favourite._id}
          key={favourite.id}
          id={favourite.id}
          title={favourite.title}
          year={favourite.year}
          image={favourite.image}
          />
        ))
      )}
      </div>
    </div>
  );
}
