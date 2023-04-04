import { Container } from "./styles";

import { Text } from "../Text/Text";
import { ActivityIndicator } from "react-native";

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  onPress,
  disabled,
  loading,
}: ButtonProps) => {
  return (
    <Container onPress={onPress} disabled={disabled || loading}>
      {!loading && (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      )}

      {loading && <ActivityIndicator color="#fff" />}
    </Container>
  );
};
