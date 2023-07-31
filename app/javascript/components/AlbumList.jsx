import React from "react";
import toast, { Toaster } from 'react-hot-toast';

export default ({albums, setAlbums, withFavourites}) => {
  const addFavouritesRequest = (item) => {
    fetch('/api/v1/favourites/create', {
      method: 'POST',
      body: JSON.stringify({
        favourite: item
      }),
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        'Content-type': 'application/json; charset=UTF-8',
      },      
    })
    .then(response => response.json())
    .then(json => {
      return json.status === "success" ?
        toast.success(json.message) :
        toast.error(json.message)
    })
  }

  const removeFavouritesRequest = (item) => {
    fetch(`api/v1/favourites/destroy/${item.id}`, { 
      method: 'DELETE',
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
      },    
    })
    .then(response => response.json())
    .then(json => toast.success(json.message))
    .then(removeAlbumFromList(item))
  }  

  const removeAlbumFromList = (item) => {
    setAlbums(albums.filter(album => album.id !== item.id))
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {albums && albums.map(function (item) {
        return (
          <div
            key={item.leading_thumbnail_url}
            className="card-album"
          >
            <img 
              width="100"
              height="100"
              src={item.leading_thumbnail_url}
              className="card-image"
            />
            <h5>{item.title}</h5>
            <p>{item.subtitle}</p>

            { withFavourites ? (
              <button className="favourites-button" onClick={() => addFavouritesRequest(item)}>
                <span className="favourites-text">Add to Favourites &#9825;</span>
              </button>
            ) : (
              <button className="remove-favourites-button" onClick={() => removeFavouritesRequest(item)}>
                <span className="favourites-text remove-favourites">Remove From Favourites &#9587;</span>
              </button>              
            )}
          </div>
        )
      })}
    </>
  );
}
