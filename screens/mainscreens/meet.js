import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Picker,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addSlot, meetLinkChange } from "../../axios/meet";

const { width, height } = Dimensions.get("window");

const Meet = ({ navigation }) => {
  const [linkVisible, setLinkVisible] = useState(false);
  const [meetLink, setMeetLink] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dates, setDates] = useState("");
  const [noOfSlots, setNoOfSlots] = useState([]);

  const [initialFormValues, setInitialFormValues] = useState({
    time_slot0: "",
    time_slot0_am_pm: "AM",
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const hideDatePicker = () => {
    console.log(dates, "da");
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    var strng = date.toLocaleString();
    setDates(strng.slice(0, strng.indexOf(",")));
    hideDatePicker();
  };

  class InitialFormValuesClass {
    constructor(slots = 1) {
      for (let i = 0; i < slots; i++) {
        this[`time_slot${i}`] = "";
        this[`time_slot${i}_am_pm`] = "AM";
      }
    }
  }
  const handleLink = async () => {
    console.log(meetLink, email, password, "ss");
    setLinkVisible(true);
  };
  const handleMeetSubmit = async () => {
    await meetLinkChange(meetLink, email, password);
    setLinkVisible(false);
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingTop: 50,
        position: "relative",
        //   backgroundColor: "red",
      }}
    >
      <View style={{width:width/1.14, alignSelf: 'center', position: 'absolute',top: '10%'}}>
        <Text style={{alignSelf:'flex-start', fontSize: 25,fontWeight: 'bold', borderBottomColor: '#000', borderBottomWidth: 3, borderRadius: 10, }}>Schedule Meet</Text>
      </View>
      <Formik
        initialValues={initialFormValues}
        // validationSchema={forecast_type_schema}
        validateOnMount={true}
        onSubmit={async (values) => {
          console.log(dates, "ki");
          await addSlot(dates, values, meetLink, email);
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <View style={styles.container}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                // flex: 1,
                // backgroundColor: "red",
              }}
            >
              <View style={styles.timeslot}>
                {/* <TouchableOpacity
                  style={styles.btn}
                  onPress={()=>navigation.navigate('ShowRequests')}
                >
                  <Text>See Requests</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setDatePickerVisibility(true)}
                >
                  <Text>{dates ? dates : "Pick Date"}</Text>
                </TouchableOpacity>
                <ScrollView>
                  {noOfSlots &&
                    noOfSlots.map((element, index) => {
                      return (
                        <Box
                          index={index}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                        />
                      );
                    })}
                  {/* {
                      for (let index = 0; index < count; index++) {
                        return <Box />;
                        
                      }
                    } */}
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      setNoOfSlots([...noOfSlots, 1]);
                      console.log(noOfSlots.length);
                      const initial = new InitialFormValuesClass(
                        parseInt(noOfSlots.length + 1)
                      );
                      setInitialFormValues(initial);
                      console.log(initial);
                    }}
                  >
                    <Text>Add Time slot</Text>
                  </TouchableOpacity>
                </ScrollView>

                <Modal
                  style={styles.meet}
                  animationType="slide"
                  transparent={false}
                  visible={linkVisible}
                  onRequestClose={() => {
                    setLinkVisible(!linkVisible);
                  }}
                >
                  <TextInput
                    style={styles.input2}
                    onChangeText={(text) => setMeetLink(text)}
                    value={meetLink}
                    placeholder="meetLink"
                    // keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input2}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email"
                    // keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input2}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholder="password"
                    // keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={handleMeetSubmit}
                  >
                    <Text>Submit</Text>
                  </TouchableOpacity>
                </Modal>

                <TouchableOpacity style={styles.submitbtn} onPress={handleLink}>
                  <Text>Change MeetLink</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitbtn}
                  onPress={handleSubmit}
                >
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
const Box = ({ index, handleChange, handleBlur, values }) => {
  return (
    <View style={styles.box}>
      <TextInput
        style={styles.input}
        onChangeText={handleChange(`time_slot${index}`)}
        onBlur={handleBlur(`time_slot${index}`)}
        value={values[`time_slot${index}`]}
        // placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Picker
        style={styles.pick}
        onValueChange={(itemValue, itemIndex) => {
          handleChange(`time_slot${index}_am_pm`)(itemValue);
        }}
      >
        <Picker.Item label="Select" value="AM" />
        <Picker.Item label="AM" value="AM" />
        <Picker.Item label="PM" value="PM" />
        {/* <Picker.Item label="Select" value="Select" /> */}
      </Picker>
    </View>
  );
};
const styles = StyleSheet.create({
  meet: {
    // height: 400,
    // position: "absolute"
    justifyContent: "center",
    alignItems: "center",
  },
  submitbtn: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderColor: "#00b5ec",
    borderWidth: 3,
  },
  btn: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderColor: "#00b5ec",
    borderWidth: 3,
  },
  pick: {
    width: 100,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeslot: {
    // position: 'absolute',
    width: 400,
    // height: '50%',
    // backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center",
    // justifyContent: 'center',
  },
  slot: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "60%",
  },
  input2: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "90%",
  },
  container: {
    width: width / 1.1,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default Meet;
