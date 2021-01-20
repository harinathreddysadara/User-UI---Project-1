<template>
<div style="font-family:Comic Sans, Comic Sans MS, cursive;">
<v-container>
    <img :src="profileImage" style="width:200px;height:200px;border-radius:400px">
    
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    <!-- style="font-family:Comic Sans, Comic Sans MS, cursive;" -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          style="margin-left:15px;font-family:Comic Sans, Comic Sans MS, cursive;"
          
        >
          Edit
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span style="color:#ff8080;font-family:Comic Sans, Comic Sans MS, cursive;">CHANGE PASSWORD</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
             
              
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="passwordChange.userMail" style="font-family:Comic Sans, Comic Sans MS, cursive;"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Old Password*"
                  type="password"
                  required
                  v-model="passwordChange.oldUserPswd" style="font-family:Comic Sans, Comic Sans MS, cursive;"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="New Password*"
                  type="password"
                  required
                  v-model="passwordChange.newUserPswd" onfocus="this.value=''" style="font-family:Comic Sans, Comic Sans MS, cursive;"
                ></v-text-field>
              </v-col>
              
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
            style="font-family:Comic Sans, Comic Sans MS, cursive;"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            style="font-family:Comic Sans, Comic Sans MS, cursive;"
            
            @click="changePassword"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


    
    <v-card-text>Name:{{user}}</v-card-text>
    <v-card-text>Email:{{userEmail}}</v-card-text>
    <v-divider></v-divider>
    <v-btn style="margin:15px" @click="goToOrderHistory">Order History</v-btn>
    <v-btn @click="goToLog">Log History</v-btn>
</v-container>

      </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
export default {
    data() {
    return {
      dialog: false,
      user:null,
      userEmail:localStorage.userMail,
      loginHistory: [],
      profileImage:null,
      passwordChange:{
          
          userMail:null,
          oldUserPswd:null,
          newUserPswd:null,
      },
      
    };
    },
    methods:{
        goToLog(){
                this.$router.push('/logs')
           
        },
        goToOrderHistory(){
            this.$router.push('/orders')
        },
        changePassword(e){
                    this.dialog = false;
                 this.axios.post('http://10.177.1.179:6081/auth/user/changepassword',this.passwordChange)
                 .then((result)=> {
                  console.warn(result);
      })
      e.preventDefault();
        }
    },
    mounted: function (){
        axios.get(`http://10.177.1.179:6081/auth/user/mail/${this.userEmail}`)
                .then(response => {
                    this.user = response.data.userName
                    this.userEmail=response.data.userMail
                    if(response.data.userImageUrl!=null){
                        this.profileImage=response.data.userImageUrl;
                    }
                    else{
                        this.profileImage="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
                    }
                    console.log(response)
                })
        
    }
}
</script>
