import { Box, Text } from "@chakra-ui/react";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import CurrencyStore from "../../stores/CurrencyStore";
import UserStore from "../../stores/UserStore";

export default function Wallet() {
  const data = UserStore.useState((state) => state.user.accounts);
  const rates = CurrencyStore.useState((state) => state.rates);

  useEffect(() => {
    // draw pie chart

    const keys = data.map((acc) => acc.name);
    const values = data.map((acc) => acc.sum / rates[acc.currency]);

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateWarm)
      .domain([0, keys.length]);

    d3.select("#wallet-svg").select("svg").remove();

    const svg = d3
      .select("#wallet-svg")
      .append("svg")
      .attr("width", 300)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(150, 150)");

    const arcGenerator = d3.arc().innerRadius(140).outerRadius(80);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d);

    const arc = svg.selectAll().data(pieGenerator(values)).enter();

    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (_, i) => colorScale(i))
      .style("stroke", "#fff")
      .style("stroke-width", 0)
      .on("mouseover", function (d, i) {
        d3.select(this).transition().duration(100).attr("opacity", "0.6");
        d3.select("#wallet-text").text(() => i.data);
      })
      .on("mouseout", function (d, i) {
        d3.select(this).transition().duration(100).attr("opacity", "1");
        d3.select("#wallet-text").text(`TOTAL: `);
      });

    arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((_, i) => keys[i].toUpperCase())
      .style("fill", "#fff")
      .style("font-weight", "bold")
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }, [data]);
  // pass data as a dependency so we redraw everytime the data changes

  return (
    <Box id="wallet-svg" w="100%" p="2" m="2" borderWidth="1px" borderRadius="lg">
      <Text id="wallet-text" color="pink" fontWeight="bold" position="fixed">
        TOTAL
      </Text>
    </Box>
  );
}
