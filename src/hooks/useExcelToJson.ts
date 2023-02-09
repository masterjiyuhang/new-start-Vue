import path from "path";
import fs from "fs";
import xlsx from "node-xlsx";
import _ from "lodash";
import { fileURLToPath } from "url";

// 没有用哈 只能手动运行 Vite里面不支持这种node原生的东西 如果非得想用的话 可以看看这个插件 vite-plugin-optimizer
// https://github.com/vite-plugin/vite-plugin-optimizer/blob/main/README.zh-CN.md
// https://zhuanlan.zhihu.com/p/540056695
export function useExcelToJson() {
  function makeExcelToJSon(
    name: string,
    sourcePath: string,
    targetPath: string
  ) {
    const xlsxPath = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      sourcePath
    );

    const excel = xlsx.parse(path.resolve(xlsxPath, `./${name}.xlsx`));

    const data = excel[0].data;

    const result = [];
    // 字段过滤
    _.forEach(data.slice(1), (d) => {
      result.push({
        id: d[0],
        name_cn: d[1] || "",
        name_en: d[2],
        logo_file: d[3],
        product_category_id: d[4],
        service_start_time: d[5],
        service_end_time: d[6],
        cumulative_years: d[7],
      });
    });

    function writeFile(
      fileName: fs.PathOrFileDescriptor,
      data: string | NodeJS.ArrayBufferView
    ) {
      fs.writeFile(fileName, data, "utf-8", complete); // 文件编码格式 utf-8
      function complete(err: any) {
        if (!err) {
          console.log("文件生成成功"); // 终端打印这个 表示输出完成
        }
      }
    }

    writeFile(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), targetPath),
      JSON.stringify(result)
    );
  }

  return {
    makeExcelToJSon,
  };
}
