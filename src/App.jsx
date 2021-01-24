import { Badge, Box, Button, Center, Flex, Grid, GridItem, Heading, Image, Input, Link, Spacer, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

function App() {

  const [state, setState] = useState({
    url: null,
    message: 'Beep boop!',
    username: 'Stinky Bot',
    avatar_url: 'http://l.tom.network/sURJ',
    urlError: false
  })

  function makeRequest() {
    if (state.urlError) return
    axios.post(state.url, {
      content: state.message || 'Beep boop!',
      username: state.username || "Stinky Bot",
      avatar_url: state.avatar_url || "http://l.tom.network/sURJ"
    }, {
      
    })
  }

  return (
    <Center bg='dark' textColor='light' h='100vh' w='100vw'>
      <Box w={[300, 400, 500]} borderRadius='1em' bg='dark' boxShadow='9.01px 9.01px 31px #26292C, -9.01px -9.01px 31px #32353A'>
        <Box bg='accent' borderTopRadius='1em' p='2em'>
          <Heading>Discord webhook debugging tool</Heading>
        </Box>
        <Box bg='dark' p='2em' borderBottomRadius='1em'>
        
          <Box>
            <Flex mb='1em' justifyContent='center' alignItems='center' bg='textarea' boxShadow='inset 4.8px 4.8px 9px #313439, inset -4.8px -4.8px 9px #3B3E45' p="1.5em" border='none' borderRadius='5em' p={5}>
              <Image src={state.avatar_url} borderRadius='50%' h="40px" w="40px" mr={2} />
              <Box>
                <Text fontSize="sm" fontWeight="bold">{state.username} <Badge verticalAlign="top" ml={1} fontSize="14px" bg="discord" color="light">BOT</Badge> </Text>
                <Text fontSize="sm">{state.message}</Text>
              </Box>
            </Flex>
            
            <Grid gap='1em' templateColumns="repeat(2, 1fr)">

              <GridItem colSpan={2}><Input placeholder='Message' focusBorderColor='none' onChange={e => {
                setState(s => ({
                  ...s,
                  message: e.target.value || 'Beep boop!'
                }))
              }} /></GridItem>

              <GridItem colSpan={1}><Input placeholder='Custom username' focusBorderColor='none' onChange={e => {
                setState(s => ({
                  ...s,
                  username: e.target.value || "Stinky Bot"
                }))
              }} /></GridItem>

              <GridItem colSpan={1}><Input placeholder='Custom avatar (url)' focusBorderColor='none' onChange={e => {
                setState(s => ({
                  ...s,
                  avatar_url: e.target.value || "http://l.tom.network/sURJ"
                }))
              }} /></GridItem>

              <GridItem colSpan={2}><Input isInvalid={state.urlError} placeholder='Webhook URL' focusBorderColor='none' onChange={e => {

                const newUrl = e.target.value
                const pattern = /https:\/\/discord.com\/api\/webhooks\/[0-9]+\/[a-zA-Z0-9]+/g
                const valid = newUrl.match(pattern)
                setState(s => ({
                  ...s,
                  url: valid ? newUrl : null,
                  urlError: !valid
                }))

              }}/></GridItem>

              <GridItem colSpan={2}><Button w='100%' bg="accent" border="solid 1px #FD0061" boxShadow='4.8px 4.8px 9px #282B2E, -4.8px -4.8px 9px #303338' borderRadius='5em' _hover={{bg: "dark", color: 'accent'}} onClick={() => makeRequest()}>Send!</Button></GridItem>

              <GridItem colSpan={2} mt='1em' textAlign='center'>Copyright © 2021 <Link color='accent' target="_blank" rel="noreferer" href="https://tommitchelmore.com">Thomas Mitchelmore</Link></GridItem>

            </Grid>
          </Box>

        </Box>
      </Box>
    </Center>
  )
}

export default App
