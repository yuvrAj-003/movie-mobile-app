
import { images } from '@/constants/images'
import { account } from '@/services/auth'
import useAuth from '@/services/useAuth'
import { router } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {

    const { loading, user } = useAuth(account);
    // const router = useRouter();


    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0 top-0" />
            {loading && <ActivityIndicator size="large" color="white" className='mt-20'
            />}

            {
                (!user && !loading) &&
                <View className='h-full w-full flex-col items-center justify-center'>

                    <Text className='text-white text-3xl font-bold'>
                        You are not authenticated
                    </Text>
                    <TouchableOpacity
                        className='mt-10 ml-3 w-3/6 bg-accent rounded-full px-4 py-4'
                        onPress={() => router.push("/Auth/Login")}

                    >
                        <Text className='text-xl font-bold text-center'>Login Or Register</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default Profile
