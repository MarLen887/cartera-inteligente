// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
// Importa otros hooks o componentes que puedas necesitar, como un contexto de autenticación

export default function RootLayout() {
  // Aquí podrías tener lógica para determinar si el usuario está autenticado
  // y mostrar condicionalmente el stack de (auth) o el stack principal de la app.
  // Por ahora, nos enfocaremos en cómo se presenta el stack (auth).

  return (
    <Stack>
      {/* Esta es la pantalla que representa a todo tu grupo (auth) */}
      <Stack.Screen
        name="(auth)" // Se refiere al directorio app/(auth)
        options={{
          headerShown: false, // ¡Esto ocultará el encabezado que muestra "(auth)"!
        }}
      />

      {/* Aquí irían otras pantallas o grupos de tu aplicación principal */}
      {/* Por ejemplo, si tienes un grupo de pestañas para la app principal: */}
      <Stack.Screen
        name="(tabs)" // Suponiendo que tienes app/(tabs) para tu contenido principal
        options={{
          headerShown: false, // Usualmente también se oculta si (tabs) tiene su propio header
        }}
      />

      {/* Otras pantallas a nivel raíz si las tienes */}
      {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
    </Stack>
  );
}
