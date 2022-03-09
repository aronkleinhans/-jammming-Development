
let client_id = '1e4f8d3a5f5943b7bac55e8952bbd60b';
let redirect_uri = 'http://localhost:3000/';
let UAT = "";
let expiry = "";

const tokenRegex = /access_token=([^&]*)/;
const expiryRegex = /expires_in=([^&]*)/;

const Spotify = {
    generateRandomString(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
       return result;
    },
    getAccessToken() {
        if(UAT !== "" && UAT !== undefined && UAT !== null) {
            return UAT;
        }
        else if (UAT === '' && window.location.href.match(tokenRegex) !== null) {
            UAT = window.location.href.match(tokenRegex);
            expiry = window.location.href.match(expiryRegex);

            window.setTimeout(() =>{ 
                UAT = '';
                window.location.reload();
            }, expiry[1] * 1000 );
            window.history.pushState('Access Token', null, '/');

           
        }           
        else if(UAT === "" && window.location.href.match(tokenRegex) === null){
            let state = this.generateRandomString(16);
            let stateKey = "currentState"

            localStorage.setItem(stateKey, state);
            let scope = 'playlist-modify-public';

            let url = 'https://accounts.spotify.com/authorize';
                url += '?response_type=token';
                url += '&client_id=' + encodeURIComponent(client_id);
                url += '&scope=' + encodeURIComponent(scope);
                url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
                url += '&state=' + encodeURIComponent(state);

            window.location.href = url;
        }

    },
    async search(sTerm) {
        if(UAT !== ""){
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${sTerm}&access_token=${UAT[1]}&expires_in=${expiry[1]}`);
            const result = await response.json();
            let list;
            if(result.tracks) {    
                list = result.tracks.items.map(el => {
                    return {
                        id: el.id,
                        name: el.name,
                        artist: el.album.artists[0].name,
                        album: el.album.name,
                        uri: el.uri
                    }
                });
            }
            return list;
        };
    },
    async savePlaylist(name, URIs){
        if(!name && !URIs){
            return;
        };

        let token = UAT[1];
        let header = {Authorization:`Bearer ${token}`};
        let userID;

        let response = await fetch("https://api.spotify.com/v1/me", {headers: header});
        let result = await response.json();
        userID = result.id;

        response = await fetch(
            `https://api.spotify.com/v1/users/${userID}/playlists`, { 
                headers: header, 
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    public: true,
                    description: "made by Jammming"
                })
            }
        );
        result = await response.json();
        let playlistID = result.id;

        response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                headers: header,
                method: "POST",
                body: JSON.stringify({
                    uris: URIs
                })
            }
        );
        result = await response.json();
        playlistID = result.id;
    }
};

export default Spotify;