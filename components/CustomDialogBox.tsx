import { Modal, Text, TouchableOpacity, View } from "react-native";

const CustomDialogBox = ({ visible, onClose, title, message, onConfirm, ConfirmColor }: any) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="bg-none h-full absolute flex w-full justify-center items-center">
                <View className="absolute bg-white h-full w-full opacity-15" />

                <View className="bg-dark-200 w-3/4 px-9 rounded-2xl h-1/4 flex-col items-center justify-evenly z-1 absolute">

                    <View className="flex-col items-center justify-center">
                        <Text className="text-white text-2xl font-bold">{title}</Text>
                        <Text className="text-white mt-2">{message}</Text>
                    </View>

                    <View className="w-full flex-row gap-x-2 justify-center items-center">
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-none border border-accent px-3 py-3 w-2/4 rounded-full flex justify-center items-center"
                        >
                            <Text className="font-bold text-accent">Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onConfirm}
                            className={`${ConfirmColor} px-3 py-3 w-2/4 rounded-full flex justify-center items-center`}
                        >
                            <Text className="font-bold text-primary">Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default CustomDialogBox;
