import React from 'react';
import * as TalkRn from '@talkjs/expo';

function ConversationListComponent({navigation}) {
  const me = {
    id: 'current_user_id',
    name: 'Current User Name',
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