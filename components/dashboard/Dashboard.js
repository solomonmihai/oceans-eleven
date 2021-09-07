import { Box, Container, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../Navbar";
import AccountList from "./AccountList";
import WalletPie from "./charts/WalletPie";
import UserStore from "../../stores/UserStore";

export default function Dashboard() {
  const needsUpdate = UserStore.useState((state) => state.needsUpdate);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const CustomTab = (props) => <Tab mx="3">{props.children}</Tab>;

  return (
    <>
      <NavBar />

      <Container mt="75px" maxW="container.lg">
        <Tabs variant="soft-rounded" colorScheme="pink" align="center" textAlign="left" isFitted>
          <TabList>
            <CustomTab>Overview</CustomTab>
            <CustomTab>Accounts</CustomTab>
            <CustomTab>Diary</CustomTab>
            <CustomTab>Settings</CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <WalletPie />
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
