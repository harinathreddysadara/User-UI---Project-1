import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import VueAxios from 'vue-axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products:{},
    product: null,
    category:null,
    merchants:null,
    cart:[],
    quantity: 0,
    isAuthenticated: localStorage.getItem("userMail")?true:false
  },
  getters:{
    cart: state => state.cart,
    isAuthenticated: state => state.isAuthenticated,
    category: state => state.category
    
  },
  mutations: {
    SET_PRODUCTS(state,products)
    {
        state.products=products;
    },
    SET_PRODUCT(state,product)
    {
        state.product=product;
    },
    SET_CATEGORY(state,category){
      state.category=category;
    },
    SET_SEARCH(state,search){
      state.search=search;
    },
    SET_MERCHANTS(state,merchants){
      state.merchants=merchants;
    },
    ADD_PRODUCT_TO_CART(state,product){
      
      const newProduct = state.cart.find(cartProduct => cartProduct.id === product.id) 
      if(!newProduct){
        Vue.set(product, 'quantity', 1)
        state.cart.push(product)
      }
      else{
        newProduct.quantity++
      }
      const newProduct2 = state.cart.find(cartProduct => cartProduct.id === product.id) 
      let cartProduct ={}
      cartProduct.userId= (localStorage.userMail).split('@')[0]
      cartProduct.productId = newProduct2.id
      cartProduct.merchantId = newProduct2.merchantId
      cartProduct.quantity = newProduct2.quantity
      cartProduct.productName = newProduct2.product
      cartProduct.productImageUrl = newProduct2.imageUrl 
      cartProduct.price = newProduct2.price
      console.log("234567890")
      console.log(cartProduct)
      axios.post('http://10.177.1.254:7081/checkout/cart', cartProduct)
        .then((resp) => console.log(resp))
    },
    DECREASE_QUANTITY(state,product){
      const p = state.cart.find(cartProduct => cartProduct.id === product.id)
      if(p.quantity<1){
        const index = state.cart.indexOf(p)
        state.cart.splice(index,1)
      }
      else{
        p.quantity--
      }
      const newProduct2 = product 
      if(newProduct2.quantity<0){
        let cartProduct ={}
      cartProduct.userId= (localStorage.userMail).split('@')[0]
      cartProduct.productId = newProduct2.id
      cartProduct.merchantId = newProduct2.merchantId
      cartProduct.quantity = newProduct2.quantity
      cartProduct.productName = newProduct2.product
      cartProduct.productImageUrl = newProduct2.imageUrl 
      cartProduct.price = newProduct2.price
      console.log(cartProduct)
      axios.post('http://10.177.1.254:7081/checkout/cartdelete', cartProduct)
        .then((resp) => console.log(resp))
      }else{
        let cartProduct ={}
        cartProduct.userId= (localStorage.userMail).split('@')[0]
        cartProduct.productId = newProduct2.id
        cartProduct.merchantId = newProduct2.merchantId
        cartProduct.quantity = newProduct2.quantity
        cartProduct.productName = newProduct2.product
        cartProduct.productImageUrl = newProduct2.imageUrl 
        cartProduct.price = newProduct2.price
        console.log("234567890")
        console.log(cartProduct)
        axios.post('http://10.177.1.254:7081/checkout/cart', cartProduct)
          .then((resp) => console.log(resp))
      }
    },
    REMOVE_PRODUCT_FROM_CART(state, product){
      const p = state.cart.find(cartProduct => cartProduct.id === product.id)
      const index = state.cart.indexOf(p)
        state.cart.splice(index,1)
        if(localStorage.userMail!==null){
          axios.post('http://10.177.1.254:7081/checkout/cartdelete', p)
          .then((resp) => console.log(resp))
        }
        

    },
    AUTHENTICATE_USER(state){
      state.isAuthenticated = !state.isAuthenticated
    },
    LOGOUT_USER(state){
      state.isAuthenticated = false
    },
    GET_CART(state, items){
      state.cart = items
      // localStorage.cart=items;
    }
      
  },

  actions: {
    loginUser({commit}, userDetails){
        localStorage.setItem("userMail", userDetails.userMail)
        localStorage.setItem("userPswd", userDetails.userPswd)
        if(localStorage.getItem){
          commit("AUTHENTICATE_USER")
        }
    },
    logoutUser({commit}){
      localStorage.clear;
        commit("LOGOUT_USER")

  },
    getProducts({commit}){
      axios.get('http://10.177.1.104:9081/product/getproducts')
      .then(response=>{
        window.console.log(response.data)
        commit('SET_PRODUCTS',response.data)
        // success();
      })
    },
    getPopularProducts({commit}){
      axios.get('http://10.177.1.104:9081/product/findpopular')
      .then(response=>{
        window.console.log(response.data)
        commit('SET_PRODUCTS',response.data)
        // success();
      })
    },
    getProduct({commit},id){
   
      axios.get(`http://10.177.1.104:9081/product/${id}`)
      .then(response=>{
        console.log("after getting product")
        console.log(response.data)
        commit('SET_PRODUCT',response.data)
        localStorage.setItem('particularProduct',response.data)
        console.log(localStorage.particularProduct.product)
        console.log(localStorage.particularProduct.product)
        
      })      
    },
    getCategory({commit}){
   
      axios.get('http://10.177.1.104:9081/product/company')
      .then(response=>{
        console.log(response.data)
        commit('SET_CATEGORY',response.data)
        
      })      
    },
    viewCategory({commit},category){
   
      axios.get(`http://10.177.1.104:9081/product/company/${category}`)
      .then(response=>{
        console.log(response.data)
        commit('SET_PRODUCTS',response.data)
        
      })      
    },
    viewSearch({commit},search){
      console.log("search " + search)
      axios.get(`http://10.177.1.254:5081/search/random/${search}`)
      .then(response=>{
        console.log("from search")
        console.log(response.data)
        commit('SET_PRODUCTS',response.data)
        
      })      
    },
    getMerchants({commit}, productId){
      console.log(productId)
      axios.get(`http://10.177.1.104:8081/merchant/merchantsofproduct/${productId}`)
      .then(response=>{
        console.log(response.data)
        commit('SET_MERCHANTS',response.data)
        
      })      
    },
    addToCart({commit},product){
    
      commit('ADD_PRODUCT_TO_CART',product)
      // if(this.state.isAuthenticated){
      //   //post cart details and after getting response commit('ADD_PRODUCT_TO_CART',product)
      // }
      // else{
      //   commit('ADD_PRODUCT_TO_CART',product)
      // }

    },
    addToCartBySeller({commit},product){
      commit('ADD_PRODUCT_TO_CART',product)
    },
    decreaseQuantity({commit},product){

      commit('DECREASE_QUANTITY',product)
    },
    checkOut(){
        //Post the order and ....
    },
    removeProductFromCart({commit}, product){
      commit('REMOVE_PRODUCT_FROM_CART', product)
    },
    getCart({commit},userId){
      console.log("-----------------------------------")
      if(this.state.isAuthenticated){
        axios.get(`http://10.177.1.254:7081/checkout/cart/${userId}`)
        .then(response=>{
          console.log(response.data)
          commit('GET_CART',response.data)
          
        }) 
      }
        
      
    }
  },

  modules: {
  }

})
