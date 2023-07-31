import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlbumList from "./AlbumList";

export default () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const query = queryParameters.get("q")

  const [inputText, setInputText] = useState(query);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const [albums, setAlbums] = useState(null);

  const searchRequest = () => {
    setAlbums(null);

    fetch(`/api/v1/search?q=${inputText}`)
    .then(response => response.json())
    .then(json => setAlbums(json))
    .catch(error => console.error(error));
  }

  useEffect(() => {
    searchRequest();
  }, []);

  return (
    <>
      <div className="menu-container">
        <Link className="btn btn-lg custom-button" to="/favourites">Favourites</Link>
      </div>
      <div className="offset-md-2 col-md-8 col-xl-6 offset-xl-3">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Music Search</h1>
            <div className="searchBar-search">
              <input 
                id="searchQueryInput"
                type="text"
                name="searchQueryInput"
                placeholder="Search by Album or Artist"
                onChange={handleChange}
                value={inputText}
              />
              <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit" onClick={searchRequest}>
                <svg className="svg-24" viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
              </button>
            </div>
            <hr className="my-4" />
            <div className="search-results">
              { albums ? (
                <>
                  {albums.length ? (
                    <AlbumList albums={albums} withFavourites/>
                    ): (
                      "No results for your search."
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
