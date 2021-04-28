<template>
     <div>
          <div class="info-other" >
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info-service">
        <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
            <img :src="goods.services[index-1].icon">
            <span>{{goods.services[index-1].name}}</span>
        </span>
        </div>
     </div>
</template>

<script>
export default {
  name:"DetailService",
 props: {
		goods: {
		type: Object,
        default() {
		      return {}
        }
      }
    }
 
}
</script>

<style scoped>


  .info-other {
   margin-top:15px ;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-around;
    align-items: center;
    color: #999;
  }

  .info-service {
    display: flex;
    justify-content: space-around;
    line-height: 60px;
    border-bottom: 5px solid rgba(100,100,100,.1);
  }
 

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
</style>