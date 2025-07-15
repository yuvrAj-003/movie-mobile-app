import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Register = () => {
    return (
        <View className='flex justify-center items-center bg-primary h-screen'>
            <Image source={images.bg} className="absolute w-full z-0 top-0" />

            <View className='absolute top-20 left-0 right-0'>
                <Text className='text-white text-center font-bold text-xl'>Sign Up</Text>
            </View>

            <View className='flex-col gap-y-4 w-3/4 justify-center items-center'>
                <TextInput
                    className='ml-3 w-full text-white bg-dark-200 rounded-full px-4 py-3'
                    placeholder='Enter your username'
                    placeholderTextColor='#ab8bff'
                />

                <TextInput
                    className='ml-3 w-full text-white bg-dark-200 rounded-full px-4 py-3'
                    placeholder='Enter your Password'
                    placeholderTextColor='#ab8bff'
                />

                <TouchableOpacity className='flex-row justify-center items-center gap-x-2 ml-3 w-full bg-dark-100 rounded-full px-4 py-2.5'>
                    <Image source={icons.google} className='size-5' />
                    <Text className='text-center text-white'>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className=' ml-3 w-full bg-accent rounded-full px-4 py-3'
                    onPress={() => router.push("/")}
                >
                    <Text className='text-center font-bold text-primary'>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register