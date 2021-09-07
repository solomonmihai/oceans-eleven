import { Box, Text } from "@chakra-ui/react";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";

import CurrencyStore from "../../../stores/CurrencyStore";
import UserStore from "../../../stores/UserStore";

export default function Wallet() {
  const accounts = UserStore.useState((state) => state.user.accounts);
  const rates = CurrencyStore.useState((state) => state.rates);

  const canvasRef = useRef(null);

  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    Chart.register(...registerables);
  }, []);

  useEffect(() => {
    // draw pie chart

    const data = {
      labels: accounts.map((acc) => acc.name),
      datasets: [
        {
          label: "wallet dataset",
          data: accounts.map((acc) => acc.sum / rates[acc.currency.toUpperCase()]),
          backgroundColor: accounts.map(() => {
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
      data: data,
      options: {
        onHover: (ev, items) => {
          if (items[0]) {
            setHovered(items[0].index);
            console.log(items[0]);
          } else {
            setHovered(null);
          }
        },
      },
    });

    return () => {
      pieChart.destroy();
    };
  }, [accounts]);
  // pass data as a dependency so we redraw everytime the data changes

  return (
    <Box maxW="lg" p="2" m="2" borderWidth="1px" borderRadius="lg" position="relative">
      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontWeight="bold"
        fontSize="1.5em"
        color="green.200"
      >
        {hovered} {hovered ? accounts[hovered].name : "null"}
      </Text>
      <canvas ref={canvasRef} width="400" height="400" />
    </Box>
  );
}
