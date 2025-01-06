import { Box, Title, Center } from "@mantine/core";
import classes from "./layout.module.css";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <Center className={classes.wrapper}>
      <Box>
        <Title order={1} fw="bolder">
          Sensepro Admin
        </Title>
        {/*<Text c="dimmed" size="sm" mt={5}>*/}
        {/*  Don&apos;t have an account?{" "}*/}
        {/*  <Anchor size="sm" href="/register">*/}
        {/*    Sign Up*/}
        {/*  </Anchor>*/}
        {/*</Text>*/}
        <Box w={400}>{children}</Box>
      </Box>
    </Center>
  );
}
