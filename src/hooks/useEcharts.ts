import { onBeforeUnmount, onActivated, onDeactivated } from "vue";
import { useDebounceFn } from "@vueuse/core";
import * as echarts from "echarts";
import { isClient } from "@/utils/is";

export const useECharts = (
  myChart: echarts.ECharts,
  options: echarts.EChartsCoreOption
) => {
  if (options && typeof options === "object") {
    myChart.setOption(options);
  }

  const echartsResize = useDebounceFn(() => {
    if (!myChart?.isDisposed()) {
      myChart?.resize();
    }
  }, 100);

  if (isClient) {
    window.addEventListener("resize", echartsResize);
  }

  onBeforeUnmount(() => {
    if (isClient) {
      window.removeEventListener("resize", echartsResize);
    }
  });

  onActivated(() => {
    if (isClient) {
      window.addEventListener("resize", echartsResize);
    }
  });

  onDeactivated(() => {
    if (isClient) {
      window.removeEventListener("resize", echartsResize);
    }
  });
};
