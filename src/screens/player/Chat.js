import React, { useContext, useEffect, useState } from "react";
import * as TalkRn from "@talkjs/expo";
import axios from "axios";
import { BASE_URL } from "../../helpers/BASE_URL";
import { LoginContext } from "../../context/AuthContext";
import { Toast } from "toastify-react-native";

export default function ChatComponent({ route }) {
  const { playerId: otherPlayerId } = route.params;

  const [profileData, setProfileData] = useState({});
  const [otherUser, setOtherUser] = useState({});

  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;

  const [chatReady, setChatReady] = useState(false);
  const [realChatReady, setRealChatReady] = useState(false);

  const asyncFn = async () => {
    try {
      let {
        data: { data },
      } = await axios.get(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setProfileData(data.user);
      }

      let {
        data: { data: data2 },
      } = await axios.get(`${BASE_URL}/profile/${otherPlayerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data2) setOtherUser(data2.user);
      setChatReady(true);
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    asyncFn();
  }, []);

  const me = {
    id: userInfo.playerId,
    name: userInfo.username,
    photoUrl: profileData.profilePictureUrl,
    role: "default",
  };

  const other = {
    id: otherPlayerId,
    name: otherUser.name || "other",
    photoUrl: otherUser.profilePictureUrl,
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(TalkRn.oneOnOneId(me, other));

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  setTimeout(() => {
    setRealChatReady(true);
  }, 500);

  console.log(chatReady, realChatReady);

  return (
    <>
      {chatReady && realChatReady && (
        <TalkRn.Session appId="tf8sGGUu" me={me}>
          <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
        </TalkRn.Session>
      )}
    </>
  );
}
