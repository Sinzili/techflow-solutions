import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TrainingProgram {
  id: string;
  title: string;
  price: string;
  duration: string;
  features: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useTrainingPrograms = () => {
  return useQuery({
    queryKey: ["training-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("training_programs")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as TrainingProgram[];
    },
  });
};

export const useCreateTrainingProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (program: Omit<TrainingProgram, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("training_programs")
        .insert(program)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training-programs"] });
    },
  });
};

export const useUpdateTrainingProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...program }: Partial<TrainingProgram> & { id: string }) => {
      const { data, error } = await supabase
        .from("training_programs")
        .update(program)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training-programs"] });
    },
  });
};

export const useDeleteTrainingProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("training_programs")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training-programs"] });
    },
  });
};
