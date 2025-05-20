/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: { // Modo Claro
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    // Colores que se utilizarán en la APP
    colorA: '#F0F3FA',     // Gris-Blanco
    colorB: '#D5DEEF',    // Gris
    colorC: '#B1C9EF',    // Azul pálido
    colorD: '#8AAEE0',    // Azul celeste
    colorE: '#638ECB',    // Azul
    colorF: '#395886',    // Azul marino


  },
  dark: { // Modo Oscuro
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    // Colores que se utilizarán en la APP
    colorA: '#F0F3FA',     // Gris-Blanco
    colorB: '#D5DEEF',    // Gris
    colorC: '#B1C9EF',    // Azul pálido
    colorD: '#8AAEE0',    // Azul celeste
    colorE: '#638ECB',    // Azul
    colorF: '#395886',    // Azul marino
  },
};
