import { images } from '@/constants/images'
import React from 'react'
import { Image, Text, View } from 'react-native'

const Profile = () => {
    return (
        <View className="flex-1 justify-center items-center bg-primary">
            <Image source={images.bg} className="absolute w-full z-0 top-0" />
            <Text className="text-5xl font-bold text-white">Profile</Text>
        </View>
    )
}

export default Profile
