//Initialize map
var map;
function initMap(){
  //Define the map
  var options = {
    zoom:2,
    center:{lat:43.7022,lng:-72.2896}
  }
  //Create map
  map = new
  //Grab map div in html
  google.maps.Map(document.getElementById('map'), options);
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
  for(var i =0;i<data.length;i++){
    content='Project '+data[i].project+
    'Termson  '+data[i].terms_on+
    'Message  '+data[i].message
    await sleep(600);
    addMarker({coords:{lat:data[i].lat_long[0],lng:data[i].lat_long[1]},iconImage:'http://mappy.dali.dartmouth.edu/'+data[i].iconUrl,name:data[i].name,content:content,project:data[i].project,message:data[i].message,termson:data[i].terms_on});

  }
    // print(data);
  }
}

//add Marker
function addMarker(props){


  if(props.content){
    var infoWindow = new google.maps.InfoWindow({
      maxWidth:600,
      content:"<h3>"+props.name+"</h3> <p><b>Project : </b>"+props.project+"<br><b>Message</b> : "+props.message+"<br><b>Terms on </b>: "+props.termson+"<br><img src='"+props.iconImage+"'alt='image in infowindow'>"
    });
  if(props.project==""){
    var marker = new google.maps.Marker ({
    position:props.coords,
    map:map,
    animation: google.maps.Animation.DROP,
    icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    });
  }
  else{
    var marker = new google.maps.Marker ({
      position:props.coords,
      map:map,
      animation: google.maps.Animation.DROP

  // icon:props.iconImage
  });
}

  marker.addListener('click',function(){
    infoWindow.open(map,marker);
  //marker.setIcon(image);
  });
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
