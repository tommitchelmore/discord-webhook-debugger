import { Badge, Box, Button, Center, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Image, Input, Link, Spinner, Switch, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const defaultEmbed = {
  title: "A compelling title",
  description: "An interesting description",
  color: "#ffffff"
}

function App() {

  //Util state
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [embed, setEmbed] = useState(false)
  const [showJSON, setShowJSON] = useState(false)

  //Main app state
  const [state, setState] = useState({
    content: 'Beep boop!',
    username: 'Stinky Bot',
    avatar_url: 'http://l.tom.network/sURJ',
    embeds: [defaultEmbed]
  })

  const [errors, setErrors] = useState({
    color: false,
    url: false,
    content: false,
    title: false,
    description: false  
  })

  function prepareJson(currentState) {
    let newState, embeds;
    if (!embed) ({embeds, ...newState} = currentState)
    else (newState = {...state, embeds: [{...currentState.embeds[0], color: parseInt(currentState.embeds[0].color.slice(1), 16).toString()}]})
    return newState
  }

  function makeRequest() {
    if (errors.url) return
    axios.post(url, prepareJson(state)).then((r) => {
      setLoading(false)
    })
  }

  return (
    <Center background='dark' textColor='light' h='100%' w='100%' my='2em'>
      <Box w={[300, 400, 700]} borderRadius='1em' bg='dark' boxShadow='9.01px 9.01px 31px #26292C, -9.01px -9.01px 31px #32353A'>
        <Box bg='accent.500' borderTopRadius='1em' p='2em'>
          <Heading>Discord webhook debugging tool</Heading>
        </Box>
        <Box bg='dark' p='2em' borderBottomRadius='1em'>
        
          <Box>
            <Flex mb='1em' justifyContent='center' alignItems='flex-start' bg='textarea' boxShadow='inset 4.8px 4.8px 9px #313439, inset -4.8px -4.8px 9px #3B3E45' p="1.5em" border='none' borderRadius='2em' p={5}>
              <Image src={state.avatar_url} borderRadius='50%' h="48px" w="48px" mr={2} />
              <Box>
                <Text fontSize="sm" fontWeight="bold">{state.username} <Badge verticalAlign="top" ml={1} fontSize="14px" bg="discord" color="light">BOT</Badge> </Text>
                <Text fontSize="sm">{state.content}</Text>
                {embed &&
                  <Box background="dark" borderLeft={`solid 3px ${state.embeds[0].color.length < 7 || state.embeds[0].color === "#ffffff" ? "rgb(35, 39, 42)" : state.embeds[0].color}`} borderRadius="3px" p={3} mt={1}>
                    <Text fontSize="sm" fontWeight="bold">{state.embeds[0].title}</Text>
                    <Text fontSize="sm">{state.embeds[0].description}</Text>
                  </Box>
                }
              </Box>
            </Flex>
            
            <Grid gap='1em' templateColumns="repeat(2, 1fr)">

              <GridItem colSpan={2}><Input placeholder='Message' focusBorderColor='none' onChange={e => {
                setState(s => ({
                  ...s,
                  content: e.target.value || 'Beep boop!'
                }))
              }} /></GridItem>

              <GridItem colSpan={[2, 2, 1]}><Input placeholder='Custom username' focusBorderColor='none' onChange={e => {
                setState(s => ({
                  ...s,
                  username: e.target.value || "Stinky Bot"
                }))
              }} /></GridItem>

              <GridItem colSpan={[2, 2, 1]}><Input placeholder='Custom avatar (url)' focusBorderColor='none' onChange={e => {
                setState(s => ({
                  ...s,
                  avatar_url: e.target.value || "http://l.tom.network/sURJ"
                }))
              }} /></GridItem>

              <GridItem colSpan={2}>
                <Input placeholder='Webhook URL' focusBorderColor='none'
                  isInvalid={errors.url}
                  onChange={e => {

                    const newUrl = e.target.value
                    const pattern = /https:\/\/discord.com\/api\/webhooks\/[0-9]+\/[a-zA-Z0-9]+/g
                    const valid = newUrl.match(pattern)

                    setUrl(valid ? newUrl : null)

                    setErrors(s => ({...s, url: !valid}))
                  }}
                />
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="embed" mb="0">
                    Embed?
                  </FormLabel>
                  <Switch id="embed" colorScheme="accent" onChange={() => {
                    setState(s => ({
                      ...s,
                      embeds: [defaultEmbed]
                    }))
                    setEmbed(!embed)
                    }} />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="showjson" mb="0">
                    Show JSON?
                  </FormLabel>
                  <Switch id="showjson" colorScheme="accent" onChange={() => setShowJSON(!showJSON) } />
                </FormControl>
              </GridItem>

              {embed && <>
                <GridItem colSpan={2}>
                <Input placeholder='Title' focusBorderColor='none'
                  isInvalid={errors.title}
                  onChange={e => {
                    setState(s => ({
                      ...s,
                      embeds: [{
                        ...s.embeds[0],
                        title: e.target.value || defaultEmbed.title
                      }]
                    }))
                  }}
                />
                </GridItem>
                <GridItem colSpan={2}>
                <Input placeholder='Description' focusBorderColor='none'
                  isInvalid={errors.description}
                  onChange={e => {
                    setState(s => ({
                      ...s,
                      embeds: [{
                        ...s.embeds[0],
                        description: e.target.value || defaultEmbed.description
                      }]
                    }))
                  }}
                />
                </GridItem>
                <GridItem colSpan={2}>
                <Input placeholder='Color (HEX)' focusBorderColor='none'
                  isInvalid={errors.color}
                  onChange={e => {

                    const newCol = e.target.value
                    const pattern = /^#[a-fA-F0-9]{6}$/

                    const valid = newCol.match(pattern) || newCol.length === 0
                    setErrors(s => ({...s, color: !valid}))

                    setState(s => ({
                      ...s,
                      embeds: [{
                        ...s.embeds[0],
                        color: newCol || defaultEmbed.color
                      }]
                    }))
                  }}
                />
                </GridItem>
              </>}

              {showJSON && <>
              <GridItem colSpan={2}>
                <Text mb={2}>JSON data: </Text>
                <div className="jsonBlock"><code style={{whiteSpace: 'pre-wrap', userSelect: 'all'}} dangerouslySetInnerHTML={{__html: JSON.stringify(prepareJson(state), null, 2)}} /></div>
              </GridItem>
              <GridItem colSpan={2}>
                <Text mb={2}>cURL request: </Text>
                <div className="jsonBlock">
                  <code style={{userSelect: 'all'}}>
                    curl --request POST --data '{JSON.stringify(prepareJson(state))}' \<br />
                     {url} \<br />
                     --header "Content-Type: application/json"
                  </code>
                </div>
              </GridItem>
              </>}

              <GridItem colSpan={2}>
                <Button
                  w='100%' bg="accent.500" border="solid 1px #FD0061" boxShadow='4.8px 4.8px 9px #282B2E, -4.8px -4.8px 9px #303338' borderRadius='5em'
                  _hover={{bg: "dark", color: 'accent.500'}}
                  disabled={loading || !url || errors.color}
                  onClick={() => makeRequest()}
                >
                  {loading ? <Spinner /> : "Send"}
                </Button>
              </GridItem>

              <GridItem colSpan={2} mt='1em' textAlign='center' color='rgba(255,255,255,0.3)'>
                Copyright © 2021
                <Link target="_blank" rel="noreferrer noopener" href="https://tommitchelmore.com" ml={1}>Thomas Mitchelmore</Link>
                <Link target="_blank" rel="noreferrer noopener" href="https://github.com/tommitchelmore/discord-webhook-debugger" ml={1}>(Source)</Link>
              </GridItem>

            </Grid>
          </Box>

        </Box>
      </Box>
    </Center>
  )
}

export default App
