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
    $scope.init = function(){
      $scope.infantInfo.unitType ='US';
      customize_cookie('usstandard');
    }
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
            var weightArray = [[$scope.infantInfo.age,$scope.infantInfo.weight]];
            var wcConfig = {
              'title': 'Weight Infant Chart',
              'subTitle':'0 to 36 months',
              'sourcePath':'../../resource/wtageinf.csv',
              'divID':"weightChart",
              'gender': $scope.infantInfo.gender,
              'percentile': $scope.chartPara.wfa_per,
              'toolTipX':'Weight',
              'toolTipY':'Age',
              'axisY':'Weight'
            };
            drawInfantChart(weightArray,wcConfig);

            var lengthArray = [[$scope.infantInfo.age,$scope.infantInfo.length]];
            var lenConfig = {
              'title': 'Length Infant Chart',
              'subTitle':'0 to 36 months',
              'sourcePath':'../../resource/lenageinf.csv',
              'divID':"lengthChart",
              'gender': $scope.infantInfo.gender,
              'percentile': $scope.chartPara.lfa_per,
              'toolTipX':'Length',
              'toolTipY':'Age',
              'axisY':'Length(cm)'
            };
            drawInfantChart(lengthArray,lenConfig);

            var hdArray = [[$scope.infantInfo.age,$scope.infantInfo.headCircle]];
            var hdConfig = {
              'title': 'Head Circle Infant Chart',
              'subTitle':'0 to 36 months',
              'sourcePath':'../../resource/hcageinf.csv',
              'divID':"headCircleChart",
              'gender': $scope.infantInfo.gender,
              'percentile': $scope.chartPara.hc_per,
              'toolTipX':'HeadCircle',
              'toolTipY':'Age',
              'axisY':'HeadCircle(cm)'
            };
            drawInfantChart(hdArray,hdConfig);
        });
        jQuery("#gcList").show();    
    };
    $scope.setWeightUS = function(){
        var lbs = safeParseInt(jQuery("#weightlbs").val());
        var once = safeParseInt(jQuery("#weightounce").val());
        $scope.infantInfo.weight = (lbs +once/16)*0.454;
    };
    $scope.init();

    
}]);
