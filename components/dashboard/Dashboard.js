import { Box, Container, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../Navbar";
import AccountList from "./AccountList";
import UserStore from "../../stores/UserStore";
import Overview from "./Overview";

export default function Dashboard() {
  const needsUpdate = UserStore.useState((state) => state.needsUpdate);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (!needsUpdate) {
      return;
    }

    setLoading(true);

    axios.get("/api/user").then((res) => {
      UserStore.update((state) => {
        state.user = res.data.user;
        state.needsUpdate = false;
      });
      setUser(res.data.user);
      setLoading(false);
    });
  }, [needsUpdate]);

  if (!user) {
    return <h1>Loading ...</h1>;
  }

  const CustomTab = (props) => (
    <Tab mx="3" {...props}>
      {props.children}
    </Tab>
  );

  return (
    <>
      <NavBar />

      <Container mt="75px" maxW="container.lg">
        <Tabs
          index={tabIndex}
          variant="soft-rounded"
          colorScheme="pink"
          align="center"
          textAlign="left"
          isFitted
          isLazy
        >
          <TabList>
            <CustomTab onClick={() => setTabIndex(0)}>Overview</CustomTab>
            <CustomTab onClick={() => setTabIndex(1)}>Accounts</CustomTab>
            <CustomTab onClick={() => setTabIndex(2)}>Diary</CustomTab>
            <CustomTab onClick={() => setTabIndex(3)}>Settings</CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Overview setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel>
              <AccountList />
            </TabPanel>
            <TabPanel>
              <p>diary</p>
            </TabPanel>
            <TabPanel>
              <p>settings</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

      {loading && (
        <Box
          width="100vw"
          height="100vw"
          backgroundColor="rgba(0, 0, 0, 0.3)"
          position="fixed"
          zIndex="1000"
          top="0"
          left="0"
        >
          <Spinner position="fixed" top="25%" left="48%" size="xl" />
        </Box>
      )}
    </>
  );
}
