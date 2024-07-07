import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

import { CTAButton } from '../components/Button';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(4)
    .label('Password')
    .required('Password is required'),
});

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    marginHorizontal: 50,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 45,
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    height: 50,
    fontSize: 30,
    marginVertical: 10,
    borderBottomWidth: 1,
    fontWeight: '300',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  mainContent: {
    flex: 6,
  },
  signUpRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  signUp: {
    textDecorationLine: 'underline',
  },
});

interface FormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const handleGoToRegistration = () => {
    nav.push('Register');
  };

  const handleGoToMainFlow = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const { email, password } = values;
      setSubmitting(true);
      const { user } = await auth().signInWithEmailAndPassword(email, password);

      setSubmitting(false);
      if (user) nav.replace('Main');
    } catch (error) {
      console.log('login error', error);
      setSubmitting(false);
      Alert.alert('Oops', 'Something went wrong. Please try again later');
    }
  };

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Login</Text>
          </View>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleGoToMainFlow}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                <View style={styles.mainContent}>
                  <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCorrect={false}
                    autoComplete='off'
                    autoCapitalize='none'
                    inputMode='email'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder='Password'
                    autoCorrect={false}
                    autoComplete='off'
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>
                <CTAButton
                  title='Login'
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>

          <View style={styles.signUpRow}>
            <Text>Don't have an account? </Text>
            <Pressable onPress={handleGoToRegistration}>
              <Text style={styles.signUp}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  );
};
