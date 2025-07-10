import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'


const SearchBar = ({ onPress, onChange }: any) => {

    return (
        <View className='bg-dark-200 flex-row items-center rounded-full px-5 py-4 '>

            <Image
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8bff"

            />
            <TextInput
                className='ml-3 text-white'
                onPress={onPress}
                value=""
                onChange={onChange}
                placeholder='Search for a movie'
                placeholderTextColor='#ab8bff'

            />
        </View>
    )
}

export default SearchBar