// PetModal.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Picker
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Para seleccionar imágenes
import axiosClient from '../client/axiosClient'; // Asegúrate de que la ruta sea correcta

const PetModal = ({ visible, onClose, mode, petData, onSubmit }) => {
  const [pet, setPet] = useState({
    nombre: '',
    genero: '',
    raza: '',
    edad: '',
    descripcion: '',
    discapacidad: '',
    trato_especial: '',
    estado: '',
    fk_id_usuario: '',
    esterilizacion: '',
    imagen: null,
  });

  useEffect(() => {
    if (mode === 'update' && petData) {
      setPet({
        nombre: petData.nombre,
        genero: petData.genero,
        raza: petData.raza,
        edad: petData.edad,
        descripcion: petData.descripcion,
        discapacidad: petData.discapacidad,
        trato_especial: petData.trato_especial,
        estado: petData.estado,
        fk_id_usuario: petData.fk_id_usuario,
        esterilizacion: petData.esterilizacion,
        imagen: petData.imagen,
      });
    }
  }, [mode, petData]);

  const handleImagePick = () => {
    launchImageLibrary({}, (response) => {
      if (!response.didCancel && !response.error) {
        setPet({ ...pet, imagen: response.assets[0].uri });
      }
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('nombre', pet.nombre);
    formData.append('genero', pet.genero);
    formData.append('raza', pet.raza);
    formData.append('edad', pet.edad);
    formData.append('descripcion', pet.descripcion);
    formData.append('discapacidad', pet.discapacidad);
    formData.append('trato_especial', pet.trato_especial);
    formData.append('estado', pet.estado);
    formData.append('fk_id_usuario', pet.fk_id_usuario);
    formData.append('esterilizacion', pet.esterilizacion);

    if (pet.imagen) {
      formData.append('img', {
        uri: pet.imagen,
        type: 'image/jpeg', // Ajusta el tipo según sea necesario
        name: 'pet-image.jpg', // Ajusta el nombre del archivo si es necesario
      });
    }

    try {
      if (mode === 'register') {
        // Lógica para registrar una nueva mascota
        await axiosClient.post('/mascotas', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else if (mode === 'update') {
        // Lógica para actualizar una mascota existente
        await axiosClient.put(`/mascotas/${petData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text>X</Text>
        </TouchableOpacity>
        <Text>{mode === 'register' ? 'Registrar Mascota' : 'Actualizar Mascota'}</Text>
        <TextInput
          placeholder="Nombre"
          value={pet.nombre}
          onChangeText={(text) => setPet({ ...pet, nombre: text })}
        />
        <TextInput
          placeholder="Genero"
          value={pet.genero}
          onChangeText={(text) => setPet({ ...pet, genero: text })}
        />
        <TextInput
          placeholder="Raza"
          value={pet.raza}
          onChangeText={(text) => setPet({ ...pet, raza: text })}
        />
        <TextInput
          placeholder="Edad"
          keyboardType="numeric"
          value={pet.edad}
          onChangeText={(text) => setPet({ ...pet, edad: text })}
        />
        <TextInput
          placeholder="Descripción"
          value={pet.descripcion}
          onChangeText={(text) => setPet({ ...pet, descripcion: text })}
        />
        <TextInput
          placeholder="Discapacidad"
          value={pet.discapacidad}
          onChangeText={(text) => setPet({ ...pet, discapacidad: text })}
        />
        <TextInput
          placeholder="Trato Especial"
          value={pet.trato_especial}
          onChangeText={(text) => setPet({ ...pet, trato_especial: text })}
        />
        <TextInput
          placeholder="Estado"
          value={pet.estado}
          onChangeText={(text) => setPet({ ...pet, estado: text })}
        />
        <TextInput
          placeholder="ID del Usuario"
          keyboardType="numeric"
          value={pet.fk_id_usuario}
          onChangeText={(text) => setPet({ ...pet, fk_id_usuario: text })}
        />
        <Picker
          selectedValue={pet.esterilizacion}
          onValueChange={(itemValue) => setPet({ ...pet, esterilizacion: itemValue })}
        >
          <Picker.Item label="Esterilizado" value="Esterilizado" />
          <Picker.Item label="No Esterilizado" value="No Esterilizado" />
        </Picker>
        <TouchableOpacity onPress={handleImagePick} style={styles.imageButton}>
          <Text>{pet.imagen ? 'Cambiar Imagen' : 'Seleccionar Imagen'}</Text>
        </TouchableOpacity>
        {pet.imagen && <Image source={{ uri: pet.imagen }} style={styles.image} />}
        <Button title={mode === 'register' ? 'Registrar' : 'Actualizar'} onPress={handleSubmit} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  imageButton: {
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default PetModal;
