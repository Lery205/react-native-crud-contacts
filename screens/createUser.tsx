import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import firebase from './database/firebase'

const CreateUser = (props:any) => {
    const [ state, setState] = useState({
        name:'',
        email : '',
        phone: 0 
    }) 

    const handleChangeState = (name:any, value:any) =>{
        setState({ ... state, [name]:value})
    }
    const createNewUser= async () => {
        if (state.name==='' || state.name ==='' || state.phone === 0 ) {
            alert('Campo requerido')
        }
        else{
            console.log(state)
            await firebase.db.collection('users').add({
                name: state.name,
                email : state.email,
                phone : state.phone
            })
            //alert('Guardado con éxito')
            props.navigation.navigate('Contactos');
            
        }  
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Nombre completo" onChangeText={ (value) => handleChangeState('name' , value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Email" onChangeText={ (value) => handleChangeState('email' , value)}  />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Número telefono" onChangeText={ (value) => handleChangeState('phone' , value)} />
            </View>
            <View  style={styles.button}>
                <Button color="#206a5d" title="Guardar" onPress={() => createNewUser()} />
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
        padding:  10,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    button: {
        borderRadius: 20,
        //backgroundColor: '#dbf6e9'
    }
})

export default CreateUser