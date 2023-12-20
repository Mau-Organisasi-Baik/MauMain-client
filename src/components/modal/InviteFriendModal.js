import { useContext, useEffect, useState } from "react";
import React from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Pastikan Anda sudah menginstal expo icons

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
    alignItems: "center",
    elevation: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  cancelBtn: {
    backgroundColor: "red",
    marginTop: 10,
  },
});
import { LoginContext } from "../../context/AuthContext";
import { BASE_URL } from "../../helpers/BASE_URL";
import axios from "axios";
import { Toast } from "toastify-react-native";

function InvitePlayerCard({ friend, postInvite }) {
  const { playerId, name } = friend;

  return (
    <>
      <View
        style={{
          width: "100%",
          padding: 10,
          paddingVertical: 10,
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Text>{name}</Text>
        </View>

        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          <TouchableOpacity
            onPress={() => postInvite(playerId)}
            style={{ borderRadius: 100, borderColor: "blue", borderWidth: 1, paddingHorizontal: 20, paddingVertical: 5 }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export const InviteFriendModal = ({ reservationId, setModalVisible, modalVisible }) => {
  const { userInfo } = useContext(LoginContext);
  const [friends, setFriends] = useState([]);
  const [inviteeId, setInviteeId] = useState(null);
  const token = userInfo.access_token;

  const [isReady, setIsReady] = useState(false);
  const fetchData = async () => {
    try {
      const url = `${BASE_URL}/friends`;
      const {
        data: { data },
      } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(data);

      setFriends(data.friends);
      setIsReady(true);
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  };
  const postInvite = async (playerId) => {
    try {
      const form = {
        inviteeId: playerId,
        reservationId,
      };

      const url = `${BASE_URL}/invite`;
      const {
        data: { data },
      } = await axios.post(url, form, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      Toast.success("Successfully invite friend");
    } catch (error) {
      Toast.error(error.response?.data.message);
      console.log(error.response?.data.fields);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isReady) return <></>;

  console.log(friends);
  return (
    <>
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Add your friends</Text>
            <Text>People you add will receive an invite automatically</Text>

            {friends.map((friend, idx) => {
              return <InvitePlayerCard key={idx} friend={friend} postInvite={postInvite} />;
            })}
          </View>
        </View>
      </Modal>
    </>
  );
};
