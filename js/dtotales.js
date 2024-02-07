$(document).ready(function() {
  $.ajax({
    type:"GET",
    url: "https://sga.unemi.edu.ec/api?a=apitotales",
    success: function(data) {
      valor = data['totalareasconocimientos'];
      $('#areas-value').html(valor);

      valor = data['totalarticulos'];
      $('#papers-value').html(valor);

      valor = data['totalrevistas'];
      $('#journals-value').html(valor);

      valor = data['totalautores'];
      $('#researchers-value').html(valor);
    }
  })
});