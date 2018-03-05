/**
 * Created by MyPC on 2018/3/4.
 */
$(function () {
    var page = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: 'GET',
            url: '/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (info){
              console.log(info);
                $('tbody').append(template('tmp',info))

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3, //如果使用了bootstrap3版本，必须指定
                    currentPage: page,  //设置当前页
                    totalPages: Math.ceil(info.total/info.size),//设置总页数
                    numberOfPages:5,// 设置显示多少页
                    //当页码被点击的时候触发
                    onPageClicked: function (a,b,c,p) {
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
})

