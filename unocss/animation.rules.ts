import type { Rule } from "unocss";

export default [
  // animation-name
  [/^anime-name-(.+)$/, ([, name]) => ({
    'animation-name': name,
  })],

  // animation-duration (in seconds or milliseconds)
  [/^anime-time-(\d+)(s|ms)$/, ([, d, unit]) => ({
    'animation-duration': `${d}${unit}`,
  })],

  // animation-iteration-count
  [/^anime-iter-(.+)$/, ([, count]) => ({
    'animation-iteration-count': count,
  })],

  // animation-timing-function
  [/^anime-ease-(.+)$/, ([, func]) => ({
    'animation-timing-function': func,
  })],

  // opt out animation
  ["no-transform", { transform: 'none' }],
  ["no-transition", { transition: 'none' }]
] as Rule[];
