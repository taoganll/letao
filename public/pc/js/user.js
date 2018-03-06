/**
 * Created by MyPC on 2018/3/4.
 */
$(function () {
    var currentPage = 1;
    var  pageSize = 5;
//��Ժ����Ⱦ
     function render() {
        $.ajax({
            type: 'GET',
            url: '/user/queryUser',
            data: {
                page:currentPage ,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('tmp', info))

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //���ʹ����bootstrap3�汾������ָ��
                    currentPage: currentPage,  //���õ�ǰҳ
                    totalPages: Math.ceil(info.total / pageSize),//������ҳ��
                    //numberOfPages: 5,// ������ʾ����ҳ
                    //��ҳ�뱻�����ʱ�򴥷�
                    onPageClicked: function (a, b, c, p) {
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

