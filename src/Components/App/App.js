import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';

class App extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} />
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
