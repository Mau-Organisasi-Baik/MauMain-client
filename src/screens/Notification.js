import React from 'react';
import { ScrollView } from 'react-native';
import Card from '../components/Card';

const NotificationPopup = ({ visible, onRequestClose }) => {
  return (
  <>
  <ScrollView>
  <Card/>
  </ScrollView>
  </>
  )
};



export default NotificationPopup;
