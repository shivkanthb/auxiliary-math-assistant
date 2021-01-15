import React from "react";
import { StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

export default function ModalScreen({ route, navigation }) {
  const { urlEncodedInput } = route.params;
  console.log("Input", urlEncodedInput);
  const WOLFRAMALPHA_URL =
    "https://www.wolframalpha.com/input/?i=" + urlEncodedInput;

  return (
    <SolutionContainer>
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
      <WebView
        source={{ uri: WOLFRAMALPHA_URL }}
        style={{ marginTop: 70, flex: 1, width: "100%" }}
      />
    </SolutionContainer>
  );
}

const SolutionContainer = styled.View`
  flex: 1;
`;

const DismissContainer = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
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
