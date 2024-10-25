import React from 'react';
import { Flex, Text } from '@radix-ui/themes';

const Footer: React.FC = () => {
  return (
    <Flex justify="center" align="center" px="5" py="3" style={{ backgroundColor: '#f8f8f8', borderTop: '1px solid #eaeaea' }}>
      <Text size="2" color="gray">© 2024 My Watch Store. All rights reserved.</Text>
    </Flex>
  );
};

export default Footer;
