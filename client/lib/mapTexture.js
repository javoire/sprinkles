module.exports = function(geojson, color, strokeColor) {
  var texture, context, canvas;

  // map hackery
  var projection = d3.geo.equirectangular()
    .translate([2048, 1024])
    .scale(650);

  canvas = d3.select("body").append("canvas")
    .style("display", "none")
    .attr("width", "4096px")
    .attr("height", "2048px");

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
