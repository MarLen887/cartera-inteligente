import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';

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

const initialStateNewItem: RegistroInput = {
  metodo: '',
  banco: '',
  monto: '',
  fecha: '',
  establecimiento: '',
  categoria: '',
};

export default function ExploreScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<RegistroInput>({ ...initialStateNewItem });
  const [data, setData] = useState<Registro[]>([]);

  const campos = [
    { key: 'metodo', label: 'Método de pago' },
    { key: 'banco', label: 'Banco' },
    { key: 'monto', label: 'Monto' },
    { key: 'fecha', label: 'Fecha (dd-mm-aaaa)' },
    { key: 'establecimiento', label: 'Establecimiento' },
    { key: 'categoria', label: 'Categoría' },
  ];

  const handleGuardar = () => {
    const todosLlenos = Object.values(newItem).every((val) => String(val).trim() !== '');
    if (!todosLlenos) {
      Alert.alert('Campos Incompletos', 'Por favor completa todos los campos.');
      return;
    }
    if (isNaN(Number(newItem.monto))) {
      Alert.alert('Monto Inválido', 'El monto debe ser un número válido.');
      return;
    }

    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (newItem.fecha && !dateRegex.test(newItem.fecha)) {
      Alert.alert('Formato de Fecha Inválido', 'Por favor ingresa la fecha en formato dd-mm-aaaa.');
      return;
    }
    // Validación más robusta para la fecha si lo deseas (ej. que el día esté entre 01-31, mes entre 01-12, etc.)

    if (newItem.fecha) { // Aseguramos que hay una fecha para validar
      const parts = newItem.fecha.split('-'); // [dd, mm, aaaa]
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10); // El mes del usuario es 1-12
      const year = parseInt(parts[2], 10);
      const dateObj = new Date(year, month - 1, day);
      if (
        dateObj.getFullYear() !== year ||
        dateObj.getMonth() !== month - 1 || // Comparamos con el mes 0-indexado
        dateObj.getDate() !== day ||
        year < 2020 || year > 2080 // Puedes ajustar este rango de años según necesites
      ) {
        Alert.alert('Fecha Inválida', 'La fecha ingresada no es válida (día, mes o año incorrecto).');
        console.log('Llamada a Alert.alert realizada.'); // Para ver si se llega hasta aquí
      return;

      }
    }
    if (editItemId) {
      const actualizados = data.map((item) =>
        item.id === editItemId ? { ...item, ...newItem } : item
      );
      setData(actualizados);
    } else {
      setData([...data, { ...newItem, id: Date.now().toString() }]);
    }

    setModalVisible(false);
    setNewItem({ ...initialStateNewItem }); // Asegúrate que initialStateNewItem esté definido globalmente o pásalo
    setEditItemId(null);
  };

  const handleCancelarModal = () => {
    setModalVisible(false);
    setNewItem({ ...initialStateNewItem });
    setEditItemId(null);
  };

  const total = data.reduce((sum, item) => sum + Number(item.monto || 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MI CARTERA INTELIGENTE</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceText}>Balance Total</Text>
        <Text style={styles.amount}>${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setNewItem({ ...initialStateNewItem });
          setEditItemId(null);
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Añadir</Text>
      </TouchableOpacity>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>#</Text>
        <Text style={styles.headerCell}>Método</Text>
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
            <Text style={styles.cell}>${Number(item.monto).toFixed(2)}</Text>
            <Text style={styles.cell}>{item.fecha}</Text>
            <Text style={styles.cell}>{item.establecimiento}</Text>
            <Text style={styles.cell}>{item.categoria}</Text>
            <View style={{ flex: 0.8, flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                onPress={() => {
                  setNewItem({
                    metodo: item.metodo,
                    banco: item.banco,
                    monto: item.monto,
                    fecha: item.fecha, // La fecha ya está en "dd-mm-aaaa"
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
      console.log('Botón de eliminar presionado para ID:', item.id); // Log para depuración
      Alert.alert(
        "Confirmar Eliminación",
        "¿Estás seguro de que quieres eliminar este registro?", // Mensaje del Alert
        [
          {
            text: "Cancelar", 
            onPress: () => console.log("Eliminación cancelada por el usuario."), // Opcional: acción al cancelar
            style: "cancel" 
          },
          {
            text: "Eliminar", 
            onPress: () => {
              console.log("Confirmado eliminar ID:", item.id); // Log para depuración
              // Actualiza el estado 'data' filtrando el elemento a eliminar
              setData(prevData => prevData.filter(d => d.id !== item.id));
            },
            style: "destructive"
          }
        ],
        { cancelable: true } // Permite cerrar el Alert tocando fuera en Android (opcional)
      );
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
        onRequestClose={handleCancelarModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {campos.map(({ key, label }) => {
              if (key === 'fecha') {
                return (
                  <View key={key} style={{ marginBottom: 10 }}>
                    <Text style={styles.labelInput}>{label}</Text>
                    <TextInput
                      placeholder="dd-mm-aaaa"
                      style={styles.input}
                      value={newItem.fecha}
                      onChangeText={(text) => {
                        setNewItem((prev) => ({ ...prev, fecha: text }));
                      }}
                      keyboardType="numbers-and-punctuation" // Ayuda al usuario a ingresar números y guiones
                      maxLength={10} // Longitud de "dd-mm-aaaa"
                    />
                  </View>
                );
              }

              if (key === 'monto') {
                return (
                  <View key={key} style={{ marginBottom: 10 }}>
                    <Text style={styles.labelInput}>{label}</Text>
                    <TextInput
                      placeholder={`Ej: 150.00`}
                      style={styles.input}
                      keyboardType="numeric"
                      value={newItem.monto}
                      onChangeText={(text) => {
                        const soloNumerosPunto = text.replace(/[^0-9.]/g, '');
                        setNewItem((prev) => ({ ...prev, monto: soloNumerosPunto }));
                      }}
                    />
                  </View>
                );
              }

              return (
                <View key={key} style={{ marginBottom: 10 }}>
                  <Text style={styles.labelInput}>{label}</Text>
                  <TextInput
                    placeholder={label}
                    style={styles.input}
                    value={newItem[key as keyof RegistroInput] ?? ''}
                    onChangeText={(text) => {
                      setNewItem((prev) => ({ ...prev, [key]: text }));
                    }}
                  />
                </View>
              );
            })}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: Colors.light.colorF }]}
                onPress={handleCancelarModal}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={handleGuardar}>
                <Text style={styles.modalButtonText}>
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
    paddingHorizontal: 12,
    paddingTop: 40,
  },
  header: {
    backgroundColor: Colors.light.colorD,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerText: {
    color: Colors.light.text,
    fontSize: 22,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: Colors.light.colorF,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  balanceText: {
    color: Colors.light.card,
    fontSize: 18,
    marginBottom: 5,
  },
  amount: {
    color: Colors.light.card,
    fontSize: 30,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: Colors.light.colorE,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.light.colorC,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 11,
    color: Colors.light.text,
    textAlign: 'left',
    paddingHorizontal: 2,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 4,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.colorA,
  },
  cell: {
    flex: 1,
    fontSize: 11,
    color: Colors.light.text,
    textAlign: 'left',
    paddingHorizontal: 2,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    width: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  labelInput: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    borderRadius: 6,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
  },
  modalButton: {
    backgroundColor: Colors.light.colorE,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});