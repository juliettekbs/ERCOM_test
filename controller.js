app.controller('mainCtrl', function ($scope,$http) {
	//initialisation
	init = function(){
		$scope.selectedParameter = "files";
		$scope.parameterMoy = 0;
		$scope.parameterMin = 0;
		$scope.parameterMax = 0;
		// scope pour le select
		$scope.times = $scope.getDatas("time");
		//initialisation des valeurs du select
		$scope.selectedAfter = $scope.times[0];
		$scope.selectedBefore = $scope.times[$scope.times.length - 1];
		//génération du graph
		$scope.generateGraph();
		//calcul des valeur du min max et moy
		$scope.calculMinMaxMoy();
		// récupération de la liste des paramètres.
		$scope.parameters = getParameters()
	}
	const getParameters = function(){
		parameters = [];
		for(var param in metrics[0]){
			//suppresion du paramètre temps
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
		metrics.forEach(function(element,key){
			if(element["time"] >= $scope.selectedAfter){
				// parametre min == au premier élément 
				if(element["time"] == $scope.selectedAfter){$scope.parameterMin = element[$scope.selectedParameter];}
				if($scope.parameterMin > element[$scope.selectedParameter]){$scope.parameterMin = element[$scope.selectedParameter];}
				if($scope.parameterMax < element[$scope.selectedParameter]){$scope.parameterMax = element[$scope.selectedParameter];}
				sommeData += element[$scope.selectedParameter];	
				count += 1;	
				// arret de la fonction si temps supérieur à celui définit ou si fin du tableau		
				if(element["time"] > $scope.selectedBefore || key == metrics.length-1){
					$scope.parameterMoy = sommeData/count;
					return;
				}
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
			      // affichage du parametre selectionné et du temps
			      value: ['time', $scope.selectedParameter]
			    },
			    // format des données
		        xFormat: '%d-%m %H:%M:%S', // 'xFormat' can be used as custom format of 'x'
		        
		    },
		    axis: {
		        x: {
		        	// valeur minimum et maximum pour l'axis x c-a-d le temps
		        	min: $scope.selectedAfter,
		        	max: $scope.selectedBefore,
		            type: 'timeseries',
		            tick: {
		            	// format de l'axis x
		                format: '%d-%m %H:%M:%S'
		            }
		        }
		    }
		});
	}
	init();
	

});