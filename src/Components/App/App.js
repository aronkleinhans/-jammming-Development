import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.state = {
      searchResults : [ 
        {
        name : "Occassional Magic",
        artist : 'Yppah',
        album : 'Occassional Magic',
        id : 1
        },
        {          
        name : "One more magic potion",
        artist : 'Ensiferum',
        album : 'One more magic potion',
        id : 2
        }
      ],
      playlistName : "Jammming Test Playlist",
      playlistTracks : [ 
        {
        name : "Feast Of Fire",
        artist : "Trivium",
        album : "In The Court Of The Dragon",
        id : 3
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

  removeTrack(e) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === e.target.value.id)) {
      this.setState(prevState => ({playlistTracks: prevState.playlistTracks.filter(track => track !== e.target.value)}))
    }
    else {
      return;
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
