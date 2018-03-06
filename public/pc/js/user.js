/**
 * Created by MyPC on 2018/3/4.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;
//分院与渲染
    function render() {
        $.ajax({
            type: 'GET',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                //console.log(info);
                $('tbody').html(template('tmp', info))

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //如果使用了bootstrap3版本，必须指定
                    currentPage: currentPage,  //设置当前页
                    totalPages: Math.ceil(info.total / pageSize),//设置总页数
                    //numberOfPages: 5,// 设置显示多少页
                    //当页码被点击的时候触发
                    onPageClicked: function (a, b, c, p) {
                        //修改一下page的值
                        page = p;
                        //重新渲染
                        render();
                    }

                });

            }
        })
    }

    render();
    //批准与禁用
    $('tbody').on('click', '.btn', function () {
        $('#Disable').modal('show');
        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-success") ? 1 :0 ;
        $('#Determine').off().on('click', function () {
            $.ajax({
                type: 'POST',
                url: '/user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete,
                },
                success: function (info) {
                    console.log(info)
                        if (info.success) {
                            $("#Disable").modal("hide");
                            //重新渲染表格
                            render();
                        }
                }
            })
        })

    })

})

