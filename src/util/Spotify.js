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
        if(UAT !== "") {
            return UAT;
        }
        else {
            let client_id = 'CLIENT_ID';
            let redirect_uri = 'http://localhost:3000';

            let state = this.generateRandomString(16);
            let stateKey = "currentState"

            localStorage.setItem(stateKey, state);
            let scope = 'user-read-private user-read-email';

            let url = 'https://accounts.spotify.com/authorize';
                url += '?response_type=token';
                url += '&client_id=' + encodeURIComponent(client_id);
                url += '&scope=' + encodeURIComponent(scope);
                url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
                url += '&state=' + encodeURIComponent(state);
            
            window.location.href = url;

            UAT = window.location.href.match(tokenRegex);
            expiry = window.location.href.match(expiryRegex);

            console.log(UAT + " | " + expiry);
        }
    }
};

export default Spotify;