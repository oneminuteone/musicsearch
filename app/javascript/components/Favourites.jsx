import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlbumList from "./AlbumList";

export default () => {
  const [albums, setAlbums] = useState(null);

  const favouritesRequest = () => {
    setAlbums(null);

    fetch('/api/v1/favourites')
    .then(response => response.json())
    .then(json => setAlbums(json.favourites))
    .catch(error => console.error(error));
  }

  useEffect(() => {
    favouritesRequest();
  }, []);

  return (
    <>  
      <div className="menu-container">
        <Link className="btn btn-lg custom-button" to="/">New Search</Link>
      </div>
      <div className="offset-md-2 col-md-8 col-xl-6 offset-xl-3">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Favourites</h1>
            <hr className="my-4" />
            <div className="search-results">
              { albums ? (
                <>
                  {albums.length ? (
                    <AlbumList albums={albums} setAlbums={setAlbums}/>
                    ): (
                      "No favourite albuns."
                    )
                  }
                </>
              ): (
                "Loading..."
              )}
            </div>
          </div>
        </div>
      </div>
    </>
    );
}
