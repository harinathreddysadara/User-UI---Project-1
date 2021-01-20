<template>
<div style="width:100%">
<table>
    <tr>
        <th colspan="7" style="text-align:center;font-family:Comic Sans, Comic Sans MS, cursive;"><strong style="color:#1a75ff">Order History</strong></th>
    </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;">
    <th>ORDER ID</th>
    <th>QUANTITY</th>
    <th>PRICE</th>
    <th>SELLER</th>
    <th>TIME</th>
    <th>Rate Order</th>
    <th style="text-align:center">Actions</th>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;" v-for="order in orderHistory" :key="order">
    <td>{{order.orderId}}</td>
    <td>{{order.quantity}}</td>
    <td>{{order.price}}</td>
    <td>{{order.merchantId}}</td>
    <td>{{order.orderTimeStamp}}</td>
    <td><v-rating :value="order.rating" @input="getRating($event, order.orderId)"></v-rating></td>
    <!-- <td>
      <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
          @click="order"
          style="font-family:Comic Sans, Comic Sans MS, cursive;"
        >
          RATE ORDER
        </v-btn>
      </template>

      <v-card style="font-family:Comic Sans, Comic Sans MS, cursive;">
        <v-card-title>
          Order Placed SuccessFully.....!
        </v-card-title>

        <v-card-text>
          Thank you...For shopping with us !!!!
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="rating"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </td> -->
    <td><v-btn color="info" @click="viewProduct(order)">View Product</v-btn></td>
  </tr>
  
  
</table>
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
    orderHistory: [],
    userEmail: localStorage.userMail,
    dialog:false,
      userRating:{
      rate:1,
      orderId:null,
    }
    }
},
mounted: function (){
    let userId= (localStorage.userMail).split('@')[0]
        axios.get(`http://10.177.1.254:7081/checkout/user/order/${userId}`)
                .then(response => {
                    console.log(response)
                    this.orderHistory = response.data
                })
        
    },
    methods:{
           viewProduct(product){
          this.$store.dispatch('getProduct',product.productId);
        //   this.$store.state.product = product;
        //  window.console.log(this.$store.state.product);
          this.$router.push('/product')
        },
        rating(){
          this.dialog=false;

        },
        getRating(value, id){
          console.log(value, id)
          let orderRating = {}
          orderRating.orderId = id
          orderRating.rating = value
           axios.post(`http://10.177.1.254:7081/checkout/order/rating`, orderRating)
            .then((response) => console.log(response))
        }
    }
}
</script>


<style>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th, td {
  text-align: left;
  padding: 16px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>