import React, { useState, useEffect } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Card, Button } from "react-bootstrap";
import InfoModal from "./InfoModal";
import { useAuth } from "../contexts/AuthContext";

//This function handles & displays everythign that happens with our search results after reciveing
//them from the backend API call
function ResultBox(props) {
  const [clicked, setClicked] = useState(props.clicked);
  const [showInfo, setShowInfo] = useState(false);
  const [description, setDescription] = useState('');
  const { currentUser, getFavourites } = useAuth();

  //this function  handles changing the colours of the ehart icon when its been clicked, and
  //calls the addToFav function execution
  async function favoriteClick() {
    await addToFav();
    if (clicked === "fav-btn") {
      setClicked("fav-btn-click");
    } else {
      setClicked("fav-btn");
    }
  };

  //function to add a result to the favorites list of the current User in MongoDB
  async function addToFav() {
    await fetch(`/favourite/add?username=` + currentUser.email + 
    `&id=` + props.id + 
    `&title=` + props.title + 
    `&image=` + props.image + 
    `&year=` + props.year, {
      method: "POST",
    })
    .then(response => {
      if (response.status === 200){
        getFavourites(currentUser.email);
      }
    })    
  };

  //function to delete a result to the favorites list of the current User in MongoDB
  async function removeFromFav() {
    console.log(props._id)
    await fetch(`/favourite/delete/` + props._id, {
      method: "DELETE",
    })
    .then(response => {
      if (response.status === 200){
        alert("Removed")
      }
      console.log(response)
    })
    getFavourites(currentUser.email);
  };

  async function viewModel() {
    await fetch('/search/movie/' + props.id)
    .then(response => response.json())      
    .then((res) => {
      if(!res.Plot) {
        setDescription('');
      } else {
        setDescription(res.Plot);
      }
    });
    setShowInfo(true);
  };

  //We return a "item" that includes the movie Name and image. The heart icons for adding it to your favorites,
  //and the trashcan icon, accesible on ly in favorites view is to delete the items from the favourites list
  return (
      <Card className="result-box">
      <InfoModal 
        show={showInfo} 
        hide={() => setShowInfo(false)}
        title={props.title}
        description={description}
        image={props.image}
      />
        <Card.Img className="mov-img" variant="top" src={props.image}>
        </Card.Img>
        <Card.Body className="result-body">
          <Card.Text className="movie-title">
            {props.title}
          </Card.Text>
          <Card.Text className="year" >
            {props.year}
          </Card.Text>
          {props.description && <Card.Text className="description" >
            {props.description}
          </Card.Text>}
          {props.viewType && <div>
          <Button variant="primary" size="sm" onClick={viewModel}>View more</Button>
          <FaHeart className={clicked} onClick={favoriteClick} />
          </div>}
          {!props.viewType && <div>
            <FaTrash onClick={removeFromFav}/>
          </div>}
        </Card.Body>
      </Card>
  );
}

export default ResultBox;
