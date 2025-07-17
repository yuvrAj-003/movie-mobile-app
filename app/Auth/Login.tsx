import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { account } from '@/services/auth'
import useAuth from '@/services/useAuth'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        SignWithGoogle,
        SignInWithEmailAndPassword
    } = useAuth(account)
    return (
        <View className='flex-1 justify-center items-center bg-primary h-screen'>
            <Image source={images.bg} className="absolute w-full z-0 top-0" />

            <View className='absolute top-20 left-0 right-0'>
                <Text className='text-white text-center font-bold text-xl'>Login</Text>
            </View>

            <View className='flex-col gap-y-4 w-3/4 justify-center items-center'>
                <TextInput
                    className='ml-3 w-full text-white bg-dark-200 rounded-full px-4 py-3'
                    placeholder='Enter your username'
                    placeholderTextColor='#ab8bff'
                    onChangeText={(text: string) => setEmail(text)}
                />

                <TextInput
                    className='ml-3 w-full text-white bg-dark-200 rounded-full px-4 py-3'
                    placeholder='Enter your Password'
                    placeholderTextColor='#ab8bff'
                    onChangeText={(text: string) => setPassword(text)}
                />

                <TouchableOpacity
                    className='flex-row justify-center items-center gap-x-2 ml-3 w-full bg-dark-100 rounded-full px-4 py-2.5'
                    onPress={() => {
                        SignWithGoogle().then(() => router.push('/'))
                    }}
                >
                    <Image source={icons.google} className='size-5' />
                    <Text className='text-center text-white'>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className=' ml-3 w-full bg-accent rounded-full px-4 py-3'
                    onPress={() => {
                        SignInWithEmailAndPassword(email, password).then(() => router.push('/'))

                    }}
                >
                    <Text className='text-center font-bold text-primary'>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register