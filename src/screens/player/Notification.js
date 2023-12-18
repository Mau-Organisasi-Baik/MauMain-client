import React from 'react';
import { ScrollView } from 'react-native';
import Card from '../../components/card/Card';
import { FriendRequestCard } from '../../components/card/FriendRequestCard';

const NotificationPopup = ({ visible, onRequestClose }) => {
  return (
  <>
  <ScrollView>
    <Card/>
    <FriendRequestCard />
  </ScrollView>
  </>
  )
};



export default NotificationPopup;
