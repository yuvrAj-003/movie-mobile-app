import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Platform, TextInput, View } from 'react-native'


interface Props {
    onPress?: () => void,
    onChangeText?: (text: string) => void,
    value?: string
}
const SearchBar = ({ onPress, onChangeText, value }: Props) => {

    return (
        <View className={`bg-dark-200 flex-row items-center rounded-full px-5 ${Platform.OS === 'android' ? 'py-2' : 'py-4'} `}>

            <Image
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8bff"

            />
            <TextInput
                className='ml-3 text-white'
                onPress={onPress}
                value={value}
                onChangeText={onChangeText}
                placeholder='Search for a movie'
                placeholderTextColor='#ab8bff'

            />
        </View>
    )
}

export default SearchBar