import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseWidth = 375;

// 🧠 Escalado universal con control para web
const scale = (size: number) => {
  const newSize = (width / baseWidth) * size;
  if (Platform.OS === 'web') {
    return Math.min(newSize, size * 1.15); // Evita que explote en laptop
  }
  return Math.max(Math.min(newSize, size + 6), size - 2);
};

// Opcional: breakpoints
const isTablet = width >= 768 && width <= 1024;
const isDesktop = width > 1024;

type IconoValido = 'wallet' | 'card' | 'cash-outline';

interface Movimiento {
  id: string;
  icono: IconoValido;
  color: string;
  cantidad: number;
  valor: number;
  variacion: number;
}

export default function HomeScreen() {
  const [balance, setBalance] = useState<number>(8);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([
    {
      id: '1',
      icono: 'cash-outline',
      color: '#5B4FE9',
      cantidad: 25.895325,
      valor: 89.759,
      variacion: 4.89,
    },
    {
      id: '2',
      icono: 'card',
      color: '#F44336',
      cantidad: 15.789325,
      valor: 54.724,
      variacion: 54.23,
    },
    {
      id: '3',
      icono: 'wallet',
      color: '#6E6E6E',
      cantidad: 5.679121,
      valor: 5.385,
      variacion: -5.95,
    },
  ]);

  const [currentWidth, setCurrentWidth] = useState(width);

  useEffect(() => {
    const updateDimensions = () => {
      const { width: newWidth } = Dimensions.get('window');
      setCurrentWidth(newWidth);
    };
    const subscription = Dimensions.addEventListener('change', updateDimensions);
    return () => subscription.remove();
  }, []);

  const isLargeScreen = currentWidth > 768;

  return (
    <View style={styles.container}>
      <Text style={styles.header} numberOfLines={2} adjustsFontSizeToFit>
        Cartera Inteligente
      </Text>

      <ScrollView
        contentContainerStyle={[
          styles.mainContent,
          isLargeScreen ? styles.mainContentLargeScreen : styles.mainContentSmallScreen,
        ]}
      >
        <View
          style={[
            styles.balanceCard,
            isLargeScreen ? styles.balanceCardLargeScreen : styles.balanceCardSmallScreen,
          ]}
        >
          <View style={styles.balanceContent}>
            <View style={styles.balanceLeft}>
              <Text style={styles.label}>Balance Total</Text>
              <Text style={styles.balance}>${balance.toFixed(2)}</Text>
              <Text style={styles.changePositive}>+49.89%</Text>
            </View>

            <View style={styles.balanceRight}>
              <Ionicons name="wallet" size={scale(30)} color="#fff" />
              <TouchableOpacity>
                <Text style={styles.link}>Mostrar menos</Text>
              </TouchableOpacity>
              <Text style={styles.timestamp}>Hace 24h ⌄</Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.rightSectionContainer,
            isLargeScreen ? styles.rightSectionContainerLargeScreen : styles.rightSectionContainerSmallScreen,
          ]}
        >
          <FlatList
            data={movimientos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: scale(20) }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icono} size={scale(20)} color="#fff" />
                </View>
                <View style={styles.middleBox}>
                  <Text style={styles.amount}>{item.cantidad.toFixed(2)}</Text>
                  <Text style={styles.converted}>${(item.cantidad * 0.34).toFixed(2)}</Text>
                </View>
                <View style={styles.rightBox}>
                  <Text style={styles.valor}>${item.valor.toFixed(3)}</Text>
                  <Text style={{ color: item.variacion >= 0 ? 'green' : 'red', fontSize: scale(13) }}>
                    {item.variacion >= 0 ? '+' : ''}
                    {item.variacion.toFixed(2)}%
                  </Text>
                </View>
              </View>
            )}
          />

          <View style={styles.extraCard}>
            <Text style={styles.extraText}>
              📌 Aquí podrías agregar estadísticas, historial u otra sección importante.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7D1F4',
    paddingTop: scale(40),
    paddingHorizontal: scale(16),
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(26),
    color: '#1A1A1A',
    marginBottom: scale(20),
    letterSpacing: 0.5,
  },
  mainContent: {
    paddingBottom: scale(50),
  },
  mainContentSmallScreen: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: scale(12),
  },
  mainContentLargeScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: scale(24),
  },
  balanceCard: {
    backgroundColor: '#2B3D6D',
    borderRadius: scale(20),
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
    width: '100%',
  },
  balanceCardSmallScreen: {
    marginBottom: scale(12),
  },
  balanceCardLargeScreen: {
    width: '48%',
    marginBottom: 0,
  },
  balanceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  balanceLeft: {
    flex: 1,
    paddingRight: 10,
    maxWidth: '100%',
  },
  balanceRight: {
    alignItems: 'flex-end',
    flexShrink: 1,
    maxWidth: '45%',
  },
  label: {
    color: '#fff',
    fontSize: scale(14),
    marginBottom: scale(4),
  },
  balance: {
    color: '#fff',
    fontSize: scale(24),
    fontWeight: 'bold',
  },
  changePositive: {
    color: 'limegreen',
    fontWeight: '600',
    fontSize: scale(14),
    marginTop: scale(4),
  },
  link: {
    color: '#fff',
    fontSize: scale(12),
    textDecorationLine: 'underline',
  },
  timestamp: {
    color: '#ccc',
    fontSize: scale(12),
  },
  rightSectionContainer: {
    flexDirection: 'column',
  },
  rightSectionContainerSmallScreen: {
    width: '100%',
  },
  rightSectionContainerLargeScreen: {
    width: '48%',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#DDEBFB',
    borderRadius: scale(10),
    padding: scale(12),
    marginBottom: scale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBox: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  middleBox: {
    flex: 1,
    flexShrink: 1,
  },
  rightBox: {
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: scale(14),
    textAlign: 'right',
  },
  converted: {
    color: '#555',
    fontSize: scale(13),
    textAlign: 'right',
  },
  valor: {
    fontWeight: 'bold',
    fontSize: scale(14),
    textAlign: 'right',
  },
  extraCard: {
    backgroundColor: '#E6F0FF',
    borderRadius: scale(10),
    padding: scale(16),
    marginTop: scale(20),
  },
  extraText: {
    fontSize: scale(14),
    color: '#333',
  },
});
