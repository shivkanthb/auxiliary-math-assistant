import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { RefreshIconComponent, ImageIconComponent } from "../assets/icons";
import * as ImageManipulator from "expo-image-manipulator";

export default function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  let camera;

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
    await compressImageAndSendToNewScreen(pickerResult.uri);
  };

  let compressImageAndSendToNewScreen = async (uri) => {
    try {
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 300 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.PNG }
      );
      console.log("Manipulated", resizedPhoto);
      const resizedB64 = await FileSystem.readAsStringAsync(resizedPhoto.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      navigation.navigate("Details", {
        uri: resizedPhoto.uri,
        b64: resizedB64,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Camera
        ref={(ref) => {
          camera = ref;
        }}
        style={{ flex: 1 }}
        type={type}
      >
        <CameraContainer>
          <Wrapper>
            <PickImageContainer onPress={openImagePickerAsync}>
              <ImageIconComponent style={{ color: "#FFF" }} />
            </PickImageContainer>
            <CameraButtonContainer
              onPress={async () => {
                if (camera) {
                  let photo = await camera.takePictureAsync();
                  console.log("Photo", photo);
                  try {
                    const resizedPhoto = await ImageManipulator.manipulateAsync(
                      photo.uri,
                      [{ resize: { width: 300 } }],
                      { compress: 0.7, format: ImageManipulator.SaveFormat.PNG }
                    );
                    console.log("Manipulated", resizedPhoto);
                    const resizedB64 = await FileSystem.readAsStringAsync(
                      resizedPhoto.uri,
                      {
                        encoding: FileSystem.EncodingType.Base64,
                      }
                    );
                    navigation.navigate("Details", {
                      uri: resizedPhoto.uri,
                      b64: resizedB64,
                    });
                  } catch (err) {
                    console.log(err);
                  }
                }
              }}
            >
              <CameraButton />
            </CameraButtonContainer>
            <FlipButtonContainer
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <RefreshIconComponent style={{ color: "#FFF" }} />
            </FlipButtonContainer>
          </Wrapper>
        </CameraContainer>
      </Camera>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const CameraContainer = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 50px;
`;
const CameraButton = styled.View`
  border-width: 2px;
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-color: white;
  /* margin-bottom: 50px; */
`;

const FlipButtonContainer = styled.TouchableOpacity`
  display: flex;
`;

const PickImageContainer = styled.TouchableOpacity`
  display: flex;
`;

const CameraButtonContainer = styled.TouchableOpacity`
  display: flex;
`;

const Wrapper = styled.View`
  height: 70px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;
