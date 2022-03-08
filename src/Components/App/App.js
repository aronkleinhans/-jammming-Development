import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      playlistName : "> Name Your Playlist <",
      searchResults : [ 
        {
        name : "Occassional Magic",
        artist : 'Yppah',
        album : 'Occassional Magic',
        id : 1,
        URI : "sfdhg;oeriu48455$%%"
        },
        {          
        name : "One more magic potion",
        artist : 'Ensiferum',
        album : 'One more magic potion',
        id : 2,
        URI : "sfdrytryu66655"
        },
        {
          name : "Feast Of Fire",
          artist : "Trivium",
          album : "In The Court Of The Dragon",
          id : 3,
          URI : "444this11Really3245IsRandom!@"
        }
      ],
      playlistTracks : [ 
        {
        name : "Feast Of Fire",
        artist : "Trivium",
        album : "In The Court Of The Dragon",
        id : 3,
        URI : "444this11Really3245IsRandom!@"
        }
      ]
    };
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    else {
      this.setState({playlistTracks: [...this.state.playlistTracks, track]})
    }
  }

  removeTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.setState(prevState => ({playlistTracks: prevState.playlistTracks.filter(targetTrack => targetTrack !== track)}))
    }
    else {
      return;
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.URI);
    });
    console.log(trackURIs);
  }

  search(term) {
    console.log(term);
    Spotify.getAccessToken();
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
                searchResults = {this.state.searchResults} 
                onAdd={this.addTrack}
            />
            <Playlist 
                playlistTracks={this.state.playlistTracks} 
                playlistName={this.state.playlistName} 
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
