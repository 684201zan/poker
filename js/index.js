$(function(){
  var heights=document.documentElement.clientHeight;
  $('.dachangjing').height(heights)
   function Makeposkr(){
             var poskr=[];
             var color=['c','d','h','s']
             var biao=[ ];
             while(poskr.length!=52){
                var c=Math.ceil(Math.random()*13)
                var n=Math.floor(Math.random()*4)
                var index=color[n]
                var v={
                  color:index,
                  number:c
                }
             if(!biao[index+c]){
                  biao[index+c]=true
                   poskr.push(v) 
             }
             }
             return poskr;
      }
   function Setposkr(poskr){
           var index=0 
           var dis={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K'} 
           for(var i=0,prok;i<7;i++){
               for(var j=0;j<i+1;j++){
                    prok=poskr[index]
                     index += 1;
                           $('<div>')
                             .attr('data-number',prok.number)
                             .attr('id',i+'-'+j)
                             .addClass('pok')
                             .css('background-image','url(./image/'+dis[prok.number]+prok.color+'.png)')
                             .appendTo('.changjing')
                             .delay(index*30)
                             .animate({
                                top:i*30+50,
                                left:(6-i)*65+j*130+45,
                                opacity:1
                             })
                  }
             }
           for(;index<poskr.length;index++){
            
                  v=poskr[index]
                        $('<div>')
                             .attr('data-number',v.number)
                             .addClass('pok left')
                             .css('background-image','url(./image/'+dis[v.number]+v.color+'.png)')
                             .appendTo('.changjing')
                             .delay(index*30)
                             .animate({
                                top:400+30,
                                left:200,
                                opacity:1
                             })
                }   
       } 
   Setposkr(Makeposkr())
$('.changjing .mateLeft').on('click',(function(){
        var zIndex=0
         return function(){
             $('.left').last()
                      .css('zIndex',zIndex++)
                      .animate({
                        left:800
                      })
                      .queue(function(){
                        $(this).removeClass('left')
                               .addClass('right')
                               .dequeue()
                      }) 
         }
   })())

$('.changjing .mateRight').on('click',(function(){
               var number=0
               return function(){
                  if($('.left').length){
                     return;
                   }
                   number += 1;
                   if(number>3){
                     return;
                   }
                    console.log(number)
               $('.right').each(function(i,v){
                  $(this).css('zIndex',0)
                         .delay(i*300)
                         .animate({
                              left:200
                            })
                         .queue(function(){
                              $(this).removeClass('right')
                                     .addClass('left')
                                     .dequeue()
                            })
               }) 
               }
     })())
var yiqian=null;
var index=0
function clickAbse(el){
   return parseInt($(el).attr('data-number'));
 }
function isclick(el){
   var x=parseInt($(el).attr('id').split('-')[0])
   var y=parseInt($(el).attr('id').split('-')[1])
    if($('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length){
      return false
    }else{
      return true
    }
}
  
$('.changjing').on('click','.pok',function(){
    if($(this).attr('id')&&!isclick(this)){
      return;
   }
       if(clickAbse(this)==13){
          $(this).animate({
                  top:'0',
                  left:'800'
                    })
                 .queue(function(){
                   $(this).detach().dequeue()
                })
                
          $('.defen').text(index+=10)
               return
         }
         if(yiqian){
           if(clickAbse(yiqian)+clickAbse(this)===13){
              yiqian.add(this).animate({
                              top:'0',
                              left:'800'
                                })
                            .queue(function(){
                               $(this).detach().dequeue()
                            })

              $('.tishi').removeClass('active');
              $('.defen').text(index+=10)  
            }else{
              $(this).animate({top:'-=20'}).animate({top:'+=20'})
                yiqian.delay(400).animate({top:'+=20'})
              $('.tishi').addClass('active');
             }
            yiqian=null
         }else{
           yiqian=$(this)
           yiqian.animate({top:'-=20'})
           
         } 
      })
$('.aa').text(00+':'+60)

    var t=0;
$('.start').on('click',function(){
          $('.pok').detach()
          $('.defen').text(index=0)
          Setposkr(Makeposkr())
          $('.changjing').addClass('active')
          clearInterval(t)
           var times=60;
           t=setInterval(move,1000)
           function move(){
            var ts=times-=1
            if(ts<0){
              $('.shengli').toggleClass('active');
              $('.titles').text('真遗憾！！！')
              $('.neirong').text('时间到，你输了')
               return;
              }
            $('.aa').text(00+':'+ts)
              }
          clearInterval(t)
         t=setInterval(move,1000)
        })

$('.cuo').on('click',function(){
   $('.tishi').toggleClass('active')
})
//重置游戏
  $('.game').on('click',function(){
          $('.shengli').removeClass('active');
          $('.pok').detach()
          $('.defen').text(index=0)
          Setposkr(Makeposkr())
         clearInterval(t)
          var times=60;
          t=setInterval(move,1000)
          function move(){
            var ts=times-=1
         if(ts<0){
             $('.shengli').toggleClass('active');
             $('.titles').text('真遗憾！！！')
             $('.neirong').text('时间到，你输了')
           return;
            }
         $('.aa').text(00+':'+ts)
         }
      clearInterval(t)
      t=setInterval(move,1000)
             })
//游戏帮助
$('.help').on('click',function(){
  $('.bangzhu').toggleClass('active')
})

setInterval(function(){
    $('.bangzhu').removeClass('active') 
     return;
  },10000);

//按钮转换

$('.tuichu').on('click',function(){
   $('.changjing').removeClass('active')
    clearInterval(t)
    $('.aa').text(00+':'+60)
})
  




















})