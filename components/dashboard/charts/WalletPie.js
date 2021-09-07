import { Box, Text } from "@chakra-ui/react";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";

export default function WalletPie({ data, labels, total }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    Chart.register(...registerables);
  }, []);

  useEffect(() => {
    // draw pie chart

    const chartData = {
      labels,
      datasets: [
        {
          label: "wallet dataset",
          data,
          backgroundColor: data.map(() => {
            const min = 50;
            const max = 255;
            const g = Math.floor(min + Math.random() * (max - min));
            const r = Math.floor(min + Math.random() * (max - min));
            const b = Math.floor(min + Math.random() * (max - min));
            return `rgb(${r}, ${g}, ${b})`;
          }),
        },
      ],
    };

    const ctx = canvasRef.current.getContext("2d");
    const pieChart = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
    });

    return () => {
      pieChart.destroy();
    };
  }, []);

  return (
    <Box>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -25%)"
        fontWeight="bold"
        fontSize="1.35em"
        color="pink.200"
      >
        <Text>Net worth</Text>
        <Text textAlign="right">
          <Text as="span" color="green.200">
            {Math.floor(data.reduce((a, b) => a + b))}{" "}
          </Text>
          <Text fontWeight="normal" color="gray.500" as="span">
            USD
          </Text>
        </Text>
      </Box>
      <canvas ref={canvasRef} width="400" height="400" />
    </Box>
  );
}
