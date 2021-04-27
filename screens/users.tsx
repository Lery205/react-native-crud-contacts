import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import firebase from '../screens/database/firebase';
import { ListItem, Avatar } from 'react-native-elements';

const Users = (props: any) => {
    const [usersList, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const usersList = [];

            querySnapshot.docs.forEach((doc) => {
                const { name, email, phone } = doc.data();
                usersList.push({
                    id: doc.id, name, email, phone
                })
            });
            setUsers(usersList);
        });
    }, []);

    return (
        <ScrollView>
           <View style={styles.button}>
           <Button color='#114e60' title="Crear contacto" onPress={() => props.navigation.navigate('Creación de contacto')} />
           </View>
            {
                usersList.map((user:any) => {
                    return (
                        <ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate('Detalles de contacto', {userId:user.id})}>
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title>
                                    {user.name}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    {user.email}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                       </ListItem>
                    )
                })
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 25,
    }
})

export default Users

