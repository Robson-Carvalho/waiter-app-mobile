import { FlatList } from "react-native";
import { useState } from "react";

import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton,
} from "./styles";

import { Text } from "../Text/Text";
import { PlusCircle } from "../Icons/PlusCircle";
import { formatCurrency } from "../../utils/formartCurrency";
import { ProductModal } from "../ProductModal";
import { products } from "../../mocks/products";
import { Product } from "../../types/product";

export const Menu = () => {
  const [isModalVisible, setIsModalVisble] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  const handleOpenModal = (product: Product) => {
    setIsModalVisble(true);
    setSelectedProduct(product);
  };

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisble(false)}
        product={selectedProduct}
      />

      <FlatList
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        data={products}
        keyExtractor={(products) => products._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.0.105:3001/${product.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text color="#666" size={14} style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text color="#333" weight="600" size={14}>
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>

            <AddToCartButton>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  );
};
