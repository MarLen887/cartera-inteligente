// app/(auth)/login.tsx o donde esté tu pantalla de login
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform, // Asegúrate de que Image está importado de react-native
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AppColors = {
  primary: '#007AFF',
  lightGray: '#F0F0F0',
  darkGray: '#A0A0A0',
  white: '#FFFFFF',
  black: '#000000',
  danger: '#FF3B30',
  background: '#F8F9FA'
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cartera Inteligente',
    });
  }, [navigation]);

  const handleLogin = async () => {
    // ... (tu lógica de login)
    if (!email || !password) {
      Alert.alert('Campos incompletos', 'Por favor, ingresa tu correo y contraseña.');
      return;
    }
    setIsLoading(true);
    console.log('Intentando iniciar sesión con:', { email, password });
    await new Promise(resolve => setTimeout(resolve, 2000));
    const loginExitoso = email.includes('@') && password.length > 5;
    setIsLoading(false);
    if (loginExitoso) {
      Alert.alert('Inicio de Sesión Exitoso', '¡Bienvenido de nuevo!');
      router.replace('/(tabs)/index');
    } else {
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
          {/* Aquí usamos la imagen local */}
          <Image
            // La ruta es relativa DESDE ESTE ARCHIVO (login.tsx) hasta la imagen.
            // Si login.tsx está en app/(auth)/login.tsx
            // y la imagen en assets/images/ahorrin.png
            // la ruta sería '../../assets/images/ahorrin.png'
            source={require('../../assets/images/ahorrin.png')} // ¡Ajusta esta ruta!
            style={styles.logo}
            // onError es menos común para imágenes locales, pero puedes mantenerlo si quieres
            onError={(e) => console.log('Error al cargar imagen local:', e.nativeEvent.error)}
            accessibilityLabel="Logo de Ahorrín" // MEJORA: Etiqueta de accesibilidad descriptiva
          />
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Accede a tu Cartera Inteligente</Text>
        </View>

        {/* ... resto de tu JSX ... */}
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
              textContentType="emailAddress"
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
              textContentType="password"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linksContainer}>
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
    width: 120, // Ajusta el tamaño según tu imagen
    height: 120, // Ajusta el tamaño según tu imagen
    borderRadius: 60, // Puedes quitarlo o ajustarlo si tu logo no es circular
    marginBottom: 20,
    // backgroundColor: AppColors.lightGray, // Puedes quitar el color de fondo si la imagen tiene transparencia
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
    maxWidth: 400,
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
    elevation: 2,
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
    marginTop: 10,
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
    marginVertical: 8,
  },
});
