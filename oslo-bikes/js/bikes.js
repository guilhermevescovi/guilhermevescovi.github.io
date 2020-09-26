const STATION_INFO_URL = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json";
const STATION_STATUS_URL = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json';

const options = {
  headers: {
    Identifier: 'Client-Identifier: GuilhermeNicchio-osloBikesProject'
  }
};

function initMap() {
    //fetch data from oslo bikes
    fetch(STATION_INFO_URL, options)
    .then(response => response.json())
    .then(stationsInfo => {
        this.stationsInfo = stationsInfo.data.stations;
        
        return fetch(STATION_STATUS_URL, options);
    })
    .then(response => response.json())
    .then(stationsStatus => {
        this.stationsStatus = stationsStatus.data.stations;
    })
    .then(function() {
        //The location to center the map
        //let station0 = {lat: this.stationsInfo[0].lat, lng: this.stationsInfo[0].lon};
        let station0 = {lat: 59.92979845370007, lng: 10.743540765932096};
        // The map, centered at station 0 of the array
        let map = new google.maps.Map(
            document.getElementById('map'), {zoom: 13, center: station0});
        
        let prev_infowindow = false; 
        // adding the markers with the stations and tis info
        for (let i = 0; i < this.stationsInfo.length; i++) {
            //station lat and long
            let latlon = {lat: this.stationsInfo[i].lat, lng: this.stationsInfo[i].lon};

            //station info to show on click
            const stationName = this.stationsInfo[i].name;
            const stationCapacity = this.stationsInfo[i].capacity;
            const stationAddress = this.stationsInfo[i].address;
            const bikesAvailable = this.stationsStatus[i].num_bikes_available;
            const docksAvailable = this.stationsStatus[i].num_docks_available;

            //working the POSIX time stamp
            const unixTimestamp = this.stationsStatus[i].last_reported;
            const milliseconds = unixTimestamp * 1000;
            const dateObject = new Date(milliseconds);
            const humanDateFormat = dateObject.toLocaleString('en-GB');
            
            //construction of infowindow content
            const contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 id="firstHeading" class="firstHeading">' + stationName + '</h1>' +
            '<div id="bodyContent">' +
            '<p><b>Bikes Available: </b>' + bikesAvailable + '</p>' +
            '<p><b>Docks Available: </b>' + docksAvailable + '</p>' +
            '<p><b>Last reported: </b>' + humanDateFormat + '</p>' +
            '<p><b>Address: </b>' + stationAddress + '</p>' +
            "</div>" +
            "</div>";

            //create infowindow
            const infowindow = new google.maps.InfoWindow({
                content: contentString,
              });

            //adding marker
            let marker = new google.maps.Marker({
                position: latlon, 
                map: map,
                animation: google.maps.Animation.DROP,
                icon: {                             
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"                           }
            });

            //adding marker event when click
            marker.addListener("click", function() {
                if( prev_infowindow) {
                    prev_infowindow.close();
                 }
                
                infowindow.open(map, marker);
                prev_infowindow = infowindow;
              });
            }
    });
}


    