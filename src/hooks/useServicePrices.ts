import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ServicePrice {
  id: string;
  service_key: string;
  service_name: string;
  price_display: string;
  created_at: string;
  updated_at: string;
}

export const useServicePrices = () => {
  return useQuery({
    queryKey: ["service_prices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_prices")
        .select("*")
        .order("service_name");
      if (error) throw error;
      return data as ServicePrice[];
    },
  });
};

export const useUpdateServicePrice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, price_display }: { id: string; price_display: string }) => {
      const { data, error } = await supabase
        .from("service_prices")
        .update({ price_display })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service_prices"] });
    },
  });
};
