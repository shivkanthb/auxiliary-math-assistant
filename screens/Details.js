import React, { useState, useEffect } from "react";
import { Image, ActivityIndicator, Text } from "react-native";
import styled from "styled-components";
import Constants from "expo-constants";
// import { MATHPIX_API_ENDPOINT, MATHPIX_APP_ID, MATHPIX_API_KEY } from "@env";

export default function DetailsScreen({ route, navigation }) {
  const [imageProcessing, setImageProcessing] = useState(true);
  const [processingError, setProcessingError] = useState({
    error: false,
    message: null,
  });
  const [asciiMathData, setAsciiMathData] = useState(null);
  const { MATHPIX_API_ENDPOINT, MATHPIX_API_KEY, MATHPIX_APP_ID } =
    Constants.manifest.extra;
  const { uri, b64 } = route.params;

  useEffect(() => {
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
          }
        } catch (err) {
          setProcessingError({
            error: "true",
            message: err,
          });
        }
      })
      .catch((err) => {
        console.log("Error making the API call", JSON.stringify(err));
        setProcessingError({ error: true, message: err.message });
      });
  }, []);
  if (imageProcessing && !asciiMathData && !processingError.error) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" />
      </LoadingContainer>
    );
  }

  if (processingError.error) {
    return (
      <DetailsContainer>
        <ErrorText>{processingError.message}</ErrorText>
      </DetailsContainer>
    );
  }

  const urlEncodedInput = encodeURIComponent(asciiMathData);
  console.log("urlEncodedData", urlEncodedInput);

  return (
    <DetailsContainer>
      <Image
        source={{ uri: uri }}
        style={{
          height: 200,
          width: "100%",
          resizeMode: "contain",
        }}
      />
      <CodeContainer>
        <QuestionTitle>Solve</QuestionTitle>
        <QuestionSection>{asciiMathData}</QuestionSection>
        <CalcContainer
          onPress={() => {
            navigation.navigate("MyModal", {
              urlEncodedInput: urlEncodedInput,
              inputString: asciiMathData,
            });
          }}
        >
          <Calculate>
            <CalcText>Calculate</CalcText>
          </Calculate>
        </CalcContainer>
      </CodeContainer>
    </DetailsContainer>
  );
}

const DetailsContainer = styled.View`
  flex: 1;
`;

const ErrorText = styled.Text`
  flex: 1;
  text-align: center;
  margin: 100px 0;
  font-weight: 500;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CodeContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const QuestionTitle = styled.Text`
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 32px;
  font-weight: 800;
`;

const QuestionSection = styled.Text`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 70px;
`;

const CalcContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Calculate = styled.View`
  width: 90%;
  height: 54px;
  margin: auto;
  border-radius: 5px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const CalcText = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;
