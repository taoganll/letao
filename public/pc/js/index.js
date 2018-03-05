/**
 * Created by MyPC on 2018/3/3.
 */
$(function(){

    var myChart = echarts.init(document.querySelector('.echastr_left'));
    var myChart1 =echarts.init(document.querySelector('.echastr_right'));
    var option = {
        title: {
            text: '陶淦毕业薪资'
        },
        tooltip: {},
        legend: {
            data:['薪资']
        },
        xAxis: {
            data: ["2018","2019","2020","2021","2022","2023"]
        },
        yAxis: {},
        series: [{
            name: '薪资',
            type: 'bar',
            data: [12000, 13000, 15000, 18000, 20000, 23000]
        }]
    };

    var option2 = {
        title : {
            text: '陶淦毕业薪资',
            subtext: '我的薪资',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['2018','2019','2020','2021','2022','2023']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:12000, name:'2018'},
                    {value:13000, name:'2019'},
                    {value:15000, name:'2020'},
                    {value:18000, name:'2021'},
                    {value:20000, name:'2022'},
                    {value:23000, name:'2023'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChart1.setOption(option2);
})