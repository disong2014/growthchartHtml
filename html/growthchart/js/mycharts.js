jQuery(function () {
    jQuery('#mychart1').highcharts({
         chart: {
            type: 'spline'
        },
		title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com', 
            x: -20
        },
        xAxis: { 
			gridLineColor: 'green',
            gridLineWidth: 1,
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
			minorTickInterval: 'auto',
		    gridLineWidth: 1,
			gridLineColor: 'red',
            title: {
                text: 'Temperature (C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.9]
        }]
    });
});

function drawInfantChart(dataArray,chartConfig)
{
  
    var age = [];
    var p3 = [];
    var p5 = [];
    var p10 = [];
    var p25 = [];
    var p50 = [];
    var p75 = [];
    var p90 = [];
    var p95 = [];
    var p97 = [];
    jQuery.get(chartConfig.sourcePath,function(data){
    
    var lines = data.split('\n');
    var i = 1;
    for(i; i<lines.length; i++){
            
            var items = lines[i].split(',');
            if(items[0] == chartConfig.gender)
            {
            p3.push([items[1],parseFloat(items[5])]);		//p3
            p5.push([items[1],parseFloat(items[6])]);		//p5
            p10.push([items[1],parseFloat(items[7])]);		//p10
            p25.push([items[1],parseFloat(items[8])]);		//p25
            p50.push([items[1],parseFloat(items[9])]);		//p50
            p75.push([items[1],parseFloat(items[10])]);		//p75
            p90.push([items[1],parseFloat(items[11])]);		//p90
            p95.push([items[1],parseFloat(items[12])]);		//p95
            p97.push([items[1],parseFloat(items[13])]);		//p97
            }
    }
      
    jQuery('#'+chartConfig.divID).highcharts({
            title: {
                text: chartConfig.title,
                x: -20, //center,
                style:{"fontsize":"10px"}
            },
            subtitle: {
                text: chartConfig.subTitle,
                x: -20
            },
            tooltip: {
              formatter : function(){
                if(this.series.name == 'myChild')
                {
                  return 'Percentile:<b>'+chartConfig.percentile+'<b>';
                }
                else
                    return chartConfig.toolTipX+'<b>'+this.y+'</b>, '+chartConfig.toolTipY+':<b>'+this.x+'</b>';
            }   
            },
            yAxis : {
              title : {
                text : chartConfig.axisY
              },
              tickInterval : 2,
              minorTickInterval: 1

            },
            plotOptions:{
              series:{
                marker:{
                  enabled:false  
                }       
              }
            },
            xAxis : {
              tickInterval : 2,
              minorTickInterval : 1
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            
            series: [
            {
                name : 'p3',
                data : p3	
            },
            {
                name : 'p5',
                data : p5	
            },
            {
                name : 'p10',
                data : p10	
            },
            {
                name : 'p25',
                data : p25	
            },
            {
                name : 'p50',
                data : p50	
            },
            {
                name : 'p75',
                data : p75	
            },
            {
                name : 'p90',
                data : p90	
            },
            {
                name : 'p95',
                data : p95	
            },
            {
                name : 'p97',
                data : p97	
            },
            {
                type : 'scatter',
                name : 'myChild',
                data : dataArray,
                 marker: {
                      fillColor:'#FF0000',
                      enabled:true,
                        radius: 4
                    }
            
            }
            ]
        });
    });
}
