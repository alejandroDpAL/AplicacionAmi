import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../client/axiosClient";
import RegisterUserModal from "../organisms/ModalUser";

const LoginPets = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          "Sin conexión",
          "Por favor, verifica tu conexión a internet."
        );
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { correo, password } = formData;
    if (!correo || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return false;
    }
    return true;
  };
  const Validacion = async () => {
    if (!validateForm()) return;

    try {
        const response = await axiosClient.post("/validacion", formData);

        if (response.status === 200) {
            const { token, user } = response.data;
            const userData = user[0]; // Asegúrate de que `user` es un array y obtén el primer elemento.

            await AsyncStorage.setItem("token", token); // Guarda el token en AsyncStorage
            await AsyncStorage.setItem("user", JSON.stringify(userData)); // Guarda la información del usuario en AsyncStorage

            // Navegar a diferentes pantallas basadas en el rol del usuario
            if (userData.rol === "administrador") {
                navigation.navigate("AdminMain");
            } else if (userData.rol === "usuario") {
                navigation.navigate("UserMain");
            } else {
                Alert.alert("Error", "Rol de usuario no reconocido.");
            }
        } else {
            Alert.alert("Error", "Usuario no autorizado.");
        }
    } catch (error) {
        console.error("Error del servidor", error);
        Alert.alert(
            "Error",
            "Ocurrió un error en el servidor. Por favor, intenta nuevamente."
        );
    }
};


  const openRegisterModal = () => {
    setRegisterModalVisible(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>INICIAR SESIÓN</Text>
        <Image
          source={require("../../../public/logo.png")}
          style={styles.logo}
          resizeMode="cover"
        />

        <TextInput
          placeholder="Ingrese su Correo Electronico"
          style={styles.input}
          placeholderTextColor="#666"
          value={formData.correo}
          onChangeText={(text) => handleInputChange("correo", text)}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Ingrese su Contraseña"
            placeholderTextColor="#666"
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={toggleSecureEntry}
          >
            <Text style={{ color: "#006000" }}>
              {secureTextEntry ? "Mostrar" : "Ocultar"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenedor para los botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={Validacion}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={openRegisterModal}
          >
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>
        </View>

      </View>
      <Modal
        visible={registerModalVisible}
        onRequestClose={closeRegisterModal}
        transparent
      >
        <RegisterUserModal onClose={closeRegisterModal} />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 70,
    color: "#000",
  },
  logo: {
    width: 300,
    height: 320,
    marginTop: 50,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#006000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  inputPassword: {
    height: 50,
    borderWidth: 1,
    borderColor: "#006000",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#000",
    width: "100%",
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,

  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    marginRight: 5,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
    width: 180,
    height: 60,
  },
  registerButton: {
    backgroundColor: "orange",
    marginLeft: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
    width: 180,
    height: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginPets;
