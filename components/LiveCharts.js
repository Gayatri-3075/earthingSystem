"use client";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./styles.css";
import useLeakageData from "./utils/useLeakageData";


const LiveChart = ({ wrapperClassName = "bar-graph-wrapper" }) => {
  const data = useLeakageData("PID1");
  console.log(data);
  const width = data.length * 100 < 400 ? 400 : data.length * 100;
  return (
    <div className="app-container">
      <div
        className={`overflow-x-auto overflow-y-hidden ${wrapperClassName}`}
        onScroll={(e) => {
          let wrapper = document.querySelector(
            `.${wrapperClassName} .recharts-surface`
          );
          let graphWrapper = document.querySelector(
            `.${wrapperClassName} .graph-wrapper`
          );

          const allAxis = document.querySelectorAll(
            `.${wrapperClassName} .recharts-yAxis`
          );

          let xAxis = document.querySelector(
            `.${wrapperClassName} .recharts-xAxis`
          );

          const xAxisHeight = xAxis.getBoundingClientRect().height;

          allAxis?.forEach((axis) => {
            const orientation = axis
              .querySelector(
                `.${wrapperClassName} .recharts-cartesian-axis-tick-line`
              )
              ?.getAttribute("orientation");

            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect"
            );
            const yAxisheight = axis.getBoundingClientRect().height;
            const yAxisWidth = axis.getBoundingClientRect().width;

            rect.setAttribute("x", "0");
            rect.setAttribute("y", "0");
            rect.setAttribute("width", yAxisWidth);
            rect.setAttribute("height", yAxisheight + xAxisHeight);
            rect.setAttribute("fill", "white");
            rect.setAttribute("class", `y-axis-rect-${orientation}`);

            axis.insertBefore(rect, axis.firstChild);

            const position =
              orientation === "left"
                ? e.target.scrollLeft
                : e.target.scrollLeft -
                  wrapper?.clientWidth +
                  graphWrapper?.clientWidth;

            axis.style = "transform: translateX(" + position + "px);";
          });
        }}
      >
        <LineChart
          width={width}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="time" />

          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="current" stroke="#8884d8" activeDot={{ r: 8 }} />
          <YAxis  />
        </LineChart>
      </div>
    </div>
  );
};

export default LiveChart;
