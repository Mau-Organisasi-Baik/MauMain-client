import React, { useContext, useEffect, useState } from 'react';
import * as TalkRn from '@talkjs/expo';
import { access_token } from '../../helpers/AccessToken';
import axios from 'axios';
import { BASE_URL } from '../../helpers/BASE_URL';
import { LoginContext } from '../../context/AuthContext';
import { useRoute } from '@react-navigation/native';

export default function ChatComponent() {
  const route = useRoute()
  const [profileData, setProfileData] = useState({})
  const [otherUser, setOtherUser] = useState({})
  const {playerId} = route.params
  const test = playerId || null
  
  const {userInfo} = useContext(LoginContext)
  const token = userInfo.access_token
  useEffect(() => {
    const asyncFn = async() => {
      const {data} = await axios.get(`${BASE_URL}/profile`, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      const response = await axios.get(`${BASE_URL}/profile/${playerId}`, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      setOtherUser(response.data.data.user)
    }
    asyncFn()
  }, [])
  console.log(otherUser);
  const me = {
    id: userInfo.playerId,
    name: userInfo.username,
    photoUrl: profileData.profilePictureUrl,
    welcomeMessage: 'Hey there! How are you? :-)',
    role: 'default',
  };

  const other = {
    id: playerId,
    name: otherUser.name,
    photoUrl: otherUser.profilePictureUrl,
    welcomeMessage: 'Hey, how can I help? https://google.com',
    role: 'default',
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  return (
    <TalkRn.Session appId='tf8sGGUu' me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
  );
}