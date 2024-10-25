import React, { useEffect, useState } from "react";
import { Flex, Text, Button, Grid, Container, Card, Heading } from "@radix-ui/themes";
import productsData from "../data/products.json";
import { Product, CartItem } from "../types/types";
import ImageSlider from "./ImageSlider";
import { useCart } from '../hooks/useCart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, removeFromCart, isInCart } = useCart();

  // State to hold selected sizes for each product
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleSizeChange = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size, // Store selected size for the product
    }));
  };

  return (
    <Container size="3" mt="5" px="5">
      <Heading as="h2" size="5" mb="7" align="center" color="gray">
        Our Collection
      </Heading>
      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gapX="6" gapY="6" width="auto">
        {products.map((product) => (
          <Card
            variant="classic"
            style={{
              borderRadius: "12px",
              padding: "24px",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              cursor: 'pointer'
            }}
            key={product.id}
            onClick={() => window.location.href = `/product/${product.id}`}
          >
            <ImageSlider
              images={product.images}
              onImageClick={() => window.location.href = `/product/${product.id}`}
            />
            <Flex direction="column" align="center" mt="4" gap="3">
              <Text size="5" weight="bold">{product.name}</Text>
              <Text color="gray">{product.description}</Text>
              <Text size="4" weight="medium" color="gray">${product.price.toFixed(2)}</Text>

              <Text mb="1" style={{ color: '#666', lineHeight: '1.6' }}>Case size:</Text>

              <div onClick={(e) => e.stopPropagation()}>
                <Select
                  value={selectedSizes[product.id] || product.sizes[0]}
                  onValueChange={(size) => handleSizeChange(product.id, size)}
                >
                  <SelectTrigger aria-label="Case Size" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                    <SelectValue placeholder="Select Case Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem value={size} key={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


              <Button
                variant={isInCart(product.id, selectedSizes[product.id]) ? "surface" : "soft"}
                size="3"
                color="violet"
                onClick={(e) => {
                  e.stopPropagation();
                  const selectedSize = selectedSizes[product.id] || product.sizes[0];
                  if (isInCart(product.id, selectedSize)) {
                    removeFromCart(product.id, selectedSize);
                  } else {
                    addToCart({ ...product, size: selectedSize, quantity: 1 } as CartItem);
                  }
                }}
              >
                {isInCart(product.id, selectedSizes[product.id]) ? "Remove from Cart" : "Add to Cart"}
              </Button>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
