import React, { useState } from 'react';
import { View, TextInput, Switch, Button, Text } from 'react-native';


export const AdminScheduleForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [repeat, setRepeat] = useState(false);

  const handleSubmit = () => {
    // Handle the form submission logic
    console.log({ startTime, endTime, repeat });
  };

  return (
    <View className={`p-4`}>
      <TextInput
        className={`border p-2 rounded mb-4`}
        value={startTime}
        onChangeText={setStartTime}
        placeholder="Start Time"
      />
      <TextInput
        className={`border p-2 rounded mb-4`}
        value={endTime}
        onChangeText={setEndTime}
        placeholder="End Time"
      />
      <View className={`flex-row items-center justify-beeen mb-4`}>
        <Text>Repeat Daily</Text>
        <Switch
          value={repeat}
          onValueChange={setRepeat}
        />
      </View>
      <Button
        title="Add Schedule"
        onPress={(handleSubmit)}
      />
    </View>
  );
};


