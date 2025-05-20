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

    // Otros colores (LOS PUEDEN CAMBIAR)
    success: '#4CAF50',     // Verde para mensajes de éxito
    error: '#F44336',       // Rojo para mensajes de error
    warning: '#FFC107',     // Naranja para advertencias
    border: '#E0E0E0',      // Un gris claro para bordes
    card: '#FFFFFF',        // Fondo de tarjeta
    placeholder: '#A9A9A9', // Color para texto de placeholder en inputs
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

    // Otros colores (LOS PUEDEN CAMBIAR)
    success: '#81C784',     // Verde más suave para éxito
    error: '#EF9A9A',       // Rojo más suave para error
    warning: '#FFEB3B',     // Amarillo más suave para advertencias
    border: '#333333',      // Un gris oscuro para bordes
    card: '#1C1C1E',        // Fondo de tarjeta más oscuro
    placeholder: '#707070', // Color para texto de placeholder en inputs oscuros
  },
};
