import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React from "react";
import { Formik } from "formik";

const Form = () => {
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.formcont}>
          <View style={styles.inputlabel}>
            <Text>Description</Text>
          </View>
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            style={styles.textInput}
            multiline={true}
          />
          <View>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Form;

const styles = StyleSheet.create({
  formcont: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 150,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    width: "80%",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 20,
  },
  inputlabel: {
    width: "80%",
    margin: 10,
  },
});
