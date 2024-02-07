$(document).ready(function() {
  $.ajax({
      type:"GET",
      url: "https://sga.unemi.edu.ec/api?a=apiarticulos",
      success: function(data) {
        for(e in data) {
          nombre = data[e]['nombre']
          revista = data[e]['revista']
          anio = parseInt(data[e]['anio']);
          doi = data[e]['doi'];
          linea = `<tr>
                   <td>${nombre}</td>
                   <td>${revista}</td>
                   <td>${anio}</td>
                   <td>${doi}</td>
                   </tr>`
          $(linea).appendTo("#dataTable tbody")
        }
        $(".preloader").fadeOut();
        $('#dataTable').DataTable();
      }
  })
});