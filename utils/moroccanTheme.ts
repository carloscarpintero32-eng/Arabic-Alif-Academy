import React from 'react';

export const palette = {
  majorelleBlue: '#1A3C6E',
  zelligeTeal: '#1F6F78',
  saffronGold: '#D89A2B',
  terracotta: '#C65A2E',
  warmSand: '#F4E9DA',
  softClay: '#E8D8C3',
  limewash: '#FBF6EE',
  plaster: '#F7F0E5',
  chalk: '#FFFDF9',
  charcoal: '#2E2A26',
  mutedBrown: '#7A6A58',
  deepTealInk: '#1F4E4E',
  dustyRose: '#C97A6D',
  border: '#D6C2A8',
  borderStrong: '#C9B190',
  shadow: 'rgba(90, 62, 35, 0.10)',
  goldShadow: 'rgba(216, 154, 43, 0.18)',
};

export function plasterTexture(opacity = 0.16): React.CSSProperties {
  return {
    backgroundImage: `
      radial-gradient(circle at 18% 22%, rgba(255,255,255,${opacity}) 0 1px, transparent 1.5px),
      radial-gradient(circle at 78% 34%, rgba(122,106,88,${opacity * 0.38}) 0 1px, transparent 1.8px),
      radial-gradient(circle at 32% 76%, rgba(255,255,255,${opacity * 0.9}) 0 1px, transparent 2px),
      radial-gradient(circle at 64% 68%, rgba(122,106,88,${opacity * 0.34}) 0 1px, transparent 1.6px),
      linear-gradient(115deg, rgba(255,255,255,${opacity * 0.45}) 0%, transparent 32%, rgba(122,106,88,${opacity * 0.18}) 53%, transparent 72%),
      linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))
    `,
    backgroundSize: '120px 120px, 140px 140px, 160px 160px, 180px 180px, 100% 100%, 100% 100%',
    backgroundBlendMode: 'soft-light, multiply, soft-light, multiply, overlay, normal',
  };
}

export function zelligeTexture(opacity = 0.12): React.CSSProperties {
  return {
    backgroundImage: `
      linear-gradient(135deg, rgba(255,255,255,${opacity}) 25%, transparent 25%),
      linear-gradient(225deg, rgba(255,255,255,${opacity * 0.9}) 25%, transparent 25%),
      linear-gradient(315deg, rgba(0,0,0,${opacity * 0.15}) 25%, transparent 25%),
      linear-gradient(45deg, rgba(255,255,255,${opacity * 0.7}) 25%, transparent 25%)
    `,
    backgroundPosition: '12px 0, 12px 0, 0 0, 0 0',
    backgroundSize: '24px 24px',
    backgroundBlendMode: 'soft-light',
  };
}
