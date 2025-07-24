import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { account } from '@/services/auth'
import useAuth from '@/services/useAuth'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        SignWithGoogle,
        SignInWithEmailAndPassword
    } = useAuth(account)
    return (
        <View className='flex-1 justify-center items-center bg-primary h-screen'>




            <Image source={images.bg} className="absolute w-full z-0 top-0" />

            <View className='absolute top-20 left-0 right-0 z-0'>
                <Text className='text-white text-center font-bold text-xl'>Login</Text>
            </View>

            <Toast />


            <View className='flex-col gap-y-4 w-3/4 justify-center items-center'>
                <TextInput
                    className='ml-3 w-full text-white bg-dark-200 rounded-full px-4 py-3'
                    placeholder='Enter your email'
                    placeholderTextColor='#ab8bff'
                    onChangeText={(text: string) => setEmail(text)}
                />

                <View className='ml-3 w-full relative'>
                    <TextInput
                        className=' w-full text-white bg-dark-200 rounded-full px-4 py-3 z-0'
                        placeholder='Enter your Password'
                        placeholderTextColor='#ab8bff'
                        secureTextEntry={!showPass}
                        onChangeText={(text: string) => setPassword(text)}
                    />

                    <TouchableOpacity
                        className='absolute right-5 z-1 flex-row h-full items-center justify-center'
                        onPress={() => setShowPass(!showPass)}
                    >
                        <Image source={showPass ? icons.closed : icons.open} tintColor='#D6C6FF' className='size-5' />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity
                    className='flex-row justify-center items-center gap-x-2 ml-3 w-full bg-dark-100 rounded-full px-4 py-2.5'
                    onPress={() => {
                        SignWithGoogle().then(() => {
                            Toast.show({
                                type: 'success',
                                text1: 'Login Successful',
                                position: 'top',
                                topOffset: 60,

                            });
                            setTimeout(() => router.push('/'), 1000)
                        }).catch((err) => {

                            Toast.show({
                                type: 'error',
                                text1: "Error",
                                text2: err.message,
                                position: 'top',
                                topOffset: 60,


                            });
                        })
                    }}
                >
                    <Image source={icons.google} className='size-5' />
                    <Text className='text-center text-white'>Google</Text>
                </TouchableOpacity>




                <TouchableOpacity
                    className=' ml-3 w-full bg-accent rounded-full px-4 py-3'
                    onPress={() => {
                        if (email.trim() !== '' && password.trim() !== '') {
                            SignInWithEmailAndPassword(email, password).then(() => {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Login Successful',
                                    position: 'top',
                                    topOffset: 60,

                                });
                                setTimeout(() => router.push('/'), 1000)
                            }).catch((err) => {
                                Toast.show({
                                    type: 'error',
                                    text1: "Error",
                                    text2: err.message,
                                    position: 'top',
                                    topOffset: 60,

                                });
                            })
                        }
                        else {
                            Toast.show({
                                type: 'error',
                                text1: "Error",
                                text2: "Fields are empty",
                                position: 'top',
                                topOffset: 60,

                            });
                        }

                    }}
                >
                    <Text className='text-center font-bold text-primary'>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login