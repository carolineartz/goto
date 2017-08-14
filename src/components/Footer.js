import React from 'react';
import { Footer, Title, Box, Paragraph, Menu, Anchor } from './grommet';

const MyFooter = () =>
  <Footer justify='between'
    size='large'
    pad={{horizontal: "large", vertical: "xlarge"}}
    colorIndex="brand"
    >
    <Title>
       Title
    </Title>
    <Box direction='row'
      align='center'
      pad={{"between": "medium"}}>
      <Paragraph margin='none'>
        © 2017 Caroline Artz
      </Paragraph>
      <Menu direction='row'
        size='small'
        dropAlign={{"right": "right"}}>
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
  </Footer>

export default MyFooter;
