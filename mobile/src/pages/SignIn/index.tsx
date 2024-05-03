import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";


export default function SignIn() {
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
                />

                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    placeholderTextColor='#fff'
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Acessar</Text>
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