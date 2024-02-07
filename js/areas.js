$(document).ready(function() {
    $.ajax({
      type:"GET",
      url: "https://sga.unemi.edu.ec/api?a=areaconocimiento",
      success: function(data) {
        for(e in data.areasconocimiento) {
          id = data.areasconocimiento[e]['id']
          nombre = data.areasconocimiento[e]['nombre']
          linea = `<tr><td>${id}</td><td>${nombre}</td></tr>`
          $(linea).appendTo("#dataTable tbody")
        }
        $(".preloader").fadeOut();
        $('#dataTable').DataTable();
      }
    })
});