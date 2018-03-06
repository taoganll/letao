/**
 * Created by MyPC on 2018/3/4.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;
//��Ժ����Ⱦ
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
    //��׼�����
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
                            //������Ⱦ���
                            render();
                        }
                }
            })
        })

    })

})

