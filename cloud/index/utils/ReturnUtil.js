/**
 * 成功调用
 * @param {*} ctx 
 * @return
  */
 const success = ctx =>{
  console.log(ctx)
   return {
     code:0,
     message:'success',
     data:ctx.data
   }
 }

 /**
 * 调用失败
 * @param {*} ctx 
 * @param {*} msg 
 * @return 
  */
 const error = (ctx,msg) =>{
   return{
     code:400,
     message:msg,
     data:ctx.data
   }
 }

 module.exports = {
   success,
   error
 }