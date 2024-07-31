import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

export const useGetCustomers = () => {
  const query = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await client.api.customers.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      return await response.json();
    },
  });

  return query;
};

export const useGetCustomer = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["customer", { id }],
    queryFn: async () => {
      const response = await client.api.customers[":id"].$get({
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

export const useCreateCustomer = () => {
  type ResponseType = InferResponseType<typeof client.api.customers.$post>;
  type RequestType = InferRequestType<
    typeof client.api.customers.$post
  >["json"];

  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.customers.$post({ json });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Customer created");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      toast.error("Failed to create customer");
    },
  });
  return mutation;
};

export const useUpdateCustomer = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.customers)[":id"]["$patch"]
  >;
  type RequestType = InferRequestType<
    (typeof client.api.customers)[":id"]["$patch"]
  >["json"];
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.customers[":id"]["$patch"]({
        param: { id },
        json,
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Customer updated");
      queryClient.invalidateQueries({ queryKey: ["customer", { id }] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      toast.error("Failed to update customer");
    },
  });
  return mutation;
};
