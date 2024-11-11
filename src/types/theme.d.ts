// src/types/theme.d.ts

import { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
    text: Palette['text'] & {
      tertiary: string;
    };
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    text?: PaletteOptions['text'] & {
      tertiary?: string;
    };
  }
}
