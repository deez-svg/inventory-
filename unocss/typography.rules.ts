import type { Rule } from "unocss";
import { mapUnit } from "./helper";

export default [
  // Font rules
  [/^fs-([0-9.]+)(\w{1,3})?$/, ([, value, unit]: string[]) => {
    return {
      'font-size': `${value}${mapUnit(unit)}`,
    };
  }],

  [/^fw-([a-z0-9]+)$/, ([, value]: string[]) => {
    return {
      'font-weight': value,
    };
  }],

  [/^ff-(.+)$/, ([, name]: string[]) => {
    return { ['font-family']: name }
  }],

  // typography rules
  [/^lh-([0-9]+)(\w{1,3})?$/, ([, value, unit]: string[]) => {
    return {
      'line-height': `${value}${mapUnit(unit)}`
    }
  }],

  // text-align rules
  [/^ta-(\w+)$/, ([, value]: string) => {
    return { 'text-align': value }
  }],

  ["no-underline", { "text-decoration": "none" }],
  ["transform-none", { "text-transform": "none" }],
  ["break-word", { "word-break": "break-word"}]
] as Rule[];
