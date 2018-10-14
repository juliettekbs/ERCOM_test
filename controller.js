app.controller('mainCtrl', function ($scope,$http) {
	init = function(){
		$scope.selectedParameter = "files";
		$scope.parameterMoy = 0;
		$scope.parameterMin = 0;
		$scope.parameterMax = 0;
		$scope.times = $scope.getDatas("time");
		$scope.files = $scope.getDatas("files");
		$scope.selectedAfter = $scope.times[0];
		$scope.selectedBefore = $scope.times[$scope.times.length - 1];
		$scope.generateGraph();
		$scope.calculMinMaxMoy();
		$scope.parameters = getParameters()
	}
	const getParameters = function(){
		parameters = [];
		for(var param in metrics[0]){
			if(param != "time"){
				parameters.push(param);
			}
		}
		return parameters;
	}
	$scope.getDatas= function(param){
		var datas = [];
		metrics.forEach(function(element){
			datas.push(element[param]);
		})
		return datas;
    }
	
	$scope.calculMinMaxMoy=function(){
		var debut = false;
		var fin = false;
		var sommeData = 0;
		var count = 0;
		metrics.forEach(function(element){
			if(element["time"] == $scope.selectedAfter){
				debut = true;
				$scope.parameterMin = element[$scope.selectedParameter];
			}else if(element["time"] == $scope.selectedBefore){
				fin = true;
				$scope.parameterMax = element[$scope.selectedParameter];
			}
			if(debut == true && fin == false){
				sommeData += element[$scope.selectedParameter];
				count += 1;
			}else if(fin == true){
				$scope.parameterMoy = sommeData/count;
			}
		})
	}
	$scope.generateGraph = function(){
		var chart = c3.generate({
			unload:true,
		    data: {
		    	json : metrics,
		    	keys: {
			      // x: 'name', // it's possible to specify 'x' when category axis
			      x: 'time',
			      value: ['time', $scope.selectedParameter]
			    },

		        xFormat: '%d-%m %H:%M:%S', // 'xFormat' can be used as custom format of 'x'
		        
		    },
		    axis: {
		        x: {
		        	padding: {
				      left: 0,
				      right: 0
				    },
		        	outer:false,
		        	min: $scope.selectedAfter,
		        	max: $scope.selectedBefore,
		            type: 'timeseries',
		            tick: {
		            	multiline: true,
		                format: '%d-%m %H:%M:%S'
		            }
		        }
		    }
		});
	}
	init();
	

});