var growthChartControllers = angular.module('growthChartControllers',[]);

growthChartControllers.controller('NavBarCtrl',['$scope',
    function($scope){
        $scope.tab = 1;
        $scope.setTab = function(settab){
            $scope.tab = settab;
        };
        $scope.isSelectedTab = function(selTab){
            return $scope.tab === selTab;
        };
    }
]);
growthChartControllers.controller('infantCtrl',['$scope',function($scope){
    $scope.infantInfo = {};
    $scope.showInfo = function(){
        var birthdate = new Date($scope.infantInfo.dateBirth);
        var curdate = new Date();
        $scope.infantInfo.ktype = ($scope.infantInfo.unitType =='US')?'1':'2';
        $scope.infantInfo.age = getAge('month',birthdate,curdate);
	if($scope.infantInfo.unitType == 'US')
	{
            $scope.infantInfo.length = safeParseFloat($scope.infantInfo.heightInch)*2.54;
            $scope.infantInfo.headCircle = safeParseFloat($scope.infantInfo.hcInch)*2.54;

	}
        jQuery.ajax({
            type: "GET",
            url: "http://webservices.onlinegrowthcharts.com/gc",  
            data: {ktype: $scope.infantInfo.ktype,
                age:$scope.infantInfo.age,
                gender:$scope.infantInfo.gender,
                weight:$scope.infantInfo.weight,
                stature:$scope.infantInfo.length,
                hc:$scope.infantInfo.headCircle}
        }).done(function( result ) {

            $scope.chartPara = jQuery.parseJSON(result );
            var age = [];
            var p3 = [];
            var p5 = [];
            var p10 = [];
            var p25 = [];
            var p50 = [];
            var p75 = [];
            var p85 = [];
            var p90 = [];
            var p95 = [];
            var p97 = [];
            jQuery.get('../../resource/BMI_boy_2yr_20yrs.csv',function(data){
            
            var lines = data.split('\n');
            var i = 1;
            for(i; i<lines.length; i++){
                    var items = lines[i].split(',');
            
                    p3.push([items[0]/12,parseFloat(items[1])]);		//p3
                    p5.push([items[0]/12,parseFloat(items[2])]);		//p5
                    p10.push([items[0]/12,parseFloat(items[3])]);		//p10
                    p25.push([items[0]/12,parseFloat(items[4])]);		//p25
                    p50.push([items[0]/12,parseFloat(items[5])]);		//p50
                    p75.push([items[0]/12,parseFloat(items[6])]);		//p75
                    p85.push([items[0]/12,parseFloat(items[7])]);		//p85
                    p90.push([items[0]/12,parseFloat(items[8])]);		//p90
                    p95.push([items[0]/12,parseFloat(items[9])]);		//p95
                    p97.push([items[0]/12,parseFloat(items[10])]);		//p97
                    
            }
              
            jQuery('#container').highcharts({
                    title: {
                        text: 'Growth Chart',
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'Children',
                        x: -20
                    },
                    tooltip: {
                     formatter : function(){
                            return 'BMI:<b>'+this.y+'</b>, Age:<b>'+this.x+'</b>';
                    }   
                    },
                    yAxis : {
                    title : {
                    text : 'BMI'
                    },
                    tickInterval : 2,
                    minorTickInterval: 1

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
                        name : 'p85',
                        data : p85	
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
                        data : [ [14,24.2],[16,25.5]],
                         marker: {
                                radius: 8
                            }
                    
                    }
                    ]
                });
            });

        });
        
    };
    $scope.setWeightUS = function(){
        var lbs = safeParseInt(jQuery("#weightlbs").val());
        var once = safeParseInt(jQuery("#weightounce").val());
        $scope.infantInfo.weight = (lbs +once/16)*0.454;
    };

    
}]);
