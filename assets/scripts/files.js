/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*************************************************************!*\
  !*** ../demo1/src/js/pages/crud/file-upload/image-input.js ***!
  \*************************************************************/


// Class definition
var KTImageInputDemo = function () {
	// Private functions
	var initDemos = function () {
		var avatar1 = new KTImageInput('kt_image_0');
		var avatar2 = new KTImageInput('kt_image_0_1');
		var avatar3 = new KTImageInput('kt_image_1');
		var avatar4 = new KTImageInput('kt_image_1_1');
		var avatar5 = new KTImageInput('kt_image_2');
		var avatar6 = new KTImageInput('kt_image_2_1');
		var avatar7 = new KTImageInput('kt_image_3');
		var avatar8 = new KTImageInput('kt_image_3_1');
		var avatar9 = new KTImageInput('kt_image_4');
		var avatar0 = new KTImageInput('kt_image_4_1');
	}

	return {
		// public functions
		init: function() {
			initDemos();
		}
	};
}();

jQuery(document).ready(function () {
	KTImageInputDemo.init();
});

/******/ })()
;
//# sourceMappingURL=image-input.js.map

function getPosition(index , evt){
	var parentOffset = $('.image-'+index+"-1").parent().offset();
	var x = evt.pageX -parentOffset.left;
	var y = evt.pageY -parentOffset.top;
	
	var point = [Math.floor(x), Math.floor(y)];
	var position = JSON.parse($("input[name=position-"+index+"]").val());
	position.push(point);
	$("input[name=position-"+index+"]").val(JSON.stringify(position));
}
function delPos(index){
	$("input[name=position-"+index+"]").val("[]");
}
function saveImg(index, id){
	var temp1 = $(".image-"+index+"-1").css("background-image");
	var temp2 = $(".image-"+index).css("background-image");
	
	if(temp1 == "url(http://localhost/imgcomp/admin/)" || temp2 == "url(http://localhost/imgcomp/admin/)"){
		toastr.error("Please choose the image pairs");
		return
	}
	var formData = new FormData();

	var file1 = $('#profile_avatar_'+index)[0].files;
	var file2 = $('#profile_avatar_'+index+"_1")[0].files;
	
	if(file1.length > 0 ){
		formData.append('file1',file1[0]);
	}
	if(file2.length > 0 ){
		formData.append('file2',file2[0]);
	}
	
	var position  = JSON.stringify($("input[name=position-"+index+"]").val());
	var event_id = $("#event_id").val();
	formData.append("event_id", event_id);
	formData.append("position", position);

	var photo_id = $("input[name=photo-id-"+index+"]").val();
	formData.append("id", photo_id);

	$.ajax({
		url: HOST_URL + 'admin/files/save',
		type: 'post',
		data: formData,
		contentType: false,
		processData: false,
		success: function(response){
			var data = JSON.parse(response);
			if(data.success == true){
				toastr.success(data.msg);
				var raw = data.data;
				$("input[name=photo-id-"+index+"]").val(raw.id);
			}else{
				toastr.error(data.msg)
			}
		},
	});
}