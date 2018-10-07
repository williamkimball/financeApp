<template>
  <div class="spinner">
    <v-progress-circular  alt="loading"/>
  </div>
</template>

<script>
import AuthService from "./../auth/AuthService.js";
const auth = new AuthService();

const { login, logout, authenticated, authNotifier } = auth;
export default {
  name: "callback",
//   props: ["auth"],
  data() {
    // this.authNotifier.on("authChange", authState => {
    //   this.authenticated = authState.authenticated;
    // });
    auth.handleAuthentication();
    return {
      auth,
      authenticated
    };
  }
};
</script>

<style>
/* .spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  } */
</style>