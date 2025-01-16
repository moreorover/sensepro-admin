import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Group,
  NavLink,
  Text,
  Title,
} from "@mantine/core";
import { Logo } from "@/components/logo/Logo";
import { IconActivity, IconChevronRight } from "@tabler/icons-react";

export default function Home() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader>
        <Group className="h-full px-md">
          <Logo />
        </Group>
      </AppShellHeader>
      <AppShellMain>
        <Title className="text-center mt-20">
          Welcome to{" "}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: "pink", to: "yellow" }}
          >
            SensePro
          </Text>{" "}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: "blue", to: "green" }}
          >
            Admin
          </Text>
        </Title>
        <Text
          className="text-center text-gray-700 dark:text-gray-300 max-w-[500px] mx-auto mt-xl"
          ta="center"
          size="lg"
          maw={580}
          mx="auto"
          mt="xl"
        >
          This is Admin portal to manage SensePro devices.
        </Text>
        <div className="flex justify-center mt-10">
          <Group>
            <NavLink
              href="/signin"
              label="Sign In"
              leftSection={<IconActivity size="1rem" stroke={1.5} />}
              rightSection={
                <IconChevronRight
                  size="0.8rem"
                  stroke={1.5}
                  className="mantine-rotate-rtl"
                />
              }
              active
            />
          </Group>
        </div>
        {/*<div className="flex justify-center mt-10">*/}
        {/*  <ColorSchemesSwitcher />*/}
        {/*</div>*/}
      </AppShellMain>
    </AppShell>
  );
}
