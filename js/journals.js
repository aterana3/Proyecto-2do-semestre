$(document).ready(function() {
  $.ajax({
      type:"GET",
      url: "https://sga.unemi.edu.ec/api?a=apirevistas",
      success: function(data) {
        for(e in data) {
          nombre = data[e]['nombre'];
          tipo = data[e]['tipo'];
          issn = data[e]['codigoissn'];
          enlace = data[e]['enlace'];
          linea = `<tr>
                   <td>${nombre}</td>
                   <td>${tipo}</td>
                   <td>${issn}</td>`
          if(enlace != null) {
            linea += `<td><a href="${enlace}" target="_blank"><i class="fa fa-link"></i></a></td>`
          } else {
            linea += `<td></td>`
          }
          linea += `</tr>`
          $(linea).appendTo("#dataTable tbody")
        }
        $(".preloader").fadeOut();
        $('#dataTable').DataTable();
      }
  })
});