import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Device, Rule } from "@prisma/client";
import { Edit } from "lucide-react";
import Link from "next/link";

type Props = {
  rule: Rule;
  devices: Device[];
};

export function RuleCard({ rule, devices }: Props) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {rule.type}
            <span>
              {" - "}
              {rule.name}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <dt className="font-medium text-muted-foreground">ID:</dt>
            <dd className="font-mono">{rule.id}</dd>
          </div>
          {devices.map((device) => (
            <div key={device.id} className="flex items-center space-x-2">
              <dt className="font-medium text-muted-foreground">
                {device.name}
              </dt>
            </div>
          ))}
        </dl>
      </CardContent>
      <CardFooter className="pt-2 flex flex-col space-y-1">
        <Button asChild size="sm" className="w-full">
          <Link href={`/rules/edit/${rule.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Rule
          </Link>
        </Button>
        <Button asChild size="sm" className="w-full">
          <Link href={`/rules/delete/${rule.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Delete Rule
          </Link>
        </Button>
        <Button asChild size="sm" className="w-full">
          <Link href={`/rule-devices/edit/${rule.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Update Devices
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
