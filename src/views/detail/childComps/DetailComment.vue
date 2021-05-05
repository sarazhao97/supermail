<template>
    <div class="detail-comment">
        <div class="comment-title">
            <div class="user-comment">用户评价</div>
        <div class="more">更多</div>
        </div>
        <div class="comment-content">
            <div class="user-comment" v-for="(item ,index) in rate.list" :key="index">
               <div class="user">
                    <img :src="rate.list[index].user.avatar" alt="">
                <span class="user-name">{{rate.list[index].user.uname}}</span>
               </div>
              <div class="content">
                   <div class="comment">整体评价：{{item.content}}</div>
                <div class="match" v-if="item.extraInfo">
                   <div v-for="(item , index) in rate.list[index].extraInfo">{{item}}</div>
               </div>
               <div class="images">
                   <img :src="image" alt=""  v-for="image in item.images">
               </div>
              </div>
                <div class="choose-style">
                   <span class="createdTime">{{item.created | showDate}}</span>
                   <span class="message">{{item.style}}</span>
               </div>
               <div class="explain">
                   <span>{{item.explain}}</span>
               </div>
               
            </div>
        </div>
    </div>
</template>

<script>
import {formatDate} from 'common/utils'
export default {
  name:"DetailComment",
  props:{
      rate:{
          type:Object,
          default(){
              return {}
          }
      }
  },
  filters:{
      showDate(value){
          const date=new Date(value*1000)
         return formatDate(date,'yyyy-MM-dd hh:mm')
      }
  }
}
</script>

<style scoped>
.detail-comment {
    z-index: 9;
    background-color: #fff;
     border-bottom: 5px solid #f2f5f8;
}
.comment-title {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    margin: 0 15px;
    border-bottom: 2px solid #f2f5f8;
}
.comment-content{
    flex: 1;
}
.user{
    margin-top: 10px;
}
.user img {
    width: 40px;
    height: 40px;
  
    margin-left: 15px;
    border-radius: 50%;
    vertical-align: middle;
}
.user-name {
    color: #000;
    margin-left: 15px;
    
}
.content {
    margin: 0 15px;
}
.comment {
    padding: 10px 0;
}
.match {
    color: #999;
    margin-bottom: 5px;
}
.content .images img{
    width: 100px;
    margin-right: 5px;

}
.choose-style {
    margin: 5px 15px;
    font-size: 14px;
}
.explain {
    padding: 5px 15px;
}
.createdTime {
    margin-right: 10px;
}
</style>