import { mapUnit } from "./helper";
import type { Rule } from "unocss";

export default [
  // Flexbox shorthand rules
  ['flex', { display: 'flex' }],
  [/^flex-(\d+)$/, ([, value]: string[]) => ({ flex: value })],
  [/^align-i-([a-z-]+)$/, ([, alignment]) => ({ 'align-items': alignment })],
  [/^align-c-([a-z-]+)$/, ([, alignment]) => ({ 'align-content': alignment })],
  [/^align-s-([a-z-]+)$/, ([, alignment]) => ({ 'align-self': alignment })],
  [/^just-i-([a-z-]+)$/, ([, alignment]) => ({ 'justify-items': alignment })],
  [/^just-c-([a-z-]+)$/, ([, alignment]) => ({ 'justify-content': alignment })],
  [/^(row|column)$/, ([, direction]) => ({ 'flex-direction': direction })],
  [/^(wrap|nowrap)$/, ([, wrap]) => ({ 'flex-wrap': wrap })],
  [/^gap-(\d+)(\w{1,3})?/, ([, value, unit]) => {
    return { gap: `${value}${mapUnit(unit)}` }
  }],

  // display rules
  ['inline-block', { display: 'inline-block' }],
  ['block', { display: 'block' }],
  ['no-display', { display: 'none' }],
  ['inline-flex', { display: 'inline-flex' }],

  // Overflow rules
  [/^oflow-(x|y)?-?(\w+)$/, ([, axis, value]: string[]) => {
      if(axis) {
        return { [`overflow-${axis}`]: value };
      } else {
        return { 'overflow': value }
      }
  }],

  // Scrollbar rules
  [/^no-scrollbar$/,
    () => {
      return [
        {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar {display: none;}',
      ];
    },
  ],

  [/^scrollbar-w-(\w+)$/, ([, value]: string[]) => {
    return { ['scrollbar-width']: value };
  }],

  [/^scrollbar-color-([-a-z]+)--([-a-z]+)$/, ([, thumbColor, trackColor]: string[]) => {
    return { ['scrollbar-color']: `var(--${thumbColor}) var(--${trackColor})` };
  }],

  // cursor rule
  ["pointer", { cursor: "pointer" }],

  // visibility rules
  ["hidden", { visibility: 'hidden' }],
  ["visible", { visibility: 'visible' }],

  // Opacity Rule
  [/^opacity-([\d.]+)$/, ([, value]) => {
    return {
      opacity: value,
    };
  }],
] as Rule[];
