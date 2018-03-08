/**
 * Created by MyPC on 2018/3/4.
 */
$(function () {
    var page = 1;
    var pageSize = 5;
    $('.btn-add').on('click', function () {
        $('#Add-to').modal('show');
    })

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                //console.log(info);
                $('.shop').html(template('tmp', info));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//Ĭ����2�������bootstrap3�汾�������������
                    currentPage: page,//��ǰҳ
                    totalPages:Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        //Ϊ��ť�󶨵���¼� page:��ǰ����İ�ťֵ
                        page = p;

                        render();
                    }
                });
            }
        })
    }

    render()
    //��ʼ����У��
    var $form = $("form");
    $form.bootstrapValidator({

        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //校验规则
        fields:{
            categoryName: {
                validators:{
                    notEmpty:{
                        message:'一级分类用户名不能为空'
                    }
                }
            }
        }

    });
    $form.on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(info){
                //console.log(info);
                $("#Add-to").modal("hide");
                $form.data("bootstrapValidator").resetForm(true);
                page=1;
                render();
            }
        })
    })

})