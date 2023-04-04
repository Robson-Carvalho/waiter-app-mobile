import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
} from "./style";
import { Header } from "../components/Header";

import { Categories } from "../components/Categories";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { Cart } from "../components/Cart";
import { useState } from "react";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";

export const Main = () => {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  const handleCancelOrder = () => {
    setSelectedTable("");
    setCartItems([]);
  };

  const handleAddToCart = (product: Product) => {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  };

  const handleDecremenetCartItem = (product: Product) => {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  };

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu onAddToCart={handleAddToCart} />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecremenetCartItem}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
};
