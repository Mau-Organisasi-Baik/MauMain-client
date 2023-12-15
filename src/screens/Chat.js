import React from 'react';
import * as TalkRn from '@talkjs/expo';

export default function ChatComponent(props) {
  const me = {
    id: '123456789',
    name: 'Alice',
    email: 'alice@example.com',
    photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
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