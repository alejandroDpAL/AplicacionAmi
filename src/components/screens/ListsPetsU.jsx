import React, { useState, useEffect } from "react";
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
} from "react-native";
import axiosClient from "../client/axiosClient";
import Header from "../organisms/Header";
import ListPet from "../molecules/ListPet";
import AsyncStorage from "@react-native-async-storage/async-storage";

const statusColorMap = {
  adoptar: "#28a745", // Success green
  adoptada: "#6c757d", // Default gray
  "proceso adopcion": "#ffc107", // Warning yellow
  todos: "#007bff", // Primary blue
};

const statusOptions = [{ name: "Adoptar", uid: "adoptar" }];

const ListsPetsU = ({ navigation }) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("adoptar"); // Default to 'adoptar'
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const checkAuthAndFetchPets = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        // Redirige a la pantalla de inicio de sesión si el usuario no está autenticado
        navigation.navigate("InicioSesion");
      } else {
        fetchPets();
      }
    };

    checkAuthAndFetchPets();
  }, []);

  useEffect(() => {
    filterPets();
  }, [filterValue, selectedStatus, pets]);

  const fetchPets = async () => {
    try {
      const response = await axiosClient.get("/mascota/listar");
      // Filter pets directly if the status is 'adoptar'
      const petsData = response.data.filter((pet) => pet.estado === "adoptar");
      setPets(petsData);
      setFilteredPets(petsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching pets:", error);
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

  const refreshPets = async () => {
    fetchPets(); // Actualiza la lista de mascotas
  };

  const renderPetCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.fila}>
          <Text style={styles.title}>Nombre: {item.nombre}</Text>
          <View
            style={[
              styles.statusChip,
              { backgroundColor: statusColorMap[item.estado] },
            ]}
          >
            <Text style={styles.statusText}>{item.estado}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Género: {item.genero}</Text>
        <Text style={styles.subtitle}>Raza: {item.raza}</Text>
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
          style={styles.button}
          onPress={() => {
            setSelectedPet(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Lista de mascotas" />
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        value={filterValue}
        onChangeText={setFilterValue}
      />
      <View style={styles.dropdown}>
        {statusOptions.map((option) => (
          <TouchableOpacity
            key={option.uid}
            style={[
              styles.dropdownItem,
              selectedStatus === option.uid && styles.selectedDropdownItem,
            ]}
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
          numColumns={2} // Two columns
          columnWrapperStyle={styles.row} // Apply row style
        />
      )}
      <ListPet
        visible={modalVisible}
        onClose={handleModalClose}
        pet={selectedPet}
        refreshPets={refreshPets}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9f4f7",
    padding: 10,
  },
  input: {
    height: 50,
    borderColor: "#2cbf",
    borderWidth: 2,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  dropdown: {
    flexDirection: "row",
    marginBottom: 16,
  },
  dropdownItem: {
    padding: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#2cdf",
    borderRadius: 4,
  },
  selectedDropdownItem: {
    backgroundColor: "#ddd",
  },
  dropdownText: {
    fontSize: 18,
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
  fila: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
    width: "auto",
  },
  title: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "black",
    fontWeight: "semibold",
  },
  statusChip: {
    padding: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginVertical: 8,
  },
  statusText: {
    color: "#fff",
  },
  image: {
    padding: 50,
    width: "100%",
    height: 340,
    width: 250,
    marginLeft: 60,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 10,
    shadowColor: "black",
    justifyContent: "center", // Centrar horizontalmente
    alignItems: "center", // Centrar verticalmente
    elevation: 20,
  },
  description: {
    fontWeight: "semibold",
    fontSize: 14,
    color: "#000",
  },
  button: {
    backgroundColor: "orange",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
  },
});

export default ListsPetsU;
