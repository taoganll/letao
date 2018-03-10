/**
 * Created by MyPC on 2018/3/4.
 */
$(function () {
    var page = 1;
    var pageSize = 5;
    //1. 点击添加分类，显示模态框, 加载一级分类的数据
    $('.btn-add').on('click', function () {
        $('#Add-to').modal('show');
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                $('.dropdown-menu').html(template('tmp-l', info))
            }
        })
    })
//渲染二级分类列表以及分页
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                //console.log(info);
                $('.shops').html(template('tmp', info))
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    onPageClicked: function (event, originalEvent, type, p) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p;
                        render();
                    }
                });
            }
        })
    }

    render()
//2. 给dropdown-menu下的所有的
    $('.dropdown-menu').on('click', 'a', function () {
        var text = $(this).text();
        $('.btn-text').text(text);
        var id = $(this).data("id");
        $("[name='categoryId']").val(id);
        $form.data('bootstrapValidator').updateStatus('categoryId', 'VALID');

    })
    //3. 初始化图片上传
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            var pic1 = data.result.picAddr;
            $('.img_box img').attr("src", pic1);
            $("[name='brandLogo']").val(pic1)
            $form.data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });
    //4.表单校验
    var $form = $("form");
    $form.bootstrapValidator({

        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二极分类'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请选择图片'
                    }
                }
            }
        },
        excluded: []
    });
    $form.on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/category/addSecondCategory',
            data: $form.serialize(),
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $("#Add-to").modal("hide");
                    page = 1;
                    render()
                }

            }


        })
    })
})