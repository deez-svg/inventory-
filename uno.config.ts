import { defineConfig, presetAttributify } from 'unocss';

type Direction = 't' | 'r' | 'b' | 'l';

const sides: Record<Direction, string> = { t: 'top', l: 'left', b: 'bottom', r: 'right' };

const validUnits = ['px', 'p', 'vh', 'vw', 'rem', 'em'];

// Move this mapping to constants if you prefer
const styleMapping: Record<string, string> = {
  m: 'margin',
  p: 'padding',
  t: 'top',
  l: 'left',
  b: 'bottom',
  r: 'right',
};

// Helper function to map units
const mapUnit = (unit?: string): string => {
  if (!unit) {
    return 'px'; // Default unit
  }
  if (validUnits.includes(unit)) {
    return unit === 'p' ? '%' : unit;
  }
  throw new Error(`Invalid unit: ${unit}`);
};

// Helper function to map style shorthand to full property name
const mapStyle = (style: string): string => {
  const fullProperty = styleMapping[style];
  if (!fullProperty) {
    throw new Error(`Unsupported style shorthand: ${style}`);
  }
  return fullProperty;
};

// Utility function to handle optional side keyword (e.g., top, bottom, etc.)
const borderSideMap = (side: string) => side ? `border-${side}-` : 'border-';

// Utility function to determine if its hex color
const isHexColor = (color: string): boolean => {
  return /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/.test(color);
};

export default defineConfig({
  content: { filesystem: ["app/views/**/*.html/erb"] },
  presets: [presetAttributify],
  rules: [
    // Direction-based padding & margin rule
    [/^(m|p)(t|r|b|l)-(\d+)(\w{1,3})?$/,
      ([, style, direction, value, unit]) => {
        const fullProperty = `${mapStyle(style)}-${sides[direction as Direction]}`;
        const mappedUnit = mapUnit(unit);
        return { [fullProperty]: `${value}${mappedUnit}` };
      }],

    // Combined margin & padding rule
    [/^(m|p)-(\d+)(\w{1,3})?(?:-(\d+)(\w{1,3})?)?(?:-(\d+)(\w{1,3})?)?(?:-(\d+)(\w{1,3})?)?$/,
      ([, style, v1, u1, v2, u2, v3, u3, v4, u4]) => {
        const property = mapStyle(style);
        return {
          [property]: [
            `${v1}${mapUnit(u1)}`,
            v2 ? `${v2}${mapUnit(u2)}` : '',
            v3 ? `${v3}${mapUnit(u3)}` : '',
            v4 ? `${v4}${mapUnit(u4)}` : '',
          ].filter(Boolean).join(' '),
        };
      }],

    // height and weight shorthand rule
    [/^(h|w)-(\d+)(\w{1,3})?/, ([, style, i, unit]) => {
      const property = style === 'h' ? 'height' : 'width';
      return {
        [property]: `${i}${mapUnit(unit)}`,
      };
    }],

    // min max height and weight shorthand rule
    [/^(min|max)-(h|w)-(\d+)(\w{1,3})?/, ([, limit, style, i, unit]) => {
      const property = style === 'h' ? 'height' : 'width';
      return {
        [`${limit}-${property}`]: `${i}${mapUnit(unit)}`,
      };
    }],

    ['max-content', { width: 'max-content' }],

    // Flexbox shorthand rules
    ['flex', { display: 'flex' }],
    [/^align-([a-z-]+)$/, ([, alignment]) => ({ 'align-items': alignment })],
    [/^align--([a-z-]+)$/, ([, alignment]) => ({ 'align-content': alignment })],
    [/^justify-([a-z-]+)$/, ([, alignment]) => ({ 'justify-items': alignment })],
    [/^justify--([a-z-]+)$/, ([, alignment]) => ({ 'justify-content': alignment })],
    [/^(row|column)$/, ([, direction]) => ({ 'flex-direction': direction })],
    [/^(wrap|nowrap)$/, ([, wrap]) => ({ 'flex-wrap': wrap })],

    // display rules
    ['inline-block', { display: 'inline-block' }],
    ['block', { display: 'block' }],
    ['no-display', { display: 'none' }],

    // Center Grid shorthand rule
    [/^centered-grid$/, () => ({
      'display': 'grid',
      'place-items': 'center',
    })],

    // position rules
    [/^(relative|absolute|fixed)$/, ([, i]) => ({ position: i })],
    [/^(-)?(t|r|b|l)-(\d+)(\w{1,3})?$/,
      ([, negative, style, value, unit]) => {
        const fullProperty = mapStyle(style);
        const mappedUnit = mapUnit(unit);
        if (negative) {
          return { [fullProperty]: `-${value}${mappedUnit}` };
        } else {
          return { [fullProperty]: `${value}${mappedUnit}` };
        }
      }],

    // Z index rule
    [/^(-)?z-(\d+)$/, ([, negative, index]) => {
      if (negative) {
        return { 'z-index': `-${index}` };
      } else {
        return { 'z-index': index };
      }
    }],

    // Cursor rules
    ['pointer', { cursor: 'pointer' }],

    // Textarea resize
    ['no-resize', { resize: 'none' }],

    // overflow rules
    [/^(clip|hidden|visible|scroll|auto)-overflow(?:--(x|y))?$/, ([, value, axis]) => {
      if (axis) {
        return { [`overflow-${axis}`]: value };
      } else {
        return { overflow: value };
      }
    }],

    // text ellipsis rule
    ['text-ellipsis', { 'text-overflow': 'ellipsis' }],

    // word break rule
    ['break-all-words', { 'word-break': 'break-all' }],

    // white space rule
    [/^ws-(wrap|nowrap|break-spaces)$/, ([, value]) => ({ 'white-space': value })],

    // no scroll bar rule
    [/^no-scroll-bar$/,
      () => {
        return [
          {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          },
          '.no-scroll-bar::-webkit-scrollbar {display: none;}',
        ];
      },
    ],

    // Border rules
    ['no-border', { border: 'none' }],

    [/^border-(top|bottom|left|right)?-?(\d+)(\w{1,3})?$/, ([, side, value, unit]) => {
      return {
        [`${borderSideMap(side)}width`]: `${value}${mapUnit(unit)}`,
      };
    }],

    [/^border-(top|bottom|left|right)?-?(solid|none)$/, ([, side, style]) => {
      return {
        [`${borderSideMap(side)}style`]: style,
      };
    }],

    [/^border-(top|bottom|left|right)?-?color-([A-Za-z0-9]+)?$/, ([, side, color]) => {
      if (isHexColor(`#${color}`)) {
        return { [`${borderSideMap(side)}color`]: `#${color}` };
      } else {
        return { [`${borderSideMap(side)}color`]: color };
      }
    }],

    [/^border-rad-(\d+)(\w{1,3})?$/, ([, value, unit]) => {
      return {
        'border-radius': `${value}${mapUnit(unit)}`,
      };
    }],

    [/^border-rad-(\d+)(\w{1,3})?-(\d+)(\w{1,3})?-(\d+)(\w{1,3})?-(\d+)(\w{1,3})?$/, ([, v1, u1, v2, u2, v3, u3, v4, u4]) => {
      return {
        'border-top-left-radius': `${v1}${mapUnit(u1)}`,
        'border-top-right-radius': `${v2}${mapUnit(u2)}`,
        'border-bottom-right-radius': `${v3}${mapUnit(u3)}`,
        'border-bottom-left-radius': `${v4}${mapUnit(u4)}`,
      };
    }],

    // Font rules
    [/^font-s-([0-9.]+)(\w{1,3})?$/, ([, value, unit]) => {
      return {
        'font-size': `${value}${mapUnit(unit)}`,
      };
    }],

    [/^font-w-([a-z0-9]+)$/, ([, value]) => {
      return {
        'font-weight': value,
      };
    }],

    [/^font-fam-([a-z-]+)$/, ([, value]) => {
      return {
        'font-family': value.split('--').join(', '),
      };
    }],

    // Color Rules,
    [/^color-([\w-]+)$/, ([_, color]) => {
      return {
        color: `var(--${color})`,
      };
    }],

    [/^bg-color-([\w-]+)$/, ([_, color]) => {
      return {
        'background-color': `var(--${color})`,
      };
    }],

    [/^bg-gradient-(\d+deg-)?([\w-]+)--([\w-]+)$/, ([_, degree = '180deg-', primaryColor, secondaryColor]) => {
      return {
        background: `linear-gradient(${degree.slice(0, -1)}, var(--${primaryColor}), var(--${secondaryColor}))`,
      };
    }],

    // no background rule
    ['no-bg', { background: 'none' }],

    // no outline rule
    ['no-outline', { outline: 'none' }],

    // text align rule
    [/^(\w+)-text$/, ([_, alignment]) => ({ 'text-align': alignment })],

    // line height rule with units
    [/^lh-(\d+)(\w{1,3})?$/, ([_, value, unit]) => {
      return { 'line-height': `${value}${mapUnit(unit)}` };
    }],

    // SVG rule
    [/^fill-([\w-]+)$/, ([_, color]) => {
      return { fill: `var(--${color}) !important` };
    }],

    // Opacity Rule
    [/^opacity-([\d.]+)$/, ([_, value]) => {
      return {
        opacity: value,
      };
    }],
  ],
  variants: [
    (matcher) => {
      if (matcher.startsWith('focus:')) {
        return {
          matcher: matcher.slice(6),
          selector: s => `${s}:focus`, // Target the focus pseudo-class
        };
      }
    },

    (matcher) => {
      if (matcher.startsWith('path:')) {
        return {
          matcher: matcher.slice(5),
          selector: s => `${s} path`,
        };
      }
    },
  ],
});
