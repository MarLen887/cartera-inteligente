// app/(auth)/register.tsx
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
    Alert,
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

const AppColors = {
  primary: '#007AFF', // Un azul vibrante
  lightGray: '#F0F0F0',
  darkGray: '#A0A0A0',
  white: '#FFFFFF',
  black: '#000000',
  danger: '#FF3B30',
  background: '#F8F9FA', // Un fondo claro y limpio
  success: '#34C759', // Verde para éxito
};

// IMPORTANTE: Reemplaza esta URL con la dirección correcta de tu API
// Si usas un emulador Android, localhost podría ser 10.0.2.2 para referirse a tu PC.
// Si usas un dispositivo físico, usa la IP de tu PC en la red local.
const API_URL = 'http://TU_IP_O_DOMINIO/BDINTER-CARTERA'; // Ajusta esta URL

export default function RegisterScreen() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Crear Cuenta', // Título para la pantalla de registro
      // headerBackTitleVisible: false, // Opcional: para ocultar el texto "Atrás" en iOS
    });
  }, [navigation]);

  const handleRegister = async () => {
    if (!nombre || !email || !password || !confirmPassword) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
      return;
    }

    // Validación de correo electrónico: debe contener "@" y seguir un formato básico.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Alert.alert('Correo Inválido', 'Por favor, ingresa un correo electrónico válido (ej. usuario@dominio.com).');
        return;
    }

    // Validación de contraseña: mínimo 8 caracteres.
    if (password.length < 8) {
        Alert.alert('Contraseña Débil', 'La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error de Contraseña', 'Las contraseñas no coinciden.');
      return;
    }


    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('correo', email);
      formData.append('password', password); // Tu PHP debería hashear esta contraseña

      // Hacemos la solicitud a tu script register.php
      const response = await fetch(`${API_URL}/register.php`, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      console.log('Respuesta del servidor (register - texto):', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Error al parsear JSON (register):", jsonError);
        console.error("Respuesta recibida que no es JSON válido (register):", responseText);
        Alert.alert('Error de comunicación', 'La respuesta del servidor no es válida. Revisa la consola.');
        setIsLoading(false);
        return;
      }

      if (response.ok && data.success) {
        Alert.alert('Registro Exitoso', data.message || '¡Tu cuenta ha sido creada! Ahora puedes iniciar sesión.');
        router.push('/(auth)/login'); // Redirigir al login después del registro exitoso
      } else {
        Alert.alert('Error de Registro', data.message || 'No se pudo crear la cuenta. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
      Alert.alert('Error de Red', 'No se pudo conectar al servidor. Verifica tu conexión y la URL de la API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          {/* Puedes usar el mismo logo o uno diferente */}
          <Image
            source={require('../../assets/images/ahorrin.png')} // Ajusta si es necesario
            style={styles.logo}
            accessibilityLabel="Logo de Ahorrín"
          />
          <Text style={styles.title}>Crear Nueva Cuenta</Text>
          <Text style={styles.subtitle}>Únete a Cartera Inteligente</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Ionicons name="person-outline" size={20} color={AppColors.darkGray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre Completo"
              placeholderTextColor={AppColors.darkGray}
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
              textContentType="name"
            />
          </View>

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
              placeholder="Contraseña (mín. 8 caracteres)" // Placeholder actualizado
              placeholderTextColor={AppColors.darkGray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="newPassword" // Ayuda a sugerir contraseñas seguras
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" size={20} color={AppColors.darkGray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              placeholderTextColor={AppColors.darkGray}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              textContentType="newPassword"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Registrando...' : 'Crear Cuenta'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linksContainer}>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia Sesión</Text>
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
    marginBottom: 20, // Un poco menos de margen para más campos
  },
  logo: {
    width: 100, // Ligeramente más pequeño si se prefiere
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 26, // Ligeramente más pequeño
    fontWeight: 'bold',
    color: AppColors.black,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: AppColors.darkGray,
    textAlign: 'center',
    marginBottom: 25,
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
    marginBottom: 12, // Un poco menos de margen entre inputs
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
    height: 48, // Ligeramente más pequeño
    fontSize: 15,
    color: AppColors.black,
  },
  button: {
    backgroundColor: AppColors.success, // Botón verde para registro
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: AppColors.success,
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
    fontSize: 17,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 25,
    alignItems: 'center',
    width: '100%',
  },
  linkText: {
    color: AppColors.primary,
    fontSize: 14,
    marginVertical: 8,
  },
});
