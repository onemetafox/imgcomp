$(function () {
  var isSp = window.matchMedia('(max-width:767px)');

  /*
  / MakeUpBreadcrumb
   */
  var MakeUpBreadcrumb = {
    start: function () {
      var jsonld = '';
      try {
        jsonld = JSON.parse(document.querySelectorAll('script[type="application/ld+json"]')[0].innerText);
      } catch (e) {
        console.log('bread null');
      }
      if (jsonld) {
        var item = '';
        var j = jsonld.itemListElement.length;
        for (var i = 0; i < j; i++) {
          if (jsonld.itemListElement[i].position == 1) {
            var url = '/';
            var name = 'トップ';
          } else {
            var url = jsonld.itemListElement[i].item['@id'].replace('https://www.dydo.co.jp', '');
            var name = jsonld.itemListElement[i].item['name'];
          }
          if (jsonld.itemListElement[i].position == jsonld.itemListElement.length) {
            item += '<li><span>' + name + '</span></li>';
          } else {
            item += '<li><a href="' + url + '" title="' + name + '">' + name + '</a></li>';
          }
        }
        $('.breadcrumb').html(item);
      }
    }
  };
  MakeUpBreadcrumb.start();

  //set for btn_page_top
  var btnPageTop = $('#btn_page_top');
  btnPageTop.css('bottom', '-100px');

  var btnPageTopShow = false;
  var btnPageTopFixed = true;
  var btnPageTopFixedPos = '28px';
  var btnPageTopCanMove = false;
  var btnPageTopPosHeight = $('body').height() - $('#footer').height() - $(window).height() - 38;

  // ページはスクロール可能か
  //   不可：main が windowより小さい
  //   不可：main - fotter（コンテンツ高さ）がwindowの1.5倍より小さい

  if (btnPageTopPosHeight > 0) {
    btnPageTopCanMove = true;
  } else {
    var i = $(window).height() - $('body').height() - $('#footer').height();
    btnPageTop.css('bottom', '-100px');
  }

  $(window).resize(function () {
    btnPageTopPosHeight = $('body').height() - $('#footer').height() - $(window).height() - 38;
    // ページはスクロール可能か
    if (btnPageTopPosHeight > 0) {
      btnPageTopCanMove = true;
    } else {
      var i = $(window).height() - $('body').height() - $('#footer').height();
      $('#btn_page_top').hide();
      btnPageTop.css('bottom', '-100px');
    }
  });

  $(window).scroll(function () {
    btnPageTopPosHeight = $('body').height() - $('#footer').height() - $(window).height() + 20;
    if (btnPageTopCanMove) {
      if ($(this).scrollTop() > btnPageTopPosHeight) {
        btnPageTopFixed = false;

        btnPageTop.css('bottom', btnPageTopFixedPos);
      } else {
        if ($(this).scrollTop() > 50) {
          if (btnPageTopShow == false) {
            btnPageTopShow = true;
            btnPageTop.stop().animate({
              bottom: btnPageTopFixedPos
            });
          }
          if (btnPageTopFixed == false) {
            btnPageTopFixed = true;
            btnPageTop.css('bottom', btnPageTopFixedPos);
          }
        } else {
          if (btnPageTopShow) {
            btnPageTopShow = false;
            btnPageTop.stop().animate({
                bottom: '-100px'
              },
              200
            );
          }
        }
      }
    }
  });
  //スクロールしてトップ
  btnPageTop.click(function () {
    $('body,html').animate({
        scrollTop: 0
      },
      500
    );
    return false;
  });

  /*
  / MENU for SP
  */
  $('#js-header_navigation-btn').on('click', function () {
    // check state subMenu
    $('.js-toggle-header-submenu')
      .next('.submenu_box')
      .each(function () {
        if ($(this).hasClass('active')) {
          $(this).toggleClass('active');
        }
      });
    // toggle mainMenu
    if ($(this).hasClass('nav-act')) {
      $('#main_navigation , #js-header_navigation-btn').removeClass('nav-act');
      $('.main_navigation_group').css('margin-bottom', '0');
      $('.lower_open').removeClass('lower_open');
      $('.lower3_open').removeClass('lower3_open');
    } else {
      $('#main_navigation , #js-header_navigation-btn').addClass('nav-act');
    }
  });
  $('.sp_lower_menu_btn').on('click', function () {
    if (!$('#js-header_navigation-btn').hasClass('nav-act')) {
      return false;
    }
    var item = '';
    var n = 0;
    var t = $(this).parent();

console.log('sp_sub_menu_btn clicked!');

    if (t.hasClass('lower_setted')) {
      console.log('lower_setted');
    } else {
      t.addClass('lower_setted');

      var item = '';
      var n = 0;

      t.find('.sp_lower_menu').each(function () {
        console.log($(this).attr('href'));
        if ($(this).attr('href')) {
          item +=
            '<li><a href="' +
            $(this).attr('href') +
            '" title="' +
            $(this).attr('title') +
            '"><span>' +
            $(this).attr('title') +
            '</span></a></li>';
          n++;
        }
      });
      n = Math.ceil(n / 2);
      console.log(item);
      console.log(n);
      t.prepend('<ul class="sp_lower_menu for_sp" style="height:' + (n * 53 + 1) + 'px;">' + item + '</ul>');
    }
    if (t.hasClass('lower_open')) {
      t.removeClass('lower_open');
      t.find('.sp_lower3_menu_btn').removeClass('lower3_open');
      t.parent().css('margin-bottom', '0');
    } else {
      t.addClass('lower_open');
console.log(t.find('.sp_lower_menu > li').length);
      n = t.find('.sp_lower_menu > li').length * 53;
      t.parent().css('margin-bottom', n);
    }
  });
  $('.sp_lower3_menu_btn').on('click', function () {
    if (!$('#js-header_navigation-btn').hasClass('nav-act')) {
      return false;
    }
    var n = 0;
    var t = $(this).parents('.main_navigation_group');
    
    if($(this).hasClass('lower3_open')) {
      $(this).removeClass('lower3_open');
      n = t.find('.sp_lower_menu > li').length * 53;
      t.css('margin-bottom', n);
    } else {
      $(this).addClass('lower3_open');
      n = t.find('.sp_lower_menu > li').length * 53;
      n += t.find('.sp_lower3_menu > li').length * 48;
      t.css('margin-bottom', n);
    }
    
  });

  //submenu
  /*
  $('.js-toggle-header-submenu').on('click', function () {
    if (isSp.matches) {
      // check state mainMenu
      if ($('#js-header_navigation-btn').hasClass('nav-act')) {
        $('#main_navigation , #js-header_navigation-btn').removeClass('nav-act');
      }
      // check state other subMenu
      // $('.js-toggle-header-submenu')
      //   .next('.submenu_box')
      //   .each(function() {
      //     if ($(this).hasClass('active')) {
      //       $(this).removeClass('active');
      //     }
      //   });
      //toggle submenu
      $sub_menu = $(this).next('.submenu_box');
      if ($sub_menu.hasClass('active')) {
        $sub_menu.removeClass('active');
        console.log('close');
      } else {
        $sub_menu.addClass('active');
        console.log('open');
      }
      return false;
    }
  });
  */
  /*
  / MENU for PC Member
  */
  /*
  $('#btn_loginbox').on('click', function () {
    $(this).toggleClass('_is_btn_close');
    $('#header_member_login_box').toggleClass('_is_open');
    if($('#header_member_login_box').hasClass('_is_open')){
      if($('._csstrans header .nav-3').hasClass('_is_open')){
      } else {
        $('._csstrans header .nav-3').addClass('_is_open');
        setTimeout(function(){
          $('._csstrans header .nav-3').removeClass('_is_open');
        },3000);
      }
    } else {
      $('._csstrans header .nav-3').removeClass('_is_open');
    }
  });
  */
  $('#header_member_login_box input').on('focus', function () {
    if($('._csstrans header .nav-3').hasClass('_is_open')){
    } else {
      $('._csstrans header .nav-3').addClass('_is_open');
      setTimeout(function(){
        $('._csstrans header .nav-3').removeClass('_is_open');
      },3000);
    }
  });
  try {
    if(document.getElementById("header_member_info_box") != null){
      // check login
      var item = '';
      $.ajax({
        url: '/member/point-check',
        type: 'POST',
        cache: false,
        dataType: 'json',
        statusCode: {
          200: function (data, textStatus, jqXHR) {
            if (typeof data['error'] !== 'undefined') {
              //not login
            } else {
              //loged in
              $('#header_member_login').hide();
              $('#header_member_info_box').html('');
              $('#header_member_info_box').removeClass('header_infobox_logout');
              $('#header_member_info_box').addClass('header_infobox_login');
              var item='<h3 class="ttl_m">会員サービス</h3><div class="btn_logout"><a href="/users/logout" title="ログアウト" class="_op7"><span>ログアウト</span></a></div><ul><li><a href="/member/top" title="会員サービス" class="sp_lower_menu"><div class="title"><span class="nickname">ようこそ '+data['nickname']+'さん</span><div class="pointbox"><div class="point_title"></div><div class="txt"><span class="f24" id="header_total_point">'+data['point']+'</span><span class="f10">ポイント</span></div></div></div></a></li><li><a href="/present/member" title="会員プレゼント" class="sp_lower_menu"><span class="title_second">会員プレゼント</span></a></li></ul>';
              $('#header_member_info_box').html(item);
            }
          }
        }
      });
    }
  } catch (e) {
  }

  /*
  / MENU carousel
  */
  var carousel_hcampaign_flg = true;
  try {
    var carousel_hcampaign = new Swiper('.swiper-container-header-campaign', {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      loop: true,
      speed: 300,
      slidesPerView: 1,
      centeredSlides: true
    });
  } catch (e) {
    carousel_hcampaign_flg = false;
  }
  $('#header_navigation .nav-3').hover(function () {
    if (carousel_hcampaign_flg) {
      carousel_hcampaign.update();
    }
  });

  /*
  / FAQ Search box
  */
  // Show search field
  $('.js-search_conditions_toggle').on('click', function () {
    $(this).toggleClass('active');
    $(this)
      .next('.search_conditions_field')
      .toggleClass('show');
  });

  // Allow radios toggle
  $('.faq_search_block label').on('click', function () {
    var target_id = $(this).attr('for');
    if ($('#' + target_id).prop('checked')) {
      $('#' + target_id)
        .prop('checked', false)
        .change();
      return false;
    }
  });

  // toggle radio disable
  $('.js-checkbox').on('change', function () {
    var selected_num = $(this).val(),
      associate_content_num_array = category_set[selected_num].length;

    var parent_id = $(this)
      .parents('.conditions_box')
      .data('type');

    switch (parent_id) {
      case 'category':
        var $associate_box = $(this)
          .closest('.faq_search_block')
          .find("[data-type='purpose']");
        break;

      case 'purpose':
        var $associate_box = $(this)
          .closest('.faq_search_block')
          .find("[data-type='category']");
        break;
    }

    //チェックがOFFになった場合
    if (!$(this).prop('checked')) {
      $associate_box.find('.js-checkbox').each(function () {
        if ($(this).prop('disabled', true)) {
          $(this).prop('disabled', false);
        }
      });
      $(this)
        .parents('.conditions_box')
        .find('input')
        .each(function () {
          if ($(this).prop('checked')) {
            var val = $(this).val();
            checkAssociateLabel(val, $associate_box);
          }
        });
      return false;
    }

    //チェックがONになった場合
    if (associate_content_num_array === 0) {
      //紐づくボックスが0の場合は全てをdisabledに
      $associate_box.find('input').prop('disabled', true);
    } else {
      //紐づくボックスが存在する場合
      //全てenabledに
      // $associate_box.find('input').prop('disabled', false);
      checkAssociateLabel(selected_num, $associate_box);
    }
  });

  /*
  / search form toggle
  */
  $('#search-btn').on('click', function () {
    $(this).toggleClass('_active');
    $('#search').toggleClass('_active');
  });
  
  /*
  / Click Count for _blank
  */
  $('._send_event_ow').on('click', function() {
    var c = $(this).data('event_category');
    var l = $(this).data('event_label');
    try {
      gtag('event', 'Click', {
        'event_category': c,
        'event_label': l
      });
    }catch(e){
    }
  });

  
});

function checkAssociateLabel(selected_num, $associate_box) {
  $associate_box.find('input').each(function () {
    var num = $(this).attr('value');
    if (num != '') {
      var chk = category_set[selected_num].indexOf(parseInt(num));
      if (chk == -1) {
        //紐づく配列の中になく現在enabledなら
        if ($(this).prop('disabled', false)) {
          $(this).prop('disabled', true);
        }
      }
    }
  });
}

/*
/ css trans setup
*/
$(window).on('load', function () {
  $('body').addClass('_csstrans');
});

