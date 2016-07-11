$(function(){
  $('body').css('height', $(window).height());
  $('.h2').click(function(){
    var this_ = $(this);
    var secrt = this_.parents('section');
    movePageUp(secrt);
  })
  // 手机端触摸
  var init = {x:5,y:5,sx:0,sy:0,ex:0,ey:0};//sx开始的x轴位置，ex结束的x轴位置
  document.addEventListener("touchstart",function(){//手指刚接触屏幕时触发
    init.sx = event.targetTouches[0].pageX;
    init.sy = event.targetTouches[0].pageY;
    init.ex = init.sx;
    init.ey = init.sy;
  });
  document.addEventListener('touchmove',function(event) {//手指在屏幕上移动时触发
    event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
    init.ex = event.targetTouches[0].pageX;
    init.ey = event.targetTouches[0].pageY;
  });
  document.addEventListener('touchend',function(event) {//手指从屏幕上移开时触发
    var changeX = init.sx - init.ex;
    var changeY = init.sy - init.ey;
    if(Math.abs(changeX)<Math.abs(changeY)&&Math.abs(changeY)>init.y) {
      if(changeY > 0) {
        var secrt = $('.page-current:last');
        if (!secrt.hasClass('part-end') || (secrt.hasClass('part-end') && secrt.hasClass('page-moveToBottom'))) {
          movePageUp(secrt);
        }
      }else {
        var secrt = $('.page-current:last');
        if (!secrt.hasClass('part-start') && !(secrt.prev('section').hasClass('part-start') && secrt.prev('section').hasClass('page-moveFromTop'))) {
          movePageDown(secrt);
        }
      }
    };
  });
  function movePageDown(v) {
    if (v.prev('section').hasClass('page-moveFromTop')) {
      $('section').removeClass('page-current page-moveToTop page-moveFromBottom page-moveToBottom page-moveFromTop');
      v.prev('section').addClass('page-current page-moveToBottom');
      v.prev('section').prev('section').addClass('page-current page-moveFromTop');
    }else {
      $('section').removeClass('page-current page-moveToTop page-moveFromBottom page-moveToBottom page-moveFromTop');
      v.addClass('page-current page-moveToBottom');
      v.prev('section').addClass('page-current page-moveFromTop');
    }
  }
  function movePageUp(v) {
    if (v.prev('section').hasClass('page-moveFromTop')) {
      $('section').removeClass('page-current page-moveToTop page-moveFromBottom page-moveToBottom page-moveFromTop');
      v.prev('section').addClass('page-current page-moveToTop');
      v.addClass('page-current page-moveFromBottom');
    }else {
      $('section').removeClass('page-current page-moveToTop page-moveFromBottom page-moveToBottom page-moveFromTop');
      v.addClass('page-current page-moveToTop');
      v.next('section').addClass('page-current page-moveFromBottom');
      oneByOne();
    }
  }
  // one by one show
  function oneByOne() {
    var i = 0;
    var set = setInterval(function(){
      if (++i < 5) {
        $('.item').eq(i).show();
      }else {
        clearInterval(set);
      }
    }, 700);
  }
});