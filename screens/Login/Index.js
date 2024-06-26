import React, { useState, useRef } from "react";
import { TextInput, Button } from "react-native-paper";
import * as Yup from "yup";
import axios from "axios";
const lock = require("../../assets/Lock.png"); // Add lock icon
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Bold } from "../../constants/fonts";
import { Formik } from "formik";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import appStyle from "../../style/login_start";
import signUpStyle from "../../style/SignUp";
import apple from "../../assets/apple.png";
import glogo from "../../assets/glogo.png";
import fblogo from "../../assets/fblogo.png";
import Loading from "../../assets/Loading_icon.gif";
import Toast from "react-native-toast-message";
const openeye = require("../../assets/openeye.png");

import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Regular } from "../../constants/fonts";

const arrow_back = require("../../assets/arrow_back.png");
const blind = require("../../assets/Blind.png");
const openEye = require("../../assets/openeye.png");
const email = require("../../assets/Email.png");

const Index = ({ navigation }) => {

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const [state, setState] = useState({
    color: "black",
    flag: false,
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    number: "",
    passwordVisible: false,
  });

  const handleState = (text, key) => {
    setState({ ...state, [key]: text });
  };
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Login Successfully',
     // text2: 'This is some something 👋'
    });
  }
  const handleResend = () => {
    showToast();
    //startTimer(); // Restart the timer when the "Resend" button is clicked
 };

  const handleSubmit = async (values, formikActions) => {
    let data = new FormData();
    data.append("email", values.email);
    data.append("password", values.password);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://inxgo.com/public/api/signin",
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type header
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Response", response.data);
        // Alert.alert("Success", "Logged in successfully!");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "Invalid email or password.");
      })
      .finally(() => {
        formikActions.setSubmitting(false);
      });
  };

  const togglePasswordVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      passwordVisible: !prevState.passwordVisible,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={appStyle.body}>
          <View
            style={{
              height: responsiveHeight(25),
              width: responsiveWidth(100),
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("StartLogin")}>
              <Image style={appStyle.arrowbacklogin} source={arrow_back} />
            </TouchableOpacity>
            <Toast />
            <Text style={styles.welcomel}>Login to your {"\n"}Account</Text>
          </View>

          <View style={styles.container}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid Email")
                  .required("Email is Required"),
                password: Yup.string()
                  .required("Password is required")
                  .min(6, "Password must be at least 6 characters"),
              })}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <View>
                  <TextInput
                    onChangeText={props.handleChange("email")}
                    onBlur={props.handleBlur("email")}
                    value={props.values.email}
                    placeholder="Email Address"
                    style={styles.input}
                    ref={emailInput}
                  />
                  <Image source={email} style={styles.emailIcon} />
                  {props.touched.email && props.errors.email ? (
                    <Text style={styles.error}>{props.errors.email}</Text>
                  ) : null}
                  <TextInput
                    onChangeText={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                    value={props.values.password}
                    placeholder="Password"
                    secureTextEntry={!state.passwordVisible}
                    style={styles.input}
                    ref={passwordInput}
                  />
                  
                  <View style={styles.lockIconContainer}>
                    <Image source={lock} style={styles.lockIcon} />
                  </View>
                  
                  <TouchableOpacity
                    style={styles.eyeIconContainer}
                    onPress={togglePasswordVisibility}
                  >
                    <Image
                      source={state.passwordVisible ? openEye : blind}
                      style={styles.eyeIcon}
                    />
                    
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate('Forget')} style={{bottom:10}}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>

                  </TouchableOpacity>

                  {props.touched.password && props.errors.password ? (
                    <Text style={styles.error2}>{props.errors.password}</Text>
                  ) : null}

                  <Button
                    onPress={handleResend}
                    mode="contained"
                    loading={props.isSubmitting}
                    disabled={props.isSubmitting}
                    style={{
                      marginTop: 6,
                      backgroundColor: "#FFC44D",
                      fontSize: 14,
                      fontWeight: "500",
                      fontFamily: Regular,
                    }}
                  >
                    Login
                  </Button>
                </View>
              )}
            </Formik>
          </View>

          <View style={styles.cardContainerl}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={signUpStyle.lineText}>or Continue With</Text>
            </TouchableOpacity>
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </View>

          <View style={styles.iContainerl}>
            <TouchableOpacity style={signUpStyle.appButtonSoical}>
              <Image style={appStyle.google} source={apple} />
            </TouchableOpacity>
            <TouchableOpacity style={signUpStyle.appButtonSoical}>
              <Image style={appStyle.google} source={glogo} />
            </TouchableOpacity>
            <TouchableOpacity style={signUpStyle.appButtonSoical}>
              <Image style={appStyle.google} source={fblogo} />
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer3}>
            <Text style={appStyle.signUp}>Don’t have an account? </Text>
            <Text
              onPress={() => navigation.navigate("SignUp")}
              style={styles.TextContainer}
            >
              SignUp
            </Text>
          </View>
          <View style={{ height: responsiveHeight(10) }}></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({
  TextContainer: {
    color: "#FFC44D",
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "Regular",
  },
  container: {
    height: responsiveHeight(40),
    width: responsiveWidth(100),
    // backgroundColor: "black",
    //paddingTop: 1,
    // backgroundColor: "orange",
    padding: 18,
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    margin: 1,
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
    bottom: 5,
  },
  error2: {
    margin: 1,
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
    bottom: 22,
  },
  input: {
    height: 50,
    paddingHorizontal: 40,
    paddingVertical: 2,
    width: "100%",
    fontFamily: Regular,
    borderColor: "#FECD45",
    borderWidth: 2,
    backgroundColor: "#FFF5E1",
    
    marginBottom: 10,
    borderRadius: 10,
  },
  eyeIconContainer: {
    position: "absolute",

    right: 10,
    top: "50%", // Center the eye icon vertically within the password input field
    transform: [{ translateY: -10 }], // Adjust to vertically center the icon
  },
  eyeIcon: {
    width: 20,
    height: 20,
    // bottom:10,
    // position:'absolute'
  },
  loadingIcon: {
    width: 200,
    height: 100,
    alignSelf: "center",
    resizeMode: "stretch",
  },
  emailIcon: {
    width: 18,
    height: 18,
    position: "absolute",
    marginTop: 20,
    marginLeft: 10, //bottom: 47,
    // justifyContent:'flex-start',
    //alignItems:"flex-start",
    //left: 30,
  },
  lockIcon: {
    width: 18,
    height: 18,
    // position:'absolute'
  },
  lockIconContainer: {
    bottom: 45,
    marginLeft: 10,
    // position:'absolute'
  },
  welcomel: {
    marginTop: verticalScale(40),
    fontSize: 40,
    fontFamily:Regular,

    fontFamily: Bold,
    //alignSelf: "center",
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    fontWeight: "600",
    // marginBottom: 20,
    marginLeft: 25,
    height: responsiveHeight(20),
    // backgroundColor:'red'
  },
  cardContainerl: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    //backgroundColor: "green",
    // flexDirection: 'row',
    // marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iContainerl: {
    width: responsiveWidth(100),
    height: responsiveHeight(10),
    //backgroundColor: "blue",
    flexDirection: "row",
    // marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer3: {
    width: responsiveWidth(100),
    height: responsiveHeight(10),
    //  backgroundColor: "red",
    flexDirection: "row",
    // marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  forgotPasswordText: {
    position: 'absolute',
    right: 10, // Adjust this value to position the text correctly
    top: '50%', // Center the text vertically within the password input field
    transform: [{ translateY: -10 }], // Adjust to vertically center the text
    color: '#FFC44D', // Change the color to match your theme
    fontSize: 12, // Adjust the font size as needed
    fontFamily:Regular
  },
});
