import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from '../hooks/useCart';
import productsData from "../data/products.json";
import { Flex, Text, Button } from "@radix-ui/themes";
import { TrashIcon } from '@radix-ui/react-icons';
import ImageSlider from "./ImageSlider";
import { Product } from '../types/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('28mm');

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id.toString() === productId);
    setProduct(foundProduct);
  }, [productId]);

  const isProductInCart = (productId: number, size: string) => {
    return cartItems.some(item => item.id === productId && item.size === size);
  };

  const productQuantity = cartItems.find(item => item.id === product?.id && item.size === selectedSize)?.quantity || 0;

  if (!product) return <Text>Loading...</Text>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1, size: selectedSize });
  };

  return (
    <Flex
      direction={{ initial: 'column', lg: 'row' }}
      align="center"
      justify="between"
      gap="4"
      px="5"
      py="6"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Flex style={{ flex: '1', paddingRight: '20px' }}>
        <ImageSlider images={product.images} onImageClick={() => {}} />
      </Flex>

      <Flex direction="column" flexBasis="1" style={{ paddingLeft: '20px' }}>
        <Text size="6" weight="bold" mb="4">{product.name}</Text>
        <Text mb="4" style={{ color: '#666', lineHeight: '1.6' }}>{product.description}</Text>
        <Text size="4" weight="medium" mb="6">${product.price.toFixed(2)}</Text>

        <Text mb="1" style={{ color: '#666', lineHeight: '1.6' }}>Case size:</Text>
        <Select
          value={selectedSize}
          onValueChange={setSelectedSize}
        >
          <SelectTrigger
            aria-label="Case Size"
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <SelectValue placeholder="Select Case Size" />
          </SelectTrigger>
          <SelectContent>
            {product.sizes.map((size) => (
              <SelectItem value={size} key={size}>{size}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isProductInCart(product.id, selectedSize) ? (
          <>
            <Text mb="1" mt="4" style={{ color: '#666', lineHeight: '1.6' }}>Quantity:</Text>
            <Flex align="center">
              <Button
                color="violet"
                onClick={() => updateQuantity(product.id, selectedSize, -1)}
                disabled={productQuantity <= 1}
                style={{ width: '26px', height: '26px' }}
              >
                -
              </Button>
              <Text mx="3" size="2" weight="medium">{productQuantity}</Text>
              <Button
                color="violet"
                onClick={() => updateQuantity(product.id, selectedSize, 1)}
                style={{ width: '26px', height: '26px' }}
              >
                +
              </Button>
              <div onClick={() => removeFromCart(product.id, selectedSize)} style={{ marginLeft: '10px' }}>
                <TrashIcon style={{ color: 'white', width: '20px', height: '20px' }} />
              </div>
            </Flex>
          </>
        ) : (
          <Button onClick={handleAddToCart} style={{ marginTop: '20px' }}>
            Add to Cart
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductDetails;
