import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
  id: string;
  title: string;
  icon_name: string;
  items: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as Service[];
    },
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (service: { title: string; icon_name: string; items: string[]; sort_order: number }) => {
      const { data, error } = await supabase.from("services").insert(service).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; title?: string; icon_name?: string; items?: string[]; sort_order?: number }) => {
      const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
};
