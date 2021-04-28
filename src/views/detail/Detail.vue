<template>
    <div id="detail">
       <detail-nav-bar/>
       <detail-swiper :topImages="topImages"/>
       <detail-base-info :goods="goods"/>
       <detail-service :goods="goods"/>
       <detail-shop-info :shop="shop"/>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailService from './childComps/DetailService'
import DetailShopInfo from './childComps/DetailShopInfo'
import {getDetail,Goods,Shop} from 'network/detail'
export default {
  name:"Detail",
  components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailService
  },
  data(){
      return {
          iid:null,
          topImages:[],
          goods:{},
          shop:{}
      }
  },
  created(){
      this.iid=this.$route.params.iid
      getDetail(this.iid).then(res=>{
         console.log(res);
         const data=res.result
         this.topImages=res.result.itemInfo.topImages
        //获取商品信息
          this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 创建店铺信息
        this.shop=new Shop(data.shopInfo)

      })

     
     
  }
}
</script>

<style scoped>
</style>