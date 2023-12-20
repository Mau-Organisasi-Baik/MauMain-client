import {useState, useContext, useEffect} from 'react';
import { ScrollView } from 'react-native';
import Card from '../../components/card/Card';
import { LoginContext } from '../../context/AuthContext';
import { BASE_URL } from '../../helpers/BASE_URL';
import { FriendRequestCard } from '../../components/card/FriendRequestCard';
import axios from 'axios';
import TOAST from 'toastify-react-native'

const NotificationPopup = () => {
  //get invitation
  const [invitations, setInvitation] = useState([])
  const [friendRequest, setFriendRequest] = useState([])
  const {userInfo} = useContext(LoginContext)
  const token = userInfo.access_token
  const getInvitation = async() => {
      try {
          const {data} = await axios.get(`${BASE_URL}/invite`, {
              headers : {
                  'Authorization' : `Bearer ${token}`
              }
          })
          setInvitation(data.data.invitations)
      } catch (error) {
        TOAST.error(error.response.data);
      }
  }
  //---------

  //get friendRequest
  const getFriendRequest = async() => {
      try {
          const {data} = await axios.get(`${BASE_URL}/friends/pending`, {
              headers : {
                  'Authorization' : `Bearer ${token}`
              }
          })
          setFriendRequest(data.data.pendings)
      } catch (error) {
          throw error
      }
  }
  useEffect(() => {
    getFriendRequest()
    getInvitation()
  }, [])

  return (
  <>
  <ScrollView>
    {invitations.map(el => <Card key={el._id} invitation={el}/> )}
    {friendRequest.map(el => <FriendRequestCard key={el._id} setFriendRequest={setFriendRequest} friendRequest={el}/>)}
    
  </ScrollView>
  </>
  )
};



export default NotificationPopup;
