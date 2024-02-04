import React, { useEffect, useRef } from 'react';

const Graphs = ({ positions }) => {
  const canvasRef = useRef(null); // Reference to the canvas element

  useEffect(() => {
    const drawCircleAndHeatmap = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Define the circle
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 200; // Circle radius

      // Clear the canvas to redraw
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the circle
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      context.fillStyle = '#FFFFFF'; // Circle color
      context.fill();

      // Plot each position within the circle with a heatmap effect
      positions.forEach(({ x, y }) => {
        // Here, you'd calculate the "heat" based on the density of positions near (x, y)
        // For demonstration, we're using a placeholder for heat intensity
        const heatIntensity = Math.random(); // Placeholder: Random heat intensity

        // Set color based on heat intensity (e.g., red for high density)
        context.fillStyle = `rgba(255, 0, 0, ${heatIntensity})`;

        // Draw the position as a small circle
        context.beginPath();
        context.arc(x, y, 10, 0, 2 * Math.PI); // Position size
        context.fill();
      });
    };

    drawCircleAndHeatmap();
  }, [positions]); // Redraw when positions change

  return (
    <canvas ref={canvasRef} width={600} height={600} style={{ backgroundColor: '#FFF' }} />
  );
};

export default Graphs;
