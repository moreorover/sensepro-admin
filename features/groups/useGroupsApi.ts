import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useSearchParams } from "next/navigation";

import { toast } from "sonner";

export const useGetGroups = (locationId?: string) => {
  const params = useSearchParams();
  const locationIdParam = locationId
    ? locationId
    : params.get("locationId") || "";
  const query = useQuery({
    queryKey: ["groups", { locationId }],
    queryFn: async () => {
      const response = await client.api.groups.$get({
        query: {
          locationId: locationIdParam,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      return await response.json();
    },
  });

  return query;
};

export const useGetGroup = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["group", { id }],
    queryFn: async () => {
      const response = await client.api.groups[":id"].$get({
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

export const useCreateGroup = () => {
  type ResponseType = InferResponseType<typeof client.api.groups.$post>;
  type RequestType = InferRequestType<typeof client.api.groups.$post>["json"];

  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.groups.$post({ json });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group created");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Failed to create group");
    },
  });
  return mutation;
};

export const useUpdateGroup = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.groups)[":id"]["$patch"]
  >;
  type RequestType = InferRequestType<
    (typeof client.api.groups)[":id"]["$patch"]
  >["json"];
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.groups[":id"]["$patch"]({
        param: { id },
        json,
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group updated");
      queryClient.invalidateQueries({ queryKey: ["group", { id }] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Failed to update group");
    },
  });
  return mutation;
};

export const useDeleteGroup = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.groups)[":id"]["$delete"]
  >;
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.groups[":id"]["$delete"]({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group deleted");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Failed to delete group");
    },
  });
  return mutation;
};
