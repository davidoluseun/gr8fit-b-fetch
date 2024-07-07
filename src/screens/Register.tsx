import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
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
import { CTAButton } from '../components/Button';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(4).max(50).label('Name').required('Name is required'),
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
    borderBottomWidth: 1,
    height: 50,
    fontSize: 30,
    marginVertical: 10,
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
  loginRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  login: {
    textDecorationLine: 'underline',
  },
});

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export const Register = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const handleGoToLogin = () => nav.push('Login');

  const handleGoToMainFlow = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const { email, password, name } = values;

      setSubmitting(true);
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        let displayName = name;

        if (displayName.indexOf(' ') >= 0)
          displayName = displayName.split(' ').slice(0, -1)[0];

        await user.updateProfile({ displayName });

        setSubmitting(false);
        nav.replace('Main');
      }
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
            <Text style={styles.titleText}>Sign Up</Text>
          </View>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={SignUpSchema}
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
                    placeholder='Name'
                    autoCorrect={false}
                    autoComplete='off'
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCorrect={false}
                    autoComplete='off'
                    inputMode='email'
                    autoCapitalize='none'
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
                  title='Sign Up'
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>

          <View style={styles.loginRow}>
            <Text>Already have an account? </Text>
            <Pressable onPress={handleGoToLogin}>
              <Text style={styles.login}>Login</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  );
};
