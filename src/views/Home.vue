<template>
  <div>
    
    <v-app>
         

      <v-navigation-drawer
        style="background-color: grey"
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
      >
      <v-btn  style="width: 200px; margin: 5px;background-color:#0066cc;font-family:Comic Sans, Comic Sans MS, cursive;color:white" @click="getAllProducts">ALL PRODUCTS</v-btn>
        <v-list v-for="(category) in category" :key="category">
          <!-- <v-list-item> </v-list-item> -->
          
            <v-btn
            style="width: 200px; margin: 5px;background-color:#0066cc;font-family:Comic Sans, Comic Sans MS, cursive;"
              
              color="primary"
              @click="seeCategory(category)"
              >{{category}}</v-btn
            >
          
          <v-divider></v-divider>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="grey"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title class="title mr-6 hidden-sm-and-down">
           <!-- <v-btn  style="margin-left:10px;background: transparent;font-family:cursive;border:none;outline:none;" @click="goTOHome">
        LAPTOPIUM
      </v-btn> -->
          <!-- <v-img src="../assets/Logo.png" height="50px" width="80px" style="border-radius:  1000px;" @click="goTOHome"></v-img> -->
        <h3 style="font-family: cursive;cursor:pointer;"  height="50px" width="80px"  @click="goTOHome">LAPTOPIUM</h3>
        </v-toolbar-title>
        <v-text-field
        @input = "inputSearch"
        debounce="500"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        v-model="search"
      />
      <v-btn  style="margin-left:10px;background-color:#0066cc;font-family:Comic Sans, Comic Sans MS, cursive;" @click="callSearch">
        Search
      </v-btn>
      
      <v-btn  style="margin-left:10px;background-color:#0066cc;font-family:Comic Sans, Comic Sans MS, cursive;" @click="goToCart">
        Cart
      </v-btn>
      <v-btn v-if="!isAuthenticated" style="margin-left:10px;background-color:#0066cc;font-family:Comic Sans, Comic Sans MS, cursive;" @click="login">
        Login
      </v-btn>
      <v-btn v-if="isAuthenticated" style="margin-left:10px;background-color:#0066cc;font-family:Comic Sans, Comic Sans MS, cursive;" @click="goToProfile">
        Profile
      </v-btn>
      <v-btn  v-if="isAuthenticated" style="margin-left:10px;background-color:#0066cc;font-family:Comic Sans, Comic Sans MS, cursive;" @click="logout">
        Logout
      </v-btn>

       <span style="padding-left:20px"></span>
      </v-app-bar>
      <v-main style="padding: 0% !important">
        <v-container fluid>
          <v-layout>
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-main>
       <!-- <div class="footer">
    <p>&copy; LAPTOPIUM</p>
</div> -->
    <v-footer padless>
      <v-col
        class="text-center"
        cols="12"
      >&copy;
        {{ new Date().getFullYear() }} — <strong>LAPTOPIUM</strong>
      </v-col>
    </v-footer>
    </v-app>
   
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'
import { mapGetters }from 'vuex'
Vue.use(VueAxios,axios)
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {

  data() {
    return {
      drawer: true,
      overlay: false,
      // search:null,
      
    };
  },
  methods: {
    seeCategory(category){
      console.log(category)
       this.$store.dispatch('viewCategory', category);
      //  this.$router.push('/');
        //   this.$store.state.product = product;
        //  window.console.log(this.$store.state.product);
        if(this.$router.currentRoute.path !=='/cateogry'){
          this.$router.push('/cateogry')
        }

    },
   callSearch(e){
        this.$store.dispatch('viewSearch', this.search);
        this.$router.push('/search')
      e.preventDefault();
      
    },
    inputSearch(){
        // this.$store.dispatch('viewSearch', this.search);
        // this.$router.push('/search')
        clearTimeout(this.search)
        this.debounce = setTimeout(() =>{
        console.log(this.search)
        this.$store.dispatch('viewSearch', this.search);
          if(this.$router.currentRoute.path !=='/search')
        {
          this.$router.push('/search')
          }
          
        }, 800 )
        
          
      // e.preventDefault();
      
    },
    login(){
      this.$router.push('/login');
    },
    goToCart(){
      this.$router.push('/cart');
    },
    goToProfile(){
      this.$router.push('/profile');
    },
    orderHistory(){
      this.$router.push('/orders');
    },
    logHistory(){
      this.$router.push('/logs');
    },
    goTOHome(){
      this.$router.push('/');
    },
    
    logout(){
       localStorage.clear();
            this.$router.push("/login");
            this.$store.dispatch('logoutUser');
    },
    getAllProducts(){
      if(this.$router.currentRoute.path !=='/allproducts'){
        this.$router.push('/allproducts');
      }
    }
    

      
    },
    mounted:  function () {
      
        this.$store.dispatch('getCategory');

      },
    computed:{
          
          // getsearch(){
          //   return this.$store.state.search; 
          // },
          ...mapGetters([ "category", 'isAuthenticated' ])
      },
};
</script>

<style>
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: gray;
   color: white;
   text-align: center;
}
</style>
