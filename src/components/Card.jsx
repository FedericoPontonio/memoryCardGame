import { useState, useEffect } from "react";
import '../styles/Card.css';

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function Card({id, handleClick}) {

    const [imageUrl, setImageUrl] = useState(null);
    const [pokèmonName, setPokèmonName] = useState(null);
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + id; //up to 1025
  
    // Use useEffect to make the API request when the component mounts
    useEffect(() => {
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setImageUrl(data.sprites.front_default); // Store the image URL in state
          setPokèmonName(data.name)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [apiUrl]); // Empty dependency array to run the effect only once (when the component mounts)

    return (
        <div className="Card">
        {
        imageUrl ? (
          <div className="CardInner">
            <div className="frontFace">
              <div className="pokèmonName">{pokèmonName.toUpperCase()}</div>
              <img src={imageUrl} alt="pokèmon" onClick={()=>{handleClick(id); }} />
            </div>
            <div className="backFace">
              <img src="../../public/pokècardBack.jpg" alt="pokècardBack" />
            </div>
        </div>
        
      ) : 
        (<p>Loading pokèmon...</p>)
        }
        </div>
    )
}