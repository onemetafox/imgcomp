$(function(){
  // window size check
  var windowSizeChk = {
    init: function(){
      this.chk();
      $(window).resize(function(){
        windowSizeChk.chk();
      });
    },
    chk: function(){
      if($(window).width() > 800 ){
        window.location.href = location.href.replace('jp/sp/','jp/');
      }
    },
  }
  windowSizeChk.init();
});