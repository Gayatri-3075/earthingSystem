"use client";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  LineChart,
  Line,
  LineProps,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useZoomAndPan } from "../hooks/useZoomAndPan";
import { useTooltipSorting } from "../hooks/useTooltipSorter";

const DEFAULT_CHART_PROPS = {
  width: 500,
  height: 400,
  margin: {
    top: 25,
    right: 10,
    left: 10,
    bottom: 0,
  },
};

const DEFAULT_GRID_PROPS = {
  strokeDasharray: "3 3",
};

const RechartsClipPaths = forwardRef((_, ref) => {
  const grid = useRef(null);
  const axis = useRef(null);
  useImperativeHandle(ref, () => ({
    grid,
    axis,
  }));

  return (
    <>
      <clipPath id="chart-xaxis-clip">
        <rect fill="rgba(0,0,0,0)" height="100%" ref={axis} />
      </clipPath>
      <clipPath id="chart-grid-clip">
        <rect fill="rgba(0,0,0,0)" height="100%" ref={grid} />
      </clipPath>
    </>
  );
});

const lines = [
  {
    dataKey: "impression",
    strokeWidth: 1,
    name: "impression",
    stroke: "green",
    connectNulls: true,
  },
  {
    dataKey: "cost",
    strokeWidth: 1,
    name: "impression",
    stroke: "blue",
    connectNulls: true,
  },
];

const axis = {
  x: {
    dataKey: "name",
    type: "category",
    allowDataOverflow: true,
    interval: 0,
  },
};


const data = [
  { name: "A", cost: 25.5, impression: 100 },
  { name: "B", cost: 25.39, impression: 120 },
  { name: "C", cost: 18.37, impression: 150 },
  { name: "D", cost: 18.16, impression: 180 },
  { name: "E", cost: 26.29, impression: 200 },
  { name: "F", cost: 39, impression: 499 },
  { name: "G", cost: 50.53, impression: 50 },
  { name: "H", cost: 82.52, impression: 100 },
  { name: "I", cost: 91.79, impression: 200 },
  { name: "J", cost: 52.94, impression: 222 },
  { name: "K", cost: 84.3, impression: 210 },
  { name: "L", cost: 54.41, impression: 300 },
  { name: "M", cost: 2.1, impression: 50 },
  { name: "N", cost: 58, impression: 190 },
  { name: "O", cost: 20, impression: 300 },
  { name: "P", cost: 19, impression: 400 },
  { name: "Q", cost: 36, impression: 200 },
  { name: "R", cost: 92, impression: 50 },
  { name: "S", cost: 83, impression: 100 },
  { name: "T", cost: 78, impression: 100 },
];

const Chart = ({
  chartOptions,
  gridOptions,
  tooltip,
  legend,
}) => {
  const [loaded, setLoaded] = useState(false);

  const {
    clipPathRefs,
    xPadding,
    onChartMouseDown,
    onChartMouseUp,
    setWrapperRef,
    onChartMouseMove,
  } = useZoomAndPan({
    chartLoaded: loaded,
  });

  const { onSeriesMouseOver, tooltipSorter } = useTooltipSorting();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  return (
    <ResponsiveContainer
      className="noselect"
      width="100%"
      height="100%"
      debounce={100}
      ref={setWrapperRef}
    >
      <LineChart
        {...{
          ...DEFAULT_CHART_PROPS,
          margin: {
            ...DEFAULT_CHART_PROPS.margin,
            ...chartOptions?.margin,
          },
        }}
        data={data}
        onMouseMove={onChartMouseMove}
        onMouseDown={onChartMouseDown}
        onMouseUp={onChartMouseUp}
      >
        <defs>
          <RechartsClipPaths ref={clipPathRefs} />
        </defs>
        <CartesianGrid
          {...{
            ...DEFAULT_GRID_PROPS,
            ...gridOptions,
            stroke: gridOptions?.hide ? "transparent" : gridOptions?.stroke,
          }}
        />
        {axis?.x?.hide ? null : (
          <XAxis
            {...axis?.x}
            padding={{ left: xPadding[0], right: xPadding[1] }}
            domain={["dataMin", "dataMax"]}
            className="x-axis"
          />
        )}
        {axis?.y?.hide ? null : <YAxis {...axis?.y} />}
        {tooltip?.hide ? null : (
          <Tooltip {...tooltip} itemSorter={tooltipSorter} />
        )}
        {legend?.hide ? null : <Legend {...legend} />}
        {lines.map((l, i) => (
          <Line
            key={`${l.key}-${i}`}
            id={l.key}
            {...l}
            className={`${l.className || ""}`}
            activeDot={{
              onMouseOver: () => onSeriesMouseOver(String(l.dataKey)),
            }}
            onMouseOver={() => onSeriesMouseOver(String(l.dataKey))}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
