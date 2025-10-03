// Custom brand colors as hex values
export const BRAND_COLORS = {
  puce: '#c98ca7',
  brightPink: '#e76d83',
  white: '#ffffff',
  electricIndigo: '#6830ff',
  russianViolet: '#392759',
} as const;

// Approach 1: Using arbitrary values with brackets [#hex]
export const CUSTOM_COLOR_CLASSES = {
  // Background colors
  BG: {
    electricIndigo: 'bg-[#6830ff]',
    brightPink: 'bg-[#e76d83]',
    puce: 'bg-[#c98ca7]',
    russianViolet: 'bg-[#392759]',
    white: 'bg-white',
  },
  // Text colors
  TEXT: {
    electricIndigo: 'text-[#6830ff]',
    brightPink: 'text-[#e76d83]',
    puce: 'text-[#c98ca7]',
    russianViolet: 'text-[#392759]',
    white: 'text-white',
  },
  // Border colors
  BORDER: {
    electricIndigo: 'border-[#6830ff]',
    brightPink: 'border-[#e76d83]',
    puce: 'border-[#c98ca7]',
    russianViolet: 'border-[#392759]',
    white: 'border-white',
  },
  // Hover states
  HOVER: {
    electricIndigo: 'hover:bg-[#5a1aff]', // Slightly darker
    brightPink: 'hover:bg-[#d73d64]',
    puce: 'hover:bg-[#b86b92]',
    russianViolet: 'hover:bg-[#2d1f42]',
    white: 'hover:bg-gray-50',
  },
} as const;

// Approach 2: Complete button component classes
export const BUTTON_VARIANTS = {
  ELECTRIC_INDIGO: {
    base: 'bg-[#6830ff] text-white border border-[#6830ff]',
    hover: 'hover:bg-[#5a1aff] hover:border-[#5a1aff]',
    active: 'active:bg-[#4d0fff]',
    focus: 'focus:ring-2 focus:ring-[#6830ff]/30',
    disabled: 'disabled:bg-[#6830ff]/50 disabled:cursor-not-allowed',
  },
  BRIGHT_PINK: {
    base: 'bg-[#e76d83] text-white border border-[#e76d83]',
    hover: 'hover:bg-[#d73d64] hover:border-[#d73d64]',
    active: 'active:bg-[#b82851]',
    focus: 'focus:ring-2 focus:ring-[#e76d83]/30',
    disabled: 'disabled:bg-[#e76d83]/50 disabled:cursor-not-allowed',
  },
  PUCE: {
    base: 'bg-[#c98ca7] text-white border border-[#c98ca7]',
    hover: 'hover:bg-[#b86b92] hover:border-[#b86b92]',
    active: 'active:bg-[#a5507a]',
    focus: 'focus:ring-2 focus:ring-[#c98ca7]/30',
    disabled: 'disabled:bg-[#c98ca7]/50 disabled:cursor-not-allowed',
  },
  RUSSIAN_VIOLET: {
    base: 'bg-[#392759] text-white border border-[#392759]',
    hover: 'hover:bg-[#2d1f42] hover:border-[#2d1f42]',
    active: 'active:bg-[#1f0f5c]',
    focus: 'focus:ring-2 focus:ring-[#392759]/30',
    disabled: 'disabled:bg-[#392759]/50 disabled:cursor-not-allowed',
  },
  WHITE: {
    base: 'bg-white text-[#392759] border border-gray-200',
    hover: 'hover:bg-gray-50 hover:border-gray-300',
    active: 'active:bg-gray-100',
    focus: 'focus:ring-2 focus:ring-[#6830ff]/30',
    disabled: 'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
  },
} as const;

// Approach 3: Function to combine classes
export const createButtonClasses = (variant: keyof typeof BUTTON_VARIANTS, additional?: string) => {
  const variantClasses = BUTTON_VARIANTS[variant];
  const baseClasses = `${variantClasses.base} ${variantClasses.hover} ${variantClasses.active} ${variantClasses.focus} ${variantClasses.disabled}`;
  return additional ? `${baseClasses} ${additional}` : baseClasses;
};

// Approach 4: CSS-in-JS style object (for inline styles)
export const INLINE_STYLES = {
  electricIndigo: { backgroundColor: BRAND_COLORS.electricIndigo, color: BRAND_COLORS.white },
  brightPink: { backgroundColor: BRAND_COLORS.brightPink, color: BRAND_COLORS.white },
  puce: { backgroundColor: BRAND_COLORS.puce, color: BRAND_COLORS.white },
  russianViolet: { backgroundColor: BRAND_COLORS.russianViolet, color: BRAND_COLORS.white },
  white: { backgroundColor: BRAND_COLORS.white, color: BRAND_COLORS.russianViolet },
} as const;
