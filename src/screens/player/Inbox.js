import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ConversationListComponent from './ConversationList';
import NotificationPopup from './Notification';
import ChatComponent from './Chat';
import { ConversationList } from '@talkjs/expo';

const TopTab = createMaterialTopTabNavigator();

export const Inbox = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Notification"
      className="mb-14"
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'white' },
        tabBarIndicatorStyle: {
          backgroundColor: 'blue',
          height: 3,
        },
      }}
    >
      <TopTab.Screen
        name="Notification"
        component={NotificationPopup}
        options={{ tabBarLabel: 'NOTIFICATION' }}
      />
      <TopTab.Screen
        name="Chat"
        component={ConversationListComponent}
        options={{ tabBarLabel: 'CHAT' }}
      />
    </TopTab.Navigator>
  );
};
