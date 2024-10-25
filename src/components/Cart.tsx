import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text, Button, Separator } from '@radix-ui/themes';
import { useCart } from '../hooks/useCart';
import { TrashIcon } from '@radix-ui/react-icons';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <Flex direction="column" px="4" py="6" gap="6" style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <Text size="6" weight="bold" style={{ marginBottom: '20px', textAlign: 'center' }}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text size="4" style={{ textAlign: 'center', color: '#888' }}>Your cart is empty.</Text>
      ) : (
        cartItems.map((item) => (
          <Flex
            key={`${item.id}-${item.size}`}
            direction={{ initial: 'column', md: 'row' }}
            align="center"
            justify="between"
            py="4"
            style={{
              gap: '20px',
              padding: '16px',
              border: '1px solid #eee',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              width: '100%',
            }}
          >
            <Link to={`/product/${item.id}`} style={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.images[0]} alt={item.name} style={{ height: '100px', objectFit: 'contain', width: '200px', borderRadius: '10px', marginRight: '16px' }} />
            </Link>

            <Flex direction="column" gap="2" style={{ textAlign: 'center', flex: 1 }}>
              <Link to={`/product/${item.id}`} style={{ flex: 1 }}>
                <Text size="5" weight="bold" style={{ cursor: 'pointer', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name} - {item.size}
                </Text>
              </Link>
              <Text size="4" weight="medium" style={{ color: '#777' }}>
                ${item.price.toFixed(2)}
              </Text>
            </Flex>

            <Flex direction="row" align="center" gap="4" justify={{ initial: 'center', md: 'end'}} style={{ width: '100%', marginTop: '10px' }}>
              <Flex align="center" gap="2" style={{ width: '120px', justifyContent: 'space-between' }}>
                <Button
                  color="violet"
                  onClick={() => updateQuantity(item.id, item.size, -1)}
                  disabled={item.quantity === 1}
                  style={{ width: '36px', height: '36px', borderRadius: '4px', fontSize: '16px' }}
                >
                  -
                </Button>
                <Text size="4" weight="medium" style={{ width: '24px', textAlign: 'center' }}>{item.quantity}</Text>
                <Button
                  color="violet"
                  onClick={() => updateQuantity(item.id, item.size, 1)}
                  style={{ width: '36px', height: '36px', borderRadius: '4px', fontSize: '16px' }}
                >
                  +
                </Button>
              </Flex>
              <Button
                color="ruby"
                onClick={() => removeFromCart(item.id, item.size)}
                style={{ height: '36px', borderRadius: '4px', fontSize: '16px' }}
              >
                <TrashIcon style={{ color: 'white' }} />
              </Button>
            </Flex>
          </Flex>
        ))
      )}

      <Separator style={{ margin: '20px 0', borderColor: '#eee' }} />

      {cartItems.length > 0 && (
        <Flex justify="end">
          <Button variant="solid" color="violet" style={{ padding: '10px 20px', borderRadius: '4px', fontSize: '18px' }} onClick={() => alert("Proceed to Checkout")}>
            Proceed to Checkout
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Cart;
