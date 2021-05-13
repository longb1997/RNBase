/* eslint-disable max-len */
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

class LocalNotificationService {
  onNotification(notification: any) {
    console.log(
      '[LocalNotificationService] onNotification pressed:',
      notification,
    );
    if (!notification?.data) {
      return;
    }

    if (Platform.OS === 'ios') {
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  }
  onAction(notification: any) {
    console.log('Notification action received:');
    console.log(notification.action);
    console.log(notification);

    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }
}

const handler = new LocalNotificationService();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler.onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
});
export default handler;
