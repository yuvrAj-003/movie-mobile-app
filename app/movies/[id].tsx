import { Button } from '@react-navigation/elements';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';


const MovieDetails = () => {
    const router = useRouter();

    const { id } = useLocalSearchParams();
    return (
        <View className='flex-1 justify-center items-center'>
            <Text className='text-lg font-bold'>Movie Details: {id}</Text>
            <Button
                className='text-blue-500'
                onPressIn={() => router.push('/')}
            >go back</Button>
        </View>
    )
}

export default MovieDetails