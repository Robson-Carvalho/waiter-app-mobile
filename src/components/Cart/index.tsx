import { FlatList, TouchableOpacity } from "react-native";
import { Text } from "../Text/Text";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { CartItem } from "../../types/CartItem";
import {
  Item,
  ProductContainer,
  Actions,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer,
} from "./styles";
import { formatCurrency } from "../../utils/formartCurrency";
import { Button } from "../Button";
import { Product } from "../../types/Product";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { useState } from "react";

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
}

export const Cart = ({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder,
}: CartProps) => {
  const [isOrderConfirmedModalVisible, setIsOrderConfirmedModalVisible] =
    useState(false);
  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  const handleConfirmOrder = () => {
    setIsOrderConfirmedModalVisible(true);
  };

  const handleOk = () => {
    onConfirmOrder();
    setIsOrderConfirmedModalVisible(false);
  };

  return (
    <>
      <OrderConfirmedModal
        visible={isOrderConfirmedModalVisible}
        onOk={handleOk}
      ></OrderConfirmedModal>

      <FlatList
        data={cartItems}
        keyExtractor={(cartItems) => cartItems.product._id}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 20, maxHeight: 150 }}
        renderItem={({ item: cartItem }) => (
          <Item>
            <ProductContainer>
              <Image
                source={{
                  uri: `http://192.168.0.105:3001/${cartItem.product.imagePath}`,
                }}
              />
              <QuantityContainer>
                <Text size={14} color="#666">
                  {cartItem.quantity}x
                </Text>
              </QuantityContainer>
              <ProductDetails>
                <Text size={14} weight="600">
                  {cartItem.product.name}
                </Text>
                <Text size={14} color="#666" style={{ marginTop: 4 }}>
                  {formatCurrency(cartItem.product.price)}
                </Text>
              </ProductDetails>
            </ProductContainer>
            <Actions>
              <TouchableOpacity
                style={{ marginRight: 24 }}
                onPress={() => onAdd(cartItem.product)}
              >
                <PlusCircle />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                <MinusCircle />
              </TouchableOpacity>
            </Actions>
          </Item>
        )}
      />
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text weight="600" size={20}>
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          disabled={cartItems.length > 0 ? false : true}
          onPress={handleConfirmOrder}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
};
