import { useCallback, useState } from "react";

export const useTooltipSorting = () => {
  const [activeSeries, setActiveSeries] = useState(null);

  const onSeriesMouseOver = useCallback((hoveredSeries) => {
    setActiveSeries(hoveredSeries);
  }, []);

  const tooltipSorter = useCallback(
    (payload) => {
      if (activeSeries === payload.dataKey) return 0;
      return 1;
    },
    [activeSeries]
  );

  return {
    onSeriesMouseOver,
    tooltipSorter
  };
};
