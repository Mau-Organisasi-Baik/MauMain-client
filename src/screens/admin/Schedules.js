import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { BASE_URL } from '../../helpers/BASE_URL';
import { access_token } from '../../helpers/AccessToken';
import { ScheduleCard } from '../../components/card/ScheduleCard';

export const Schedules = ({navigation}) => {
  const [schedules, setSchedules] = useState([])
  useEffect(() => {
    const asyncFn = async() => {
      const token = await access_token()
      const {data} = await axios.get(`${BASE_URL}/admin/schedules`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(data.data);
      setSchedules(data.data.schedules)
    }
    asyncFn()
  }, [])
  return (
    <View className="flex-1 bg-pink-100">

        <FlatList
            data={schedules}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>  {
              return (
                <>
                <ScheduleCard schedule={item}/>
                </>
              )
            }} 
        />  
        
        <TouchableOpacity onPress={() => navigation.navigate('ScheduleForm')} className="bg-gray-400 p-3 rounded-lg">
          <Text className="text-center text-white">Tambah Schedule</Text>
        </TouchableOpacity>
   
    </View>
  );
};


