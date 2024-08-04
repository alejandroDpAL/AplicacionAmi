import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../client/axiosClient';
import Header from '../organisms/Header';

const UpdateProfile = ({ navigation }) => {
    const [identificacion,setIdentificacion] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosClient.get('/usuario/perfil');
                if (response.data.status === 200) {
                    setUserData(response.data.data);
                    setIdentificacion(response.data.data.identificacion);
                    setName(response.data.data.nombres);
                    setEmail(response.data.data.correo);
                    setPhone(response.data.data.numero_cel);
                } else {
                    Alert.alert("Error", response.data.message);
                }
            } catch (error) {
                Alert.alert("Error", "Error fetching profile data: " + error.message);
            }
        };

        fetchProfileData();
    }, []);

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("Error", "No token found");
                return;
            }

            const { id_usuario } = userData;

            const response = await axiosClient.put(`/usuario/perfilactualizar/${id_usuario}`, {
                nombres: name,
                numero_cel: phone,
                correo: email,
            }, {
                headers: {
                    'token': token
                }
            });

            if (response.data.status === 200) {
                Alert.alert("Success", response.data.message);
                navigation.navigate('UserProfile', { refresh: true });
            } else {
                Alert.alert("Error", response.data.message);
            }
        } catch (error) {
            Alert.alert("Error", "Error updating profile: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Perfil de Usuario" />
            <TouchableOpacity style={styles.iconProfile}>
                <FontAwesome name="user-circle-o" size={150} style={styles.icon} />
                <Text style={styles.nameProfile}>{userData ? userData.nombres : 'Cargando...'}</Text>
            </TouchableOpacity>
            <View style={styles.containerDataProfile}>

                <TouchableOpacity style={styles.dataProfile}>
                    <FontAwesome name="user" size={25} style={styles.icon} />
                    <TextInput
                        style={[styles.datatxt, styles.input]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nombre"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.dataProfile}>
                    <FontAwesome name="envelope" size={20} style={styles.icon} />
                    <TextInput
                        style={[styles.datatxt, styles.input]}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="Correo electrónico"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.dataProfile}>
                    <FontAwesome name="phone" size={25} style={styles.icon} />
                    <TextInput
                        style={[styles.datatxt, styles.input]}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        placeholder="Número de teléfono"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.OptionsProfile}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSave}
                >
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    /* Estilos de Profile */
    iconProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        marginTop: 50,
    },
    nameProfile: {
        fontWeight: '600',
        fontSize: 24,
        color: '#000',
        marginVertical: 20,
    },
    /* datos del Profile */
    containerDataProfile: {
        marginBottom: 30,
    },
    dataProfile: {
        flexDirection: 'row',
        marginLeft: 20,
        marginVertical: 10,
        alignItems: 'center',
    },
    datatxt: {
        fontWeight: '500',
        color: '#000',
        fontSize: 18,
    },
    input: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F7B318',
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#000',
    },

    /* Opciones de Profile */
    OptionsProfile: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: '#F7B318',
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
        alignItems: 'center',
        marginRight: 10,
        color: '#F7B318',
    },
});

export default UpdateProfile;
