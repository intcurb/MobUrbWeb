// Definindo a referência "locationsTemp"
var locationsRef = firebase.database().ref('locationsWeb');


//Setando variáveis
var map;
var markers = [];
var selectedVehicle;

// "Listener" do FireBase
function plotMapAndDoAll(){
    locationsRef.on('value', function(snapshot) {
        getSelectValue();
        var dados = [];
        var meansOfTransport = [];
        var lat = [];
        var lng = [];
        dados = snapshot.val();
        deleteMarkers();
        for(let index in dados){
            meansOfTransport = dados[index].meansOfTransport;
            lat = dados[index].tempLocation.latitude;
            lng = dados[index].tempLocation.longitude;
    
            if(selectedVehicle === 'Todos'){
                addMarkersAll(dados);
            }
            else if(meansOfTransport === selectedVehicle){ 
                addMarker(meansOfTransport, lat, lng);
            }
        }
    });
}

//Gera o Maps
function initMap(){
    //Map options
    var options = {
        zoom: 10,
        center: {lat: -21.146910, lng: -48.946270} //Catanduva - IFSP
    }

    //New map			
    map = new google.maps.Map(document.getElementById('map'), options);

    plotMapAndDoAll();
}

//Adiciona os markers separado
function addMarker(meansOfTransport, lat, lng){ 
    if(meansOfTransport == 'Carro'){
        //Add Marker   
        var marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map:map,
            icon: 'img/car.png'
        });
    }

    if(meansOfTransport == 'Bicicleta'){
        //Add Marker   
        var marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map:map,
            icon: 'img/bike.png'
        });
    }

    if(meansOfTransport == 'Moto'){
        //Add Marker   
        var marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map:map,
            icon: 'img/moto.png'
        });
    }

    if(meansOfTransport == 'Ônibus'){
        //Add Marker   
        var marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map:map,
            icon: 'img/bus.png'
        });
    }

    if(meansOfTransport == 'Caminhão'){
        //Add Marker   
        var marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map:map,
            icon: 'img/truck.png'
        });
    }

    if(meansOfTransport == 'Não Informar'){
        //Add Marker   
        var marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map:map
        });
    }
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);        
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = []; 
}

//Retorna o valor do select pra verificar na hora de plotar os markers
function getSelectValue(){
    selectedVehicle = document.getElementById("vehicles").value;
}

function addMarkersAll(dados){

    var meansOfTransport;
    var lat;
    var lng;

    for(let index in dados){      
        meansOfTransport = dados[index].meansOfTransport;
        lat = dados[index].tempLocation.latitude;
        lng = dados[index].tempLocation.longitude;
        
        if(meansOfTransport === 'Carro'){
            //Add Marker   
            var marker = new google.maps.Marker({
                position: {
                    lat: lat,
                    lng: lng
                },
                map:map,
                icon: 'img/car.png'
            });
        }

        if(meansOfTransport === "Moto"){
            //Add Marker   
            var marker = new google.maps.Marker({
                position: {
                    lat: lat,
                    lng: lng
                },
                map:map,
                icon: 'img/moto.png'
            });
        }

        if(meansOfTransport === "Bicicleta"){
            //Add Marker   
            var marker = new google.maps.Marker({
                position: {
                    lat: lat,
                    lng: lng
                },
                map:map,
                icon: 'img/bike.png'
            });
        }

        if(meansOfTransport === 'Ônibus'){
            //Add Marker   
            var marker = new google.maps.Marker({
                position: {
                    lat: lat,
                    lng: lng
                },
                map:map,
                icon: 'img/bus.png'
            });
        }

        if(meansOfTransport === 'Caminhão'){
            //Add Marker   
            var marker = new google.maps.Marker({
                position: {
                    lat: lat,
                    lng: lng
                },
                map:map,
                icon: 'img/truck.png'
            });
        }

        if(meansOfTransport === 'Não Informar'){
            //Add Marker   
            var marker = new google.maps.Marker({
                position: {
                    lat: lat,
                    lng: lng
                },
                map:map,
            });
        }
        markers.push(marker);   //adiciona os markers
    }
}
