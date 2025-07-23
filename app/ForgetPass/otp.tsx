import { images } from '@/constants/images'
import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
const OTP = () => {

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
                />

            </View>


            <TouchableOpacity
                className='mt-10 ml-3 w-[100px] bg-accent rounded-full px-4 py-3'
            >
                <Text className='text-center font-bold text-primary'>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default OTP