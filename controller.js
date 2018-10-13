app.controller('mainCtrl', function ($scope,$http) {
	metrics = JSON.parse(metrics);
	$scope.dateBefore = '2018-03-16 11:39:28';
	$scope.dateAfter = '2018-03-16 12:39:28';
	const getParameters = function(){
		$scope.parameters = Object.keys(metrics[0])
		console.log($scope.parameters)
	}
	$scope.getData= function(param){
		var data = [param];
		metrics.forEach(function(element){
			data.push(element[param]);
		})
		return data;
    }
	$scope.time = $scope.getData("time");
	$scope.data = $scope.getData("files");
	console.log($scope.time.length)
	console.log($scope.data)
	$scope.updateChart = function(){
		var chart = c3.generate({
		    data: {
		    	json : metrics,
		    	keys: {
			      // x: 'name', // it's possible to specify 'x' when category axis
			      x: 'time',
			      value: ['time', 'files']
			    },
		        xFormat: '%d-%m %H:%M:%S', // 'xFormat' can be used as custom format of 'x'
		        
		    },
		    axis: {
		        x: {
		            type: 'timeseries',
		            tick: {
		                format: '%d-%m %H:%M:%S'
		            }
		        }
		    }
		});
	}

	$scope.updateChart();
	
	getParameters()

});