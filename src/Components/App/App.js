import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: 
        [{
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
      playList : {}
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
            <Playlist playList={this.state.playList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
