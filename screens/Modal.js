import React, { useEffect, useState } from "react";
import {
  StatusBar,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import Card from "../components/Card";
import Constants from "expo-constants";

const { WOLFREEALPHA_API_ENDPOINT } = Constants.manifest.extra;

export default function ModalScreen({ route, navigation }) {
  const { urlEncodedInput, inputString } = route.params;
  // console.log("Input encoded: ", urlEncodedInput);
  // console.log("Input String: ", inputString);
  const WOLFRAMALPHA_URL =
    "https://www.wolframalpha.com/input/?i=" + urlEncodedInput;
  const [apiResult, setApiResult] = useState();
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWolframResults();
  }, []);

  const getWolframResults = async () => {
    try {
      const data = {
        input: inputString,
      };
      let response = await fetch(WOLFREEALPHA_API_ENDPOINT, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error?.message);
      }
      console.log(result);
      setApiResult(result.queryresult);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setApiError(true);
      setLoading(false);
    }
  };

  return (
    <Container>
      <StatusBar hidden />
      <DismissContainer onPress={() => navigation.goBack()}>
        <CloseView>
          <Ionicons
            name="ios-close"
            size={32}
            style={{ marginLeft: 10, marginTop: 0 }}
          />
        </CloseView>
      </DismissContainer>
      {apiError ? (
        <View style={{ marginTop: 120 }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Something went wrong 🤕
          </Text>
          <WolframButton
            onPress={() =>
              Linking.openURL(
                "https://www.wolframalpha.com/input/?i=" + inputString
              )
            }
          >
            <Text style={{ color: "white", fontSize: 14, fontWeight: "500" }}>
              Try on WolframAlpha
            </Text>
            <EvilIcons name="external-link" size={22} color="white" />
          </WolframButton>
        </View>
      ) : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && !apiError ? (
          <LoadingContainer>
            <ActivityIndicator color="#333" />
          </LoadingContainer>
        ) : (
          <ResultContainer>
            {apiResult?.pods.map((pod, index) => {
              return <Card key={index} pod={pod} />;
            })}
          </ResultContainer>
        )}
      </ScrollView>
    </Container>
  );
}

const LoadingContainer = styled.View`
  flex: 1;
  margin-top: 90px;

  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled.View`
  margin-top: 90px;
  margin-bottom: 30px;
  padding: 0 20px;
`;

const Container = styled.View`
  flex: 1;
`;

const DismissContainer = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 10000;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
`;

const WolframButton = styled.TouchableOpacity`
  padding: 20px 20px;
  max-width: 250px;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 40px auto 0;
  background-color: #ffa530;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
`;
