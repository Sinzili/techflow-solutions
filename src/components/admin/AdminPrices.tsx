import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServicePrices, useUpdateServicePrice } from "@/hooks/useServicePrices";
import { toast } from "sonner";

const AdminPrices = () => {
  const { data: prices, isLoading } = useServicePrices();
  const updatePrice = useUpdateServicePrice();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEditing = (id: string, currentPrice: string) => {
    setEditingId(id);
    setEditValue(currentPrice);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue("");
  };

  const savePrice = async (id: string) => {
    try {
      await updatePrice.mutateAsync({ id, price_display: editValue });
      toast.success("Price updated successfully");
      setEditingId(null);
      setEditValue("");
    } catch (error) {
      toast.error("Failed to update price");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Service Prices</h2>
        <p className="text-muted-foreground">
          Update the prices displayed in the service selector
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-20" />
            </Card>
          ))}
        </div>
      ) : prices && prices.length > 0 ? (
        <div className="space-y-4">
          {prices.map((price) => (
            <Card key={price.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{price.service_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  {editingId === price.id ? (
                    <>
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1"
                        placeholder="e.g., R750-1,500/hour"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => savePrice(price.id)}
                        disabled={updatePrice.isPending}
                      >
                        <Check className="h-4 w-4 text-secondary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={cancelEditing}
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-xl font-semibold text-primary">
                        {price.price_display}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(price.id, price.price_display)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No service prices found.
        </div>
      )}
    </div>
  );
};

export default AdminPrices;
