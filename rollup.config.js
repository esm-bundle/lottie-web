import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import { sync } from "glob-all";

function createConfig(format) {
  const dir = format === "module" ? "esm" : format;
  const cwd = path.dirname(require.resolve("lottie-web/package.json"));
  return {
    input: sync("build/**/!(*.min).js", { cwd }).map((entry) =>
      path.join(cwd, entry)
    ),
    output: {
      format,
      dir,
    },
    plugins: [
      commonjs(),
      terser(),
      copy({
        targets: [
          {
            src: path.join(cwd, "/build/player/*.d.ts"),
            dest: dir,
            transform: (contents) =>
              contents.toString().replace("../../index", "../index"),
          },
        ],
      }),
      copy({
        targets: [
          {
            src: path.join(cwd, "/index.d.ts"),
            dest: __dirname,
            transform: (contents) =>
              contents.toString().replace("../../index", "../index"),
          },
        ],
      }),
    ],
  };
}

export default [createConfig("module"), createConfig("system")];
