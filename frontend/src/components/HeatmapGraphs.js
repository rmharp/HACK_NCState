import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HeatmapGraphs = ({ data }) => {
    const d3Container = useRef(null);
  
    useEffect(() => {
      if (data && d3Container.current) {
    // Generate random data
    const generateRandomPoints = (count, width, height) => {
        return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        densityValue: 0, // initial density
        }));
    };
    
    // Calculate the density for each point
    const calculateDensity = (data, radius, width, height) => {
        // Create a quadtree to optimize density calculation
        const quadtree = d3.quadtree()
        .x(d => d.x)
        .y(d => d.y)
        .addAll(data);
    
        data.forEach(point => {
        // Count how many points are within the radius
        quadtree.visit((node, x1, y1, x2, y2) => {
            if (!node.length) {
            do {
                const dx = point.x - node.data.x;
                const dy = point.y - node.data.y;
                if (dx * dx + dy * dy < radius * radius) {
                point.densityValue += 1;
                }
            } while (node = node.next);
            }
            return x1 > point.x + radius || y1 > point.y + radius ||
                x2 < point.x - radius || y2 < point.y - radius;
        });
        });
    
        // Normalize density values to a scale of 0-1
        const maxDensity = Math.max(...data.map(d => d.densityValue));
        data.forEach(d => d.densityValue /= maxDensity);
    };
    
    // Set dimensions and append SVG
    const width = 800;
    const height = 600;
    const radius = 25; // radius to check for density
    const dataCount = 1000; // number of data points
    
    const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', 'orange');
    
    let data = generateRandomPoints(dataCount, width, height);
    calculateDensity(data, radius, width, height);
    
    // Define color scale
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd);
    
    // Draw the points as circles
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 5) // radius of the circles
        .attr('fill', d => colorScale(d.densityValue));
    
    // Optional: Add labels or other elements based on your requirements

// Draw a black circle
    svg.append('circle')
        .attr('cx', width / 2) // Center X coordinate
        .attr('cy', height / 2) // Center Y coordinate
        .attr('r', Math.min(width, height) / 2) // Radius based on minimum dimension
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 6);
}
}, [data, d3Container]);

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

export default HeatmapGraphs;