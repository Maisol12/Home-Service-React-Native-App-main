import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Linking, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";
import BusinessPhotos from "./BusinessPhotos";
import BusinessAboutMe from "./BusinessAboutMe";
import RatingCourses from "../../Components/RatingCourses";

export default function BusinessDetailsBooked() {
  const route = useRoute();
  const navigation = useNavigation();
  const business = route.params.business;
  const booking = route.params.booking;
  const [showModal, setShowModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    console.log('booking', booking)
    if (booking && booking.bookingStatus) {
      console.log("Business booking status:", booking.bookingStatus);
      setIsCompleted(booking.bookingStatus === "Completed");
    }
  }, [booking]);
  

  const onMessageBtnClick = () => {
    Linking.openURL(`mailto:${business?.email}?subject=Hola, estoy buscando ayuda acerca del curso,`);
  }

  return (
    business && (
      <View>
        <ScrollView style={{ height: "91%" }}>
          <TouchableOpacity
            style={styles.backBtnContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: business?.images[0]?.url }}
            style={{ width: "100%", height: 300 }}
          />
          <View style={styles.infoContainer}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
              {business?.name}
            </Text>
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  color: Colors.PRIMARY,
                  fontSize: 20,
                }}
              >
                {business?.contactPerson} 🌟{" "}
              </Text>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  backgroundColor: Colors.PRIMARY_LIGHT,
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 14,
                }}
              >
                {business?.category?.name}
              </Text>
            </View>
            <Text
              style={{ fontSize: 17, fontFamily: "outfit", color: Colors.GRAY }}
            >
              <Ionicons
                name="ios-location-sharp"
                size={25}
                color={Colors.PRIMARY}
              />
              {business?.address}
            </Text>

            {/* Horizontal Line  */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>

            {/* About Me Section  */}
            <BusinessAboutMe business={business} />

            {/* Horizontal Line  */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>

            <BusinessPhotos business={business} />

            {/* Horizontal Line  */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>

            {isCompleted && (
              <View>
                <Text style={{ fontSize: 20, fontFamily: "outfit-medium" }}>
                  Calificar curso
                </Text>
                <RatingCourses business={business} />
              </View>
            )}
          </View>
        </ScrollView>
        <View style={{
          display: "flex",
          flexDirection: "row",
          margin: 8,
          gap: 8,
        }}>
          <TouchableOpacity
            style={styles.messagebtn}
            onPress={() => onMessageBtnClick()}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: Colors.WHITE,
                fontSize: 18,
              }}
            >
              Mensaje
            </Text>
          </TouchableOpacity>
        </View>

        
      </View>
    )
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
    paddingTop: 60,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  messagebtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
});
