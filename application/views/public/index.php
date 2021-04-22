<!DOCTYPE html>
<html lang="en">
	<!--begin::Head-->
	<head><base href="../../">
		<meta charset="utf-8" />
		<title>No Aside | Keenthemes</title>
		<meta name="description" content="No aside layout examples" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<link rel="canonical" href="https://keenthemes.com/metronic" />
		<!--begin::Fonts-->
		<!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" /> -->
		<!--end::Fonts-->
		<!--begin::Page Vendors Styles(used by this page)-->
		<link href="<?=asset_url()?>plugins/custom/fullcalendar/fullcalendar.bundle.css" rel="stylesheet" type="text/css" />
		<!--end::Page Vendors Styles-->
		<!--begin::Global Theme Styles(used by all pages)-->
		<link href="<?=asset_url()?>plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="<?=asset_url()?>plugins/custom/prismjs/prismjs.bundle.css" rel="stylesheet" type="text/css" />
		<link href="<?=asset_url()?>css/style.bundle.css" rel="stylesheet" type="text/css" />
		<!--end::Global Theme Styles-->
		<!--begin::Layout Themes(used by all pages)-->
		<link href="<?=asset_url()?>css/themes/layout/header/base/light.css" rel="stylesheet" type="text/css" />
		<link href="<?=asset_url()?>css/themes/layout/header/menu/light.css" rel="stylesheet" type="text/css" />
		<link href="<?=asset_url()?>css/themes/layout/brand/light.css" rel="stylesheet" type="text/css" />
		<link href="<?=asset_url()?>css/themes/layout/aside/dark.css" rel="stylesheet" type="text/css" />
		<script src="<?=asset_url()?>js/jquery.js"></script>
  

    <style>
        .card-header {
            border: solid 2px #f25c04;
            margin: 10px;
            border-radius: calc(0.42rem - 1px) !important;
        }
        .image-input .image-input-wrapper {
            width: 320px !important;
            height: 230px !important;
        }
        .col-3{
            padding-left: 0px;
            padding-right: 0px;
        }
    </style>
		<!--end::Layout Themes-->
		<link rel="shortcut icon" href="<?=asset_url()?>media/logos/favicon.ico" />
	</head>
	<!--end::Head-->
	<!--begin::Body-->
	<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed page-loading">
        <div class="d-flex flex-column flex-root">
            <!--begin::Page-->
            <div class="d-flex flex-row flex-column-fluid page">
                <!--begin::Wrapper-->
                <div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper" style="padding-top:0px;">
                    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
                        <div class="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
                            <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                                <div class="d-flex align-items-center flex-wrap mr-1">
                                    <button class="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none" id="kt_subheader_mobile_toggle">
                                        <span></span>
                                    </button>
                                    <div class="d-flex align-items-baseline flex-wrap mr-5">
                                        <h5 class="text-dark font-weight-bold my-1 mr-5">page</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-column-fluid">
                            
                            <div class="container">
                                <?php if (isset($index)) { ?>
                                <div class="d-flex flex-row">
                                    <div class="flex-row-fluid ml-lg-12">
                                        <div class="card card-custom">
                                            <div class="card-header">
                                                <div class="col-3 col-3 d-flex flex-center">
                                                    <div id="circle"></div>
                                                </div>
                                                <div class="col-6 col-6 d-flex flex-center">
                                                    <span class="font-size-h1 d-block d-block font-weight-boldest text-dark-75 py-2">Stage <?=$index?></span>
                                                </div>
                                                <div class="col-3 col-3 d-flex flex-center">
                                                    <span class="font-size-h1 d-block d-block font-weight-boldest text-dark-75 py-2 count">0</span>
                                                    <span class="font-size-h1 d-block d-block font-weight-boldest text-dark-75 py-2">/3</span>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div class="col-lg-4 col-xl-4 d-flex flex-center">
                                                    <div class="image-input image-input-outline" id="kt_image_0">
                                                        <div class="image-input-wrapper" style="background-image: url(<?= upload_url().$file["img_1"]?>)"></div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-xl-4 d-flex flex-center">
                                                    <div class="image-input image-input-outline" id="kt_image_0">
                                                        <div class="image-input-wrapper detail" onclick="getPosition(event)" style="background-image: url(<?= upload_url().$file["img_2"]?>)"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php } else{?>
                                  <div class="pt-30 pt-md-25 pb-15 px-5 text-center">
                                      <!--begin::Content-->
                                      <span class="font-size-h1 d-block d-block font-weight-boldest text-dark-75 py-2"><?= $event["title"]?></span>
                                      <h4 class="font-size-h6 d-block d-block font-weight-bold mb-7 text-dark-50"><?= $event["start_date"]?>~<?= $event["end_date"]?></h4>
                                      <p class="mb-15 d-flex flex-column">
                                          <?= $event["content"]?>
                                      </p>
                                      <a href="javascript:startGame()" class="btn btn-primary text-uppercase font-weight-bolder px-15 py-3">Start Game</a>
                                      <!--end::Content-->
                                    </div>
                                <?php }?>
                            </div>
                        </div>
                    </div>
                    <div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
                      <div class="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
                          <div class="text-dark order-2 order-md-1">
                              <span class="text-muted font-weight-bold mr-2">2021©</span>
                              <a href="http://keenthemes.com/metronic" target="_blank" class="text-dark-75 text-hover-primary">Keenthemes</a>
                          </div>

                          <div class="nav nav-dark">
                              <a href="http://keenthemes.com/metronic" target="_blank" class="nav-link pl-0 pr-5">About</a>
                              <a href="http://keenthemes.com/metronic" target="_blank" class="nav-link pl-0 pr-5">Team</a>
                              <a href="http://keenthemes.com/metronic" target="_blank" class="nav-link pl-0 pr-0">Contact</a>
                          </div>
                      </div>
                  </div>
                </div>
                <!--end::Wrapper-->
            </div>
            <!--end::Page-->
        </div>
        <!--end::Demo Panel-->
		<!--begin::Global Config(global config for global JS scripts)-->
		<script>var KTAppSettings = { "breakpoints": { "sm": 576, "md": 768, "lg": 992, "xl": 1200, "xxl": 1400 }, "colors": { "theme": { "base": { "white": "#ffffff", "primary": "#3699FF", "secondary": "#E5EAEE", "success": "#1BC5BD", "info": "#8950FC", "warning": "#FFA800", "danger": "#F64E60", "light": "#E4E6EF", "dark": "#181C32" }, "light": { "white": "#ffffff", "primary": "#E1F0FF", "secondary": "#EBEDF3", "success": "#C9F7F5", "info": "#EEE5FF", "warning": "#FFF4DE", "danger": "#FFE2E5", "light": "#F3F6F9", "dark": "#D6D6E0" }, "inverse": { "white": "#ffffff", "primary": "#ffffff", "secondary": "#3F4254", "success": "#ffffff", "info": "#ffffff", "warning": "#ffffff", "danger": "#ffffff", "light": "#464E5F", "dark": "#ffffff" } }, "gray": { "gray-100": "#F3F6F9", "gray-200": "#EBEDF3", "gray-300": "#E4E6EF", "gray-400": "#D1D3E0", "gray-500": "#B5B5C3", "gray-600": "#7E8299", "gray-700": "#5E6278", "gray-800": "#3F4254", "gray-900": "#181C32" } }, "font-family": "Poppins" };</script>
		<!--end::Global Config-->
		<!--begin::Global Theme Bundle(used by all pages)-->
	
		<script src="<?=asset_url()?>plugins/global/plugins.bundle.js"></script>
		<script src="<?=asset_url()?>plugins/custom/prismjs/prismjs.bundle.js"></script>
		<script src="<?=asset_url()?>js/scripts.bundle.js"></script>
		<!--end::Global Theme Bundle-->
		<!--begin::Page Vendors(used by this page)-->
		<script src="<?=asset_url()?>plugins/custom/fullcalendar/fullcalendar.bundle.js"></script>
		<script src="<?=asset_url()?>plugins/custom/gmaps/gmaps.js"></script>
		<!--end::Page Vendors-->
		<!--begin::Page Scripts(used by this page)-->
		<script src="<?=asset_url()?>js/pages/widgets.js"></script>
    <script src="<?= asset_url()?>js/jquery-circle-clock.js"></script>
    <script>
        
        var index = '<?= isset($index)?$index:""?>';
        var count = 0;
        // part to show the image pairs. Index is the stage of current
        <?php if(isset($index)) {?>
          var positions = JSON.parse('<?=$file["position"]?>');
          $('#circle').circleProgress({
              value: 1,
              size: 45,
              fill: {
                  gradient: ["blue", "orange", "red"]
              },
              reverse : true,
              animation:{ duration: 30000, easing: "circleProgressEasing" },
              startAngle: 0
          }).on('circle-animation-end', function(event, progress, stepValue) {
              alert("Time Over! You can't go on");
              window.location="<?= base_url()?>welcome/event/<?=$file["event_id"]?>";
          });
          function getPosition(evt){
            var parentOffset = $(".detail").parent().offset();
            var x = evt.pageX -parentOffset.left;
            var y = evt.pageY -parentOffset.top;
            
            for (var i=0 ; i< positions.length ; i++){
                var position = positions[i];
                if( ((x-15) < position[0]) && ( position[0] < (x+15)) && ((y-15) < position[1]) && ( position[1] < (y+15))){
                    positions.splice(i,1);
                    count++;
                    $(".count").html(count);
                    
                }
            }
            if(count == 3){
                if(index == 5){
                    alert("congratelation!");
                    for (var i = 0; i < localStorage.length; i++) {
                        var str = localStorage.key(i);
                        if(str.includes("imgcomp-")){
                            sessionId = str;
                        }
                    }
                    window.location = "<?= base_url()?>welcome/bage/<?=$file["event_id"]?>/"+sessionId;

                }else{
                    var sessionId = "";
                    alert("Let's go to the next stage");
                    
                    index = parseInt(index) + 1;
                    window.location = "<?= base_url()?>welcome/event/<?=$file["event_id"]?>/"+index;
                }
            }
        }
        <?php } ?>

        // part to show the start page before go to game. 
        <?php if(isset($event)){?>
            var sessionId = "";
        function startGame(){
            var bages = [];
            //  check the imgcomp- string to find the already added localstorage. 
            //  If the storage already exist then skip to create and if there is not, create one storage
            for (var i = 0; i < localStorage.length; i++) {
                var str = localStorage.key(i);
                if(str.includes("imgcomp-")){
                    sessionId = str;
                }
            }
            if(!sessionId){
                var sessionId = "imgcomp-" + makeid(15);
            
                localStorage.setItem(sessionId, JSON.stringify(bages));
            }

            window.location = "<?=base_url()?>welcome/event/<?=$event["id"]?>/1";
        }
        <?php }?>
        function makeid(length) {
            var result           = [];
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *  charactersLength)));
            }
            return result.join('');
        }
    </script>
		<!--end::Page Scripts-->
	</body>
	<!--end::Body-->
</html>