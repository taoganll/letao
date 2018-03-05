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
                    bootstrapMajorVersion:3, //���ʹ����bootstrap3�汾������ָ��
                    currentPage: page,  //���õ�ǰҳ
                    totalPages: Math.ceil(info.total/info.size),//������ҳ��
                    numberOfPages:5,// ������ʾ����ҳ
                    //��ҳ�뱻�����ʱ�򴥷�
                    onPageClicked: function (a,b,c,p) {
                        //�޸�һ��page��ֵ
                        page = p;
                        //������Ⱦ
                        render();
                    }

                });
            }
        })
    }
    render();
})

