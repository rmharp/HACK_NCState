import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CircularGraphs = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data && data.length > 0) {
      const svg = d3.select(svgRef.current);
      const width = +svg.attr('width');
      const height = +svg.attr('height');
      const outerRadius = Math.min(width, height) * 0.4;
      const innerRadius = outerRadius - 100; // Adjust as needed

      // Create a radial scale for the colors
      const colorScale = d3.scaleSequential(d3.interpolateInferno)
        .domain([0, d3.max(data, d => d.value)]);

      // Create the circular arc paths
      const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(d => d.startAngle)
        .endAngle(d => d.endAngle)
        .padAngle(0.01); // Adjust the padding between arcs

      // Convert data to suitable format and compute angles
      const pie = d3.pie()
        .value(d => d.value)
        .sort(null); // We want to keep the original order

      const arcs = pie(data);

      // Bind data to paths and enter new arcs
      svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .selectAll('path')
        .data(arcs)
        .enter().append('path')
          .attr('d', arc)
          .attr('fill', d => colorScale(d.data.value));

      // Add interactive features here (e.g., tooltip, zoom, pan)
    }
  }, [data]); // Redraw when data changes

  return <svg ref={svgRef} width={600} height={600} style={{ background: 'white' }}></svg>;
};

export default CircularGraphs;
