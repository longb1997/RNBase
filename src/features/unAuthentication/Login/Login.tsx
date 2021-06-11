import {Formik} from 'formik';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {APP_SCREEN, NavigationService} from '@navigations';
import {connect} from 'react-redux';

import {actions} from './redux/reducer';

const validate = Yup.object().shape({
  email: Yup.string().required('Email field is required'),
  password: Yup.string().required('Password field is required'),
});
const Screen = (props: any) => {
  const {onLogin} = props;
  console.log('🚀 ~ file: Login.tsx ~ line 19 ~ Screen ~ onLogin', onLogin);
  const onSignin = (values: any) => {
    onLogin();
    NavigationService.navigate(APP_SCREEN.REGISTER);
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{
            email: 'asdasd',
            password: 'asdas',
          }}
          validationSchema={validate}
          onSubmit={onSignin}>
          {({values, setFieldValue, submitForm}) => {
            return (
              <>
                <TextInput
                  label="Email"
                  value={values.email}
                  onChangeText={(text: string) => {
                    setFieldValue('email', text, false);
                  }}
                />
                <TextInput
                  label="Password"
                  value={values.password}
                  secureTextEntry={true}
                  onChangeText={(text: string) => {
                    setFieldValue('email', text, false);
                  }}
                />
                <Button icon="camera" mode="contained" onPress={submitForm}>
                  Login
                </Button>
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapDispatch = {
  onLogin: actions.onLogin,
};
export const Login = connect(null, mapDispatch)(Screen);
