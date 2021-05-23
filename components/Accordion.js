import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function Accordion(props) {
  const { title, img, plaintext } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);
  return (
    <Container>
      <TouchableOpacity onPress={handleClick}>
        <Text style={{ fontWeight: "700" }}>Expand</Text>
      </TouchableOpacity>
      {isOpen ? (
        <View>
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
  margin: 5px 0;
`;
