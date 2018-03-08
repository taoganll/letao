/**
 * Created by MyPC on 2018/3/4.
 */
$(function(){
    var page = 1;
    var pageSize = 5;
    $('.btn-add').on('click', function () {
        $('#Add-to').modal('show');
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                $('.dropdown-menu').html(template('tmp-l',info))
            }
        })
    })

    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                //console.log(info);
                $('.shops').html(template('tmp',info))
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    onPageClicked:function(event, originalEvent, type,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page=p;
                        render();
                    }
                });
            }
        })
    }
    render()

    $('.dropdown-menu').on('click','a',function(){
       var text =$(this).text();
       $('.btn-text').text(text);
        var id =$(this).data("id");
        $("[name='categoryId']").val(id);
    })
})