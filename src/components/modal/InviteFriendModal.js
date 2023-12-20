import { useContext, useEffect, useState } from "react";
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Pastikan Anda sudah menginstal expo icons

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
 
  cancelBtn: {
    backgroundColor: 'red',
    marginTop: 10,
  },
});
import { LoginContext } from "../../context/AuthContext";
import { BASE_URL } from "../../helpers/BASE_URL";
import axios from "axios";

export const InviteFriendModal = ({fieldId, setModalVisible, modalVisible}) => {
    const {userInfo} = useContext(LoginContext)
    const [friends, setFriends] = useState([])
    const [inviteeId, setInviteeId] = useState(null)
    const token = userInfo.access_token
    const fetchData = async() => {
        const url = `${BASE_URL}/invite`;
        const {
          data: { data },
        } = await axios.get(url, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
    
        setFriends(data);
      }
    const postInvite = async() => {
        const form = {
            inviteeId,
            fieldId
        }
        const url = `${BASE_URL}/invite`;
        const {
          data: { data },
        } = await axios.post(url, form, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      }
    
      useEffect(() => {
        fetchData();
      }, []);
    return (
        <>
       <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add your teammates</Text>
          <Text>People you add will receive an invite automatically</Text>
          <TextInput onChangeText={(value) => setInviteeId(value)} className="my-4" style={styles.input} placeholder="Enter invitee id" />
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
            <Text onPress={postInvite} style={styles.buttonText}>Add teammates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
        </>
    )
}