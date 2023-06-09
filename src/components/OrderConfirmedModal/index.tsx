import { Modal } from "react-native";

import { Container, OkButton } from "./styles";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text/Text";

interface OrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}

export const OrderConfirmedModal = ({
  visible,
  onOk,
}: OrderConfirmedModalProps) => {
  return (
    <Modal visible={visible} animationType="fade">
      <Container>
        <CheckCircle />
        <Text weight="600" color="#fff" size={20} style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>
        <OkButton onPress={onOk}>
          <Text color="#d73035" weight="600">
            Ok
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
};
