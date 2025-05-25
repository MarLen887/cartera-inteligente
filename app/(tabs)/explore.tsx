import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

export default function ExploreScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    metodo: '',
    banco: '',
    monto: '',
    fecha: '',
    establecimiento: '',
    categoria: ''
  });
  const [data, setData] = useState<Registro[]>([]);

  const campos = [
    { key: 'metodo', label: 'Método de pago' },
    { key: 'banco', label: 'Banco' },
    { key: 'monto', label: 'Monto' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'establecimiento', label: 'Establecimiento' },
    { key: 'categoria', label: 'Categoría' }
  ];

  type Registro = {
    id: string;
    metodo: string;
    banco: string;
    monto: string;
    fecha: string;
    establecimiento: string;
    categoria: string;
  };


  const handleGuardar = () => {
    const todosLlenos = Object.values(newItem).every(val => val.trim() !== '');
    if (!todosLlenos) {
      alert('Por favor completa todos los campos.');
      return;
    }

    setData([...data, { id: Date.now().toString(), ...newItem }]);
    setModalVisible(false);
    setNewItem({ metodo: '', banco: '', monto: '', fecha: '', establecimiento: '', categoria: ''
    });
  };

  const total = data.reduce((sum, item) => sum + Number(item.monto || 0), 0);

  return (
    <View style={styles.container}>
      {/* Título fijo */}
      <View style={styles.header}>
        <Text style={styles.headerText}>MI CARTERA INTELIGENTE</Text>
      </View>

      {/* Tarjeta de balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceText}>Balance Total</Text>
        <Text style={styles.amount}>${total}</Text>
      </View>

      {/* Botón Añadir */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Añadir</Text>
      </TouchableOpacity>

      {/* Encabezado de la tabla */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>#</Text>
        <Text style={styles.headerCell}>Método de pago</Text>
        <Text style={styles.headerCell}>Banco</Text>
        <Text style={styles.headerCell}>Monto</Text>
        <Text style={styles.headerCell}>Fecha</Text>
        <Text style={styles.headerCell}>Establecimiento</Text>
        <Text style={styles.headerCell}>Categoría</Text>
        <Text style={styles.headerCell}></Text>
      </View>

      {/* Tabla de registros */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }: { item: Registro; index: number }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.metodo}</Text>
            <Text style={styles.cell}>{item.banco}</Text>
            <Text style={styles.cell}>${item.monto}</Text>
            <Text style={styles.cell}>{item.fecha}</Text>
            <Text style={styles.cell}>{item.establecimiento}</Text>
            <Text style={styles.cell}>{item.categoria}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity onPress={() => {/* lógica para el botón editar */ }}>
                <Ionicons name="create-outline" size={18} color={Colors.light.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setData(data.filter(d => d.id !== item.id));
              }}>
                <Ionicons name="trash-outline" size={18} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal para añadir */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {campos.map(({ key, label }) => (
              <TextInput
                key={key}
                placeholder={label}
                style={styles.input}
                onChangeText={text => setNewItem({ ...newItem, [key]: text })}
              />
            ))}
            <TouchableOpacity style={styles.modalButton} onPress={handleGuardar}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.colorA,
    paddingHorizontal: 8,
    paddingTop: 40,
  },
  header: {
    backgroundColor: Colors.light.colorD,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: Colors.light.colorF,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  balanceText: {
    color: Colors.light.card,
    fontSize: 16,
  },
  amount: {
    color: Colors.light.card,
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: Colors.light.colorE,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.colorC,
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.light.text,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.card,
    padding: 10,
    marginBottom: 2,
    borderRadius: 6,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: Colors.light.text,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: Colors.light.colorE,
    padding: 10,
    borderRadius: 6,
  },
});
