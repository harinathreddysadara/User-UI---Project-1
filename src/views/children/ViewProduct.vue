<template>
    <div style="font-family:Comic Sans, Comic Sans MS, cursive;">
    <div class="image" style="text-align:center;float:left">
          <div>
  <img :src="product.imageUrl" :alt="product.product" style="width:50%;">
  <h1 style="font-family:Comic Sans, Comic Sans MS, cursive;">{{product.product}}</h1>
  <p style="font-family:Comic Sans, Comic Sans MS, cursive;" class="price">{{product.price}}</p>
  <p style="font-family:Comic Sans, Comic Sans MS, cursive;">{{product.company}}</p>
  <p style="font-family:Comic Sans, Comic Sans MS, cursive;">{{product.typeName}}</p>
  <p style="font-family:Comic Sans, Comic Sans MS, cursive;">{{product.gpu}}</p>
  <!-- <p style="font-family:Comic Sans, Comic Sans MS, cursive;">{{product.quantity}}</p> -->

   <v-rating v-model="product.merchantProductRating" readonly></v-rating>

  <p v-if="product.quantity">
    <v-btn  style="font-family:Comic Sans, Comic Sans MS, cursive;" @click="addToCart(product)">Add to Cart</v-btn>
  </p>
  <p v-else>Top merchants product is out of stock currently. Please check other sellers</p>

  <template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          
          style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px"
        >
          Description
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">{{product.product}}</span>
        </v-card-title>
       <v-card-text>
            
            <table id="user">
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <th colspan="2" style="text-align:center">Pdoduct Descriiption</th>
    
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td>Brand</td>
    <td>{{product.company}}</td>

  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td>Product</td>
    <td>{{product.product}}</td>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td> TYPE</td>
    <td>{{product.typeName}}</td>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td>GPU</td>
    <td>{{product.gpu}}</td>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td>Memory</td>
    <td>{{product.memory}}</td>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td>Operating System</td>
    <td>{{product.opSys}}</td>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td>RAM</td>
    <td>{{product.ram}}</td>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td>SCREEN RESOLUTION</td>
    <td>{{product.screenResolution}}</td>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td>SIZE(inches)</td>
    <td>{{product.inches}}</td>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td>IN STOCK</td>
    <td>{{product.quantity}}</td>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <td> WEIGHT</td>
    <td>{{product.weight}}</td>
  </tr>
</table>

          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
            style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </template>

  
  <template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog2"
      persistent
      max-width="700px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          
          @click="getSellers(product.id)"
          style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px;margin:15px"
        >
          More Sellers
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">{{product.product}}</span>
        </v-card-title>
       <v-card-text>
            
            <table id="user">
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px">
    <th>MERCHANT NAME</th>
    <th>RATING</th>
    <th>PRICE</th>
    <th>STOCK</th>
    <th>ACTIONS</th>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px" v-for="(merchant,merchantId) in merchants" :key="merchantId">
    
    <td>{{merchant.merchantName}}</td>
    <td><v-rating v-model="merchant.merchantRating" readonly></v-rating></td>
    <td>{{merchant.price}}</td>
    <td>{{merchant.quantity}}</td>
    <v-btn color="info" style="margin:15px" @click="addToCartBySeller(product, merchant)">ADD TO CART</v-btn>
  </tr>
  
</table>

          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog2 = false"
            style="font-family:Comic Sans, Comic Sans MS, cursive;margin:15px"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </template>

</div>
        
</div>    
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
      show:false,
       dialog: false,
       dialog2:false,
    //    merchants:[]
    };
  },
  methods:{
    getSellers(productId){
        this.$store.dispatch('getMerchants', productId);
        
    } ,
    addToCart(product){
            console.log('Helllloooooo')
                  console.log(product)

            this.$store.dispatch('addToCart',product);
        },
    addToCartBySeller(product, merchant){
          product.merchantId = merchant.merchantId
          product.price = merchant.price
          this.$store.dispatch('addToCartBySeller',product);
    }
  },
    

   computed:{
          product(){
              return this.$store.state.product; 
          },
          merchants(){
              return this.$store.state.merchants;
          }
      },
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