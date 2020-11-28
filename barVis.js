function drawBarVis(svgClass, pData, mData) {
  let barAttr = {
    "width": 900,
    "height": 450
  }

  let mostPcbList = ["Double-crested Cormorant", "Top Smelt", "White Croaker", "Greater Scaup", "Anchovy"]
  let mostMList = ["Leopard shark", "Brown Smooth-hound Shark", "Surf Scoter", "Striped Bass", "Barred Surfperch"];
  let safePcbList = ["Walleye Surfperch", "Starry Flounder", "Chinook Salmon", "Brown Rockfish", "Pile Surfperch"]

  let svg = d3.select(svgClass);
  createBarGraph(svg, barAttr, pData, mostPcbList, 0, "Most PCB Conc. (ng/g)");
  createBarGraph(svg, barAttr, mData, mostMList, 1, "Most Mercury Conc. (ng/g)");
  createBarGraph(svg, barAttr, pData, safePcbList, 2, "Least PCB Conc. (ng/g)");
}

function createBarGraph(svg, barAttr, data, lst, mul, title) {
  console.log(data);
  let yScale = d3.scaleBand()
    .domain(d3.range(lst.length))
    .range([padding*3, barAttr.height - padding*6])
    .padding(0.2);

  let xScale = d3.scaleLinear()
    .domain([0, 2700]) // hardcoded
    .range([(barAttr.width/3 + padding*1.5) * mul + padding*7, barAttr.width/3 * (mul+1)]);

  svg.selectAll("#textRect")
    .data(lst)
    .enter()
    .append("rect")
      .attr("x", d => xScale(0))
      .attr("y", (d, i) => yScale(i))
      .attr("height", yScale.bandwidth())
      .attr("width", function(d, i) {
        return xScale(data.get(d)) - xScale(0);
      })
      .attr("rx", 3)
      .style("fill", fishColor);
  svg.selectAll("#textLabel")
    .data(lst)
    .enter()
    .append("text")
      .attr("x", (barAttr.width/3 + padding*1.5) * mul + padding*7 - 5)
      .attr("y", (d, i) => yScale(i) + yScale.bandwidth()/2)
      .text((d, i) => lst[i])
      .style("font-size", 14)
      .style("fill", textColor)
      .style("text-anchor", "end");
  svg.selectAll("#textValue")
    .data(lst)
    .enter()
    .append("text")
      .attr("x", (d) => xScale(data.get(d)) + 5)
      .attr("y", (d, i) => yScale(i) + yScale.bandwidth()/2)
      .text((d, i) => data.get(d).toFixed(2))
      .style("font-size", 12)
      .style("font-weight", "bold")
      .style("fill", textColor)
      .style("text-anchor", "stackBarAttr");

  svg.append("text")
    .attr("x", xScale(2700/2) - padding*2.5)
    .attr("y", padding*2)
    .text(title)
    .style("text-anchor", "middle")
    .style("font-family", "Ubuntu")
    .style("font-weight", "bold")
    .style("font-color", textColor)
    .style("font-size", 16);

}
