type Direction = 't' | 'r' | 'b' | 'l';

const sides: Record<Direction, string> = { t: 'top', l: 'left', b: 'bottom', r: 'right' };

const validUnits = ['px', 'p', 'vh', 'vw', 'rem', 'em'];

const propertyMappings: Record<string, string> = {
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
const mapProperty = (style: string): string => {
  const fullProperty = propertyMappings[style];
  if (!fullProperty) {
    throw new Error(`Unsupported style shorthand: ${style}`);
  }
  return fullProperty;
};

export { sides, validUnits, mapUnit, mapProperty };
export type { Direction };
