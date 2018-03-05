/**
 * Created by MyPC on 2018/3/3.
 */
$(function () {
    NProgress.configure({
        showSpinner: false
    })

    $(document).ajaxStart(function () {
        NProgress.start();
    })
    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        }, 500)
    })


    $('.nav li').on('click', function () {
         $('.er-nav').slideToggle(500);

    })
    $('.disappear').on('click',function(){
        $('.it_aside').toggleClass('now')
        $('.loginOut').toggleClass('now')
    })
    $('.retreat').on('click',function(){
        $('#myModal').modal('show')
    })
    $('.btn-loginOut').on('click',function(){
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(info){
                //console.log(info)
                if({success:true}){
                    location.href="login.html";
                }
            }
        })
    })
    //ÅÐ¶ÏÊÇ·ñµÇÂ¼
    if(location.href.indexOf("login.html")==-1){
        $.ajax({
            type:'GET',
            url:'/employee/checkRootLogin',
            success:function(info){
                if(info.error===400){
                    location.href ="login.html"
                }
            }
        })
    }
})
