// app/(tabs)/login.tsx
import { Ionicons } from '@expo/vector-icons'; // Para iconos
import { Link, useRouter } from 'expo-router'; // Para la navegación
import React, { useState } from 'react';
import {
  Alert, // Usaremos Alert para simular acciones por ahora
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Asumiendo que tienes un archivo de constantes para colores
// import Colors from '../../constants/Colors'; // Ajusta la ruta si es necesario

// Definimos unos colores básicos si no tienes Colors.ts configurado o prefieres usarlos directamente
const AppColors = {
  primary: '#007AFF', // Un azul vibrante
  lightGray: '#F0F0F0',
  darkGray: '#A0A0A0',
  white: '#FFFFFF',
  black: '#000000',
  danger: '#FF3B30',
  background: '#F8F9FA' // Un fondo claro y limpio
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      // MEJORA: Considerar validaciones más específicas para email y contraseña.
      Alert.alert('Campos incompletos', 'Por favor, ingresa tu correo y contraseña.');
      return;
    }

    setIsLoading(true);
    // --- INICIO DE LÓGICA DE AUTENTICACIÓN SIMULADA ---
    // ERROR/PENDIENTE: Esta es una simulación. Debes reemplazarla con tu lógica de autenticación real.
    // Por ejemplo, una llamada a tu backend (Firebase, API propia, etc.)
    // Considera usar try/catch para manejar errores de red o del servidor.
    console.log('Intentando iniciar sesión con:', { email, password });

    // Simulación de una llamada a API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulación de respuesta exitosa/fallida
    // ERROR/PENDIENTE: Esta lógica de validación es demasiado simple para producción.
    const loginExitoso = email.includes('@') && password.length > 5;
    // --- FIN DE LÓGICA DE AUTENTICACIÓN SIMULADA ---

    setIsLoading(false);

    if (loginExitoso) {
      // MEJORA: Para una mejor UX, considera usar notificaciones tipo "toast" en lugar de Alerts.
      Alert.alert('Inicio de Sesión Exitoso', '¡Bienvenido de nuevo!');
      // Navegar a la pantalla principal después del login
      // MEJORA/CONSIDERACIÓN: Si 'login.tsx' es una pestaña (como sugiere su ubicación en app/(tabs)/login.tsx),
      // `router.replace('/(tabs)/index')` podría ser correcto si 'index' es otra pestaña a la que quieres ir.
      // Sin embargo, usualmente las pantallas de login están fuera del grupo principal de pestañas (ej. en un grupo '(auth)').
      // ERROR/PENDIENTE: Verifica que '/(tabs)/index' sea la ruta de destino correcta y deseada después de un login exitoso.
      // Si el login NO debería ser una pestaña, considera mover este archivo a app/(auth)/login.tsx y ajustar la ruta de redirección
      // a la pantalla principal de tu aplicación, por ejemplo, router.replace('/') o router.replace('/home').
      router.replace('/(tabs)/index'); // Ejemplo: navegar a la pestaña 'index'
    } else {
      // MEJORA: Para una mejor UX, considera usar notificaciones tipo "toast" en lugar de Alerts.
      // ERROR/PENDIENTE: Proveer mensajes de error más específicos si tu API los devuelve.
      Alert.alert('Error de Inicio de Sesión', 'Correo o contraseña incorrectos. Inténtalo de nuevo.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          {/* PENDIENTE: Reemplaza esto con tu propio logo. */}
          <Image
            source={{ uri: 'https://placehold.co/150x150/007AFF/FFFFFF?text=Logo' }}
            style={styles.logo}
            onError={(e) => console.log('Error al cargar imagen de placeholder:', e.nativeEvent.error)}
            // MEJORA: Añadir `accessibilityLabel` para el logo.
          />
          <Text style={styles.title}>Iniciar Sesión</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Ionicons name="mail-outline" size={20} color={AppColors.darkGray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              placeholderTextColor={AppColors.darkGray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress" // Ayuda a autocompletar en iOS
              // MEJORA: Añadir `accessibilityLabel` y `accessibilityHint`.
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" size={20} color={AppColors.darkGray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={AppColors.darkGray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password" // Ayuda a autocompletar en iOS
              // MEJORA: Añadir `accessibilityLabel` y `accessibilityHint`.
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            // MEJORA: Añadir `accessibilityLabel` y `accessibilityRole="button"`.
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linksContainer}>
          {/* ERROR/PENDIENTE: Las rutas href '/(auth)/register' y '/(auth)/forgot-password' deben existir */}
          {/* y estar correctamente configuradas en tu estructura de Expo Router (por ejemplo, app/(auth)/register.tsx). */}
          {/* Si estas rutas no existen, la navegación fallará o mostrará la pantalla +not-found.tsx. */}
          {/* Asegúrate de que el grupo '(auth)' esté configurado si es tu intención agrupar estas pantallas. */}
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Crear una cuenta</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(auth)/forgot-password" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60, // Para hacerlo circular si es cuadrado
    marginBottom: 20,
    backgroundColor: AppColors.lightGray, // Fondo mientras carga o si falla
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: AppColors.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.darkGray,
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400, // Para mejor apariencia en tablets
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: AppColors.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Para Android
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: AppColors.black,
  },
  button: {
    backgroundColor: AppColors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10, // Espacio antes del botón
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: AppColors.darkGray,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  linkText: {
    color: AppColors.primary,
    fontSize: 14,
    marginVertical: 8, // Espacio entre los enlaces
  },
});
