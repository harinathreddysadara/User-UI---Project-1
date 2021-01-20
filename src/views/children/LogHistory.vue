<template>
    <table  id="user">
  <tr>
    <th style=";font-family:Comic Sans, Comic Sans MS, cursive;">Log History</th>
    <!-- <th>Contact</th>
    <th>Country</th> -->
  </tr>
  <tr  v-for="login in loginHistory" :key="login">
    <td style=";font-family:Comic Sans, Comic Sans MS, cursive;">{{login}}</td>
    <!-- <td>Maria Anders</td>
    <td>Germany</td> -->
  </tr>
</table>
</template>


<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
export default {
    data() {
    return {
    loginHistory: [],
    userEmail: localStorage.userMail
    }
},
mounted: function (){
        axios.get(`http://10.177.1.179:6081/auth/user/mail/${this.userEmail}`)
                .then(response => {
                    this.loginHistory = response.data.loginTimeStamp.split(",")
                    console.log(this.loginHistory)
                })
        
    }
}
</script>

<style>
#user {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#user td, #user th {
  border: 1px solid #ddd;
  padding: 8px;
}

#user tr:nth-child(even){background-color: #f2f2f2;}

#user tr:hover {background-color: #ddd;}

#user th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: grey;
  color: white;
}
</style>