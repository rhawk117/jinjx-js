import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { createRequire } from "module"; 

const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

export default [
	// ES Module Build
	{
		input: "src/index.ts",
		output: {
			file: packageJson.module, // e.g. "dist/index.esm.js"
			format: "esm",
			sourcemap: true,
		},
		plugins: [
			resolve(),
			commonjs(),
			json(),
			typescript({ tsconfig: "./tsconfig.json" }),
		],
	},
	// UMD Build
	{
		input: "src/index.ts",
		output: {
			file: packageJson.main, // e.g. "dist/index.umd.js"
			format: "umd",
			name: "Jinjx",
			sourcemap: true,
		},
		plugins: [
			resolve(),
			commonjs(),
			json(),
			typescript({ tsconfig: "./tsconfig.json" }),
		],
	},
];
