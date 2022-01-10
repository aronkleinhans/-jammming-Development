import React from "react";
import TrackList from "../TrackList/TrackList";
import "./PlayList.css";

class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
      <input defaultValue={"New Playlist"}/>
        {/*tracklist component goes here*/}
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }  
}

export default Playlist;