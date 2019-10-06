import React, {useState, useEffect} from 'react';
import { View, Image, KeyboardAvoidingView, AsyncStorage, Platform, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import logo from '../../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }){

    const [email, setEmail] = useState ('');
    const [techs, setTechs] = useState ('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user =>{
            if (user){
                navigation.navigate('List');
            }
        })
    }, []); 

    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email            
        })
        const { _id } = response.data;            

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);
        
        navigation.navigate('List');
        
    }


    return (
        //KeyboardAvoidingView sobe o formulario quando o teclado eh acionado
        <KeyboardAvoidingView behavior='padding' enabled={Platform.OS == 'ios'} style={styles.container}>
            <Image source={logo}/>

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address" //mostrar o teclado de email
                    autoCapitalize="none"//sem caixa alta
                    autoCorrect={false}
                    //onChangeText={text => setEmail(text)}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"                    
                    autoCapitalize="words"//caixa alta de todo inicio
                    autoCorrect={false}
                    onChangeText={setTechs}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>

            </View>            

        
        </KeyboardAvoidingView>    
    ) 
    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth:1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});