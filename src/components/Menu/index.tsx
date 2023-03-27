import { FlatList } from "react-native";
import { Product, Image, ProductDetails } from "./styles";
import { Text } from "../Text/Text";

import { products } from "../../mocks/products";

export const Menu = () => {
  return (
    <FlatList
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      data={products}
      keyExtractor={(products) => products._id}
      renderItem={({ item: product }) => (
        <Product>
          <Image
            source={{ uri: `http://localhost:3001/${product.imagePath}` }}
          />

          <ProductDetails>
            <Text>{product.name}</Text>
            <Text>{product.description}</Text>
            <Text>{product.price}</Text>
          </ProductDetails>
        </Product>
      )}
    />
  );
};
