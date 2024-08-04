import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    Modal,
  } from 'react-native';
  import React, { useState } from 'react';
  import axiosClient from '../client/axiosClient';
  
  const RegisterUserModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
      identificacion: '',
      nombres: '',
      correo: '',
      numero_cel: '',
      password: '',
    });
  
    const handleInputChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };
  
    const validateForm = () => {
      const { identificacion, nombres, correo, numero_cel, password } = formData;
      if (!identificacion || !nombres || !correo || !numero_cel || !password) {
        Alert.alert('Error', 'Por favor, completa todos los campos.');
        return false;
      }
      return true;
    };
  
    const handleRegister = async () => {
      if (!validateForm()) return;
  
      try {
        const response = await axiosClient.post('/usuario/registrar', formData);
        if (response.status === 200) {
          Alert.alert('Éxito', 'Usuario registrado correctamente');
          onClose();
        } else {
          Alert.alert('Error', 'No se pudo registrar el usuario');
        }
      } catch (error) {
        console.error('Error del servidor', error);
        Alert.alert('Error', 'Ocurrió un error en el servidor. Por favor, intenta nuevamente.');
      }
    };
  
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.modalTitle}>Registrar Usuario</Text>
            <TextInput
              placeholder="Identificación"
              style={styles.input}
              placeholderTextColor="#666"
              value={formData.identificacion}
              onChangeText={(text) => handleInputChange('identificacion', text)}
            />
            <TextInput
              placeholder="Nombres"
              style={styles.input}
              placeholderTextColor="#666"
              value={formData.nombres}
              onChangeText={(text) => handleInputChange('nombres', text)}
            />
            <TextInput
              placeholder="Correo"
              style={styles.input}
              placeholderTextColor="#666"
              value={formData.correo}
              onChangeText={(text) => handleInputChange('correo', text)}
            />
            <TextInput
              placeholder="Número de Celular"
              style={styles.input}
              placeholderTextColor="#666"
              value={formData.numero_cel}
              onChangeText={(text) => handleInputChange('numero_cel', text)}
            />
            <TextInput
              placeholder="Contraseña"
              style={styles.input}
              placeholderTextColor="#666"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    scrollViewContainer: {
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#000',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#006000',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      color: '#000',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    registerButton: {
      backgroundColor: 'green',
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: 'center',
      borderRadius: 10,
      width: '48%',
    },
    cancelButton: {
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: 'center',
      borderRadius: 10,
      width: '48%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  export default RegisterUserModal;
  