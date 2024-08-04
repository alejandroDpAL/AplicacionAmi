import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect
import axiosClient from '../client/axiosClient';
import Header from '../organisms/Header';

const statusColorMap = {
    adoptar: "#28a745",
    adoptada: "#6c757d",
    'proceso adopcion': "#ffc107",
    todos: "#007bff",
};

const ListNotificaciones = () => {
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const peticionGet = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            console.log("Fetching pets data...");
            const response = await axiosClient.get('/mascota/listarMU');
            console.log("Pets data received:", response.data);
            setPets(response.data); // Actualizar el estado con los datos recibidos
            setFilteredPets(response.data); // Asegúrate de actualizar también filteredPets
        } catch (error) {
            setError('No tienes solicitudes de mascotas...');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            peticionGet(); // Refresca los datos cuando la pantalla gane el foco
        }, [peticionGet])
    );

    const handleAdoptar = async (id_mascota) => {
        try {
            const response = await axiosClient.post(`/mascota/solicitud/${id_mascota}`, { accion: 'aceptar' });
            Alert.alert('Éxito', response.data.message);
            peticionGet(); // Actualiza la lista después de aceptar
        } catch (error) {
            console.error('Error en la adopción', error);
            Alert.alert('Error', 'No se pudo completar la adopción');
        }
    };

    const handleDenegar = async (id_mascota) => {
        try {
            const response = await axiosClient.post(`/mascota/solicitud/${id_mascota}`, { accion: 'denegar' });
            Alert.alert('Éxito', response.data.message); // Actualiza la lista después de denegar
            peticionGet(); // Actualiza la lista después de denegar
        } catch (error) {
            console.error('Error en la denegación', error);
            Alert.alert('Error', 'No se pudo denegar la adopción');
        }
    };

    const renderPetCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <Text style={styles.title}>Nombre: {item.nombre}</Text>
                <Text style={styles.subtitle}>Género: {item.genero}</Text>
                <Text style={styles.subtitle}>Raza: {item.raza}</Text>
                <View style={[styles.statusChip, { backgroundColor: statusColorMap[item.estado] }]}>
                    <Text style={styles.statusText}>{item.estado}</Text>
                </View>
                <Text style={styles.solicitante}>Solicitante: {item.nombres} {item.apellidos}</Text>
                <Text style={styles.solicitante}>Correo: {item.correo}</Text>
                <Text style={styles.solicitante}>Número: {item.numero_cel}</Text>
                <Image
                    source={{ uri: item.img ? `${axiosClient.defaults.baseURL}/uploads/${item.img}` : 'https://nextui.org/images/hero-card-complete.jpeg' }}
                    style={styles.image}
                />
                <Text style={styles.description}>{item.descripcion}</Text>
                <View style={styles.buttonContainer}>
                    {item.estado !== 'adoptada' && (
                        <>
                            <TouchableOpacity
                                style={[styles.button, styles.acceptButton]}
                                onPress={() => handleAdoptar(item.id_mascota)}
                            >
                                <Text style={styles.buttonText}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.rejectButton]}
                                onPress={() => handleDenegar(item.id_mascota)}
                            >
                                <Text style={styles.buttonText}>Rechazar</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title='Notificaciones de mascotas' />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text> // Mostrar mensaje de error en la pantalla
            ) : (
                <FlatList
                    data={filteredPets}
                    renderItem={renderPetCard}
                    keyExtractor={item => item.id_mascota.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    cardContainer: {
        flex: 1,
        margin: 8,
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    statusChip: {
        padding: 4,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginVertical: 8,
      },
    statusText: {
        color: '#fff',
        fontSize: 12,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginVertical: 8,
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    solicitante: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 4,
    },
    acceptButton: {
        backgroundColor: '#28a745',
    },
    rejectButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    row: {
        justifyContent: 'space-between',
    },
});

export default ListNotificaciones;
