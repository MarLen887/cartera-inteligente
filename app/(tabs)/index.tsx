import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const scaleFont = (size: number) => {
  const newSize = (size * width) / 375;
  return Math.max(Math.min(newSize, size + 6), size - 4); // mínimo y máximo
};

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
      setCurrentWidth(Dimensions.get('window').width);
    };
    const subscription = Dimensions.addEventListener('change', updateDimensions);
    return () => {
      subscription.remove();
    };
  }, []);

  const handleFooterAction = (action: string) => {
    switch (action) {
      case 'wallet':
        Alert.alert('Cartera', 'Aquí podrías mostrar tus activos o agregar uno nuevo.');
        break;
      case 'stats':
        Alert.alert('Estadísticas', 'Aquí podrías mostrar gráficas de tu balance.');
        break;
      case 'settings':
        Alert.alert('Ajustes', 'Aquí podrías configurar tu cuenta o preferencias.');
        break;
    }
  };

  const isLargeScreen = currentWidth > 768;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CARTERA INTELIGENTE</Text>

      <ScrollView contentContainerStyle={[
        styles.mainContent,
        isLargeScreen ? styles.mainContentLargeScreen : styles.mainContentSmallScreen
      ]}>
        <View style={[
          styles.balanceCard,
          isLargeScreen ? styles.balanceCardLargeScreen : styles.balanceCardSmallScreen
        ]}>
          <View style={styles.balanceContent}>
            <View style={styles.balanceLeft}>
              <Text style={styles.label}>Balance Total</Text>
              <Text style={styles.balance}>${balance.toFixed(2)}</Text>
              <Text style={styles.changePositive}>+49.89%</Text>
            </View>

            <View style={styles.balanceRight}>
              <Ionicons name="wallet" size={scaleFont(32)} color="#fff" style={styles.walletIcon} />
              <TouchableOpacity>
                <Text style={styles.link}>Mostrar menos</Text>
              </TouchableOpacity>
              <Text style={styles.timestamp}>Hace 24h ⌄</Text>
            </View>
          </View>
        </View>

        <View style={[
          styles.rightSectionContainer,
          isLargeScreen ? styles.rightSectionContainerLargeScreen : styles.rightSectionContainerSmallScreen
        ]}>
          <FlatList
            data={movimientos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: height * 0.02 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icono} size={scaleFont(22)} color="#fff" />
                </View>
                <View style={styles.middleBox}>
                  <Text style={styles.amount}>{item.cantidad.toFixed(6)}</Text>
                  <Text style={styles.converted}>${(item.cantidad * 0.34).toFixed(2)}</Text>
                </View>
                <View style={styles.rightBox}>
                  <Text style={styles.valor}>${item.valor.toFixed(3)}</Text>
                  <Text style={{ color: item.variacion >= 0 ? 'green' : 'red', fontSize: scaleFont(13) }}>
                    {item.variacion >= 0 ? '+' : ''}
                    {item.variacion.toFixed(2)}%
                  </Text>
                </View>
              </View>
            )}
          />

          <View style={styles.extraCard}>
            <Text style={styles.extraText}>📌 Aquí podrías agregar estadísticas, historial u otra sección importante.</Text>
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
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.03,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scaleFont(26),
    color: '#1A1A1A',
    marginBottom: height * 0.03,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  mainContent: {
    paddingBottom: height * 0.1,
  },
  mainContentSmallScreen: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: height * 0.02,
  },
  mainContentLargeScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: width * 0.04,
  },

  balanceCard: {
    backgroundColor: '#2B3D6D',
    borderRadius: 20,
    padding: width * 0.04,
  },
  balanceCardSmallScreen: {
    marginBottom: height * 0.02,
    width: '100%',
  },
  balanceCardLargeScreen: {
    width: '48%',
    marginBottom: 0,
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

  balanceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLeft: {
    flex: 1,
  },
  balanceRight: {
    alignItems: 'flex-end',
    gap: height * 0.005,
  },
  label: {
    color: '#fff',
    fontSize: scaleFont(14),
    marginBottom: height * 0.005,
  },
  balance: {
    color: '#fff',
    fontSize: scaleFont(28),
    fontWeight: 'bold',
  },
  changePositive: {
    color: 'limegreen',
    fontWeight: '600',
    fontSize: scaleFont(14),
    marginTop: height * 0.005,
  },
  walletIcon: {
    marginBottom: height * 0.005,
  },
  link: {
    color: '#fff',
    fontSize: scaleFont(12),
    textDecorationLine: 'underline',
  },
  timestamp: {
    color: '#ccc',
    fontSize: scaleFont(12),
  },

  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#DDEBFB',
    borderRadius: 10,
    padding: width * 0.03,
    marginBottom: height * 0.012,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBox: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  middleBox: {
  },
  rightBox: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: scaleFont(14),
    textAlign: 'right',
  },
  converted: {
    color: '#555',
    fontSize: scaleFont(13),
    textAlign: 'right',
  },
  valor: {
    fontWeight: 'bold',
    fontSize: scaleFont(14),
    textAlign: 'right',
  },

  extraCard: {
    backgroundColor: '#E6F0FF',
    borderRadius: 10,
    padding: width * 0.04,
    marginTop: height * 0.02,
  },
  extraText: {
    fontSize: scaleFont(14),
    color: '#333',
  },
});
