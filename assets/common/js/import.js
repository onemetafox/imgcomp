function importJS(){
  if (! new Array().push) return false;
  var scripts = new Array(
    '/common/js/vendor/jquery.js',
    '/common/js/vendor/jquery.cookie.js',
    '/common/js/vendor/jquery.lightbox.js',
    '/common/js/common.js?ud=190507',
    '/common/js/vendor/swfobject.js'
  );
  for (var i=0; i<scripts.length; i++) {
    document.write('<script type="text/javascript" src=' +scripts[i] +'></script>');
  }
}
importJS();

/*** Browser ***/
var ie = (function(){
  var undef, v = 3, div = document.createElement('div');
  while (
    div.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->',
    div.getElementsByTagName('i')[0]
  );
  return v> 4 ? v : undef;
}());

if(ie === 6 ) {//IE6 only
  document.write('<script type="text/javascript" src="/common/js/jquery.belatedPNG.js"></script>');
}
