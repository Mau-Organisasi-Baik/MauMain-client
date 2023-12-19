import React, { useContext } from 'react';
import * as TalkRn from '@talkjs/expo';
import { LoginContext } from '../../context/AuthContext';

function ConversationListComponent({navigation}) {
  const {userInfo} = useContext(LoginContext)
  
  const me = {
    id: userInfo.playerId,
    name: userInfo.username,
    // other properties
  };

  return (
    <TalkRn.Session appId="tf8sGGUu" me={me}>
      <TalkRn.ConversationList
        onSelectConversation={(conversation) => {
          // Handle conversation selection
          navigation.navigate('Chat', { conversationId: conversation.id });
        }}
      />
    </TalkRn.Session>
  );
}

export default ConversationListComponent;