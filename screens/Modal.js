import React, { useState, useEffect } from "react";
import {
  Image,
  ActivityIndicator,
  Text,
  Button,
  View,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components";
import { XCircleComponent } from "../assets/icons";

export default function ModalScreen({ route, navigation }) {
  const { urlEncodedInput } = route.params;
  console.log("Input", urlEncodedInput);
  const WOLFRAMALPHA_URL =
    "https://www.wolframalpha.com/input/?i=" + urlEncodedInput;

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <>
      <SolutionContainer>
        <DismissContainer onPress={() => navigation.goBack()}>
          <XCircleComponent style={{ color: "#333" }} />
        </DismissContainer>
        <WebView
          source={{ uri: WOLFRAMALPHA_URL }}
          style={{ marginTop: 70, flex: 1, width: "100%" }}
        />
      </SolutionContainer>
      {/* </SafeAreaView> */}
    </>
  );
}

const SolutionContainer = styled.View`
  flex: 1;
`;

const DismissContainer = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  right: 10px;
  z-index: 10000;
`;
