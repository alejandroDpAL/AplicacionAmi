import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormMascotas = ({
  mode,
  handleSubmit,
  onClose,
  actionLabel,
  idMascota,
}) => {
  const [genero, setGenero] = useState([]);
  const [especie, setEspecie] = useState([]);
  const [esterilizacion, setEsterilizacion] = useState([]);
  const [discapacidad, setDiscapacidad] = useState("");
  const [tratoEspecial, setTratoEspecial] = useState("");
  const [nombre, setNombre] = useState("");
  const [generoOp, setGeneroOp] = useState("");
  const [especieOp, setEspecieOp] = useState("");
  const [esterilizacionOp, setEsterilizacionOp] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("adoptar");
  const [foto, setFoto] = useState(null);
  const [fotoUrl, setFotoUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const enumDataGenero = [
      { label: "Macho", value: "Macho" },
      { label: "Hembra", value: "Hembra" },
    ];
    setGenero(enumDataGenero);

    const enumDataEsterilizacion = [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No se", value: "no se" },
    ];
    setEsterilizacion(enumDataEsterilizacion);

    const enumDataEspecie = [
      { label: "Perro", value: "Perro" },
      { label: "Gato", value: "Gato" },
      { label: "Oveja", value: "Oveja" },
      { label: "Pato", value: "Pato" },
      { label: "Cerdo", value: "Cerdo" },
      { label: "Pájaro", value: "Pajaro" },
      { label: "Hámster", value: "Hamster" },
      { label: "Caballo", value: "Caballo" },
      { label: "Vaca", value: "Vaca" },
    ];
    setEspecie(enumDataEspecie);
  }, []);

  useEffect(() => {
    if (mode === "update" && idMascota) {
      setNombre(idMascota.nombre || "");
      setGeneroOp(idMascota.genero || "");
      setEspecieOp(idMascota.especie || "");
      setRaza(idMascota.raza || "");
      setEdad(idMascota.edad || "");
      setEsterilizacionOp(idMascota.esterilizacion || "");
      setDescripcion(idMascota.descripcion || "");
      setEstado(idMascota.estado || "adoptar");
      setDiscapacidad(idMascota.discapacidad || "");
      setTratoEspecial(idMascota.trato_especial || "");
      setFotoUrl(idMascota.img || "");
      setFoto(null);
    } else {
      resetForm();
    }
  }, [mode, idMascota]);

  const resetForm = () => {
    setNombre("");
    setGeneroOp("");
    setEspecieOp("");
    setRaza("");
    setEdad("");
    setEsterilizacionOp("");
    setDescripcion("");
    setEstado("adoptar");
    setDiscapacidad("");
    setTratoEspecial("");
    setFotoUrl("");
    setFoto(null);
  };

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          console.log("Datos del usuario:", user);
        } else {
          console.error("No user data found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error al recuperar el ID del usuario", error);
      }
    };

    getUserId();
  }, []);

  const handleFormSubmit = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      const fk_id_usuario = user ? user.id_usuario : null;
      console.log(fk_id_usuario);
      

      if (!fk_id_usuario) {
        Alert.alert("Error", "Usuario no encontrado perro en AsyncStorage");
        return;
      }

      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("genero", generoOp);
      formData.append("especie", especieOp);
      formData.append("raza", raza);
      formData.append("edad", edad);
      formData.append("esterilizacion", esterilizacionOp);
      formData.append("descripcion", descripcion);
      formData.append("estado", estado);
      formData.append("fk_id_usuario", fk_id_usuario);
      formData.append("discapacidad", discapacidad);
      formData.append("trato_especial", tratoEspecial);
      if (foto) {
        formData.append("img", {
          uri: foto.uri,
          name: foto.fileName,
          type: foto.type,
        });
      }

      handleSubmit(formData);
    } catch (error) {
      console.error("Error al obtener usuario de AsyncStorage: ", error);
    }
  };

  const handleImageChange = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const file = response.assets[0];
        setFoto(file);
        setFotoUrl(file.uri);
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleImageChange}
        >
          <Image
            source={{ uri: fotoUrl || "https://via.placeholder.com/150" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la mascota"
          value={nombre}
          onChangeText={setNombre}
          maxLength={20}
        />

        <View style={styles.columna}>
          <RNPickerSelect
            placeholder={{ label: "Seleccionar Género", value: "" }}
            value={generoOp}
            onValueChange={setGeneroOp}
            items={genero}
            style={pickerStyles}
          />
          <RNPickerSelect
            placeholder={{ label: "Seleccionar Especie", value: "" }}
            value={especieOp}
            onValueChange={setEspecieOp}
            items={especie}
            style={pickerStyles}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Raza de la mascota"
          value={raza}
          onChangeText={setRaza}
          maxLength={20}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad de la mascota"
          value={edad}
          onChangeText={setEdad}
          maxLength={2}
        />
        <RNPickerSelect
          placeholder={{ label: "Seleccionar Esterilización", value: "" }}
          value={esterilizacionOp}
          onValueChange={setEsterilizacionOp}
          items={esterilizacion}
          style={pickerStyles}
        />
        <TextInput
          style={styles.input}
          placeholder="Discapacidad de la mascota"
          value={discapacidad}
          onChangeText={setDiscapacidad}
          maxLength={100}
        />
        <TextInput
          style={styles.input}
          placeholder="Trato especial de la mascota"
          value={tratoEspecial}
          onChangeText={setTratoEspecial}
          maxLength={100}
        />
        <TextInput
          style={styles.textarea}
          placeholder="Descripción de la mascota"
          value={descripcion}
          onChangeText={setDescripcion}
          maxLength={300}
          multiline
        />
        <View style={styles.botones}>
        <Button title={actionLabel} color= 'green' onPress={handleFormSubmit} />
        <Button title="Cancelar" onPress={onClose} color="red" />
        </View>
      </View>
      {/* oee */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: 'auto',
  },
  botones: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  columna: {
    display: "flex",
    justifyContent: 'space-around',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
    height: 100,
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
});

const pickerStyles = {
  inputIOS: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
  },
};

export default FormMascotas;
