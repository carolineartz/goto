import React from 'react';
import { Footer, Box, Paragraph, Menu, Anchor } from './grommet';
import Logo from './Logo';

const MyFooter = () =>
  <Footer justify='between'
    size='large'
    pad={{horizontal: 'medium', vertical: 'large'}}
    colorIndex="brand"
  >
    <Box size="small">
      <Logo />
    </Box>
    <Box direction='row'
      align='center'
      pad={{'between': 'medium'}}>
      <Paragraph margin='none'>
        © 2017 Caroline Artz
      </Paragraph>
      <Menu direction='row'
        size='small'
        dropAlign={{'right': 'right'}}>
        <Anchor href='#'>
          Support
        </Anchor>
        <Anchor href='#'>
          Contact
        </Anchor>
        <Anchor href='#'>
          About
        </Anchor>
      </Menu>
    </Box>
  </Footer>;

export default MyFooter;
