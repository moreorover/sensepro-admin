import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useSearchParams } from "next/navigation";

import { toast } from "sonner";

export const useGetLocations = (customerId?: string) => {
  const params = useSearchParams();
  const customerIdParam = customerId
    ? customerId
    : params.get("customerId") || "";
  const query = useQuery({
    queryKey: ["locations", { customerId }],
    queryFn: async () => {
      const response = await client.api.locations.$get({
        query: {
          customerId: customerIdParam,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }

      return await response.json();
    },
  });

  return query;
};

export const useGetLocation = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["location", { id }],
    queryFn: async () => {
      const response = await client.api.locations[":id"].$get({
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

export const useCreateLocation = () => {
  type ResponseType = InferResponseType<typeof client.api.locations.$post>;
  type RequestType = InferRequestType<
    typeof client.api.locations.$post
  >["json"];

  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.locations.$post({ json });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Location created");
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
    onError: () => {
      toast.error("Failed to create location");
    },
  });
  return mutation;
};

export const useUpdateLocation = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.locations)[":id"]["$patch"]
  >;
  type RequestType = InferRequestType<
    (typeof client.api.locations)[":id"]["$patch"]
  >["json"];
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.locations[":id"]["$patch"]({
        param: { id },
        json,
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Location updated");
      queryClient.invalidateQueries({ queryKey: ["location", { id }] });
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
    onError: () => {
      toast.error("Failed to update location");
    },
  });
  return mutation;
};

export const useDeleteLocation = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.locations)[":id"]["$delete"]
  >;
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.locations[":id"]["$delete"]({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Location deleted");
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
    onError: () => {
      toast.error("Failed to delete location");
    },
  });
  return mutation;
};
