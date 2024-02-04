import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SlopeChart = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      // Set dimensions and margins
      const margin = { top: 20, right: 40, bottom: 60, left: 60 };
      const width = 800 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      // Create SVG container
      const svg = d3.select(d3Container.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Sample data generation (replace with your data)
      const data = [
        { species: "Species A", trait: "Frontal (Decision Making)", value: 30 },
        { species: "Species A", trait: "Occipital (Vision Range)", value: 45 },
        { species: "Species A", trait: "Hypothalamus (Appetite)", value: 60 },
        // Add more data points...
      ];

      // Prepare scales
      const traits = data.map(d => d.trait);
      const species = [...new Set(data.map(d => d.species))];

      const x = d3.scaleBand()
        .domain(traits)
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);

      // Create lines
      svg.selectAll(".line")
        .data(species)
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("d", d => {
          const points = data.filter(point => point.species === d);
          return d3.line()
            .x(point => x(point.trait) + x.bandwidth() / 2)
            .y(point => y(point.value))
            (points);
        })
        .attr("fill", "none")
        .attr("stroke", "steelblue");

      // Create circles for data points
      svg.selectAll(".circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("cx", d => x(d.trait) + x.bandwidth() / 2)
        .attr("cy", d => y(d.value))
        .attr("r", 5)
        .attr("fill", "steelblue");

      // Create x-axis
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)");

      // Create y-axis
      svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

      // Add labels, titles, and other elements as needed

    }
  }, [d3Container]);

  return (
    <div>
      {/* You can add any other React components or content here */}
      <svg
        className="d3-component"
        width={800}
        height={600}
        ref={d3Container}
      />
    </div>
  );
};

export default SlopeChart;
