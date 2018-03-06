/**
 * Created by MyPC on 2018/3/6.
 */
$(function () {
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(info){
            //console.log(info);
            $('.lt-ul1').html(template("tmp",info))
            renderScrent(info.rows[0].id)
        }
    })
    function renderScrent(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{id:id},
            success:function(info){
                //console.log(info)
                $('.lt-ul2').html(template("tmp-ul",info));
            }
        })
    }
    $('.lt-ul1').on('click','li',function(){
       $(this).addClass("now").siblings().removeClass("now")
        var id = $(this).data("id");
        renderScrent(id);
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);//100ºÁÃë¹ö¶¯µ½¶¥
        //console.log(id)
    })
})