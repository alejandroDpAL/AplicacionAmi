import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axiosClient from '../client/axiosClient';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment'; // Para validar el formato de la fecha

const FormVacunas = ({ mode, handleSubmit, onClose, actionLabel, idVacuna }) => {
    const [mascotas, setMascotas] = useState([]);
    const [estado, setEstado] = useState([]);

    const [mascotaFK, setMascotaFk] = useState('');
    const [fechaVacuna, setFechaVacuna] = useState('');
    const [nombre_vacuna, setNombre_vacuna] = useState('');
    const [estadoOp, setEstadoOp] = useState('');


    useEffect(() => {
        axiosClient.get('/mascota/listar').then((response) => {
            const mascotaFilter = response.data.filter((mascota) => mascota.estado === 'adoptar');
            setMascotas(mascotaFilter);
        });
    }, []);

    useEffect(() => {
        if (mode === 'update' && idVacuna) {
            setMascotaFk(idVacuna.fk_id_mascota);
            setFechaVacuna(idVacuna.fecha_vacuna);
            setNombre_vacuna(idVacuna.nombre_vacuna);
        } else if (mode === 'create') {
            setMascotaFk('');
            setFechaVacuna('');
            setNombre_vacuna('');
        }
    }, [mode, idVacuna]);

    const handleFormSubmit = async () => {
        try {
            // Validar el formato de la fecha
            if (!moment(fechaVacuna, 'YYYY-MM-DD', true).isValid()) {
                Alert.alert('Error', 'Formato de fecha inválido. Use el formato YYYY-MM-DD.');
                return;
            }

            const formData = {
                fk_id_mascota: mascotaFK,
                fecha_vacuna: fechaVacuna,
                nombre_vacuna,
            };
            handleSubmit(formData);
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Hay un error en el sistema ' + error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Seleccionar Mascota</Text>
            <RNPickerSelect
                onValueChange={(value) => setMascotaFk(value)}
                items={mascotas.map(mascota => ({
                    label: mascota.nombre,
                    value: mascota.id_mascota
                }))}
                value={mascotaFK}
                placeholder={{ label: 'Seleccionar Mascota', value: null }}
                style={pickerSelectStyles}
            />

            <Text style={styles.label}>Fecha de la vacuna formato YYYY-MM-DD</Text>
            <TextInput
                style={styles.textInput}
                value={fechaVacuna}
                onChangeText={setFechaVacuna}
                placeholder="Ingrese la fecha en formato YYYY-MM-DD"
                keyboardType="default" 
            />

            <Text style={styles.label}>Ingrese el nombre_vacuna</Text>
            <TextInput
                style={styles.textInput}
                value={nombre_vacuna}
                onChangeText={setNombre_vacuna}
                placeholder="Ingrese el nombre_vacuna"
                maxLength={20}
            />

            <View style={styles.buttonContainer}>
                <Button title={actionLabel} color="orange" onPress={handleFormSubmit} />
                <Button title="Cerrar" color="red" onPress={onClose} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width:' 100%',
        height: 400, 
        justifyContent: 'center',
    },
    label: {
        
        fontSize: 16,
        marginVertical: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        height: 40,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        height: 40,
        width: '100%',
    },
    inputAndroid: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        height: 40,
        width: '100%',
    },
});

export default FormVacunas;
