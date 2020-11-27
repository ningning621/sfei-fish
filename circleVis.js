function drawCircleVis(svgClass, maxVal, pFishData, pSedimentData, mFishData, mSedimentData) {
  let circleAttr = {
    "width": 1100,
    "height": 450
  }

  let svg = d3.select(svgClass);

  // add circle rows for pcb and mercury
  drawCircleRow(svg, circleAttr, 1, maxVal, pFishData, pSedimentData, "circleFirst");
  drawCircleRow(svg, circleAttr, 3, maxVal, mFishData, mSedimentData, "circleSecond");

  // add location labels
  let count = 0;
  for (var loc of locationList) {
    svg.append("text")
      .attr("x", (circleAttr.width - padding*10)/7 * count + 60 + padding*5)
      .attr("y", circleAttr.height/2)
      .text(locToFullLocation[loc])
      .style("text-anchor", "middle")
      .style("alignment-baseline", "middle");

    count = count+1;
  }

  // add toxins labels
  svg.append("text")
    .attr("x", padding*6)
    .attr("y", circleAttr.height/4 - 7.5)
    .text("PCB Concentration")
    .style("font-weight", "bold")
    .style("text-anchor", "end")
    .style("font-size", 14);
  svg.append("text")
    .attr("x", padding*6)
    .attr("y", circleAttr.height/4 + 7.5)
    .text("Average (ng/g)")
    .style("font-weight", "bold")
    .style("text-anchor", "end")
    .style("font-size", 14);
  svg.append("text")
    .attr("x", padding*6)
    .attr("y", circleAttr.height/4 * 3 - 7.5)
    .text("Mercury Concentration")
    .style("font-weight", "bold")
    .style("text-anchor", "end")
    .style("font-size", 14);
  svg.append("text")
    .attr("x", padding*6)
    .attr("y", circleAttr.height/4 * 3 + 7.5)
    .text("Average (ng/g)")
    .style("font-weight", "bold")
    .style("text-anchor", "end")
    .style("font-size", 14);

  // draw legend annotation
  let radialScale = d3.scaleRadial()
      .domain([0, 100])
      .range([0, 50]);
  let topArcGenerator = d3.arc()
    .outerRadius(20)
    .innerRadius(0)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2);
  svg.append("path")
    .attr("transform", "translate(" + (circleAttr.width - padding*3) + ","
      + (50) + ")")
    .attr("d", topArcGenerator())
    .style("fill", "black");
  let botArcGenerator = d3.arc()
    .outerRadius(10)
    .innerRadius(0)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2);
  svg.append("path")
    .attr("transform", "translate(" + (circleAttr.width - padding*3) + ","
      + (50) + ")rotate(180)")
    .attr("d", botArcGenerator())
    .style("fill", "grey");
  svg.append("text")
    .attr("x", circleAttr.width - padding*2)
    .attr("y", 30)
    .text("fish tissues")
    .style("font-size", 12);
  svg.append("text")
    .attr("x", circleAttr.width - padding*2.25)
    .attr("y", 70)
    .text("sediments")
    .style("font-size", 12);
}

function drawCircleRow(svg, circleAttr, verticalMul, maxVal, fishData, sedimentData, label) {
  console.log(fishData);
  console.log(sedimentData);
  let radialScale = d3.scaleRadial()
      .domain([0, maxVal])
      .range([0, (circleAttr.width - padding*10)/14]);

  let count = 0;
  for (var loc of locationList) {
    // add count for top semi-circle text
    svg.append("text")
      .attr("id", label + "toptxt_" + loc)
      .attr("x", ((circleAttr.width - padding*10)/7 * count + 60 + padding*5))
      .attr("y", (circleAttr.height/4 * verticalMul) - radialScale(fishData.get(loc)) - 20)
      .text(fishData.get(loc).toFixed(2))
      .style("text-anchor", "middle")
      .style("font-size", 14)
      .style("opacity", 0);

    // draw top semi-circle
    let topArcGenerator = d3.arc()
      .outerRadius(radialScale(fishData.get(loc)))
      .innerRadius(0)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    svg.append("path")
      .attr("id", label + "toppath_"+loc)
      .attr("transform", "translate(" + ((circleAttr.width - padding*10)/7 * count + 60 + padding*5) + ","
        + (circleAttr.height/4 * verticalMul) + ")")
      .attr("d", topArcGenerator())
      .style("fill", "black")
      .on("mousemove", function() {
        // enlarge semi-circle size
        let tempId = this.id;
        let tempLoc = tempId.split("_")[1];
        let radius = Number(fishData.get(tempLoc));

        let tempArcGenerator = d3.arc()
          .outerRadius(radialScale(radius)+5)
          .innerRadius(0)
          .startAngle(-Math.PI / 2)
          .endAngle(Math.PI / 2);

        d3.select(this)
          .transition()
          .duration(300)
          .attr("d", tempArcGenerator);

        // change text opacity
        svg.select("#" + label + "toptxt_" + tempLoc)
          .transition()
          .duration(400)
          .style("opacity", 1);
      }).on("mouseout", function() {
        let tempId = this.id;
        let tempLoc = tempId.split("_")[1];

        // reset circle size
        d3.select(this)
          .transition()
          .duration(250)
          .attr("d", topArcGenerator);

        // reset text opacity
        svg.select("#" + label + "toptxt_" + tempLoc)
          .transition()
          .duration(200)
          .style("opacity", 0);
      });

    // add count for bottom semi-circle text
    svg.append("text")
      .attr("id", label + "bottxt_" + loc)
      .attr("x", ((circleAttr.width - padding*10)/7 * count + 60 + padding*5))
      .attr("y", (circleAttr.height/4 * verticalMul) + radialScale(sedimentData.get(loc)) + 30)
      .text(sedimentData.get(loc).toFixed(2))
      .style("text-anchor", "middle")
      .style("font-size", 14)
      .style("opacity", 0);

    let botArcGenerator = d3.arc()
      .outerRadius(radialScale(sedimentData.get(loc)))
      .innerRadius(0)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    // add bottom semi-circle
    svg.append("path")
      .attr("id", label + "botpath_"+loc)
      .attr("transform", "translate(" + ((circleAttr.width - padding*10)/7 * count + 60 + padding*5) + ","
        + (circleAttr.height/4 * verticalMul) + ")rotate(180)")
      .attr("d", botArcGenerator())
      .style("fill", "grey")
      .on("mousemove", function() {
        // enlarge semi-circle size
        let tempId = this.id;
        let tempLoc = tempId.split("_")[1];
        let radius = Number(sedimentData.get(tempLoc));

        let tempArcGenerator = d3.arc()
          .outerRadius(radialScale(radius)+5)
          .innerRadius(0)
          .startAngle(-Math.PI / 2)
          .endAngle(Math.PI / 2);

        d3.select(this)
          .transition()
          .duration(300)
          .attr("d", tempArcGenerator);

        // change text opacity
        svg.select("#" + label + "bottxt_" + tempLoc)
          .transition()
          .duration(400)
          .style("opacity", 1);
      }).on("mouseout", function() {
        let tempId = this.id;
        let tempLoc = tempId.split("_")[1];

        // reset circle size
        d3.select(this)
          .transition()
          .duration(250)
          .attr("d", botArcGenerator);

        // reset text opacity
        svg.select("#" + label + "bottxt_" + tempLoc)
          .transition()
          .duration(200)
          .style("opacity", 0);
      });

    count = count + 1;
  }
}
