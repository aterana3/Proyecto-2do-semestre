$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://sga.unemi.edu.ec/api?a=apibasesindexadas",
        success: function(data){
            for(e in data) {
                nombre = data[e]['nombre'];
                tipo = data[e] ['tipo'];
                linea = `<tr><td>${nombre}</td><td>${tipo}</td></tr>`
                $(linea).appendTo("#dataTable tbody")
            }
            $(".preloader").fadeOut();
            $('#dataTable').DataTable();
        }
    })
})