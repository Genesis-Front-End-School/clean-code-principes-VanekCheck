import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { FC } from 'react';
import { useAuthTokenMutation } from 'src/api/auth/hooks';
import { useAuthStore } from 'src/store/useAuthStore';
import { ReactComponent as SunIcon } from 'src/assets/sun.svg';
import { ReactComponent as MoonIcon } from 'src/assets/moon.svg';

const Navbar: FC = () => {
  const { mutate } = useAuthTokenMutation();
  const { isLogged, logout } = useAuthStore();

  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  
  return (
    <Box component='nav'>
      <Flex gap={20} align={'center'} justify={'flex-end'} pr={90}>
        <ActionIcon
          variant='outline'
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme(dark ? 'light' : 'dark')}
          title='Toggle color scheme'
        >
          {dark ? (
            <SunIcon style={{ width: 18, height: 18 }} />
          ) : (
            <MoonIcon style={{ width: 18, height: 18 }} />
          )}
        </ActionIcon>
        {isLogged ? (
          <Text>Anonymous</Text>
        ) : (
          <Button
            onClick={() => {
              mutate();
            }}
            color='gray.6'
          >
            Sign In
          </Button>
        )}
        {isLogged && (
          <Button onClick={logout} variant='light' color='gray.6'>
            Sign out
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
