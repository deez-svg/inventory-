import { defineConfig, presetAttributify, presetMini } from 'unocss';
import boxRules from './unocss/box.rules';
import displayRules from './unocss/display.rules';
import positionRules from './unocss/position.rules';
import colorRules from './unocss/color.rules';
import typographyRules from './unocss/typography.rules';
import animationRules from './unocss/animation.rules';
import staticRules from './unocss/static.rules';
import listRules from './unocss/list.rules';

export default defineConfig({
  rules: [
    ...boxRules,
    ...displayRules,
    ...positionRules,
    ...colorRules,
    ...typographyRules,
    ...animationRules,
    ...staticRules,
    ...listRules
  ],
  presets: [presetMini(), presetAttributify()],
  shortcuts: [
    { "nav-item": "p-16 hover:bg-color-nav-item-hover pointer bd-rad-10 block color-black font-w-500" },
    { "current-nav-item": "p-16 bg-color-active-nav-item-bg pointer bd-rad-10 block font-w-500 strict:color-active-nav-item-fg bd-r-3 bd-r-solid bd-r-color-active-nav-item-fg" },
    { "black-button": "bg-color-foreground color-white bd-1px bd-solid bd-color-foreground bd-rad-5 pointer flex align-i-center hover:bg-color-black-button-hover-bg" },
    { "white-button": "bg-color-white bd-1px bd-solid bd-color-foreground bd-rad-5 pointer flex align-i-center hover:bg-color-white-button-hover-bg" }
  ],
  variants: [
    (matcher) => {
      if (matcher.startsWith('strict:')) {
        return { matcher: matcher.slice(7) }
      }
    },
  ],

  postprocess: [
    (util) => {
      if (!util.selector.includes('.strict\\:'))
        return

      util.entries.forEach(([, val], i) => {
        util.entries[i][1] = `${val} !important`
      })
    },
  ],
});
