<template>
    <div id="detail">
       <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"/>
       <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
         <ul>
           <li v-for="item in $store.state.cartList">{{item}}</li>
         </ul>
        <detail-swiper :topImages="topImages"/>
       <detail-base-info :goods="goods"/>
       <detail-shop-info :shop="shop"/>
       <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
       <detail-param-info ref="params" :param-info="paramInfo" />
       <detail-comment :rate="rate"  ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
       </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <detail-bottom-bar @addToCart="addToCart"/>
        
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsListItem from 'components/content/goods/GoodsListItem'
import DetailComment from './childComps/DetailComment'
import {debounce} from 'common/utils'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin'



export default {
  name:"Detail",
  components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,  
      GoodsList,
      GoodsListItem,
      DetailBottomBar,
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
      return {
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          rate:{},
          recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        
        
       
  }
  },
  mounted(){
    
 },
 destroyed(){
  this.$bus.$off('itemImageLoad',this.itemImgListener)
 
 },
  created(){
      this.iid=this.$route.params.iid
      getDetail(this.iid).then(res=>{
        //  console.log(res);
         const data=res.result
         this.topImages=res.result.itemInfo.topImages
        //获取商品信息
          this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 创建店铺信息
        this.shop=new Shop(data.shopInfo)
        // 获取商品详细信息
        this.detailInfo=data.detailInfo

        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

        // 获取用户评价
        this.rate=data.rate
       
       
      })    
      getRecommend().then(res=>{
        this.recommends=res.data.list
      })
      
      this.getThemeTopY=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        this.themeTopYs.push(Number.MAX_VALUE)
      // console.log( this.themeTopYs);
      },100)
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.ScrollFresh()
      this.getThemeTopY()
    },
   
    contentScroll(position){
   
    this.listenShowBackTop(position)
     const positionY= -position.y
     let length =this.themeTopYs.length
    for(let i=0; i<length-1;i++){
     
     if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
        this.currentIndex=i
       this.$refs.navbar.currentIndex= this.currentIndex
     }
    }
    
   },
   titleClick(index){
    this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],500)
     } ,
  addToCart(){
    //获取购物车需要展示的信息
    const product={}
    product.image=this.topImages[0]
    product.title=this.goods.title
    product.desc=this.goods.desc
    product.price=this.goods.realPrice
    product.iid=this.iid
  this.$store.commit('addCart',product)
  },
  
  }
 
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
 
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>