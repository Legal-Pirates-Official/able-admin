import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    StatusBar,
    Dimensions,
    Modal,
    Button,
    Picker,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Formik } from "formik";
  import * as Yup from "yup";
  import { aboutget, aboutupdate } from "../axios/homeabout.axios";
  
  const HomeaboutDetails = ({
    isModalOpen,
    setIsModalOpen,
    sethomeAbout,
    homeAbout,
  }) => {

    const aboutupdateSchema = Yup.object().shape({
      description: Yup.string().required(),
    });
    return (
      <Modal
        visible={isModalOpen}
        animationType="slide"
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Formik
          initialValues={{
            description: homeAbout.description,
          }}
          onSubmit={(values, actions) => {
            aboutupdate(values).then((res) => {
              setIsModalOpen(false);
              actions.resetForm();
              aboutget().then((res) => {
                sethomeAbout(res.data);
              });
            });
          }}
          validationSchema={aboutupdateSchema}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <ScrollView style={styles.scrollView}>
              <View style={styles.container}>
                <Text style={styles.textHeading}>Home About</Text>
                <View style={styles.inputView}>
                  <Text style={styles.inputlabel}>About Description</Text>
                  <TextInput
                    name="description"
                    multiline={true}
                    style={styles.textInput}
                    onBlur={handleBlur("description")}
                    onChangeText={handleChange("description")}
                    value={values.description}
                  />
                </View>
                <Button
                  style={styles.buttonText}
                  onPress={() => handleSubmit()}
                  title="Submit"
                //   disabled={photo.length === 0}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
      </Modal>
    );
  };
  
  export default HomeaboutDetails;
  
  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: StatusBar.currentHeight,
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
    },
    textHeading: {
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 20,
      textAlign: "center",
      color: "#000",
    },
    textInput: {
      height: 100,
      width: Dimensions.get("window").width / 1.2,
      borderColor: "gray",
      borderWidth: 1,
      textAlignVertical: "top",
      padding: 8,
    },
    inputTag: {
      height: 50,
      width: Dimensions.get("window").width / 1.2,
      borderColor: "gray",
      borderWidth: 1,
      textAlign: "center",
    },
    inputlabel: {
      marginVertical: 8,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 15,
    },
    inputView: {
      flexDirection: "column",
      justifyContent: "space-between",
      margin: 10,
      alignItems: "center",
    },
    buttonTextPicture: {
      padding: 10,
      borderWidth: 1,
      borderColor: "#000",
      margin: 10,
      color: "black",
      fontSize: 20,
      fontWeight: "bold",
      borderRadius: 10,
    },
    buttonText: {
      backgroundColor: "#00b5ec",
      position: "relative",
      padding: 10,
      width: Dimensions.get("window").width / 2,
      margin: 10,
      // paddingBottom: 20,
      left: "50%",
      transform: [{ translateX: -100 }],
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: 10,
    },
    thumbnail: {
      width: 300,
      height: 300,
      resizeMode: "contain",
    },
  });
  