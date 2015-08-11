function memoize(fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);

    var key = "", len = args.length, cur = null;

    while (len--) {
      cur = args[len];
      key += (cur === Object(cur))? JSON.stringify(cur): cur;

      fn.memoize || (fn.memoize = {});
    }

    return (key in fn.memoize)? fn.memoize[key]:
      fn.memoize[key] = fn.apply(this, args);
  };
}

function geodecoder(features) {

  var store = {};

  for (var i = 0; i < features.length; i++) {
    store[features[i].id] = features[i];
  }

  return {
    find: function (id) {
      return store[id];
    },
    search: function (lat, lng) {

      var match = false;

      var country, coords;

      for (var i = 0; i < features.length; i++) {
        country = features[i];
        if(country.geometry.type === 'Polygon') {
          match = pointInPolygon(country.geometry.coordinates[0], [lng, lat]);
          if (match) {
            return {
              code: features[i].id,
              name: features[i].properties.name
            };
          }
        } else if (country.geometry.type === 'MultiPolygon') {
          coords = country.geometry.coordinates;
          for (var j = 0; j < coords.length; j++) {
            match = pointInPolygon(coords[j][0], [lng, lat]);
            if (match) {
              return {
                code: features[i].id,
                name: features[i].properties.name
              };
            }
          }
        }
      }

      return null;
    }
  };
}

function mapTexture(geojson, color, strokeColor) {
  var texture, context, canvas;

  canvas = d3.select("body").append("canvas")
    .style("display", "none")
    .attr("width", "2048px")
    .attr("height", "1024px");

  context = canvas.node().getContext("2d");

  var path = d3.geo.path()
    .projection(projection)
    .context(context);

  context.strokeStyle = strokeColor || "#333";
  context.lineWidth = 1;
  context.fillStyle = color || "#CDB380";

  context.beginPath();

  path(geojson);

  if (color) {
    context.fill();
  }

  context.stroke();

  texture = new THREE.Texture(canvas.node());
  texture.needsUpdate = true;

  canvas.remove();

  return texture;
}