import type { Rule } from 'unocss';

export default [
  [/^color-([\w-]+)$/, ([, color]: string[]) => {
    return {
      color: `var(--${color})`,
    };
  }],

  [/^bg-color-([\w-]+)$/, ([, color]: string[]) => {
    return {
      'background-color': `var(--${color})`,
    };
  }],

  ["no-bg", { background: 'none' }],
] as Rule[];
