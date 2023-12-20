import { Text, View, TouchableOpacity } from "react-native"
import { getScheduleTime } from "../../helpers/ScheduleTime"
import {useContext} from 'react'
import { LoginContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../helpers/BASE_URL";
import TOAST from 'toastify-react-native'
export const ScheduleCard = ({schedule, setSchedules}) => {
  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;
  
  const deleteSchedule = async() => {
    
    try {
      await axios.delete(
        `${BASE_URL}/admin/schedules/${schedule._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      TOAST.success('Delete Succeed!')
      setSchedules(previousSchedule => previousSchedule.filter(prevSchedule => prevSchedule._id !== schedule._id))
    } catch (error) {
      TOAST.error(error.response?.data.message);
    }
  }
    return (
        <>
        <View className="my-3 p-4 rounded-lg justify-between flex-row bg-blue-100">
            
          <Text className="text-lg">{getScheduleTime(schedule.TimeStart)} - {getScheduleTime(schedule.TimeEnd)}</Text>
          <TouchableOpacity onPress={deleteSchedule}>
          <Text className="text-lg text-blue-800 border border-blue-500 rounded-lg px-2">x</Text>
          </TouchableOpacity>
        </View>
        </>
    )
}