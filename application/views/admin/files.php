<style>
  .image-input-wrapper{
    width : 320px !important;
    height : 230px !important;
  }
</style>
<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <div class="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
        <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <div class="d-flex align-items-center flex-wrap mr-1">
                <div class="d-flex align-items-baseline flex-wrap mr-5">
                    <h5 class="text-dark font-weight-bold my-1 mr-5"><?=$page_title?></h5>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex flex-column-fluid">
      <div class="container">
        <div class="alert alert-custom alert-white alert-shadow gutter-b" role="alert">
          <div class="alert-icon">
            <span class="svg-icon svg-icon-primary svg-icon-xl">
              <!--begin::Svg Icon | path:assets/media/svg/icons/Tools/Compass.svg-->
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24" />
                  <path d="M7.07744993,12.3040451 C7.72444571,13.0716094 8.54044565,13.6920474 9.46808594,14.1079953 L5,23 L4.5,18 L7.07744993,12.3040451 Z M14.5865511,14.2597864 C15.5319561,13.9019016 16.375416,13.3366121 17.0614026,12.6194459 L19.5,18 L19,23 L14.5865511,14.2597864 Z M12,3.55271368e-14 C12.8284271,3.53749572e-14 13.5,0.671572875 13.5,1.5 L13.5,4 L10.5,4 L10.5,1.5 C10.5,0.671572875 11.1715729,3.56793164e-14 12,3.55271368e-14 Z" fill="#000000" opacity="0.3" />
                  <path d="M12,10 C13.1045695,10 14,9.1045695 14,8 C14,6.8954305 13.1045695,6 12,6 C10.8954305,6 10,6.8954305 10,8 C10,9.1045695 10.8954305,10 12,10 Z M12,13 C9.23857625,13 7,10.7614237 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,10.7614237 14.7614237,13 12,13 Z" fill="#000000" fill-rule="nonzero" />
                </g>
              </svg>
              <!--end::Svg Icon-->
            </span>
          </div>
          <div class="alert-text">
            <b class="mr-2"><?= $event["title"]?></b><?= $event["content"]?>
          </div>
        </div>
        <input type="hidden" name="event_id" id= "event_id" value="<?=$event["id"]?>" >
        <div class="card card-custom gutter-b example example-compact">
          <!--begin::Form-->
          <?php for($i=0 ; $i<5 ; $i ++){ ?>
            <div class="card-body">
              <div class="form-group row">
                <div class="col-lg-4 col-xl-4">
                <input type="hidden" name="photo-id-<?=$i?>" value="<?=isset($files[$i])?$files[$i]["id"]:"" ?>">
                  <div class="image-input image-input-outline" id="kt_image_<?= $i?>">
                    <div class="image-input-wrapper image-<?= $i?>" style="background-image: url(<?= isset($files[$i])?upload_url().$files[$i]["img_1"]:"" ?>)"></div>
                    <label class="btn btn-xs btn-i !importantcon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Change avatar">
                      <i class="fa fa-pen icon-sm t !importantext-muted"></i>
                      <input type="file" name="profile_avatar" id ="profile_avatar_<?=$i?>" accept=".png, .jpg, .jpeg" />
                      <input type="hidden" name="profile_avatar_remove" />
                    </label>
                    <span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="cancel" data-toggle="tooltip" title="Cancel avatar">
                      <i class="ki ki-bold-close icon-xs text-muted"></i>
                    </span>
                  </div>
                </div>
                <div class="col-lg-4 col-xl-4">
                  <div class="image-input image-input-outline" id="kt_image_<?= $i?>_1">
                    <div class="image-input-wrapper image-<?= $i?>-1" onclick="getPosition('<?= $i?>', event)" style="background-image: url(<?= isset($files[$i])?upload_url().$files[$i]["img_2"]:"" ?>)"></div>
                    <label class="btn btn-xs btn-i !importantcon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Change avatar">
                      <i class="fa fa-pen icon-sm t !importantext-muted"></i>
                      <input type="file" name="profile_avatar_1" id="profile_avatar_<?=$i?>_1" accept=".png, .jpg, .jpeg" />
                      <input type="hidden" name="profile_avatar_remove" />
                    </label>
                    <span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="cancel" data-toggle="tooltip" title="Cancel avatar">
                      <i class="ki ki-bold-close icon-xs text-muted"></i>
                    </span>
                  </div>
                </div>
                <div class="col-lg-4 col-xl-4 p-2">
                  <div class="form-group row fv-plugins-icon-container">
                    <div class="input-group">
                      <input type="text" class="form-control" name="position-<?=$i?>" type="text" value='<?=isset($files[$i])?$files[$i]["position"]:"[]"?>' readonly>
                      <div class="input-group-append">
                        <button class="btn btn-default" onclick="delPos('<?= $i?>')"type="button">Clear</button>
                      </div>
                    </div>
                  </div>
                  <a href="javascript:saveImg('<?=$i?>', <?=isset($files[$i])?$files[$i]["id"]:""?>)" class="btn btn-block btn-sm btn-light-primary font-weight-bolder text-uppercase py-4">Save Image Pair</a>
                </div>
              </div>
            </div>
            <?php } ?>
        </div>
      </div>
    </div>
</div>

<script src="<?= asset_url()?>scripts/files.js"></script>
<script>
    var HOST_URL = '<?= base_url()?>';
</script>