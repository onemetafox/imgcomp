arrows = {
    leftArrow: '<i class="la la-angle-right"></i>',
    rightArrow: '<i class="la la-angle-left"></i>'
}
var datatable;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************************!*\
  !*** ../demo1/src/js/pages/crud/ktdatatable/base/data-ajax.js ***!
  \****************************************************************/

// Class definition

var KTDatatableRemoteAjaxDemo = function() {
    // Private functions

    // basic demo
    var demo = function() {

        datatable = $('#events').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: HOST_URL + 'admin/events/api',
                        // sample custom headers
                        headers: {'x-my-custom-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
				// autoColumns: true
            },

            // layout definition
            layout: {
                scroll: false,
                footer: false,
				icons:{
					pagination: {
						next: 'la la-angle-right',
						prev: 'la la-angle-left',
						first: 'la la-angle-double-left',
						last: 'la la-angle-double-right',
						more: 'la la-ellipsis-h'
					  }
				},
            },
			
            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#kt_datatable_search_query'),
                key: 'generalSearch'
            },
			// columns definition
            columns: [{
                field: 'title',
                title: 'Title',
            }, {
                field: 'input_user',
                title: 'Input User'
            }, {
                field: 'start_date',
                title: 'Start Date'
            }, {
                field: 'end_date',
                title: 'End Date'
            }, {
                field: 'content',
                title: 'Description'
            }, {
                field: 'created_at',
                title: 'Created Date'
            }, {
                field: 'bage',
                title: 'Bage Image',
                sortable: false,
                overflow: 'visible',
                autoHide: false,
                template: function(row) {
                    if(row.bage){
                        return '\
                            <img style="width:30px; height:30px" src="'+HOST_URL+'uploads/bage/'+row.bage+'" alt="image">\
                        ';
                    }else{
                        return "";
                    }
                    
                },
            }, {
                field: 'qr_code',
                title: 'QR Image',
                sortable: false,
                overflow: 'visible',
                autoHide: false,
                template: function(row) {
                    if(row.qr_code){
                        return '\
                            <img style="width:30px; height:30px" src="'+HOST_URL+'uploads/qr/'+row.qr_code+'" alt="image">\
                        ';
                    }else{
                        return "";
                    }
                    
                },
            }, {
                field: 'Actions',
                title: 'Actions',
                sortable: false,
                width: 240,
                overflow: 'visible',
                autoHide: false,
                template: function(row) {
                    return '\
                    <a href="'+HOST_URL +'admin/events/view/' +row.id+'" class="btn btn-icon btn-light btn-hover-primary btn-sm" title="Set Image Pair">\
                        <span class="svg-icon svg-icon-md svg-icon-primary">\
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                    <rect x="0" y="0" width="24" height="24"/>\
                                    <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>\
                                </g>\
                            </svg>\
                        </span>\
                    </a>\
                    <a href="javascript:qrGen('+row.id+')" class="btn btn-icon btn-light btn-hover-primary btn-sm" title="Generate QR Code">\
                        <span class="svg-icon svg-icon-md svg-icon-primary"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Communication\Send.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                <rect x="0" y="0" width="24" height="24"/>\
                                <path d="M3,13.5 L19,12 L3,10.5 L3,3.7732928 C3,3.70255344 3.01501031,3.63261921 3.04403925,3.56811047 C3.15735832,3.3162903 3.45336217,3.20401298 3.70518234,3.31733205 L21.9867539,11.5440392 C22.098181,11.5941815 22.1873901,11.6833905 22.2375323,11.7948177 C22.3508514,12.0466378 22.2385741,12.3426417 21.9867539,12.4559608 L3.70518234,20.6826679 C3.64067359,20.7116969 3.57073936,20.7267072 3.5,20.7267072 C3.22385763,20.7267072 3,20.5028496 3,20.2267072 L3,13.5 Z" fill="#000000"/>\
                            </g>\
                        </svg><!--end::Svg Icon--></span>\
                    </a>\
                    <a href="javascript:onEdit('+row.id+')" class="btn btn-icon btn-light btn-hover-primary btn-sm edit_btn" title = "Edit">\
                        <span class="svg-icon svg-icon-md svg-icon-primary">\
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                    <rect x="0" y="0" width="24" height="24" />\
                                    <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)" />\
                                    <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />\
                                </g>\
                            </svg>\
                        </span>\
                    </a>\
                    <a href="javascript:onDel('+row.id+')" class="btn btn-icon btn-light btn-hover-primary btn-sm" title="Delete">\
                        <span class="svg-icon svg-icon-md svg-icon-primary">\
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                    <rect x="0" y="0" width="24" height="24" />\
                                    <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero" />\
                                    <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3" />\
                                </g>\
                            </svg>\
                        </span>\
                    </a>\
                    ';
                },
            }],

        });
        $('#kt_datepicker_5').datepicker({
            todayHighlight: true,
            templates: arrows,
            format: "yyyy-mm-dd"
        });

        $("#new_btn").on("click", function(){
            // $('#form')[0].reset();
            $("#id").val("");
            $('#form').trigger("reset");
            $("#kt_select2_modal").modal('show');
        });
       
    };
    var temp = function (){
        $("form").submit(function (event) {
            var paramObj = new FormData($("form#kt_form")[0]);
            var files = $('#bage')[0].files;
            // Check file selected or not
            if(files.length > 0 ){
                paramObj.append('file',files[0]);
            }
            $.ajax({
                url: HOST_URL + "admin/events/save",
                type: 'post',
                data: paramObj,
                contentType: false,
                processData: false,
                success: function(response){
                    var data = JSON.parse(response);
                    if(data.success == true){
                        toastr.success(data.msg);
                        $("#kt_select2_modal").modal('hide');
                    }else{
                        toastr.error(data.msg)
                    }
                },
            });
        
            event.preventDefault();
        });
    }
    return {
        // public functions
        init: function() {
            temp();
            demo();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableRemoteAjaxDemo.init();
});

/******/ })()
;

function onEdit(id){
    $.ajax({
        type: "POST",
        url: HOST_URL + "admin/events/api",
        data: {
            query:{"id" : id}
        },
        dataType: "json",
        encode: true,
    }).done(function (data) {
        var row = data["data"];
        $("#id").val(row["id"]);
        $("#title").val(row["title"]);
        $("#input_user").val(row["input_user"]);
        $("#content").val(row["content"]);
        $("#start_date").val(row["start_date"]);
        $("#end_date").val(row["end_date"]);
        $("#kt_select2_modal").modal('show');
    });
}
function qrGen(id){
    $.ajax({
        type: "POST",
        url: HOST_URL + "admin/events/qrGen",
        data: {"id" : id },
        dataType: "json",
        encode: true,
    }).done(function (data) {
        // if(data["success"] == true){}
        toastr.success("Sucess");
        datatable.reload();
    }); 
}
function onDel(id){
    $.ajax({
        type: "POST",
        url: HOST_URL + "admin/events/delete",
        data: {"id" : id },
        dataType: "json",
        encode: true,
    }).done(function (data) {
        // if(data["success"] == true){}
        toastr.success("Sucess");
        datatable.reload();
    });
}
//# sourceMappingURL=data-ajax.js.map