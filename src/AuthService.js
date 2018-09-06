import auth0 from 'auth0-js';
import history from './history';

export default class AuthService {
    auth0 = new auth0.WebAuth({
        domain: 'meraj.auth0.com',
        clientID: 'ubEEUt2gqx_XXCfrNc4bYDmflsB3WDqv',
        redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'http://localhost:3000/callback',
        audience: 'https://meraj.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'

    });

    login = () => this.auth0.authorize();

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                history.replace('/dashboard');
            } else if (err) {
                history.replace('/home');
                console.log(err);
            }
        })
    };

    setSession = (authResult) => {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // navigate to the home route
        history.replace('/home');
    }

    // removes user details from localStorage
  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

   // checks if the user is authenticated
   isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}