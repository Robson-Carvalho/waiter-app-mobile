import { Modal, TouchableOpacity, Platform } from "react-native";
import { Overlay, ModalBody, Header, Form, Input } from "./styles";
import { Text } from "../Text/Text";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { useState } from "react";

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export const TableModal = ({ visible, onClose, onSave }: TableModalProps) => {
  const [table, setTable] = useState("");

  const handleSave = () => {
    onSave(table);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              keyboardType="number-pad"
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              onChangeText={setTable}
            />
            <Button disabled={table ? false : true} onPress={handleSave}>
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
};
