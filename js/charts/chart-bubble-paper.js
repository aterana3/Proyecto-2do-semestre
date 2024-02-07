function crearGraficoPapers(data) {
    const minSize = d3.min(data, d => d.totalarticulos);
    const maxSize = d3.max(data, d => d.totalarticulos);
    const scale = d3.scaleLinear()
        .domain([minSize, maxSize])
        .range([25, 100]);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.area))
        .range(d3.schemeCategory10);

    const simulacion = d3.forceSimulation(data)
        .force('center', d3.forceCenter(430, 330))
        .force("repulsion", d3.forceManyBody().strength(50))
        .force("colision", d3.forceCollide().radius(d => scale(d.totalarticulos) + 1))
        .alpha(0.5)
        .alphaDecay(0.01)
        .alphaMin(0.01);

    const svg = d3.select("#areapublicacion")
        .append("svg")
        .attr("id", "canvas-bubble")
        .attr("viewBox", [0,0,860,660]);

    const nodes = svg.append("g");

    const bubbles = nodes.selectAll(".bubble")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "bubble")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    bubbles.append("circle")
        .attr("r", d => scale(d.totalarticulos))
        .style("fill", d => color(d.area))
        .style("opacity", 0.8);

    bubbles.append("text")
        .text(function (d) { return d.area + ": " + d.totalarticulos; })
        .style("font-size", d => {
            const diameter = 5 * scale(d.totalarticulos);
            const len = (d.area + d.totalarticulos.toString()).length;
            const maxTextWidth = diameter - 10;
            const fontSize = Math.min(2 * scale(d.totalarticulos), (2.5 * scale(d.totalarticulos) - 8) / len);
            if (fontSize * len > maxTextWidth) {return fontSize * maxTextWidth / (fontSize * len) + "px";}
            return fontSize + "px";
        })
        .attr("class", "m-0 font-weight-bold")
        .style("fill", "white")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle");

    simulacion.on("tick", () => {
        bubbles.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    const zoom = d3.zoom().scaleExtent([1, 8])
        .on("zoom", function (event) {
            nodes.attr("transform", event.transform);
        });
    svg.call(zoom);
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://sga.unemi.edu.ec/api?a=apitotalareapublicacion",
        data: {},
        success: function (data) {
            crearGraficoPapers(data);
        }
    })
});