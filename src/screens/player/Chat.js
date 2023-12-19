import React, { useContext, useEffect, useState } from 'react';
import * as TalkRn from '@talkjs/expo';
import { access_token } from '../../helpers/AccessToken';
import axios from 'axios';
import { BASE_URL } from '../../helpers/BASE_URL';
import { LoginContext } from '../../context/AuthContext';

export default function ChatComponent(props) {
  const [profileData, setProfileData] = useState({})
  const {userInfo} = useContext(LoginContext)
  useEffect(() => {
    const asyncFn = async() => {
      const token = await access_token()
      const {data} = await axios.get(`${BASE_URL}/profile`, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      setProfileData(data.data.user)
    }
    asyncFn()
  }, [])
  console.log(profileData);
  const me = {
    id: userInfo.playerId,
    name: userInfo.username,
    email: 'alice@example.com',
    photoUrl: profileData.profilePictureUrl,
    welcomeMessage: 'Hey there! How are you? :-)',
    role: 'default',
  };

  const other = {
    id: '987654321',
    name: 'Sebastian',
    email: 'Sebastian@example.com',
    photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
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