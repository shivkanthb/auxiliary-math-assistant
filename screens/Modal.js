import React, { useEffect, useState } from "react";
import {
  StatusBar,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import MathJax from "react-native-mathjax";
import Card from "../components/Card";

export default function ModalScreen({ route, navigation }) {
  const { urlEncodedInput, inputString } = route.params;
  console.log("Input encoded: ", urlEncodedInput);
  console.log("Input String: ", inputString);
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
      const url = "https://aarmusk.api.stdlib.com/wolfreealpha@dev/";
      let response = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setApiResult(result.queryresult);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const Results = () => {
    const numPods = apiResult.numpods;
    const pods = apiResult.pods;
    console.log(pods);
    const render = pods
      .map((pod, index) => {
        return <Text>{pod.title}</Text>;
      })
      .join("");
    console.log(render);
    return <Text>Hello</Text>;
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#333" />
          </LoadingContainer>
        ) : (
          <ResultContainer>
            {apiResult.pods.map((pod, index) => {
              return <Card key={index} pod={pod} />;
            })}
          </ResultContainer>
        )}
      </ScrollView>
    </Container>
  );
}

const LoadingContainer = styled.View`
  margin-top: 70px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: blue;
`;

const ResultContainer = styled.View`
  margin-top: 90px;
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
