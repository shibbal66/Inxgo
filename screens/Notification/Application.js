import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import wallet from "../../style/wallet";
import image_upload from "../../assets/Frame.png";
import rightarrow from "../../assets/rightarrow.png";
import { Regular } from "../../constants/fonts";

const Application = ({ navigation }) => {
  const detailJob = async (path) => {
    console.log(path);
    // navigation.navigate('Detail');
    navigation.navigate(path);
  };

  return (
    <View
      style={{
        marginTop: "10%",
        marginRight: "2%",
        marginLeft: "2%",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: "row", width: "100%", marginTop: 20 }}>
        <Image style={wallet.image} source={image_upload} />
        <View style={wallet.LeftContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18,fontFamily:Regular}}>John Will</Text>
          </View>
          <Text style={{ fontSize: 12, fontFamily:Regular}}>Plumber  |  26 May, 2023</Text>
        </View>
        <View style={wallet.RightContainer}>
          <TouchableOpacity onPress={() => detailJob("Detail")}>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
              <Image
                style={{ marginTop: 10, width: 15, height: 15 }}
                source={rightarrow}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 10, width: "95%", flexDirection: "row" }}>
        <View
          style={{
            width: "42%",
            marginLeft: "20%",
            flexDirection: "row",
            backgroundColor: "#EEF4FF",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize:9, color: "#4985FF",fontFamily:Regular }}>
            Application Sent
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", width: "100%", marginTop: 20 }}>
        <Image style={wallet.image} source={image_upload} />
        <View style={wallet.LeftContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18 ,fontFamily:Regular}}>Shabaz Dogar</Text>
          </View>
          <Text style={{ fontSize: 12,fontFamily:Regular}}>Plumber  |  26 May, 2023</Text>
        </View>
        <View style={wallet.RightContainer}>
          <TouchableOpacity onPress={() => detailJob("Detail")}>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
              <Image
                style={{ marginTop: 10, width: 15, height: 15 }}
                source={rightarrow}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 10, width: "95%", flexDirection: "row" }}>
        <View
          style={{
            width: "42%",
            marginLeft: "20%",
            flexDirection: "row",
            backgroundColor: "#EEF4FF",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize:9, color: "#FFC44D",fontFamily:Regular }}>
            Application Pending
          </Text>
        </View>
      </View>
      {/* Repeat similar views for other applications */}
    </View>
  );
};

export default Application;
