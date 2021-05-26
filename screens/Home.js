import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { RefreshIconComponent, ImageIconComponent } from "../assets/icons";
import * as ImageManipulator from "expo-image-manipulator";
import BottomSheet from "reanimated-bottom-sheet";
import Constants from "expo-constants";

const { MATHPIX_API_ENDPOINT, MATHPIX_API_KEY, MATHPIX_APP_ID } =
  Constants.manifest.extra;

export default function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deviceOrientation, setDeviceOrientation] = useState("portrait");
  const sheetRef = React.useRef(null);
  const [resizedPhotoUri, setResizedPhotoUri] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [asciiMathData, setAsciiMathData] = useState(null);
  const [imageProcessing, setImageProcessing] = useState(false);
  const INITIAL_PROCESSINGERROR = {
    error: false,
    message: null,
  };
  const [processingError, setProcessingError] = useState(
    INITIAL_PROCESSINGERROR
  );

  const resetMathPixStates = () => {
    setAsciiMathData(null);
    setImageProcessing(false);
    setProcessingError(INITIAL_PROCESSINGERROR);
  };

  const computeMathOCR = ({ b64 }) => {
    const API_HEADERS = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        app_id: MATHPIX_APP_ID,
        app_key: MATHPIX_API_KEY,
      },
    };

    const API_SETTINGS = {
      settings: {
        method: "POST",
        body: JSON.stringify({
          src: "data:image/jpeg;base64," + b64,
          formats: ["text", "data", "html"],
          data_options: {
            include_asciimath: true,
            include_latex: false,
          },
        }),
      },
    };

    fetch(MATHPIX_API_ENDPOINT, {
      ...API_HEADERS,
      ...API_SETTINGS.settings,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data));
        try {
          let asciimathArray = data.data;
          if (!asciimathArray || asciimathArray.length == 0) {
            throw "No mathematical input recognized";
          } else {
            const asciimathValues = asciimathArray.map((item) => {
              return item.value;
            });
            console.log("asciimath", asciimathValues);
            setAsciiMathData(asciimathValues.join());
            setImageProcessing(false);
          }
        } catch (err) {
          setProcessingError({
            error: "true",
            message: err,
          });
          setImageProcessing(false);
        }
      })
      .catch((err) => {
        console.log("Error making the API call", JSON.stringify(err));
        setProcessingError({ error: true, message: err.message });
        setImageProcessing(false);
      });
  };

  const renderContent = () => (
    <BottomSheetContainer>
      <Cover>
        <CoverImage source={{ uri: resizedPhotoUri }} />
      </Cover>
      {imageProcessing ? (
        <ActivityIndicator size="small" style={{ marginTop: 30 }} />
      ) : (
        <View style={{ padding: 20 }}>
          {processingError.error ? (
            <Header>{processingError.message}</Header>
          ) : (
            <>
              <Header>Solve</Header>
              <TextInput
                value={asciiMathData}
                onFocus={() => {
                  sheetRef.current.snapTo(0);
                }}
                onSubmitEditing={() => {
                  sheetRef.current.snapTo(1);
                }}
                style={{
                  fontSize: 18,
                }}
                onChangeText={(text) => setAsciiMathData(text)}
              />
              <Calculate
                onPress={() => {
                  navigation.navigate("MyModal", {
                    inputString: asciiMathData,
                  });
                }}
              >
                <CalcText>Calculate</CalcText>
              </Calculate>
            </>
          )}
        </View>
      )}
    </BottomSheetContainer>
  );

  const renderHeader = () => (
    <View
      style={{
        backgroundColor: "#FFF",
        shadowColor: "#000000",
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#00000040",
            marginBottom: 10,
          }}
        />
      </View>
    </View>
  );

  /**
   * Returns true if the screen is in portrait mode
   */
  const isPortrait = () => {
    const dim = Dimensions.get("screen");
    return dim.height >= dim.width;
  };

  /**
   * Returns true of the screen is in landscape mode
   */
  const isLandscape = () => {
    const dim = Dimensions.get("screen");
    return dim.width >= dim.height;
  };

  // Event Listener for orientation changes
  Dimensions.addEventListener("change", () => {
    // console.log("Orientation CHANGE ", isPortrait() ? "portrait" : "landscape");
    if (isLandscape()) {
      // setDeviceOrientation("landscape");
    } else {
      setDeviceOrientation("portrait");
    }
  });

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
    let permissionResult =
      await ImagePicker.requestCameraRollPermissionsAsync();

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

  let compressImageAndSendToNewScreen = async (uri, clipImage = false) => {
    setImageProcessing(true);
    setIsSheetOpen(true);
    let manipulatorOptions = [];
    if (clipImage) {
      manipulatorOptions = [
        { resize: { width: Dimensions.get("window").width } },
        {
          crop: {
            originX: 0,
            originY: 200,
            width: Dimensions.get("window").width,
            height: 200,
          },
        },
      ];
    } else {
      manipulatorOptions = [{ resize: { width: 300 } }];
    }
    try {
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        uri,
        manipulatorOptions,
        { compress: 0.7, format: ImageManipulator.SaveFormat.PNG }
      );
      const resizedB64 = await FileSystem.readAsStringAsync(resizedPhoto.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setResizedPhotoUri(resizedPhoto.uri);
      sheetRef.current.snapTo(1);
      computeMathOCR({ b64: resizedB64 });
      // navigation.navigate("Details", {
      //   uri: resizedPhoto.uri,
      //   b64: resizedB64,
      // });
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
        {deviceOrientation === "portrait" ? (
          isSheetOpen ? (
            <OpacityLayout />
          ) : (
            <>
              <LayerTop />
              <LayerCenter>
                <LayerCenterFocussed />
              </LayerCenter>
              <LayerBottom />
            </>
          )
        ) : (
          <></>
        )}
        <CameraContainer isSheetOpen={isSheetOpen}>
          <Wrapper>
            <PickImageContainer onPress={openImagePickerAsync}>
              <ImageIconComponent style={{ color: "#FFF" }} />
            </PickImageContainer>
            <CameraButtonContainer
              onPress={async () => {
                if (camera) {
                  let photo = await camera.takePictureAsync();
                  await compressImageAndSendToNewScreen(photo.uri, true);
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

      <BottomSheet
        ref={sheetRef}
        initialSnap={2}
        snapPoints={[700, 400, 0]}
        borderRadius={40}
        renderContent={renderContent}
        enabledBottomInitialAnimation={false}
        onOpenStart={() => {
          setIsSheetOpen(true);
        }}
        onCloseEnd={() => {
          resetMathPixStates();
          setIsSheetOpen(false);
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const CameraContainer = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(p) => (p.isSheetOpen ? "transparent" : "transparent")};
  flex-direction: row;
  align-items: flex-end;
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
  z-index: 10;
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
  background-color: transparent;
  margin-bottom: 50px;
`;

const LayerTop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: 200px;
  width: 100%;
  background-color: "rgba(0, 0, 0, .6)";
`;

const LayerCenter = styled.View`
  display: flex;
  flex-direction: column;
  top: 200px;
  height: 200px;
`;

const OpacityLayout = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: "rgba(0, 0, 0, .8)";
`;

const LayerBottom = styled.View`
  position: absolute;
  top: 400px; /* 200 + 200 */
  left: 0;
  width: 100%;
  flex-grow: 1; /* crucial! fills up the remaining space at the bottom */
  height: 100%;
  background-color: "rgba(0, 0, 0, .6)";
`;

const LayerCenterFocussed = styled.View`
  height: 100%;
  width: 100%;
`;

const Header = styled.Text`
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 10px;
`;

const Calculate = styled.TouchableOpacity`
  margin-top: 20px;
  width: 100%;
  height: 54px;
  border-radius: 10px;
  background-color: #000;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const CalcText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;

const Cover = styled.View`
  height: 200px;
`;

const CoverImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const CapturedImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const BottomSheetContainer = styled.View`
  background-color: #fff;
  height: 700px;
`;
