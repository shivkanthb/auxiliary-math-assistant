import React from "react";
import styled from "styled-components";
import { Image, View, Text, Dimensions } from "react-native";
import Accordion from "./Accordion";

export default function Card(props) {
  const { pod } = props;
  const subPods = pod.subpods;
  return (
    <Container>
      <Title>{pod.title}</Title>
      {subPods.map((subPod, index) => {
        return (
          <View key={index}>
            {subPod.title && subPod.title.length > 0 ? (
              <SubpodTitle>{subPod.title}</SubpodTitle>
            ) : null}
            <Accordion
              title={subPod.title}
              img={subPod.img}
              plaintext={subPod.plaintext}
            />
            {subPod.plaintext && subPod.plaintext.length > 0 ? (
              <PlainText>{subPod.plaintext}</PlainText>
            ) : null}
          </View>
        );
      })}
    </Container>
  );
}

const Container = styled.View`
  /* background-color: #fff; */
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 32px;
  color: black;
`;

const SubpodTitle = styled.Text`
  font-weight: 700;
  font-size: 18px;
  margin: 20px 0 0 0;
`;

const PlainText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;
