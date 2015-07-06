window.onload = function() {
	drawMap();
};

function drawMap() {
  	var map = L.map('container').setView([47.6550, -122.3080], 8);
  	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  	layer.addTo(map);
 	getData(map);
}

function getData(map) {
  var data;
  $.ajax({
  	url: 'data/response.json',
  	type: "get",
  	success: function(dat) {
  		data = dat;
  		customBuild(data, map);
  	},
  	dataType: "json"
  });
}

// Do something creative with the data here!  
function customBuild(data, map) {
	data.map(function(d) {
		var gender = [];
		var circle = new L.circleMarker([d.lat, d.lng],
			{color: 'red', radius: 10}).addTo(map);
		if (d["Victim's Gender"] == "Male") {
			gender.push(circle);
			circle.setStyle({color: 'blue'});
		}
		circle.bindPopup("<b>Victim's Gender: </b>" + d["Victim's Gender"] + "<br>"
			+ "<b>Victim's Age: </b>" + d["Victim's Age"] + "<br>"
			+ "<b>Summary: </b>" + d["Summary"]);
	});
}


