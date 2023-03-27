import styled from "styled-components/native";
import { StatusBar } from "react-native";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
`;
