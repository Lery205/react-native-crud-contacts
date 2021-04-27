import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import firebase from './database/firebase'


const DetailUser = (props: any) => {
    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: 0
    }

    const [user, setUser] = useState(initialState)
    const [loading, setLoading] = useState(true)

    const getUserById = async (id: any) => {
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get();
        const user = doc.data();
        //console.log(user);
        setUser({ ...user, id: doc.id });
        setLoading(false)
    };

    useEffect(() => {
        getUserById(props.route.params.userId)
    }, [])

    const handleChangeState = (name: any, value: any) => {
        setUser({ ...user, [name]: value })
    }

    const deleteUser = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
        await dbRef.delete();
        props.navigation.navigate('Contactos')
    }

    const updateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone
        })
        setUser(initialState);
        props.navigation.navigate('Contactos');
    }

    const openConfirm = () => {
        Alert.alert('ELiminar usuario', 'Estas seguro?', [{ text: 'Aceptar', onPress: () => { deleteUser() } }, { text: 'Cancelar', onPress: () => { console.log('Cancelado') } }])
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='#9e9e9e' />
            </View>
        )
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Nombre completo" value={user.name} onChangeText={(value) => handleChangeState('name', value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Email" value={user.email} onChangeText={(value) => handleChangeState('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="89337833" value={user.phone} onChangeText={(value) => handleChangeState('phone', value)} />
            </View>
            <View style={styles.button}>
                <Button color="#206a5d" title="Guardar cambios" onPress={() =>  updateUser() } />
            </View>
            <View style={styles.button}>

                <Button color="#810000" title="Eliminar" onPress={() => openConfirm()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 10,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    button: {
        borderRadius: 20,
        marginBottom: 15,
        //backgroundColor: '#dbf6e9'
    }
})

export default DetailUser