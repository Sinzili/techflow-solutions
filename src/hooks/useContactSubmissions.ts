import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ContactSubmission {
  id: string;
  form_type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  description: string | null;
  project_type: string | null;
  repair_type: string | null;
  training_interest: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export function useContactSubmissions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading, error } = useQuery({
    queryKey: ["contact_submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ContactSubmission[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact_submissions"] });
      toast({
        title: "Status updated",
        description: "The submission status has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    submissions,
    isLoading,
    error,
    updateStatus: updateStatus.mutate,
  };
}
