
<!--begin::Header-->
<div id="kt_header" class="header header-fixed">
    <!--begin::Container-->
    <div class="container-fluid d-flex align-items-stretch justify-content-between">
        <!--begin::Header Menu Wrapper-->
        <div class="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
            <!--begin::Header Logo-->
            <div class="header-logo">
                <a href="index.html">
                    <img alt="Logo" src="<?= asset_url()?>media/logos/logo-dark.png">
                </a>
            </div>
            <!--end::Header Logo-->
            <!--begin::Header Menu-->
            <div id="kt_header_menu" class="header-menu header-menu-mobile header-menu-layout-default">
                <!--begin::Header Nav-->
                <ul class="menu-nav">
                    <?php foreach($menus as $menu) {?>
                        <li class="menu-item menu-item-submenu menu-item-rel menu-item-active" aria-haspopup="true">
                            <a href="<?= base_url() . $menu["url"]?>" class="menu-link">
                                <span class="menu-text"><?= $menu["name"]?></span>
                                <i class="menu-arrow"></i>
                            </a>
                        </li>
                    <?php } ?>
                </ul>
                <!--end::Header Nav-->
            </div>
            <!--end::Header Menu-->
        </div>
        <!--end::Header Menu Wrapper-->
        <!--begin::Topbar-->
        <div class="topbar">
            <!--begin::User-->
            <div class="topbar-item">
            </div>
            <!--end::User-->
        </div>
        <!--end::Topbar-->
    </div>
    <!--end::Container-->
</div>
<!--end::Header-->
<script>
var demo = function(){
    var selectbox = function() {
        $('#kt_select2_11').select2({
            placeholder: "Add catetory",
            tags: true
        });
    }
    return {
        init: function(){
            selectbox();
        }
    }
}
jQuery(document).ready(function() {
    demo.init();
});
</script>
            