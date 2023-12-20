import { useContext, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import { Toast } from 'toastify-react-native';
import { BASE_URL } from '../../helpers/BASE_URL';
import axios from "axios";
import { LoginContext } from '../../context/AuthContext';

export const InputScoreModal = ({setModalVisible, modalVisible, reservationId, changeIndicator}) => {
    const [inputValues, setInputValues] = useState({
        scoreA: "0",
        scoreB: "0",
    })
    const {userInfo} = useContext(LoginContext)
    const token = userInfo.access_token
    const inputHandler = (inputIdentifier, enteredValue) => {
        setInputValues((currValue) => {
            return {
                ...currValue,
                [inputIdentifier]: enteredValue,
            };
        });
    };
    const handleScoreSubmit = async () => {
        try {
            const url = `${BASE_URL}/admin/reservations/${reservationId}/score`;
            let score = {
                score: `${inputValues.scoreA}|${inputValues.scoreB}`
            }
            
            const { data } = await axios.put(url, score, {
                headers : {
                    'Authorization' :  `Bearer ${token}`
                }
            });
            setModalVisible(!modalVisible);
            changeIndicator()
        }
        catch(error) {
      Toast.error(error.response?.data.message);
        }
    }
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
                defaultValue="0"
                onChangeText={(text) => inputHandler("scoreA", text)}
            />
            <Text className="text-lg">TEAM B : </Text>
            <TextInput
                style={{ backgroundColor: '#f0f0f0' }}
                className="bg-grey-800 pl-2 py-3"
                defaultValue="0"
                onChangeText={(text) => inputHandler("scoreB", text)}
            />
            <TouchableOpacity onPress={() => handleScoreSubmit()} className="bg-blue-500 w-3/12 py-1 rounded-lg my-2">
                <Text className="text-center text-white ">Enter</Text>
            </TouchableOpacity>
            </View>
        </Modal>
    </View>
        </>
    )
}