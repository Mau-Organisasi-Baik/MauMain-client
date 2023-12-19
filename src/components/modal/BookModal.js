import React, { useContext, useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { getScheduleTime } from "../../helpers/ScheduleTime";
import { LoginContext } from "../../context/AuthContext";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const BookModal = ({ modalVisible, setModalVisible, bookInformation, toggleIndicator }) => {
  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;

  const [tags, setTags] = useState([
    {
      _id: "",
      name: "Football",
      limit: "22",
    },
    {
      _id: "",
      name: "Basketball",
      limit: "10",
    },
  ]);

  const [selectedSportId, setSelectedSportId] = useState(tags[0]._id);
  const [selectedMode, setSelectedMode] = useState("casual");

  const { schedule, fieldId } = bookInformation;

  async function fetchTagsFromField() {
    const url = `${BASE_URL}/fields/${fieldId}`;
    const {
      data: { data },
    } = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    setTags(data.field.tags);
  }

  useEffect(() => {
    fetchTagsFromField();
  }, []);

  const { TimeStart, TimeEnd, _id: scheduleId } = schedule;

  const timeStart = getScheduleTime(TimeStart);
  const timeEnd = getScheduleTime(TimeEnd);

  async function createReservation() {
    console.log({
      fieldId,
      scheduleId,
      tagId: selectedSportId,
      type: selectedMode,
    });
    try {
      const url = `${BASE_URL}/reservations`;
      await axios.post(
        url,
        {
          fieldId,
          scheduleId,
          tagId: selectedSportId,
          type: selectedMode,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
  
      toggleIndicator();
      
    } catch (error) {
      console.log(error.response.data.fields);
    }
  }

  return (
    <View className={`justify-center items-center`}>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
        <View className={`m-4 bg-white border-2 border-black mt-20 rounded-lg p-4 shadow-xl`}>
          <Text className="text-lg">Tipe Olahraga : </Text>
          <Picker
            onValueChange={(newTagId) => {
              setSelectedSportId(newTagId);
            }}
            style={{ backgroundColor: "#f0f0f0" }}
            className="bg-yellow-500"
            selectedValue={selectedSportId}
          >
            {tags.map((tag, idx) => {
              return <Picker.Item key={idx} label={tag.name} value={tag._id} />;
            })}
          </Picker>

          <Text className="text-lg">Jam : </Text>
          <TextInput editable={false} style={{ backgroundColor: "#f0f0f0" }} className="bg-grey-800 pl-2 py-3" value={`${timeStart} - ${timeEnd}`} />
          <Text className="text-lg">Mode : </Text>

          <Picker
            onValueChange={(newType) => {
              setSelectedMode(newType);
            }}
            style={{ backgroundColor: "#f0f0f0" }}
            selectedValue={selectedMode}
          >
            <Picker.Item label="Casual" value={"casual"} />
            <Picker.Item label="Competitive" value={"competitive"} />
          </Picker>

          <TouchableOpacity
            className={`bg-blue-500 px-4 py-2 rounded-lg mt-4`}
            onPress={() => {
              createReservation();
              setModalVisible(!modalVisible);
            }}
          >
            <Text className={`text-white text-center`}>OK!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default BookModal;
