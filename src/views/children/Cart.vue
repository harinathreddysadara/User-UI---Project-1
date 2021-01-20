<template>
<div style="width:100%">
<table id="user">
    <tr>
        <th colspan="7" style="text-align:center;font-family:Comic Sans, Comic Sans MS, cursive;"><strong>CART</strong></th>
    </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;">
    <th colspan="2" style="text-align:center;">PRODUCT</th>
    <th>PRICE</th>
    <th>QUANTITY</th>
    <th>PRICE</th>
    <th colspan="2" style="text-align:center">Actions</th>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;" v-for="(product,productId) in cart" :key="productId">
    <td v-if="isAuthenicated" ><v-img  :src="product.productImageUrl" style="height:80px;width:100px"></v-img></td>
    <td v-else><v-img  :src="product.imageUrl" style="height:80px;width:100px"></v-img></td>

    <td>{{product.product}}</td>
    <td>{{product.price}}</td>
    <td><span><strong>{{product.quantity}}</strong></span></td>
    <!-- <td><v-btn @click="decreaseQuantit(product)" style="margin:15px">-</v-btn><span><strong>{{product.quantity}}</strong></span><v-btn @click="increaseQuantity(product)"  style="margin:15px">+</v-btn></td> -->
    <!-- <td><input :value="product.quantity" :rules="numberlRules" @input="setQuantity" type="number" min="1" placeholder="Quantity" style="background-color: ; border:1px solid black;margin-left:60px;border-radius:5px;width:50%"></td> -->
    <td>{{product.price * product.quantity}}</td>
    <td><v-btn color="error" @click="remove(product)">Remove</v-btn></td>
    <td><v-btn color="info" @click="viewProduct(product)">View</v-btn></td>
  </tr>
  <tr style="font-family:Comic Sans, Comic Sans MS, cursive;">
      <td colspan="4">Total:</td>
      <td colspan="3">{{getTotal}}</td>
  </tr>
</table>
<div style="float:right;margin:20px;font-family:Comic Sans, Comic Sans MS, cursive;">
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
          CHECKOUT
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
            @click="dialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!-- <v-btn color="success" style="margin:15px">CHECKOUT</v-btn> -->
</div>
</div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
import { mapGetters } from 'vuex'
export default {
    data() {
    return {
      dialog: false, 
      quantity:1,
      total: 0,
      isAuthenticated: this.isAuthenticated,
      numberlRules: [
       v => !!v || 'E-mail is required',
        v => /^^[1-9]\d*$/.test(v) || 'E-mail must be valid',
    ],
    };
    },
    methods:{
        decreaseQuantity(product) {
            this.$store.dispatch('decreaseQuantity',product);
        },
        // increaseQuantity(product) {
        //     this.$store.dispatch('decreaseQuantity',product);
        // },
        viewProduct(product){
          this.$store.dispatch('getProduct',product.id);
        //   this.$store.state.product = product;
        //  window.console.log(this.$store.state.product);
          this.$router.push('/product')
        },
        increaseQuantity(product){
            console.log('Helllloooooo')
            this.renderComponent = true
                  console.log(product)
            this.$store.dispatch('addToCart',product);
            // this.total = this.total+ product.quantity*product.price
            this.$forceUpdate()
        },
        decreaseQuantit(product){
            if(product.quantity==0){
                alert("Are you sure??")
            }
            this.$store.dispatch('decreaseQuantity',product);
            this.total = this.total - product.quantity*product.price
            this.$forceUpdate()
        },
        remove(product){
            alert("Are you sure??")
            this.$store.dispatch('removeProductFromCart',product);
        },
        order(){
            if(localStorage.userMail){
                let userId= (localStorage.userMail).split('@')[0]
                axios.get(`http://10.177.1.254:7081/checkout/order/${userId}`)
                    .then(response => console.log(response))
            }else{
                this.$router.push('/login')
            }
        }
        
    },
    computed: {
        ...mapGetters(["cart" , "isAuthenticated"]),
        getTotal () {
            let total = 0
            this.cart.forEach(e => {
                total += e.price * e.quantity
            });
            return total
        },


    },
    mounted: function() {
        if(this.isAuthenticated){
            let userId= (localStorage.userMail).split('@')[0]
            this.$store.dispatch('getCart',userId)
        }
            
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
  background-color: lightgray;
  color: white;
}
</style>