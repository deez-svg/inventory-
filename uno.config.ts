import { defineConfig } from 'unocss';
import presetMini from '@unocss/preset-mini'
import boxRules from './unocss/box.rules';
import displayRules from './unocss/display.rules';
import positionRules from './unocss/position.rules';
import colorRules from './unocss/color.rules';
import typographyRules from './unocss/typography.rules';
import animationRules from './unocss/animation.rules';
import staticRules from './unocss/static.rules';

export default defineConfig({
  rules: [
    ...boxRules,
    ...displayRules,
    ...positionRules,
    ...colorRules,
    ...typographyRules,
    ...animationRules,
    ...staticRules
  ],
  presets: [presetMini()],
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
