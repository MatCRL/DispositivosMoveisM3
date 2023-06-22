import { Image, Box, Button, Icon } from "native-base";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const homeImage = require("../../assets/home.png");

export function Introduction({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#d3effa" }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={homeImage}
            alt="Alternate Text"
            style={styles.background}
          />
        </View>
        <Box alignItems="center" my={10}>
          <Button
            leftIcon={
              <Icon mb="1" as={<AntDesign name="qrcode" />} color="white" />
            }
            my={1}
            onPress={() => navigation.navigate("QRCode")}
          >
            Ler QRCode
          </Button>
          <Button
            leftIcon={
              <Icon mb="1" as={<MaterialIcons name="search" />} color="white" />
            }
            my={1}
            onPress={() => navigation.navigate("Search")}
          >
            Explorar
          </Button>
        </Box>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
