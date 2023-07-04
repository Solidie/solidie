import React, { useEffect, useState } from "react";

// material-ui
import { purple, blue, grey } from "@mui/material/colors";

// apexchart imports
import { Chart } from ".";

// chart options
const areaChartOptions = {
  chart: {
    id: "chart",
    toolbar: {
      show: false,
    },
  },
  //   colors: ["blue.700", "purple.main"],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
    },
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    position: "bottom",
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 16,
      height: 16,
      radius: 5,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 8,
    },
  },
};

// ==============================|| APEXCHART - AREA ||============================== //

const ApexChart = ({ width, height }) => {
  const line = "hsl(var(--twc-tertiary)/0)";
  const [series] = useState([
    {
      name: "Series 1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Series 2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ]);

  const [options, setOptions] = useState(areaChartOptions);
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [blue[700], purple[600]],
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        labels: {
          colors: grey[500],
        },
      },
    }));
  }, [line]);

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width={width}
      height={height}
    />
  );
};

export default ApexChart;
