Vue.filter("money",function(val,type){
    return "￥"+parseInt(val).toFixed(2)+type
})
var vm=new Vue({
    el:"#app",
    data:{
        title:"hello vue",
        list:[],
        totalMoney:0,
        checkAll:false,
        delFlag:false,
        curItem:{}
    },
    mounted (){
       this.cart()
    },
    filters:{
       productMoney:function(val,type){
           return "￥"+val.toFixed(2)+type
       }
    },
    methods:{
     cart:function(){
         this.$http.get("data/cartData.json").then( res=> {
            this.list=res.body.result.list;
            //this.totalMoney=res.body.result.totalMoney
         })
     },
     count:function(item,type){
         if(type>0){
            item.productQuantity++
         }else{
             item.productQuantity--
             if( item.productQuantity<1){
                 item.productQuantity=1
             }
         }
         this.calTotalPrice()
     },
     choose:function(item){
         if(typeof( item.checked)=='undefined'){
             this.$set(item,"checked",true)
         }else{
             item.checked=!item.checked
         }
         this.calTotalPrice()
     },
     chooseAll:function(flag){
         this.checkAll=flag
         this.list.forEach((item,index)=>{
             if(typeof( item.checked)=='undefined'){
                 this.$set(item,"checked",this.checkAll)
             }else{
                 item.checked=this.checkAll
             }
         })
         this.calTotalPrice()
    },
    del:function(item){
         this.delFlag=true;
         this.curItem=item
    },
    delPro:function(){
      var index= this.list.indexOf(this.curItem)
        this.list.splice(index,1)
        this.delFlag=false
    },
    calTotalPrice:function(){
          this.totalMoney=0;
            this.list.forEach((item,index)=>{
                if(item.checked){
                    this.totalMoney+=item.productQuantity*item.productPrice
                }
            })
        },
        toAddress:function(){
            if(this.totalMoney!=0){
                window.location.href="./address.html"
            }else{
                alert("请选择商品")
                return
            }
        }
    }
})
