import React, { useEffect, useState } from "react";

// material-ui
import { purple, blue, grey } from "@mui/material/colors";

// apexchart imports
import Chart from "react-apexcharts";

// chart options
const areaChartOptions = {
  chart: {
    id: "chart",
    toolbar: {
      show: false,
    },
  },
  //   colors: ["blue.700", "purple.main"],
  xaxis: {
    categories: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ]
  },
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
  legend: {
    show: true,
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

const ApexBarChart = ({ width }) => {
  const line = "hsl(var(--twc-tertiary)/0)";
  const [series] = useState([
    {
      name: "Series 1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    // {
    //   name: "Series 2",
    //   data: [11, 32, 45, 32, 34, 52, 41],
    // },
  ]);

  const [options, setOptions] = useState(areaChartOptions);
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ["#87E8DE", purple[600]],
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
      yaxis: {
        show: false,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
    }));
  }, [line]);

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={350}
      width={width}
    />
  );
};

export default ApexBarChart;
