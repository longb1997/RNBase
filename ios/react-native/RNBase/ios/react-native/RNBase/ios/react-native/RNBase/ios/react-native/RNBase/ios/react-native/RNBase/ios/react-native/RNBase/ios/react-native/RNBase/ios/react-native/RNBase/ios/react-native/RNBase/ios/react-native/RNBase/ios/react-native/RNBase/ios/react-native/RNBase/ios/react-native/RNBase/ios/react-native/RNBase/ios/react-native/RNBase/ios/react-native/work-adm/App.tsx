/* eslint-disable @typescript-eslint/no-shadow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import {Splash} from '@components';
import {CommonText} from '@container';
import {AppContainer, navigate} from '@navigations';
import messaging from '@react-native-firebase/messaging';
import {persistor, store} from '@store';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {AppState, Modal, StyleSheet, View} from 'react-native';
import codePush from 'react-native-code-push';
import 'react-native-gesture-handler';
import {Bar as ProgressBar} from 'react-native-progress';
import PushNotification from 'react-native-push-notification';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import * as LocalNotif from './LocalNotifService';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};
const MIN_BACKGROUND_DURATION_IN_MIN = 30;
// vbhQWzYD9DZBRGICXKWHBMxkCW8F28vb97176 PRODUCTION KEY IOS
// 0LasTkxxcbXhGbVhXBq4W2qPnjp8io0RE4v6F STAGING KEY IOS

// _tLWBsSQXJLo6qClPN6OVzOW6bnikeK37M2hC PRODUCTION ANDROID
// EVx9mLIT3D_LtRTgInmtNA1a3pV1TBQkOrLbG STAGING ANDROID
function App() {
  const [progress, setProgress] = useState<any>(null);
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [appStates, setAppStates] = useState<any>({
    lastBackgroundedTime: 0,
    appState: AppState.currentState,
  });

  const codePushDownloadDidProgress = (progress: any) => {
    const currProgress: number =
      Math.round((progress.receivedBytes / progress.totalBytes) * 100) / 100;
    if (currProgress >= 1) {
      setModalVisible(false);
    } else {
      setProgress(currProgress);
    }
  };
  const codePushStatusDidChange = (syncStatus: any) => {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        setSyncMessage('Checking for update');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setModalVisible(true);
        setSyncMessage('Downloading package');
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        setSyncMessage('AWAITING_USER_ACTION');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        setModalVisible(false);
        setSyncMessage('Installing update');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        setSyncMessage('Up to date');
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        setSyncMessage('Update ignored');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        setSyncMessage('Update installed');
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        setSyncMessage('Somethings wrong');
        break;
    }
  };

  const syncImmediate = useCallback(() => {
    codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
        updateDialog: {
          appendReleaseDescription: true,
          optionalUpdateMessage: 'Updates here..',
          title: 'New Updates',
          optionalInstallButtonLabel: 'Yes',
          optionalIgnoreButtonLabel: 'No',
        },
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
  }, []);

  const handleNotif = (notif: any) => {
    console.log('go here', notif);
    if (!notif.foreground || !notif.userInteraction) {
      return;
    } else {
      navigate(notif.data?.screen);
    }
  };
  useEffect(() => {
    syncImmediate();
    LocalNotif.configure(handleNotif);
  }, [syncImmediate]);

  const _handleAppStateChange = useCallback(
    (nextAppState: string) => {
      console.log('run here');
      const {appState, lastBackgroundedTime} = appStates;

      // Try to run the CodePush sync whenever app comes to foreground
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // Only run the sync if app has been in the background for a certain amount of time
        if (
          moment.duration(moment().diff(lastBackgroundedTime)).asMinutes() >
          MIN_BACKGROUND_DURATION_IN_MIN
        ) {
          // Please show the user some feedback while running this
          // This might take some time, especially if an update is available
          syncImmediate();
          LocalNotif.cancelAllLocalNotifications();
        }
      }

      if (nextAppState.match(/inactive|background/)) {
        setAppStates({
          ...appStates,
          lastBackgroundedTime: moment(),
        });
      }

      if (appState !== nextAppState) {
        setAppStates({
          ...appStates,
          appState: nextAppState,
        });
      }
    },
    [appStates, syncImmediate],
  );

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [_handleAppStateChange]);

  const requestUserPermission = async () => {
    // await messaging().registerDeviceForRemoteMessages();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      messaging()
        .getToken()
        .then(token => {
          console.log('Your Firebase token is: ', token);
        });

      messaging().onTokenRefresh(token => {
        console.log('onTokenRefresh: ', token);
      });

      messaging().onMessage(async remoteMessage => {
        console.log('Notification from foreground', remoteMessage);
        LocalNotif.localNotification({
          message: remoteMessage?.notification?.body,
          title: remoteMessage?.notification?.title,
          userInfo: remoteMessage.data,
        });
      });

      messaging().onNotificationOpenedApp((remoteMessage: any) => {
        console.log(
          'Notification caused app to open from background state: ',
          remoteMessage,
        );
        navigate(remoteMessage.data?.screen);
      });

      messaging()
        .getInitialNotification()
        .then((remoteMessage: any) => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state: ',
              remoteMessage,
            );
            navigate(remoteMessage.data?.screen);
          }
        });
    }
  };

  useEffect(() => {
    requestUserPermission();
    PushNotification.setApplicationIconBadgeNumber(0);
  }, []);

  const RenderModal = () => {
    return (
      <Modal animationType={'fade'} transparent={true} visible={modalVisible}>
        <View style={styles.content}>
          <View style={styles.contentArea}>
            <CommonText style={styles.header}>{syncMessage}</CommonText>
            <ProgressBar
              progress={progress}
              height={10}
              width={200}
              // style={styles.progress}
            />
            <CommonText style={[styles.header, {fontSize: 16}]}>
              {progress * 100 + '%'}
            </CommonText>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate
        loading={<Splash />}
        persistor={persistor}
        // onBeforeLift={() =>
        //   new Promise((resolve) => setTimeout(resolve, 3000))
        // }
      >
        <AppContainer />
        {RenderModal()}
      </PersistGate>
    </Provider>
  );
}
export default codePush(codePushOptions)(App);
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  contentArea: {
    // height:400,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: 300,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
  },
});
