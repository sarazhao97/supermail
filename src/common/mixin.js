import {debounce} from "./utils"
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
    data(){
        return {
            itemImgListener:null
        }
    },
    mounted(){
        let refresh= debounce(this.$refs.scroll.ScrollFresh,500)
        this.itemImgListener=()=>{
          refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener)
    
    }
}

export const backTopMixin={
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop:false
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0,300)
           },
        listenShowBackTop(position){
            this.isShowBackTop=(-position.y) > 1000 
          }
    }
}