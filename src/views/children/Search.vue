<template>
  <v-container style="font-family:Comic Sans, Comic Sans MS, cursive;">
   
       <v-layout row wrap>
        <v-flex xs12 md3 px-1 mb-2  v-for="(product,productId) in products" :key="productId">
      <v-col cols="4" class="d-flex child-flex">

            <v-card
    class="mx-auto"
    max-width="400"
    height="400"
  >
    <img
      
      height="150"
      width="150"
      :src="product.imageUrl"
      style="margin:10px"
    >
    

    <v-card-subtitle class="pb-0">{{product.product}}</v-card-subtitle>
    <!-- <v-card-subtitle class="pb-0">{{product.typeName}}</v-card-subtitle> -->
    <v-rating v-model="product.merchantProductRating" readonly></v-rating>

    <v-card-text class="text--primary">
      <div style="font-size:15px;font-family:Comic Sans, Comic Sans MS, cursive;">Price:{{product.price}}</div>

    </v-card-text>

    <v-card-actions>
      <v-btn 
        color="orange"
        text
        @click="viewProduct(product)"
      >
        VIEW PRODUCT
      </v-btn>

      <v-btn
        color="orange"
        text
        @click="addToCart(product)"
      >
        ADD TO CART
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-col>
        </v-flex>
      </v-layout> 
    </v-container>
  
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)

export default {
    data() {
    return {
    //    products: []
    };
  },
  props:['product'],
  methods:{
      viewProduct(product){
          this.$store.dispatch('getProduct',product.id);
        //   this.$store.state.product = product;
        //  window.console.log(this.$store.state.product);
          this.$router.push('/product')
    },
          addToCart(product){
            console.log('Helllloooooo')
                  console.log(product)

            this.$store.dispatch('addToCart',product);
        }
      },
      computed:{
          products(){
              return this.$store.state.products; 
          }
      },
  mounted:  function () {

        // this.$store.dispatch('getProducts');
      }
}
</script>


<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
  
}

.price {
  color: grey;
  font-size: 22px;
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.card button:hover {
  opacity: 0.7;
}
/* .col-container {
  display: table;
  width: 100%;
} */
/* .col {
  display: table-cell;
  padding: 16px;
} */
</style>