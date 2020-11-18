// http://bl.ocks.org/nitaku/ee6cc32a90cc7d1b6fec



// (function () {

function spiral_generator(scheme, completion, objective, launch, schemeID) {


    var COILS, D, HEIGHT, SAMPLES, THETA, WIDTH, a, b, line_generator, number_of_points, points, radius, randint, s, spiral, svg, svg_s;

    randint = function (n) {
        return Math.round(Math.random() * n);
    };

    a = 0;

    // D = 8 + randint(16);
    D = 3;

    b = D / (2 * Math.PI);

    // COILS = 2 + randint(6);
    COILS = 2 + 8;

    THETA = 2 * Math.PI * COILS;

    SAMPLES = 48;

    number_of_points = Math.ceil(THETA / (2 * Math.PI) * SAMPLES) + 1;

    points = d3.range(0, number_of_points).map(function (i) {
        var theta;

        theta = i * 2 * Math.PI / SAMPLES;
        return {
            theta: theta - Math.PI / 2,
            r: a + b * theta
        };
    });

    WIDTH = 150;

    HEIGHT = 500 / 4;



    svg = d3.select('#svg').append('div').attr('id', schemeID).attr("width", WIDTH).append('svg').attr("width", WIDTH).attr("height", HEIGHT)
        .append('g').attr("transform", `translate(${WIDTH/2},${HEIGHT/2})`)

    radius = a + b * THETA;
    svg.append('circle')
        .attr("class", 'radius_indicator')
        .attr('r', radius);

    svg.append('text').text(scheme.slice(0, 24))
        .attr('class', 'label')
        // .attr('x', WIDTH / 2 )
        .attr('y', -HEIGHT / 2 + 20)
        .attr("text-anchor", "middle")
        .attr('dy', '0.15em')


    line_generator = d3.line()
        .x(function (d) {
            return d.r * Math.cos(d.theta);
        })
        .y(function (d) {
            return d.r * Math.sin(d.theta);
        })
        .curve(d3.curveLinear);;


    spiral = svg.append('path').datum(points)
        .attr("class", 'spiral')
        .attr('d', line_generator)


    points_completion = points.slice(0, Math.ceil(Number(completion) * number_of_points + 4))


    spiral_completion = svg.append('path').datum(points_completion)
        .attr("class", 'spiral_completion')
        .attr('d', line_generator)
    // });

    var totalLength = spiral_completion.node().getTotalLength();
    // var totalLength = 4;

    spiral_completion
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)

    tooltipGroup = svg.append('g')



    tooltipGroup.append('text')
        .attr('id', 'tooltip' + schemeID)
        .attr('x', 0)
        .attr('y', HEIGHT / 2 - 20)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .text('Completion : ' + completion * 100 + "%")
        .style('fill', 'white')
        .style("visibility", 'hidden')

    tooltip3 = d3.select("#" + 'tooltip' + schemeID)

    d3.select("#" + schemeID)
        .on("mouseover", function () {
            console.log("Chosen " + schemeID);

            d3.select("#" + schemeID + " .radius_indicator")
                .style('stroke', '#F9E800')
                .style('stroke-width', 2)
                .style('fill', ' #F9E800')
                .style('opacity', 0.2)

            d3.select("#" + 'tooltip' + schemeID).style('visibility', 'visible');
        })
        .on("mouseout", function () {
            d3.select("#" + 'tooltip' + schemeID).style('visibility', 'hidden');

            var HTMLmouseTip = d3.select("#" + 'tooltip_' + schemeID);
            HTMLmouseTip
                // .style("left", Math.max(0, d3.event.pageX - 150) + "px")
                .style("left", 10 + "px")
                // .style("top", (d3.event.pageY + 20) + "px");
                .style("top", 10 + "px")
                .style("visibility", 'hidden')
                .style('opacity', 1)

            d3.select("#" + schemeID + " .radius_indicator")
                .style('stroke', 'gray')
                .style('stroke-width', '0.2px')
                .style('fill', 'none')
            
            

        })
        .on("click", function () {
            var HTMLmouseTip = d3.select("#" + 'tooltip_' + schemeID);

            var pageX = d3.event.pageX;
            var pageY = d3.event.pageY;


            let elem = document.getElementById(schemeID)
            // let rect = elem.getBoundingClientRect();
            var x = elem.getBoundingClientRect()['x']
            var y = elem.getBoundingClientRect()['y']

        


            HTMLmouseTip
                // .style("left", Math.max(0, pageX - 150) + "px")
                // .style("top", pageY + "px")
                .style("left", (window.scrollX + x - WIDTH / 2) + "px")
                .style("top", (window.scrollY + y + HEIGHT) + "px")
                .style("visibility", 'visible')
                .style('opacity', 1)


            // let elem = document.querySelector('div');
            // let elem = d3.select("#" + schemeID)
            // console.log();

            // document.body.appendChild(schemeID);


            // for (var key in rect) {
            //   if(typeof rect[key] !== 'function') {
            //     let para = document.createElement('p');
            //     para.textContent  = `${ key } : ${ rect[key] }`;
            //     document.body.appendChild(para);
            //   }
            // }
            // document.body.appendChild("********");

        })

    test = d3.select('#tooltipsGroup')
        .append('div')
        .attr('id', 'tooltip_' + schemeID)
        .attr('class', 'tooltip_html')
        //   .attr('class','card')
        .html("<div class='card-img-top align-items-center card-header-custom' style='display:flex; align-items: center;'><img src='images/Scheme20tracker20logos-01.webp' alt='Noimage' width='50' height='50'>" + "<div><p class='p-2'><strong>" + scheme + "</strong></p><p>Ministry of Finance</p></div></div>" +
            "<br>" + "<p class='description'> LAUNCH </p>" + "<p class='year'>" + launch + "</p><br>" + "<p class='description'> OBJECTIVE</p>" + "<p class='objective'>" + objective + "</p><br>")





}
//   }).call(this);
// });


// d3.json("/schemes.json").then(function (data) {
d3.json("/schemes.json", function (data) {


    data.forEach(function (d, i) {
        spiral_generator(d.Scheme, d.Completion, d.Objective, d.Launch, 'scheme' + i);
    });


})