// Definindo a referência "locations"
var locationsRef = firebase.database().ref('locations');

var simulationInitDate;
var simulationFinishDate;
var json = [];

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

function checkDate() {   // Método chamado no onclick do botão simular

    simulationInitDate = document.getElementById('dateInicio').value;
    simulationFinishDate = document.getElementById('dateFim').value;

    if (simulationInitDate == "" || simulationFinishDate == "") {
        alert('Preencha os campos data!')
    } else {
        getFireBaseData();
    }

}

// "Listener" do FireBase
function getFireBaseData() {
    $(".lds-ring").css("display", "flex");
    locationsRef.on('value', function (snapshot) {

        dados = snapshot.val();
        var inicio = new Date(moment(simulationInitDate).format("MM/DD/YYYY HH:mm"));
        var fim = new Date(moment(simulationFinishDate).format("MM/DD/YYYY HH:mm"));
        // console.log(dados)
        var nodeList = [];
        var jsonList = [];

        // Percorre os dados trazidos do firebase e manda pro json atraves do checkSimulationPeriod()
        for (let index in dados) {
            nodeList = dados[index].listOfLocation
            let nodeListCoordinates = []
            let insert = false;
            
            for (let key in nodeList) {
                if (nodeList[key].dateNow != undefined) {
                    var initial = nodeList[key].dateNow.split(/\//);
                    let dateNow = new Date([initial[1], initial[0], initial[2]].join('/'));
                    if (dateNow >= inicio && dateNow <= fim) {
                        let coordinate = {
                            lat: nodeList[key].latitude,
                            lng: nodeList[key].longitude
                        }
                        insert = true;
                        nodeListCoordinates.push(coordinate);
                    }
                }
            }

            json = {
                'averageOfSpeed': dados[index].averageOfSpeed,
                'cityName': dados[index].cityName,
                'finishDate': dados[index].finishDate,
                'initDate': dados[index].initDate,
                'listOfLocation': nodeListCoordinates,
                'meansOfTransport': dados[index].meansOfTransport
            }

            if (insert)
                jsonList.push(json)
        }

        //calcRoute(jsonList)

        // sendSimulationData(jsonList) - TIRAR O COMENTÁRIO DEPOIS
    });
}

// Inicia o mapa
function initMap() {

    // Map options
    var options = {
        zoom: 10,
        center: { lat: -21.146910, lng: -48.946270 } // Catanduva - IFSP
    }

    // New map
    map = new google.maps.Map(document.getElementById('map'), options);
    directionsDisplay.setMap(map);

}

function calcRoute(jsonList) {

    let novoNo = [];

    var originCoord = [];
    var destinationCoord = [];
    var waypoints = [];

    for (let index in jsonList) {
        novoNo[index] = jsonList[index].listOfLocation
        for (let key in novoNo) {
            waypoints[key] = novoNo[key];
        }
        originCoord[index] = waypoints[index].shift(); // Remove do início
        destinationCoord[index] = waypoints[index].pop();   // Remove do fim
    }

    /* 
    var request = {
        origin: new google.maps.LatLng(originCoord[0]),
        destination: new google.maps.LatLng(destinationCoord[0]),
        //waypoints: new google.maps.LatLng(),
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        }
    });
    */

    // var request = [];

    for (let index in originCoord) {
        request = {  //tentei criar um vetor pra fazer vários requests porém não funcionou
            origin: new google.maps.LatLng(originCoord[index]),
            destination: new google.maps.LatLng(destinationCoord[index]),
            //waypoints: new google.maps.waypoints(waypoint[index]), não sei se o código é esse
            travelMode: 'DRIVING'
        };
        console.log(originCoord[index])
    }
    directionsService.route(request, function (response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        }
    });

}

function downloadSimulation() {

    if (json.length == 0) {
        alert('Você não tem dados para serem baixados!\nSelecione um período para a busca de dados.')
    }
    else {
        sendFileRequest()
    }

}

function sendSimulationData(jsonList) {

    let locations = {
        jsonList
    }

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5002/simulation",
        contentType: "application/json",
        data: JSON.stringify(locations),
        dataType: "json",
        success: function (response) {
            $("#download").css("display", "block");
            $("#fileData").val(response);
            $(".lds-ring").css("display", "none");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Erro!");
            $(".lds-ring").css("display", "none");
        },
        complete: function () {
            $(".lds-ring").css("display", "none");
        }
    });

}

function sendFileRequest() {

    let fileName = JSON.parse($("#fileData").val())
    let file = (fileName.file).split("=")
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5002/simulation?" + fileName.file,
        xhrFields: {
            responseType: 'blob'
        },
        success: function (blob) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = file[1];
            link.click();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Erro!");
        }
    });

}
