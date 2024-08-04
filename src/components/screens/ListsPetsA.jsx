import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import axiosClient from "../client/axiosClient";
import { useFocusEffect } from "@react-navigation/native";
import FormData from "form-data";
import FormMascotas from "../molecules/FormMascota";
import FormVacunas from "../molecules/FormVacuna";
import Header from "../organisms/Header";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de instalar y vincular react-native-vector-icons

const statusColorMap = {
  adoptar: "#28a745",
  adoptada: "#6c757d",
  "proceso adopcion": "#ffc107",
  todos: "#007bff",
};

const statusOptions = [
  { name: "Todos", uid: "todos" },
  { name: "Adoptar", uid: "adoptar" },
  { name: "Proceso Adopcion", uid: "proceso adopcion" },
  { name: "Adoptada", uid: "adoptada" },
];

const ListsPetsA = ({ navigation }) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVacunaVisible, setModalVacunaVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [mode, setMode] = useState("create"); // Modo del modal de mascotas

  useFocusEffect(
    useCallback(() => {
      fetchPets();
    }, [])
  );

  useEffect(() => {
    filterPets();
  }, [filterValue, selectedStatus, pets]);

  const fetchPets = async () => {
    try {
      const response = await axiosClient.get("/mascota/listar");
      setPets(response.data);
      setFilteredPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPets = () => {
    let filtered = pets;

    if (filterValue) {
      filtered = filtered.filter(
        (pet) =>
          pet.nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
          pet.raza.toLowerCase().includes(filterValue.toLowerCase()) ||
          pet.genero.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (selectedStatus !== "todos") {
      filtered = filtered.filter((pet) => pet.estado === selectedStatus);
    }
    setFilteredPets(filtered);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedPet(null);
    fetchPets(); // Refresca la lista después de cerrar el modal
  };

  const handleModalVacunaClose = () => {
    setModalVacunaVisible(false);
  };

  const handleSubmitMascota = async (formData) => {
    try {
      const data = new FormData();

      // Añade datos al FormData
      for (const [key, value] of Object.entries(formData)) {
        if (value instanceof File) {
          data.append(key, value);
        } else {
          data.append(key, value);
        }
      }

      let response;
      if (mode === "create") {
        // Envía la solicitud POST con multipart/form-data
        response = await axiosClient.post("/mascota/registrar", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Envía la solicitud PUT para actualizar la mascota
        response = await axiosClient.put(`/mascota/actualizar/${selectedPet.id_mascota}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.status === 200) {
        Alert.alert("Éxito", `Se ha ${mode === "create" ? "registrado" : "actualizado"} la mascota correctamente.`);
        fetchPets();
      } else {
        Alert.alert("Error", `Error en el ${mode === "create" ? "registro" : "actualización"}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.response ? error.response.data : error.message);
      Alert.alert("Error", `Ocurrió un error al conectar con el servidor: ${error.message}`);
    } finally {
      handleModalClose();
    }
  };

  const handleSubmitVacuna = async (formData) => {
    try {
      const response = await axiosClient.post("/vacuna/registrar", formData);
      if (response.status === 200) {
        Alert.alert("Éxito", "Vacuna registrada con éxito.");
        fetchPets();
      } else {
        Alert.alert("Error", "Error en el registro");
      }
    } catch (error) {
      console.log(error);
    }
    handleModalVacunaClose();
  };

  const renderPetCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Nombre: {item.nombre}</Text>
        <Text style={styles.subtitle}>Género: {item.genero}</Text>
        <Text style={styles.subtitle}>Raza: {item.raza}</Text>
        <View
          style={[
            styles.statusChip,
            { backgroundColor: statusColorMap[item.estado] },
          ]}
        >
          <Text style={styles.statusText}>{item.estado}</Text>
        </View>
        <Image
          source={{
            uri: item.img
              ? `${axiosClient.defaults.baseURL}/uploads/${item.img}`
              : "https://nextui.org/images/hero-card-complete.jpeg",
          }}
          style={styles.image}
        />
        <Text style={styles.description}>{item.descripcion}</Text>
        <TouchableOpacity
          style={styles.buttonM}
          onPress={() => {
            setSelectedPet(item);
            setMode("update");
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Lista de mascotas" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={filterValue}
          onChangeText={setFilterValue}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            setMode("create");
            setModalVisible(true);
          }}
        >
          <Icon name="add-circle" size={30} color="#28a745" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setModalVacunaVisible(true)}
        >
          <Icon name="local-hospital" size={30} color="#ffc107" />
        </TouchableOpacity>
      </View>
      <View style={styles.dropdownContainer}>
        {statusOptions.map((option) => (
          <TouchableOpacity
            key={option.uid}
            style={styles.dropdownOption}
            onPress={() => setSelectedStatus(option.uid)}
          >
            <Text style={styles.dropdownText}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredPets}
          renderItem={renderPetCard}
          keyExtractor={(item) => item.id_mascota.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentM}>
            <Text style={styles.modalTitle}>
              {mode === "create" ? "Registrar Mascota" : "Actualizar Mascota"}
            </Text>
            <FormMascotas
              initialData={selectedPet}
              mode={mode}
              handleSubmit={handleSubmitMascota}
              onClose={handleModalClose}
              actionLabel={mode === "create" ? "Registrar" : "Actualizar"}
            />
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVacunaVisible}
        onRequestClose={handleModalVacunaClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentV}>
            <Text style={styles.modalTitle}>Registrar Vacuna</Text>
            <FormVacunas handleSubmit={handleSubmitVacuna} onClose={handleModalVacunaClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#d9f4f7",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2cdf",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  iconButton: {
    marginLeft: 8,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dropdownOption: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 4,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 14,
  },
  buttonM: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    padding: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  row: {
    flex: 1,
    justifyContent: "space-between", // Space between cards
    marginBottom: 16,
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 4,
    display: "flex",
    flexDirection: "column",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  statusChip: {
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    height: 340,
    width: 250, 
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonM: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContentM: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalContentV: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  buttonV: {
    backgroundColor: "#ffc107",
    borderRadius: 8,
    padding: 10,
  },
});

export default ListsPetsA;
