import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Accordion(props) {
  const { title, img, plaintext } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);
  return (
    <Container>
      <TouchableOpacity
        onPress={handleClick}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <AntDesign
          name={isOpen ? "caretdown" : "caretright"}
          size={12}
          color="black"
        />
        <Text style={{ fontWeight: "700", marginLeft: 5 }}>Expand</Text>
      </TouchableOpacity>
      {isOpen ? (
        <View style={{ marginTop: 10 }}>
          <Image
            source={{
              uri: img?.src,
            }}
            style={{
              height: img.height,
              resizeMode: "contain",
            }}
          />
        </View>
      ) : null}
    </Container>
  );
}

const Container = styled.View`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
`;
