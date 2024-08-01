import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

export const useGetDeviceTypes = () => {
  const query = useQuery({
    queryKey: ["deviceTypes"],
    queryFn: async () => {
      const response = await client.api.deviceTypes.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch deviceTypes");
      }

      return await response.json();
    },
  });

  return query;
};

export const useGetDeviceType = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["deviceType", { id }],
    queryFn: async () => {
      const response = await client.api.deviceTypes[":id"].$get({
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

export const useCreateDeviceType = () => {
  type ResponseType = InferResponseType<typeof client.api.deviceTypes.$post>;
  type RequestType = InferRequestType<
    typeof client.api.deviceTypes.$post
  >["json"];

  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.deviceTypes.$post({ json });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("DeviceType created");
      queryClient.invalidateQueries({ queryKey: ["deviceTypes"] });
    },
    onError: () => {
      toast.error("Failed to create deviceType");
    },
  });
  return mutation;
};

export const useUpdateDeviceType = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.deviceTypes)[":id"]["$patch"]
  >;
  type RequestType = InferRequestType<
    (typeof client.api.deviceTypes)[":id"]["$patch"]
  >["json"];
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.deviceTypes[":id"]["$patch"]({
        param: { id },
        json,
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("DeviceType updated");
      queryClient.invalidateQueries({ queryKey: ["deviceType", { id }] });
      queryClient.invalidateQueries({ queryKey: ["deviceTypes"] });
    },
    onError: () => {
      toast.error("Failed to update deviceType");
    },
  });
  return mutation;
};

export const useDeleteDeviceType = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.deviceTypes)[":id"]["$delete"]
  >;
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.deviceTypes[":id"]["$delete"]({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("DeviceType deleted");
      queryClient.invalidateQueries({ queryKey: ["deviceTypes"] });
    },
    onError: () => {
      toast.error("Failed to delete deviceType");
    },
  });
  return mutation;
};
