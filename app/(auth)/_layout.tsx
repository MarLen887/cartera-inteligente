// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack
      // Si tienes screenOptions globales para este Stack, irían aquí.
      // Por ejemplo, para un color de fondo de encabezado global:
      // screenOptions={{
      //   headerStyle: { backgroundColor: 'black' }, // Ejemplo de color de fondo de encabezado
      //   headerTintColor: 'white', // Color de texto global para el encabezado
      // }}
    >
      {/* Configuración para el grupo de autenticación (auth) */}
      <Stack.Screen
        name="(auth)" // Se refiere al directorio app/(auth)
        options={{
          // Idealmente, headerShown: false; debería ocultar este encabezado por completo.
          // Si eso no funciona y quieres que el texto "(auth)" se mimetice con el fondo:
          title: '(auth)', // Asegurarnos de que este es el texto que se muestra
          headerStyle: {
            backgroundColor: 'black', // Define el color de fondo del encabezado. Ajusta si es diferente.
          },
          headerTintColor: 'black', // Hace que el color del texto del título sea igual al fondo.
          // Si headerShown: false no funciona, asegúrate de que no esté explícitamente en true aquí.
          // headerShown: true, // O simplemente omite headerShown si quieres mostrarlo pero con texto invisible.
        }}
      />

      {/* Configuración para el grupo principal de pestañas (tabs) */}
      <Stack.Screen
        name="(tabs)" // Se refiere al directorio app/(tabs)
        options={{
          // Si (tabs) tiene su propio header, usualmente querrías ocultar este
          headerShown: false,
        }}
      />

      {/* Otras pantallas a nivel raíz si las tienes */}
    </Stack>
  );
}
