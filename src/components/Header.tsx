import React from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ShoppingCartIcon } from '../assets/icons/shopping-cart.svg';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { useCart } from '../hooks/useCart';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <Flex justify="between" align="center" px="5" py="3" style={{ backgroundColor: '#f8f8f8', borderBottom: '1px solid #eaeaea' }}>
      <Text size="5" weight="bold" style={{ cursor: 'pointer' }} onClick={handleHomeClick}>
        <Logo height="40px" width="200px" />
      </Text>
      <Button
        variant="solid"
        size="3"
        color="violet"
        onClick={handleCartClick}
        style={{ position: 'relative', padding: '8px', display: 'flex', alignItems: 'center' }}
      >
        <ShoppingCartIcon style={{ width: '20px', height: '20px' }} />
        {totalItems > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
              background: '#d83a3a',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
            }}
          >
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Button>
    </Flex>
  );
};

export default Header;
