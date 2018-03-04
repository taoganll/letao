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
})
