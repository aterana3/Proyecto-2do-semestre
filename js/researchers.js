$(document).ready(function() {
  $.ajax({
      type:"GET",
      url: "https://sga.unemi.edu.ec/api?a=apiinvestigadores",
      success: function(data) {
        for(e in data) {
          nombre = data[e]['nombrecompleto'];
          orcid  = data[e]['orcid'];
          email = data[e]['correoinstitucional'];
          linea = `<tr>
                   <td>${nombre}</td>
                   <td>${orcid}</td>
                   <td><a href="mailto:${email}">${email}</a></td>
                   </tr>`
          $(linea).appendTo("#dataTable tbody")
        }
        $(".preloader").fadeOut();
        $('#dataTable').DataTable();
      }
  })
});