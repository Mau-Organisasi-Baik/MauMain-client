import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const AddTagsModal = ({ selectedTags, setSelectedTags, disabled }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [currentSelectedTag, setCurrentSelectedTag] = useState(null);

  function addTagHandler(tag) {
    if (disabled) return

    setSelectedTags((old) => {
      return [...old, tag];
    });
  }

  async function fetchTags() {
    const url = `${BASE_URL}/tags`;
    const {
      data: { data },
    } = await axios.get(url);

    setTags(data.tags);
  }

  const availableTags = tags.filter((tag) => {
    let isSelected = false;

    for (const selectedTag of selectedTags) {
      if (selectedTag.name === tag.name) {
        isSelected = true;
      }
    }

    return !isSelected;
  });

  useEffect(() => {
    fetchTags();
  }, []);

  function handleCurrentSelectedChange(tagId) {
    const targetTag = tags.find((tag) => tag._id === tagId);
    setCurrentSelectedTag(targetTag);
  }

  function removeSelectedTag(name) {
    if (disabled) return
    setSelectedTags(selectedTags.filter((tag) => tag.name !== name));
  }

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className={""}>
        {/* todo: daftar tags yang sudah terpilih */}

        {selectedTags.map((tag) => {
          return (
            <TouchableOpacity key={tag._id} onPress={() => removeSelectedTag(tag.name)} className={"bg-gray-400 rounded-full p-2 px-5 m-1"}>
              <Text className={"text-white"}>{tag.name}</Text>
            </TouchableOpacity>
          );
        })}

        {availableTags.length > 0 && !disabled &&(
          <TouchableOpacity onPress={() => setModalVisible(true)} className={"bg-gray-400 rounded-full p-2 px-5 m-1"}>
            <Text className={"text-white"}>+</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View className={`justify-center items-center`}>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
          <View className={`m-4 bg-white border-2 border-black mt-48 rounded-lg p-4 shadow-xl`}>
            <Text className="text-lg">Add Tags : </Text>
            <Picker
              style={{ backgroundColor: "#f0f0f0" }}
              className="bg-yellow-500"
              onValueChange={handleCurrentSelectedChange}
              selectedValue={currentSelectedTag}
            >
              {availableTags.map((tag) => {
                return <Picker.Item key={tag.name} label={tag.name} value={tag._id} />;
              })}
            </Picker>
            <TouchableOpacity
              onPress={() => {
                addTagHandler(currentSelectedTag);
                setModalVisible(!modalVisible);
              }}
              className="bg-blue-500 w-3/12 py-1 rounded-lg my-2"
            >
              <Text className="text-center text-white ">Enter</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};
