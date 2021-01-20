<template>
    <div>
          <div width="auto" style="border:solid lightgrey" >
    <v-carousel :show-arrows="false" cycle :interval="interval" hide-delimiters height="350" width="1000px">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        
        style="width: auto;height:auto;"
      ></v-carousel-item>
    </v-carousel>
         </div>
  <v-divider></v-divider>
      <v-container style="float:left">
   
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
        color="orange"
        text
        @click="addToCart(product)"
        style="font-family:Comic Sans, Comic Sans MS, cursive;"
      >
        ADD TO CART
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-col>
        </v-flex>
      </v-layout> 
    </v-container>
  
    </div>
</template>
<script>
export default {
    data() {
    return {
        items: [
        {
          src: 'https://dlcdnimgs.asus.com/websites/global/products/4NCrBoVHxzty7brJ/top_banner.jpg' ,
        },
        {
          src: 'https://www.brumpost.com/wp-content/uploads/2018/11/Surface-Book-2-4.jpg',
        },
        {
          src: 'https://pcdreamsoutlet.com.sg/wp-content/uploads/2020/05/brand_page_banner_Hp_.jpg',
        },
        {
          src: 'https://m.media-amazon.com/images/S/aplus-media/sc/684da0ba-1af3-48f1-a0ff-aceff3c427b0.__CR0,0,970,300_PT0_SX970_V1___.jpg',
        },
        {
          src: 'https://alertify.eu/wp-content/uploads/2020/08/lenovo-laptop-thinkpad-banner-1143x357-1.jpg',
        },
        {
          src: 'https://m.media-amazon.com/images/S/aplus-media/vc/6a9b0846-613e-473b-8076-6975f9e72477._CR0,0,970,300_PT0_SX970__.jpg',
        },
        {
          src: 'https://dlcdnimgs.asus.com/websites/global/products/RUAaL1eGuH1m0rrl/top_banner.jpg',
        },
        {
          src: 'https://promotions.newegg.com/FlagShip/ASUS/product/1banner_asus_proart_nb.jpg',
        },
        {
          src: 'https://mobi-lab.in/wp-content/uploads/2018/04/banner14.jpg',
        },
      ],
      interval:2000,
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

        this.$store.dispatch('getPopularProducts');
      }
}

</script>