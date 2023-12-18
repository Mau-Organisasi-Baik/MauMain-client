import { View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';

export const InputScoreModal = ({setModalVisible, modalVisible}) => {
    return (
        <>
     <View className={`justify-center items-center`}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View className={`m-4 bg-white border-2 border-black mt-48 rounded-lg p-4 shadow-xl`}>
            <Text className="text-lg">TEAM A : </Text>
            <TextInput
                style={{ backgroundColor: '#f0f0f0' }}
                className="bg-grey-800 pl-2 py-3"
                value="0"
            />
            <Text className="text-lg">TEAM B : </Text>
            <TextInput
                style={{ backgroundColor: '#f0f0f0' }}
                className="bg-grey-800 pl-2 py-3"
                value="0"
            />
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} className="bg-blue-500 w-3/12 py-1 rounded-lg my-2">
                <Text className="text-center text-white ">Enter</Text>
            </TouchableOpacity>
            </View>
        </Modal>
    </View>
        </>
    )
}