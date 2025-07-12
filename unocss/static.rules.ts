import type { Rule } from "unocss";

export default [
  ['violent-gradient-border', {
    background: 'linear-gradient(89deg, var(--mic-btn-first-gradient) 0.99%, var(--mic-btn-second-gradient) 99.01%)'
  }],
  ['gradient-border-box', {
    background: 'linear-gradient(white, white) padding-box, linear-gradient(89deg, var(--mic-btn-first-gradient) 0.99%, var(--mic-btn-second-gradient) 99.01%) border-box, var(--chat-background)'
  }],
  ['input-tooltip-transition', { transition: 'opacity 0.3s' }],
  ['input-transition', { transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.2s' }],
  ['salt-font-settings', { 'font-feature-settings': `'salt' on` }],
  ['gradient-border-transform', { transform: 'translate(2px, 2px)' }]
] as Rule[];
