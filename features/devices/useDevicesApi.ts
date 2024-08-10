import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useSearchParams } from "next/navigation";

import { toast } from "sonner";

export const useGetDevices = (locationId?: string) => {
  const params = useSearchParams();
  const locationIdParam = locationId
    ? locationId
    : params.get("locationId") || "";
  const query = useQuery({
    queryKey: ["devices", { locationId }],
    queryFn: async () => {
      const response = await client.api.devices.$get({
        query: {
          locationId: locationIdParam,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch devices");
      }

      return await response.json();
    },
  });

  return query;
};

export const useGetDevice = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["device", { id }],
    queryFn: async () => {
      const response = await client.api.devices[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch account");
      }

      return await response.json();
    },
  });

  return query;
};

export const useCreateDevice = () => {
  type ResponseType = InferResponseType<typeof client.api.devices.$post>;
  type RequestType = InferRequestType<typeof client.api.devices.$post>["json"];

  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.devices.$post({ json });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: (data, variables, context) => {
      toast.success("Device created");
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      queryClient.invalidateQueries({
        queryKey: ["groups", { locationId: variables.locationId }],
      });
    },
    onError: () => {
      toast.error("Failed to create device");
    },
  });
  return mutation;
};

export const useUpdateDevice = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.devices)[":id"]["$patch"]
  >;
  type RequestType = InferRequestType<
    (typeof client.api.devices)[":id"]["$patch"]
  >["json"];
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.devices[":id"]["$patch"]({
        param: { id },
        json,
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: (data, variables, context) => {
      toast.success("Device updated");
      queryClient.invalidateQueries({ queryKey: ["device", { id }] });
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      queryClient.invalidateQueries({
        queryKey: ["groups", { locationId: data.locationId }],
      });
    },
    onError: () => {
      toast.error("Failed to update device");
    },
  });
  return mutation;
};

export const useDeleteDevice = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.devices)[":id"]["$delete"]
  >;
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.devices[":id"]["$delete"]({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: (data, variables, context) => {
      toast.success("Device deleted");
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      queryClient.invalidateQueries({
        queryKey: ["groups", { locationId: data.locationId }],
      });
    },
    onError: () => {
      toast.error("Failed to delete device");
    },
  });
  return mutation;
};
