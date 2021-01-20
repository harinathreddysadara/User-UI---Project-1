<template>
  <v-app>
    <v-app-bar app dark color="grey">
      <v-toolbar-title><v-btn style="margin-left:10px;background-color:#0066cc;font-family:Comic Sans, Comic Sans MS, cursive;" @click="goHome">HOME</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    
    <v-main>
        <v-form>
      <v-card width="500" class="mx-auto mt-9">
          
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-text-field v-model="register.userName" :rules="nameRules" label="userName" prepend-icon="mdi-account-circle" />
          <v-text-field v-model="register.userMail" :rules="emailRules" label="email" type="e-mail" prepend-icon="mdi-account-circle" />
          <v-text-field
            label="password"
            :rules="passwordRules"
            v-model="register.userPswd"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" type="submit" @click="submitForm">Register</v-btn>
          <v-btn color="info" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
        </v-form>
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
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)

export default {
  data() {
    return {
      showPassword: false,
      register:{
          userName:null,
          userMail:null,
          userPswd:null
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 18) || 'Name must be less than 10 characters',
    ],
     emailRules: [
       v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
  ],
      
    };
  },
  methods:{
      login(){
          this.$router.push('/login')
      },
      goHome(){
      this.$router.push('/')
    },
    submitForm(e){
        // this.$refs.form.validate();
        this.axios.post('http://10.177.1.179:6081/auth/register/user',this.register)
      .then((result)=> {
        console.warn(result);
      })
      e.preventDefault();
      this.$router.push('/login')

    

    }
  }
};
</script>