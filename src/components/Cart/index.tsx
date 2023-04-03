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

interface CartProps {
  cartItems: CartItem[];
}

export const Cart = ({ cartItems }: CartProps) => {
  return (
    <>
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
              <TouchableOpacity style={{ marginRight: 24 }}>
                <PlusCircle />
              </TouchableOpacity>
              <TouchableOpacity>
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
                {formatCurrency(87)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          disabled={cartItems.length > 0 ? false : true}
          onPress={() => alert("oi")}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
};
