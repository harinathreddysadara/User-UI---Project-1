<template>
  <v-app>
    <v-app-bar app dark color="grey">
      <v-toolbar-title><v-btn style="margin-left:10px;background-color:#0066cc;font-family:Comic Sans, Comic Sans MS, cursive;" @click="goHome">HOME</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!-- <v-btn @click="logout">Logout</v-btn> -->
    <v-main>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field label="Username" :rules="emailRules" prepend-icon="mdi-account-circle"  v-model="login.userMail"/>
          <v-text-field
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword" v-model="login.userPswd"
          />
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
       
          <v-btn color="info" @click="loginBtn">Login</v-btn>
          <v-btn  color="white"> <img src="../assets/facebook.png" height="35px" width="40px"><span>Facebook</span></v-btn>
          <v-btn color="white"> <img src="../assets/googleLogo.png" height="35px" width="40px" @click="loginGoogle"><span>Google</span></v-btn>
          <v-btn style="float:left" color="success" @click="register">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>

    <template>
      <v-footer dark padless>
        <v-card class="flex" flat tile>
          <v-card-title class="teal">
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-footer>
    </template></v-app
  >
</template>
 
<script>
import GAuth from 'vue-google-oauth2'
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)


export default {
  data() {
    return {
      showPassword: false,
      dialog: false,
      login:{
        userMail:null,
        userPswd:null
      },
      googleUser:{},
      emailRules: [
       v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
  ],
    // firstcheckbox: false,

    };
  },
  methods:{
    register(){
      this.$router.push('/register')
    },
    goHome(){
      this.$router.push('/')
    },
    loginBtn(e){
      // this.$refs.form.validate();
        this.axios.post('http://10.177.1.179:6081/auth/login/user',this.login)
      .then((result)=> {
        console.warn(result);
        if((result.data.userMail != null)&&(result.data.userPswd!= null)){
        this.login.userMail = result.data.userMail;
        this.login.userPswd = result.data.userPswd
       this.$store.dispatch('loginUser',this.login);
       this.$router.push('/')
        }else{
          alert('LOGIN  FAILED')
          console.log("Fail")
          // this.dailog=true;

        }
      })
      e.preventDefault();
      
    },
    loginGoogle(){
      const gauthOption = {
    clientId: '680597261618-7d6ggrg8ucq2rup5sujuqn6k2msckp0j.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account' ,
    fetch_basic_profile: 'true'
      }
  Vue.use(GAuth, gauthOption)
  this.$gAuth
        .getAuthCode()
        .then((authCode) => {
          //on success
          console.log("authCode", authCode);
        })

    this.$gAuth.signIn()
      .then(user => {
        // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
        console.log('user', user)
        this.googleUser.userMail = user.Nt.uu;
        this.googleUser.userName = user.Nt.Ed;
        this.googleUser.userImage = user.Nt.fL;
        console.log(this.googleUser)
        this.isSignIn = this.$gAuth.isAuthorized
      })
      .then(()=>{
        axios.post("http://10.177.1.179:6081/auth/login/google/user", this.googleUser)
            .then((result)=> {
        console.warn(result);
        if((result.data.userMail != null)){
        this.login.userMail = result.data.userMail;
        this.login.userPswd = result.data.userPswd
       this.$store.dispatch('loginUser',this.login);
       this.$router.push('/')
        }else{
          console.log("Fail")
          window.location='your url';

        }
      })

      }
      )
    },
    
   
  }
  };
</script>
