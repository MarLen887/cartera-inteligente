import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CARTERA INTELIGENTE</Text>

      <ScrollView contentContainerStyle={styles.mainContent}>
        {/* Tarjeta izquierda: Balance Total */}
        <View style={styles.balanceCard}>
  <View style={styles.balanceContent}>
    <View style={styles.balanceLeft}>
      <Text style={styles.label}>Balance Total</Text>
      <Text style={styles.balance}>${balance.toFixed(2)}</Text>
      <Text style={styles.changePositive}>+49.89%</Text>
    </View>

    <View style={styles.balanceRight}>
      <Ionicons name="wallet" size={32} color="#fff" style={styles.walletIcon} />
      <TouchableOpacity>
        <Text style={styles.link}>Mostrar menos</Text>
      </TouchableOpacity>
      <Text style={styles.timestamp}>Hace 24h ⌄</Text>
    </View>
  </View>
</View>


        {/* Panel derecho: movimientos y más */}
        <View style={styles.rightPanel}>
          <FlatList
            data={movimientos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 16 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icono} size={22} color="#fff" />
                </View>
                <View style={styles.middleBox}>
                  <Text style={styles.amount}>{item.cantidad.toFixed(6)}</Text>
                  <Text style={styles.converted}>${(item.cantidad * 0.34).toFixed(2)}</Text>
                </View>
                <View style={styles.rightBox}>
                  <Text style={styles.valor}>${item.valor.toFixed(3)}</Text>
                  <Text style={{ color: item.variacion >= 0 ? 'green' : 'red' }}>
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
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    color: '#1A1A1A',
    marginBottom: 24,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    paddingBottom: 80,
  },
  leftPanel: {
    flex: 1,
  },
  rightPanel: {
    flex: 2,
  },

  // 💳 Tarjeta tipo bancaria con distribución solicitada
  balanceCard: {
    backgroundColor: '#2B3D6D',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
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
    gap: 4,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  balance: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  changePositive: {
    color: 'limegreen',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 4,
  },
  walletIcon: {
    marginBottom: 4,
  },
  link: {
    color: '#fff',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  timestamp: {
    color: '#ccc',
    fontSize: 12,
  },

  // 🎯 Movimientos
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#DDEBFB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  middleBox: {
    flex: 1,
  },
  rightBox: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  converted: {
    color: '#555',
    fontSize: 13,
  },
  valor: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  // ➕ Extra sección
  extraCard: {
    backgroundColor: '#E6F0FF',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },
  extraText: {
    fontSize: 14,
    color: '#333',
  },

  
});

