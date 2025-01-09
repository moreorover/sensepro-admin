"use client";

import { Flex, Text } from "@mantine/core";
import Link from "next/link";
import classes from "./Logo.module.css";
import React from "react";

interface Props {
  width?: string;
  height?: string;
  version?: string | undefined;
}

export const Logo: React.FC<Props> = ({ version }) => {
  return (
    <Flex direction="row" align="center" gap={4}>
      <Link
        href="/"
        style={{ textDecoration: "none" }}
        className={classes.heading}
      >
        <Text fw="bolder" size="xl">
          SensePro
          <Text component="span" fw="normal" className={classes.subheading}>
            Admin
          </Text>
        </Text>
      </Link>
      {version && (
        <Text size="sm" c="dimmed">
          {version}
        </Text>
      )}
    </Flex>
  );
};
