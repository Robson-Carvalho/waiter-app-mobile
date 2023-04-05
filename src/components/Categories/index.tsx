import { FlatList } from "react-native";

import { CategoryContainer, Icon } from "./styles";
import { Text } from "../Text/Text";

import { useState } from "react";
import { Category } from "../../types/Category";

interface CategoryProps {
  categories: Category[];
  onSelecetCaregory: (categoryId: string) => Promise<void>;
}

export const Categories = ({
  categories,
  onSelecetCaregory,
}: CategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectCategory = (categoryId: string) => {
    const category = selectedCategory === categoryId ? "" : categoryId;

    onSelecetCaregory(category);
    setSelectedCategory(category);
  };

  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 24 }}
        data={categories}
        keyExtractor={(category) => category._id}
        renderItem={({ item: category }) => {
          const isSelected = selectedCategory === category._id;

          return (
            <CategoryContainer
              onPress={() => handleSelectCategory(category._id)}
            >
              <Icon>
                <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
              </Icon>
              <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
                {category.name}
              </Text>
            </CategoryContainer>
          );
        }}
      />
    </>
  );
};
