import { mapUnit, mapProperty, sides } from './helper'
import type { Rule } from 'unocss';
import type { Direction } from './helper'

const borderSideMap = (direction: string) => {
  return direction ? `border-${sides[direction as Direction]}-` : 'border-';
}

export default [
  // single value margin and padding rules
  [/^(-)?(m|p)(t|r|b|l)-(\d+)(\w{1,3})?$/,
    ([, negative, style, direction, value, unit]: string[]) => {
      const fullProperty = `${mapProperty(style)}-${sides[direction as Direction]}`;
      const mappedUnit = mapUnit(unit);
      return { [fullProperty]: `${negative ? negative: ''}${value}${mappedUnit}` };
    }
  ],

  // multi value margin and padding rules
  [/^(m|p)-(\d+)(\w{1,3})?(?:-(\d+)(\w{1,3})?)?(?:-(\d+)(\w{1,3})?)?(?:-(\d+)(\w{1,3})?)?$/,
    ([, style, v1, u1, v2, u2, v3, u3, v4, u4]: string[]) => {
      const property = mapProperty(style);
      return {
        [property]: [
          `${v1}${mapUnit(u1)}`,
          v2 ? `${v2}${mapUnit(u2)}` : '',
          v3 ? `${v3}${mapUnit(u3)}` : '',
          v4 ? `${v4}${mapUnit(u4)}` : '',
        ].filter(Boolean).join(' '),
      };
    }],

  // auto margins
  [/^m(t|r|b|l)?-auto$/,
    ([, direction]: string[]) => {
      const fullProperty = direction ? `margin-${sides[direction as Direction]}` : 'margin';
      return { [fullProperty]: 'auto' };
    }
  ],

  // height and weight shorthand rule
  [/^(h|w)-(\d+)(\w{1,3})?/, ([, style, i, unit]: string[]) => {
    const property = style === 'h' ? 'height' : 'width';
    return { [property]: `${i}${mapUnit(unit)}` };
  }],

  // min max height and weight shorthand rule
  [/^(min|max)-(h|w)-(\d+)(\w{1,3})?/, ([, limit, style, i, unit]: string[]) => {
    const property = style === 'h' ? 'height' : 'width';
    return { [`${limit}-${property}`]: `${i}${mapUnit(unit)}` };
  }],

  ['max-needed-width', { width: 'max-content' }],

  // Outline rules
  ['no-outline', { outline: 'none' }],

  // Resize rules
  ['no-resize', { resize: 'none' }],

  // Border rules
  ['border-none', { border: 'none' }],

  [/^(?:border|bd)-(t|r|b|l)?-?(\d+)(\w{1,3})?$/, ([, side, value, unit]: string[]) => {
    return { [`${borderSideMap(side)}width`]: `${value}${mapUnit(unit)}` };
  }],

  [/^(?:border|bd)-(t|r|b|l)?-?(solid|none)$/, ([, side, style]: string[]) => {
    return { [`${borderSideMap(side)}style`]: style };
  }],

  [/^(?:border|bd)-(t|r|b|l)?-?color-([-a-z]+)?$/, ([, side, color]: string[]) => {
    return { [`${borderSideMap(side)}color`]: `var(--${color})` };
  }],

  [/^(?:border|bd)-rad-(\d+)(\w{1,3})?$/, ([, value, unit]: string[]) => {
    return { 'border-radius': `${value}${mapUnit(unit)}` };
  }],

  [/^(?:border|bd)-rad-(\d+)(\w{1,3})?-(\d+)(\w{1,3})?-(\d+)(\w{1,3})?-(\d+)(\w{1,3})?$/,
    ([, v1, u1, v2, u2, v3, u3, v4, u4]: string[]) => {
      return { 'border-radius': `${v1}${mapUnit(u1)} ${v2}${mapUnit(u2)} ${v3}${mapUnit(u3)} ${v4}${mapUnit(u4)}` };
    }
  ],

  // Box rules
  [/^box-size-([-a-z]+)$/, ([, value]) => {
    return { 'box-sizing': value }
  }],

  // Backdrop filter rules
  [/^backdrop-blur-(\d+)(\w{1,3})?$/, ([, value, unit]: string[]) => {
    return { 'backdrop-filter': `blur(${value}${mapUnit(unit)})` };
  }]
] as Rule[];
