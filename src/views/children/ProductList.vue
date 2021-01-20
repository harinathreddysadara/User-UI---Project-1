<template>
  <v-container>
   
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
    

    <v-card-subtitle  style="font-size:15px;font-family:Comic Sans, Comic Sans MS, cursive;" class="pb-0">{{product.product}}</v-card-subtitle>
    <!-- <v-card-subtitle class="pb-0">{{product.typeName}}</v-card-subtitle> -->
    <v-rating v-model="product.merchantProductRating" readonly></v-rating>

    <v-card-text style="font-size:15px;font-family:Comic Sans, Comic Sans MS, cursive;" class="text--primary">
      <div style=";font-family:Comic Sans, Comic Sans MS, cursive;">Price:{{product.price}}</div>

    </v-card-text>

    <v-card-actions>
      <v-btn 
        color="orange"
        text
        @click="viewProduct(product)"
        style="font-size:15px;font-family:Comic Sans, Comic Sans MS, cursive;"
      >
        VIEW PRODUCT
      </v-btn>

      <v-btn
      v-if = "product.quantity"
        color="orange"
        text
        @click="addToCart(product)"
        style="font-family:Comic Sans, Comic Sans MS, cursive;"
      >
        ADD TO CART
      </v-btn>
      <v-btn
      v-else
        color="orange"
        text
        style="font-family:Comic Sans, Comic Sans MS, cursive;"
      >
        OUT OF STOCK
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

        this.$store.dispatch('getProducts');
      }
}
</script>

