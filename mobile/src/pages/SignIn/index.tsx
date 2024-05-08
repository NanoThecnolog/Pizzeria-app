import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

import { AuthContext } from "../../contexts/AuthContext";


export default function SignIn() {
    const { signIn, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        if (email === '' || password === '') {
            alert('Informe email e senha para realizar o login')
            return;
        }
        await signIn({ email, password })
    }


    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/MARCA.png')}


            />



            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Digite seu email"
                    style={styles.input}
                    placeholderTextColor='#fff'
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    placeholderTextColor='#fff'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Acessar</Text>
                    )}

                </TouchableOpacity>

            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1d1d2e",

    },
    logo: {
        marginBottom: 18,
        width: '70%',
        resizeMode: 'contain',


    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14,
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#fff',

    },
    button: {
        width: '95%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026',
    }
})