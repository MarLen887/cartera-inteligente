import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Registro = {
  id: string;
  metodo: string;
  banco: string;
  monto: string;
  fecha: string;
  establecimiento: string;
  categoria: string;
};
type RegistroInput = Omit<Registro, 'id'>;

export default function ExploreScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fechaTemporal, setFechaTemporal] = useState<Date | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<RegistroInput>({
    metodo: '',
    banco: '',
    monto: '',
    fecha: '',
    establecimiento: '',
    categoria: '',
  });
  const [data, setData] = useState<Registro[]>([]);

  const campos = [
    { key: 'metodo', label: 'Método de pago' },
    { key: 'banco', label: 'Banco' },
    { key: 'monto', label: 'Monto' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'establecimiento', label: 'Establecimiento' },
    { key: 'categoria', label: 'Categoría' },
  ];

  const handleGuardar = () => {
    const todosLlenos = Object.values(newItem).every((val) => val.trim() !== '');
    if (!todosLlenos) {
      alert('Por favor completa todos los campos.');
      return;
    }
    if (isNaN(Number(newItem.monto))) {
      alert('El monto debe ser un número válido.');
      return;
    }

    if (editItemId) {
      const actualizados = data.map((item) =>
        item.id === editItemId ? { ...item, ...newItem } : item
      );
      setData(actualizados);
      setEditItemId(null);
    } else {
      setData([...data, { ...newItem, id: Date.now().toString() }]);
    }

    setModalVisible(false);
    setNewItem({
      metodo: '',
      banco: '',
      monto: '',
      fecha: '',
      establecimiento: '',
      categoria: '',
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setNewItem({
            metodo: '',
            banco: '',
            monto: '',
            fecha: '',
            establecimiento: '',
            categoria: '',
          });
          setEditItemId(null);
          setModalVisible(true);
        }}
      >
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
        renderItem={({ item, index }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.metodo}</Text>
            <Text style={styles.cell}>{item.banco}</Text>
            <Text style={styles.cell}>${item.monto}</Text>
            <Text style={styles.cell}>{item.fecha}</Text>
            <Text style={styles.cell}>{item.establecimiento}</Text>
            <Text style={styles.cell}>{item.categoria}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                onPress={() => {
                  setNewItem({
                    metodo: item.metodo,
                    banco: item.banco,
                    monto: item.monto,
                    fecha: item.fecha,
                    establecimiento: item.establecimiento,
                    categoria: item.categoria,
                  });

                  setEditItemId(item.id);
                  setModalVisible(true);
                }}
              >
                <Ionicons name="create-outline" size={18} color={Colors.light.text} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setData(data.filter((d) => d.id !== item.id));
                }}
              >
                <Ionicons name="trash-outline" size={18} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal para añadir/editar */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {campos.map(({ key, label }) => {
              if (key === 'fecha') {
                return (
                  <View key={key} style={{ marginBottom: 10 }}>
                    <Text style={{ marginBottom: 4 }}>{label}</Text>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      style={styles.input}
                    >
                      <Text>{newItem.fecha ? newItem.fecha : 'Seleccionar fecha'}</Text>
                    </TouchableOpacity>

                    {/* Picker se muestra aquí fuera del Touchable */}
                    <DateTimePickerModal
                      isVisible={showDatePicker}
                      mode="date"
                      locale="es" // Opcional: para que muestre en español
                      onConfirm={(date) => {
                        const fechaFormateada = date.toISOString().split('T')[0];
                        setNewItem((prev) => ({ ...prev, fecha: fechaFormateada }));
                        setShowDatePicker(false);
                      }}
                      onCancel={() => setShowDatePicker(false)}
                    />
                  </View>
                );
              }


              if (key === 'monto') {
                return (
                  <TextInput
                    key={key}
                    placeholder={label}
                    style={styles.input}
                    keyboardType="numeric"
                    value={newItem.monto}
                    onChangeText={(text) => {
                      const soloNumeros = text.replace(/[^0-9.]/g, '');
                      setNewItem((prev) => ({ ...prev, monto: soloNumeros }));
                    }}
                  />
                );
              }

              // Todos los demás campos
              return (
                <TextInput
                  key={key}
                  placeholder={label}
                  style={styles.input}
                  value={newItem[key as keyof RegistroInput] ?? ''}
                  onChangeText={(text) => {
                    setNewItem((prev) => ({ ...prev, [key]: text }));
                  }}
                />
              );
            })}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: Colors.light.colorF }]}
                onPress={() => {
                  setModalVisible(false);
                  setEditItemId(null);
                  setNewItem({
                    metodo: '',
                    banco: '',
                    monto: '',
                    fecha: '',
                    establecimiento: '',
                    categoria: '',
                  });
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={handleGuardar}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  {editItemId ? 'Actualizar' : 'Guardar'}
                </Text>
              </TouchableOpacity>
            </View>
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