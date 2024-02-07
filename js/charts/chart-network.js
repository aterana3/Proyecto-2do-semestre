function crearGraficoNetwork(data, height, width) {
    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const drag = (simulation) => {
        const dragstarted = (event) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        const dragged = (event) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        const dragended = (event) => {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    };

    const simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-200))
        .force('link', d3.forceLink(links).id(d => d.id).distance(100))
        .force('center', d3.forceCenter(height / 2, width / 2));

    const svg = d3.select("#network").append("svg")
        .attr("id", "canvas-tree")
        .attr("viewBox", [0, 0, height, width]);

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line");

    const node = svg.append("g")
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 20)
        .attr("fill", function (d) { return color(d.depth); })
        .style("opacity", 0.8)

    let text = svg.selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style("font-size", "10.5px")
        .style("margin", "2px 0 2px")
        .style("line-height", "1.4")
        .attr("class", "h3 mb-0")
        .style("pointer-events", 'none')
        .text((d) => d.data.name)
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y; })
        .style("fill", "#6e6e6e")
        .style("font-size", function (d) {
            const textWidth = this.getComputedTextLength();
            const fontSize = Math.min(2 * d.r, (2 * d.r - 8) / textWidth * 12);
            return fontSize + "px";
        });

    node.call(drag(simulation));

    simulation.on("tick", () => {
        text.attr('x', (node) => node.x).attr('y', (node) => node.y);
        link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
        node.attr('cx', (node) => node.x).attr('cy', (node) => node.y);
    });

    const zoom = d3.zoom().scaleExtent([1, 8])
        .on("zoom", function (event) {
            text.attr("transform", event.transform);
            link.attr("transform", event.transform);
            node.attr("transform", event.transform);
        });
    svg.call(zoom);
}

$(document).ready(function () {
    let jsonData = {"name": "Papers", "children": [] };
    $.ajax({
        type: "GET",
        url: "https://sga.unemi.edu.ec/api?a=apigrupoautores&area=15",
        success: function (data) {
            for (i in data) {
                let dato = data[i];
                let nodos = {"name": dato.paper,"children": []};
                for (let j = 0; j < dato.autores.length; j++) {
                    let autor = dato.autores[j];
                    nodos.children.push({"name": autor});
                }
                linea = `<option value=${i}>${nodos.name}</option>`
                $(linea).appendTo("#network-selection")
                jsonData.children.push(nodos);
            }
            crearGraficoNetwork(jsonData, 1800, 1400);
            $(".preloader").fadeOut();
        }
    })
    $("#network-selection").on("change", function () {
        let value = this.value;
        $("#canvas-tree").remove();
        if (isNaN(value) == false) {
            let data = {"name" : "Papers", "children" : []};
            data["children"].push(jsonData['children'][value]);
            crearGraficoNetwork(data, 850, 420);
        } else {
            crearGraficoNetwork(jsonData, 1800, 1400);
        }
    });
});
