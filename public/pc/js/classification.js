/**
 * Created by MyPC on 2018/3/4.
 */
$(function(){
    var page = 1;
    var pageSize = 2;
    $('.btn-add').on('click', function () {
        $('#Add-to').modal('show');
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                $('.dropdown-menu').html(template('tmp-l', info))
            }
        })
    })
    //��Ⱦ��ҳ������
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                //console.log(info)
                $('.field').html(template('tmp',info));
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    size:"normal",

                    //itemTexts����ص��������ÿһ����ť��ִ��һ�Σ�����ֵ����ÿһ����ť��ʾ������
                    //type:ָÿ����ť������   ��ҳ-first  ��һҳ-prev  ҳ��-page  ��һҳ-next ���һ��-last
                    //page:ָ����ÿ����ť��Ӧ��ҳ��ֵ
                    itemTexts: function (type, page, current) {


                        //console.log(type, page, current);
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            default:
                                return "第"+page+"页";
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        //console.log(type, page, current);
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            default:
                                return "第"+page+"页";
                        }
                    },
                    useBootstrapTooltip:true,
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();
                    }
                });
            }
        })
    }
    render();
})