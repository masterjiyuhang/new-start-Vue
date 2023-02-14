import type { Plugin } from "vite";
import { parse, transform } from "@vue/compiler-dom";
import MagicString from "magic-string";
import path from "path";

export const GvaPosition = (): Plugin => {
  return {
    name: "gva-position",
    apply: "serve",
    transform(code, id) {
      const index = id.lastIndexOf(".");
      const ext = id.substring(index + 1);
      if (ext.toLowerCase() === "vue") {
        // console.log(code, "⭐⭐⭐⭐");
        return codeLineTrack(code, id);
        // return compileSDFTemplate(code, id);
      }
    },
  };
};

const codeLineTrack = (code, id) => {
  const lineList = code.split("\n");
  const newList = [];
  lineList.forEach((item, index) => {
    newList.push(addLineAttr(item, index + 1, id)); // 添加位置属性，index+1为具体的代码行号
  });
  return newList.join("\n");
};

const addLineAttr = (lineStr, line, id) => {
  // console.log("addLineAttr", lineStr, id, line);
  if (!/^\s+</.test(lineStr)) {
    return lineStr;
  }
  // eslint-disable-next-line no-useless-escape
  const reg = /((((^(\s)+\<))|(^\<))[\w-]+)|(<\/template)/g;
  let leftTagList = lineStr.match(reg);

  if (leftTagList) {
    // console.log("这块什么时候能执行啊");
    leftTagList = Array.from(new Set(leftTagList));
    leftTagList.forEach((item) => {
      const skip = [
        "KeepAlive",
        "template",
        "keep-alive",
        "transition",
        "el-",
        "El",
        "router-view",
      ];
      if (item && !skip.some((i) => item.indexOf(i) > -1)) {
        const reg = new RegExp(`${item}`);
        const location = `${item} code-location="${id}:${line}"`;
        lineStr = lineStr.replace(reg, location);
      }
    });
  }
  return lineStr;
};

const compileSDFTemplate = async (code: string, id: string) => {
  const s = new MagicString(code);

  // SFC => AST
  const ast = parse(code, { comments: true });

  const EXCLUDE_TAG = ["template", "script", "style"];
  const result = await new Promise((resolve) => {
    transform(ast, {
      // ast node节点访问器
      nodeTransforms: [
        (node) => {
          console.log(node.type, "node");
          if (node.type === 1) {
            // 只解析html标签
            if (node.tagType === 0 && !EXCLUDE_TAG.includes(node.tag)) {
              const { base } = path.parse(id);
              // 获取到相关信息,并进行自定义属性注入
              !node.loc.source.includes("data-v-inspecotr-file") &&
                s.prependLeft(
                  node.loc.start.offset + node.tag.length + 1,
                  ` data-v-inspecotr-file="${id}" data-v-inspecotr-line=${node.loc.start.line} data-v-inspecotr-column=${node.loc.start.column} data-v-inspecotr-title="${base}"`
                );
            }
          }
        },
      ],
    });
    resolve(s.toString());
  });
  return result;
};
