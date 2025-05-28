import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
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
import RNPickerSelect from 'react-native-picker-select';

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
  const API_URL = 'http://10.0.2.2/bdinter-cartera/operaciones';

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [data, setData] = useState<Registro[]>([]);
  const [bancos, setBancos] = useState<{ label: string; value: string }[]>([]);
  const [categorias, setCategorias] = useState<{ label: string; value: string }[]>([]);
  const [newItem, setNewItem] = useState<RegistroInput>({
    metodo: '',
    banco: '',
    monto: '',
    fecha: '',
    establecimiento: '',
    categoria: '',
  });

  const campos = [
    { key: 'metodo', label: 'Método de pago' },
    { key: 'banco', label: 'Banco' },
    { key: 'monto', label: 'Monto' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'establecimiento', label: 'Establecimiento' },
    { key: 'categoria', label: 'Categoría' },
  ];

  useEffect(() => {
    // Cargar operaciones
    fetch(`${API_URL}/read.php`)
      .then(res => res.json())
      .then((result) => {
        const datosConvertidos = result.map((item: any) => ({
          id: item.id,
          metodo: item.tipo_pago === 'T' ? 'Tarjeta' : 'Efectivo',
          banco: item.banco,
          monto: item.monto,
          fecha: item.fecha,
          establecimiento: '-', // Placeholder
          categoria: item.categoria,
        }));
        setData(datosConvertidos);
      });

    // Cargar bancos
    fetch('http://10.0.2.2/bdinter-cartera/bancos/read.php')
      .then(res => res.json())
      .then(result => {
        const opciones = result.map((b: any) => ({
          label: b.nombre,
          value: b.id,
        }));
        setBancos(opciones);
      });

    // Cargar categorías
    fetch('http://10.0.2.2/bdinter-cartera/categorias/read.php')
      .then(res => res.json())
      .then(result => {
        const opciones = result.map((c: any) => ({
          label: c.establecimiento,
          value: c.id,
        }));
        setCategorias(opciones);
      });
  }, []);

  const handleGuardar = async () => {
    const todosLlenos = Object.values(newItem).every((val) => val.trim() !== '');
    if (!todosLlenos) return alert('Por favor completa todos los campos.');
    if (isNaN(Number(newItem.monto))) return alert('El monto debe ser numérico.');

    const formData = new FormData();
    formData.append('tipo_operacion', 'Ingreso');
    formData.append('tipo_pago', newItem.metodo === 'Tarjeta' ? 'T' : 'E');
    formData.append('monto', newItem.monto);
    formData.append('fecha', newItem.fecha);
    formData.append('id_categoria', newItem.categoria);
    formData.append('usuario_id', '1');
    formData.append('banco_id', newItem.banco);

    const endpoint = editItemId ? 'update.php' : 'create.php';
    if (editItemId) formData.append('id', editItemId);

    try {
      await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        body: formData,
      });
      const refreshed = await fetch(`${API_URL}/read.php`).then(r => r.json());
      setData(refreshed);
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
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  };

  const total = data.reduce((sum, item) => sum + Number(item.monto || 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MI CARTERA INTELIGENTE</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceText}>Balance Total</Text>
        <Text style={styles.amount}>${total}</Text>
      </View>

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
                onPress={async () => {
                  const formData = new FormData();
                  formData.append('id', item.id);
                  await fetch(`${API_URL}/delete.php`, {
                    method: 'POST',
                    body: formData,
                  });
                  setData(data.filter((d) => d.id !== item.id));
                }}
              >
                <Ionicons name="trash-outline" size={18} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

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
                    <Text>{label}</Text>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      style={styles.input}
                    >
                      <Text>{newItem.fecha ? newItem.fecha : 'Seleccionar fecha'}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={showDatePicker}
                      mode="date"
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

              if (key === 'banco') {
                return (
                  <View key={key} style={{ marginBottom: 10 }}>
                    <Text>{label}</Text>
                    <RNPickerSelect
                      onValueChange={(value) => setNewItem((prev) => ({ ...prev, banco: value }))}
                      items={bancos}
                      value={newItem.banco}
                      placeholder={{ label: 'Selecciona un banco', value: '' }}
                    />
                  </View>
                );
              }

              if (key === 'categoria') {
                return (
                  <View key={key} style={{ marginBottom: 10 }}>
                    <Text>{label}</Text>
                    <RNPickerSelect
                      onValueChange={(value) => setNewItem((prev) => ({ ...prev, categoria: value }))}
                      items={categorias}
                      value={newItem.categoria}
                      placeholder={{ label: 'Selecciona una categoría', value: '' }}
                    />
                  </View>
                );
              }

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
  container: { flex: 1, backgroundColor: Colors.light.colorA, paddingHorizontal: 8, paddingTop: 40 },
  header: { backgroundColor: Colors.light.colorD, padding: 10, alignItems: 'center', borderRadius: 10, marginBottom: 10 },
  headerText: { color: Colors.light.text, fontSize: 20, fontWeight: 'bold' },
  balanceCard: { backgroundColor: Colors.light.colorF, padding: 20, borderRadius: 10, marginBottom: 20 },
  balanceText: { color: Colors.light.card, fontSize: 16 },
  amount: { color: Colors.light.card, fontSize: 24, fontWeight: 'bold' },
  addButton: { backgroundColor: Colors.light.colorE, padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.light.colorC, padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  headerCell: { flex: 1, fontWeight: 'bold', fontSize: 12, color: Colors.light.text },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.light.card, padding: 10, marginBottom: 2, borderRadius: 6 },
  cell: { flex: 1, fontSize: 12, color: Colors.light.text },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%' },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  modalButton: { backgroundColor: Colors.light.colorE, padding: 10, borderRadius: 6 },
});
