import React, { useState, useEffect } from "react";
import { Image, ActivityIndicator, Text, Button, View } from "react-native";
import styled from "styled-components";
import { MATHPIX_API_ENDPOINT, MATHPIX_APP_ID, MATHPIX_API_KEY } from "@env";

export default function DetailsScreen({ route, navigation }) {
  const [imageProcessing, setImageProcessing] = useState(true);
  const [processingError, setProcessingError] = useState({
    error: false,
    message: null,
  });
  const [asciiMathData, setAsciiMathData] = useState(null);

  console.log("ENV VALUES", MATHPIX_API_KEY, MATHPIX_APP_ID);
  const { uri, b64 } = route.params;
  console.log("uri", uri);

  useEffect(() => {
    console.log("Executed now");

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
        console.log("Data obtained");
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
        <Text>{processingError.message}</Text>
      </DetailsContainer>
    );
  }

  const urlEncodedInput = encodeURIComponent(asciiMathData);
  console.log("urlEncodedData", urlEncodedInput);

  return (
    <DetailsContainer>
      <Image
        source={{ uri: uri }}
        style={{ height: "80%", width: "100%", resizeMode: "cover" }}
      />
      <CodeContainer>
        <QuestionTitle>To Solve:</QuestionTitle>
        <Text>{asciiMathData}</Text>
        <CalculateButton
          onPress={() => {
            console.log("Calculate button clicked");
            navigation.navigate("MyModal", {
              urlEncodedInput: urlEncodedInput,
            });
          }}
          title="Calculate"
          color="#841584"
        />
      </CodeContainer>
    </DetailsContainer>
  );
}

const DetailsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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

const CalculateButton = styled.Button`
  flex: 1;
`;

const QuestionTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;
