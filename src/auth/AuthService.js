import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'
import router from './../router'
import store from "./../store/index"
import { mapState, mapMutations } from 'vuex'  


export default class AuthService {

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getProfile = this.getProfile.bind(this);
    
  }

  auth0 = new auth0.WebAuth({
    domain: 'droplets.auth0.com',
    clientID: 'AKn6SR7CRvDeJ71POE1x2Q0clLu23b5U',
    redirectUri: 'http://localhost:8080/loading',
    responseType: 'token id_token',
    scope: 'openid profile'
  })

  login () {
    this.auth0.authorize()
    this.getProfile()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('dashboard/home')
      } else if (err) {
        router.replace('/')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    // this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    sessionStorage.clear();
    this.userProfile = null
    // this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('/')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

// userProfile;

getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No Access Token found');
    }
    return accessToken;
  }

getProfile(cb) {
  let accessToken = this.getAccessToken();
  this.auth0.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      this.userProfile = profile;
      // sessionStorage.setItem('userProfile', JSON.stringify(this.userProfile))
       store.commit('addUser', this.userProfile)
    }
    // console.log(this.userProfile)
    return this.userProfile
    cb(err, profile);
  });
}
}
