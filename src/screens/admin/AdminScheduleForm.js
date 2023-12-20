import React, { useContext, useState } from 'react';
import { View, TextInput, Switch, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormatHourAndMinute } from '../../helpers/GetUtcHours';
import axios from 'axios';
import { BASE_URL } from '../../helpers/BASE_URL';
import { Toast } from 'toastify-react-native';

import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../../context/AuthContext';


export const AdminScheduleForm = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [repeat, setRepeat] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [currentTimeSetter, setCurrentTimeSetter] = useState(() => () => {});
  const navigation = useNavigation()
  const { userInfo } = useContext(LoginContext)

  const handleTimeChange = (newTime, setTime) => {
    setTime(newTime);
    setShow(false);
  }

  const showTimePicker = (time, setTime) => {
    setDate(time);
    setShow(true);
    setCurrentTimeSetter(() => (newTime) => handleTimeChange(newTime, setTime));
  }

  const handleSubmit = async() => {
    
    const submitForm = {
      timeStart : FormatHourAndMinute(startTime),
      timeEnd : FormatHourAndMinute(endTime),
      repeat
    }
    try {
      const token = userInfo.access_token
      const {data} = await axios.post(`${BASE_URL}/admin/schedules`, submitForm, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      navigation.navigate('Schedules')
    } catch (error) {
      console.log(error);
      // Toast.error(error.response.data.message)
    }
    
  };
  return (
    <View className={`p-4`}>
    
    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='time'
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              currentTimeSetter(selectedDate);
            } else {
              setShow(false);
            }
          }}
        />
      )}
       <TextInput
        onPressIn={() => showTimePicker(startTime, setStartTime)}
        className={`border p-2 rounded mb-4`}
        // editable={false} 
        value={FormatHourAndMinute(startTime)}
        placeholder="Start Time"
      />
      <TextInput
        onPressIn={() => showTimePicker(endTime, setEndTime)}
        className={`border p-2 rounded mb-4`}
        // editable={false} 
        value={FormatHourAndMinute(endTime)}
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


