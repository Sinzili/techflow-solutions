import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export const usePortfolioItems = () => {
  return useQuery({
    queryKey: ["portfolio_items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as PortfolioItem[];
    },
  });
};

export const useCreatePortfolioItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Omit<PortfolioItem, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio_items"] });
    },
  });
};

export const useUpdatePortfolioItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PortfolioItem> & { id: string }) => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio_items"] });
    },
  });
};

export const useDeletePortfolioItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio_items"] });
    },
  });
};
