import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseWidth = 375;

// 🧠 Escalado con control para web
const scale = (size: number) => {
  const newSize = (width / baseWidth) * size;
  if (Platform.OS === 'web') {
    return Math.min(newSize, size * 1.15);
  }
  return Math.max(Math.min(newSize, size + 6), size - 2);
};

export default function Welcome() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('../'); // ✅ Ir hacia index.tsx
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ahorrín no duerme,{"\n"}para que tú descanses.
      </Text>

      <Image
        source={require('@/assets/images/ahorrin.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Porque donde está Ahorrín, hay tranquilidad.
      </Text>

      <TouchableOpacity onPress={handleNavigate} style={styles.iconContainer}>
        <Ionicons name="arrow-forward-circle" size={scale(50)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B2C79',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(24),
    paddingVertical: scale(40),
  },
  title: {
    fontSize: scale(22),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: scale(24),
    lineHeight: scale(28),
  },
  image: {
    width: width < 500 ? width * 0.5 : 240, // 📐 imagen adaptada a pantallas grandes
    height: width < 500 ? width * 0.5 : 240,
    marginBottom: scale(24),
  },
  subtitle: {
    fontSize: scale(16),
    color: '#fff',
    textAlign: 'center',
    marginBottom: scale(40),
    lineHeight: scale(22),
  },
  iconContainer: {
    backgroundColor: '#F9A826',
    padding: scale(12),
    borderRadius: scale(50),
  },
});
