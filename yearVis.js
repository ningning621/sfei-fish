function drawYearVis(svgClass, pFishDataSet, pSedimentDataSet, mFishDataSet, mSedimentDataSet, pData, mData, p1Data, p2Data, m1Data, m2Data) {
  let yearAttr = {
    "width": 1000,
    "height": 800
  }

  let svg = d3.select(svgClass);

  // drawColumn(svg, yearAttr, 0, pFishDataSet, pSedimentDataSet, "yearFirst");
  // drawColumn(svg, yearAttr, 1, mFishDataSet, mSedimentDataSet, "yearSecond");
  drawTotalVis(svg, yearAttr, pData, mData, p1Data, p2Data, m1Data, m2Data);


}

function drawTotalVis(svg, yearAttr, pData, mData, p1Data, p2Data, m1Data, m2Data) {
  let xPScale = d3.scaleLinear()
    .range([padding*4 , 500 - padding*4])
    .domain([1980, 2018]); // hardcoded min + max years
  let xMScale = d3.scaleLinear()
    .range([padding*4 + 500 , yearAttr.width - padding*4])
    .domain([1980, 2018]); // hardcoded min + max years

  let yScale = d3.scaleLinear()
    .range([yearAttr.height/2 , padding*5])
    .domain([0, d3.max(pData, d => Number(d.y))]); // hardcoded averages
  let yUpsideScale = d3.scaleLinear()
    .range([yearAttr.height/2, yearAttr.height/2 + padding*5])
    .domain([0, d3.max(pData, d => Number(d.y))]);
  let yZeroScale = d3.scaleLinear()
    .range([yearAttr.height/2, yearAttr.height/2])
    .domain([d3.max(pData, d => Number(d.y)), 0]); // hardcoded averages

  // draw top pcb graph
  svg.append("path")
    .datum(pData)
    .attr("class", "topPcbArea")
    .attr("fill", fishColor)
    .attr("stroke", fishColor)
    .attr("stroke-width", "1")
    .attr("d", d3.area()
      .x(function (d) {return xPScale(Number(d.x));})
      .y0(yScale(0))
      .y1(function (d){return yScale(Number(d.y))})
      .curve(d3.curveMonotoneX));
  // draw top mercury graph
  svg.append("path")
    .datum(mData)
    .attr("class", "topMercuryArea")
    .attr("fill", fishColor)
    .attr("stroke", fishColor)
    .attr("stroke-width", "1")
    .attr("d", d3.area()
      .x(function (d) {return xMScale(Number(d.x));})
      .y0(yScale(0))
      .y1(function (d){return yScale(Number(d.y))})
      .curve(d3.curveMonotoneX));
  svg.append("g").call(d3.axisLeft(yScale).ticks(5))
    .attr("transform", "translate(100, 0)")
    .style("font-family", "Cabin")
    .style("font-size", "11px")
    .select(".domain").remove();
  svg.append("g").call(d3.axisRight(yScale).ticks(5))
    .attr("transform", "translate(900, 0)")
    .style("font-family", "Cabin")
    .style("font-size", "11px")
    .select(".domain").remove();
  // draw bottom flat graphs
  svg.append("path")
    .datum(mData)
    .attr("class", "botPcbArea")
    .attr("fill", sedimentColor)
    .attr("stroke", sedimentColor)
    .attr("stroke-width", "1")
    .attr("d", d3.area()
      .x(function (d) {return xPScale(Number(d.x));})
      .y0(yZeroScale(0))
      .y1(yUpsideScale(0))
      .curve(d3.curveMonotoneX));
  svg.append("path")
    .datum(mData)
    .attr("class", "botMercuryArea")
    .attr("fill", sedimentColor)
    .attr("stroke", sedimentColor)
    .attr("stroke-width", "1")
    .attr("d", d3.area()
      .x(function (d) {return xMScale(Number(d.x));})
      .y0(yZeroScale(0))
      .y1(yUpsideScale(0))
      .curve(d3.curveMonotoneX));

    // add text labels
    svg.append("text")
      .attr("x", yearAttr.width/4)
      .attr("y", padding*3)
      .text("Average PCB Concentration (ng/g)")
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .style("font-family", "Ubuntu")
      .style("fill", textColor)
      .style("font-size", "18px");
    svg.append("text")
      .attr("x", yearAttr.width/4 * 3)
      .attr("y", padding*3)
      .text("Average Mercury Concentration (ng/g)")
      .style("text-anchor", "middle")
      .style("font-family", "Ubuntu")
      .style("font-weight", "bold")
      .style("fill", textColor)
      .style("font-size", "18px");

    // add more annotations
    svg.append("text")
      .attr("id", "yearText")
      .attr("x", yearAttr.width/2)
      .attr("y", yearAttr.height/2 - padding)
      .text("← Total Concentration →")
      .style("font-size", "12px")
      .style("text-anchor", "middle")
      .style("fill", textColor)
      .style("font-weight", "bold");
    svg.append("text")
      .attr("id", "yearBreakdownTop")
      .attr("x", yearAttr.width/2)
      .attr("y", yearAttr.height/2 - padding)
      .text("Fish Tissue Conc.")
      .style("font-size", "12px")
      .style("text-anchor", "middle")
      .style("fill", textColor)
      .style("font-weight", "bold")
      .style("opacity", 0);
    svg.append("text")
      .attr("id", "yearBreakdownBottom")
      .attr("x", yearAttr.width/2)
      .attr("y", yearAttr.height/2 + padding)
      .text("Sediments Conc.")
      .style("font-size", "12px")
      .style("text-anchor", "middle")
      .style("fill", textColor)
      .style("font-weight", "bold")
      .style("opacity", 0);
    svg.append("text")
      .attr("x", padding*4 - 15)
      .attr("y", yearAttr.height/2 + padding/2)
      .text("year →")
      .style("font-size", "12px")
      .style("font-family", "Cabin")
      .style("fill", textColor)
      .style("text-anchor", "middle");
    svg.append("text")
      .attr("x", yearAttr.width/2 + padding*4 - 15)
      .attr("y", yearAttr.height/2 + padding/2)
      .text("year →")
      .style("font-family", "Cabin")
      .style("font-size", "12px")
      .style("fill", textColor)
      .style("text-anchor", "middle");

    // add button
    svg.append("text")
      .attr("x", padding/2)
      .attr("y", padding*4 - 15)
      .text("↓ click here!")
      .style("font-weight", "bold")
      .style("fill", accentColor)
      .style("font-size", "12px");
    svg.append("circle")
      .attr("cx", padding/2)
      .attr("cy", padding*5 - 15)
      .attr("r", 6)
      .style("fill", bgColor)
      .style("stroke", accentColor)
      .style("stroke-width", 2)
      .on('click', function() {
        if (isBreakdown) {
          // change button color
          d3.select(this)
            .transition()
            .duration(300)
            .style("fill", bgColor);

          // move graphs
          d3.select(".topPcbArea")
            .datum(pData)
            .transition()
            .duration(1200)
            .attr("d", d3.area()
              .x(function (d) {return xPScale(Number(d.x));})
              .y0(yScale(0))
              .y1(function (d){return yScale(Number(d.y))})
              .curve(d3.curveMonotoneX));
          d3.select(".topMercuryArea")
            .datum(mData)
            .transition()
            .duration(1200)
            .attr("d", d3.area()
              .x(function (d) {return xMScale(Number(d.x));})
              .y0(yScale(0))
              .y1(function (d){return yScale(Number(d.y))})
              .curve(d3.curveMonotoneX));
          d3.select(".botPcbArea")
            .datum(p2Data)
            .transition()
            .duration(1200)
            .attr("d", d3.area()
              .x(function (d) {return xPScale(Number(d.x));})
              .y0(yUpsideScale(0))
              .y1(yUpsideScale(0))
              .curve(d3.curveMonotoneX));
          d3.select(".botMercuryArea")
            .datum(m2Data)
            .transition()
            .duration(1200)
            .attr("d", d3.area()
              .x(function (d) {return xMScale(Number(d.x));})
              .y0(yUpsideScale(0))
              .y1(yUpsideScale(0))
              .curve(d3.curveMonotoneX));

          // modify x-axis label appropriately
          d3.select("#yearText")
            .transition()
            .duration(800)
            .style("opacity", 1);
          d3.select("#yearBreakdownTop")
            .transition()
            .duration(800)
            .style("opacity", 0);
          d3.select("#yearBreakdownBottom")
            .transition()
            .duration(800)
            .style("opacity", 0);

          // modify text ann. accordingly
          d3.selectAll(".yearAnn1")
            .transition()
            .duration(500)
            .style("opacity", 1);
          d3.selectAll(".yearAnn2")
            .transition()
            .duration(500)
            .style("opacity", 0);
        } else {
          // change button color
          d3.select(this)
            .transition()
            .duration(300)
            .style("fill", accentColor);

          // move graphs
          d3.select(".topPcbArea")
            .datum(p1Data)
            .transition()
            .duration(1200)
            .attr("d", d3.area()
              .x(function (d) {return xPScale(Number(d.x));})
              .y0(yScale(0))
              .y1(function (d){return yScale(Number(d.y))})
              .curve(d3.curveMonotoneX));
          d3.select(".topMercuryArea")
            .datum(m1Data)
            .transition()
            .duration(1200)
            .attr("d", d3.area()
              .x(function (d) {return xMScale(Number(d.x));})
              .y0(yScale(0))
              .y1(function (d){return yScale(Number(d.y))})
              .curve(d3.curveMonotoneX));
          d3.select(".botPcbArea")
            .datum(p2Data)
            .transition()
            .duration(1200)
            .attr("d", d3.area()
              .x(function (d) {return xPScale(Number(d.x));})
              .y0(yUpsideScale(0))
              .y1(function (d){return yUpsideScale(Number(d.y))})
              .curve(d3.curveMonotoneX));
          d3.select(".botMercuryArea")
            .datum(m2Data)
            .transition()
            .duration(1200)
            .attr("d", d3.area()
              .x(function (d) {return xMScale(Number(d.x));})
              .y0(yUpsideScale(0))
              .y1(function (d){return yUpsideScale(Number(d.y))})
              .curve(d3.curveMonotoneX));

          // modify x-axis label appropriately
          d3.select("#yearText")
            .transition()
            .duration(800)
            .style("opacity", 0);
          d3.select("#yearBreakdownTop")
            .transition()
            .duration(800)
            .style("opacity", 1);
          d3.select("#yearBreakdownBottom")
            .transition()
            .duration(800)
            .style("opacity", 1);

          // modify text ann. accordingly
          d3.selectAll(".yearAnn1")
            .transition()
            .duration(500)
            .style("opacity", 0);
          d3.selectAll(".yearAnn2")
            .transition()
            .duration(500)
            .style("opacity", 1);
        }
        isBreakdown = !isBreakdown;
      });
    // add text label to circle button
    svg.append("text")
      .attr("x", padding/2 + 10)
      .attr("y", padding*5 + 2 - 15)
      .text("breakdown of fish tissue")
      .style("alignment-baseline", "middle")
      .style("font-size", "13px")
      .style("font-family", "Cabin")
      .style("fill", textColor);
    svg.append("text")
      .attr("x", padding/2 + 10)
      .attr("y", padding*5 + 17 - 15)
      .text("& sediments")
      .style("font-family", "Cabin")
      .style("alignment-baseline", "middle")
      .style("font-size", "13px")
      .style("fill", textColor);

    // add more annotations
    svg.append("line")
      .attr("class", "yearAnn1")
      .attr("x1", xPScale(2003))
      .attr("x2", xPScale(2017))
      .attr("y1", yScale(-200))
      .attr("y2", yScale(-200))
      .style("stroke", textColor)
      .style("stroke-width", 1.5);
    svg.append("line")
      .attr("class", "yearAnn1")
      .attr("x1", xPScale(2010))
      .attr("x2", xPScale(2010))
      .attr("y1", yScale(-200))
      .attr("y2", yScale(-300))
      .style("stroke", textColor)
      .style("stroke-width", 1.5);
    svg.append("text")
      .attr("class", "yearAnn1")
      .attr("x", xPScale(2010))
      .attr("y", yScale(-500))
      .text("There are peaks in PCB concentrations")
      .style("font-size", "13px")
      .style("text-anchor", "middle")
      .style("fill", textColor);
    svg.append("text")
      .attr("class", "yearAnn1")
      .attr("x", xPScale(2010))
      .attr("y", yScale(-500) + 15)
      .text("in 2004 and 2016. Both peaks are caused")
      .style("font-size", "13px")
      .style("text-anchor", "middle")
      .style("fill", textColor);
    svg.append("text")
      .attr("class", "yearAnn1")
      .attr("x", xPScale(2010))
      .attr("y", yScale(-500) + 30)
      .text("by major PCB contamination found in")
      .style("font-size", "13px")
      .style("text-anchor", "middle")
      .style("fill", textColor);
    svg.append("text")
      .attr("class", "yearAnn1")
      .attr("x", xPScale(2010))
      .attr("y", yScale(-500) + 45)
      .text("tissues of double-crested cormorants.")
      .style("font-size", "13px")
      .style("text-anchor", "middle")
      .style("fill", textColor);
    svg.append("line")
      .attr("class", "yearAnn1")
      .attr("x1", xMScale(2001))
      .attr("x2", xMScale(2005))
      .attr("y1", yScale(-200))
      .attr("y2", yScale(-200))
      .style("stroke", textColor)
      .style("stroke-width", 1.5);
    svg.append("line")
      .attr("class", "yearAnn1")
      .attr("x1", xMScale(2003))
      .attr("x2", xMScale(2003))
      .attr("y1", yScale(-200))
      .attr("y2", yScale(-300))
      .style("stroke", textColor)
      .style("stroke-width", 1.5);
    svg.append("text")
      .attr("class", "yearAnn1")
      .attr("x", xMScale(2003))
      .attr("y", yScale(-500))
      .text("Similar to PCB concentration peaks,")
      .style("font-size", "13px")
      .style("text-anchor", "middle")
      .style("fill", textColor);
    svg.append("text")
      .attr("class", "yearAnn1")
      .attr("x", xMScale(2003))
      .attr("y", yScale(-500) + 15)
      .text("the highest mercury concentration was")
      .style("font-size", "13px")
      .style("text-anchor", "middle")
      .style("fill", textColor);
    svg.append("text")
      .attr("class", "yearAnn1")
      .attr("x", xMScale(2003))
      .attr("y", yScale(-500) + 30)
      .text("found in 2003 inside tissues of")
      .style("font-size", "13px")
      .style("text-anchor", "middle")
      .style("fill", textColor);
    svg.append("text")
      .attr("class", "yearAnn1")
      .attr("x", xMScale(2003))
      .attr("y", yScale(-500) + 45)
      .text("double-crested cormorants.")
      .style("font-size", "13px")
      .style("text-anchor", "middle")
      .style("fill", textColor);
    svg.append("text")
      .attr("class", "yearAnn2")
      .attr("x", yearAttr.width/2 - padding*4)
      .attr("y", yearAttr.height/2 - padding*8)
      .text("When the concentrations are separated, the peaks")
      .style("font-size", "13px")
      .style("fillcolor", textColor)
      .style("opacity", 0);
    svg.append("text")
      .attr("class", "yearAnn2")
      .attr("x", yearAttr.width/2 - padding*4)
      .attr("y", yearAttr.height/2 - padding*8 + 15)
      .text("in fish tissues are more pronounced, meaning that")
      .style("font-size", "13px")
      .style("fill", textColor)
      .style("opacity", 0);
    svg.append("text")
      .attr("class", "yearAnn2")
      .attr("x", yearAttr.width/2 - padding*4)
      .attr("y", yearAttr.height/2 - padding*8 + 30)
      .text("most of the toxins are found within tissues rather")
      .style("font-size", "13px")
      .style("fill", textColor)
      .style("opacity", 0);
    svg.append("text")
      .attr("class", "yearAnn2")
      .attr("x", yearAttr.width/2 - padding*4)
      .attr("y", yearAttr.height/2 - padding*8 + 45)
      .text("than sediments.")
      .style("font-size", "13px")
      .style("fill", textColor)
      .style("opacity", 0);
}

function drawColumn(svg, yearAttr, multiple, fishData, sedimentData, label) {
  let xScale = d3.scaleLinear()
    .range([100 + 400*multiple , 500 + 400*multiple - padding*4])
    .domain([1980, 2018]); // hardcoded min + max years

  let count = 0;
  for (var loc of locationList) {
    // draw line graph for fish tissue
    let yScale = d3.scaleLinear()
      .range([yearAttr.height/8 * (count+1), yearAttr.height/8 * count])
      .domain([0, 4600]); // hardcoded averages

    svg.append("path")
      .datum(fishData[loc])
      .attr("fill", fishColor)
      .attr("stroke", fishColor)
      .attr("stroke-width", "1")
      .attr("d", d3.area()
        .x(function (d) {xScale(Number(d.x));return xScale(d.x);})
        .y0(yScale(0))
        .y1(function (d){return yScale(d.y)})
        .curve(d3.curveMonotoneX));

      // draw line graph for fish tissue
      let ySedimentScale = d3.scaleLinear()
        .range([yearAttr.height/8 * count, yearAttr.height/8 * (count+1)])
        .domain([0, 4600]); // hardcoded averages

      svg.append("path")
        .datum(sedimentData[loc])
        .attr("fill", sedimentColor)
        .attr("stroke", sedimentColor)
        .attr("stroke-width", "1")
        .attr("d", d3.area()
          .x(function (d) {xScale(Number(d.x));return xScale(d.x);})
          .y0(ySedimentScale(0))
          .y1(function (d){return ySedimentScale(d.y)})
          .curve(d3.curveMonotoneX));

    count = count + 1;
  }
}
