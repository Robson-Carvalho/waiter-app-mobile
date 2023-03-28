import { FlatList } from "react-native";
import {
  Product,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton,
} from "./styles";
import { Text } from "../Text/Text";

import { PlusCircle } from "../Icons/PlusCircle";

import { formatCurrency } from "../../utils/formartCurrency";

import { products } from "../../mocks/products";

export const Menu = () => {
  return (
    <FlatList
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      data={products}
      keyExtractor={(products) => products._id}
      ItemSeparatorComponent={Separator}
      renderItem={({ item: product }) => (
        <Product>
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
        </Product>
      )}
    />
  );
};
