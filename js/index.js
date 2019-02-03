//Initialize map
var map;
function initMap(){
  //Define the map
  var options = {
    zoom:2,
    center:{lat:43.7022,lng:-72.2896}
  }
  //Create map
  map = new google.maps.Map(document.getElementById('map'), options);
  //Adding a listener to a to a div with id map and marker
  google.maps.event.addListener(map,'click',function(event){
      addMarker({coords:event.latlng});
  });
  //load json
  getJSON('https://raw.githubusercontent.com/dali-lab/mappy/gh-pages/members.json');
}

//load json
function getJSON(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        drawMarkers(null, xhr.response);
      } else {
        drawMarkers(status, xhr.response);
      }
    };
    xhr.send();
}
//draw Markers
async function drawMarkers(err,data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {

  var heatmapData = [];
  for(var i =0;i<data.length;i++){
    var latLng = new google.maps.LatLng(data[i].lat_long[0], data[i].lat_long[1]);
    heatmapData.push(latLng);


    content='Project '+data[i].project+
    'Termson  '+data[i].terms_on+
    'Message  '+data[i].message
    await sleep(600);

    addMarker({coords:{lat:data[i].lat_long[0],lng:data[i].lat_long[1]},iconImage:'http://mappy.dali.dartmouth.edu/'+data[i].iconUrl,name:data[i].name,content:content,project:data[i].project,message:data[i].message,termson:data[i].terms_on});

  }
    eqfeed_callback(heatmapData);
  }
}

//add Marker
function addMarker(props){
  if(props.project==""){
    var marker = new google.maps.Marker ({
    position:props.coords,
    map:map,
    animation: google.maps.Animation.DROP,
    icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    });
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        maxWidth:600,
        content:"<div class = 'card'><h3 id = 'name'>"+props.name+"</h3><b>Message</b> : "+props.message+"<br><b>Terms on </b>: "+props.termson+"<br><img src='"+props.iconImage+"'alt='image in infowindow'></div>"
      });
  }
}
else{
    var marker = new google.maps.Marker ({
      position:props.coords,
      map:map,
      animation: google.maps.Animation.DROP,
        // icon:props.iconImage
      });
        var infoWindow = new google.maps.InfoWindow({

          content:"<div class ='card'><h3 id ='name'>"+props.name+"</h3> <p><b>Project : </b>"+props.project+"<br><b>Message</b> : "+props.message+"<br><b>Terms on </b>: "+props.termson+"<br><img src='"+props.iconImage+"'alt='image in infowindow'></div>"
        });
      }

      marker.addListener('click',function(){
      infoWindow.open(map,marker);
    });
}

function eqfeed_callback(heatmapData){
        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          dissipating: false,
          map: map
        });
      }




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
