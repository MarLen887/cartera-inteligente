import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width, height } = Dimensions.get('window');

const scaleFont = (size: number) => {
  const newSize = (size * width) / 375;
  return Math.max(Math.min(newSize, size + 6), size - 4);
};

export default function Welcome() {
  const router = useRouter(); // ✅ Usa useRouter en vez de navigation

  const handleNavigate = () => {
   router.push('../');// ✅ Ruta exacta hacia el archivo index.tsx
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ahorrín no duerme,{"\n"}para que tú descanses.
      </Text>

      {/* Imagen del puerquito, cambia la ruta si la tienes en otra carpeta */}
      <Image
      source={require('@/assets/images/ahorrin.png')}// Coloca tu imagen aquí o cambia por uri si es en línea
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Porque donde está Ahorrín, hay tranquilidad.
      </Text>

      <TouchableOpacity onPress={handleNavigate} style={styles.iconContainer}>
        <Ionicons name="arrow-forward-circle" size={50} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B2C79', // Azul profundo
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
 title: {
  fontSize: scaleFont(22),
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
  marginBottom: 24,
  lineHeight: scaleFont(26),
},
subtitle: {
  fontSize: scaleFont(16),
  color: '#fff',
  textAlign: 'center',
  marginBottom: 40,
  lineHeight: scaleFont(20),
},

  image: {
    width: width * 0.55,
    height: width * 0.55,
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: '#F9A826',
    padding: 10,
    borderRadius: 50,
  },
});
