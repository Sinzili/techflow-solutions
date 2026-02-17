import { useState } from "react";
import { useServices, useCreateService, useUpdateService, useDeleteService } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { toast } from "sonner";

const ICON_OPTIONS = ["Wrench", "Home", "Shield", "LaptopMinimal", "Cpu", "Globe", "Smartphone", "Code"];

const AdminServices = () => {
  const { data: services, isLoading } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editIcon, setEditIcon] = useState("Wrench");
  const [editItems, setEditItems] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newIcon, setNewIcon] = useState("Wrench");
  const [newItems, setNewItems] = useState<string[]>([""]);

  const startEdit = (service: any) => {
    setEditingId(service.id);
    setEditTitle(service.title);
    setEditIcon(service.icon_name);
    setEditItems([...service.items]);
  };

  const saveEdit = () => {
    if (!editingId || !editTitle.trim()) return;
    updateService.mutate(
      { id: editingId, title: editTitle, icon_name: editIcon, items: editItems.filter(i => i.trim()) },
      {
        onSuccess: () => { setEditingId(null); toast.success("Service updated"); },
        onError: () => toast.error("Failed to update"),
      }
    );
  };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    createService.mutate(
      { title: newTitle, icon_name: newIcon, items: newItems.filter(i => i.trim()), sort_order: (services?.length || 0) },
      {
        onSuccess: () => { setIsAdding(false); setNewTitle(""); setNewIcon("Wrench"); setNewItems([""]); toast.success("Service added"); },
        onError: () => toast.error("Failed to add"),
      }
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this service?")) return;
    deleteService.mutate(id, {
      onSuccess: () => toast.success("Service deleted"),
      onError: () => toast.error("Failed to delete"),
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Services</h2>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}><Plus className="h-4 w-4 mr-2" />Add Service</Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader><CardTitle>New Service</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Service title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            <select className="w-full border rounded px-3 py-2 bg-background text-foreground" value={newIcon} onChange={e => setNewIcon(e.target.value)}>
              {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
            <div className="space-y-2">
              <p className="text-sm font-medium">Items</p>
              {newItems.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input value={item} onChange={e => { const u = [...newItems]; u[idx] = e.target.value; setNewItems(u); }} placeholder={`Item ${idx + 1}`} />
                  <Button variant="ghost" size="icon" onClick={() => setNewItems(newItems.filter((_, i) => i !== idx))}><X className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setNewItems([...newItems, ""])}><Plus className="h-3 w-3 mr-1" />Add Item</Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd}><Check className="h-4 w-4 mr-1" />Save</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {services?.map(service => (
        <Card key={service.id}>
          <CardContent className="pt-4">
            {editingId === service.id ? (
              <div className="space-y-3">
                <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                <select className="w-full border rounded px-3 py-2 bg-background text-foreground" value={editIcon} onChange={e => setEditIcon(e.target.value)}>
                  {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                <div className="space-y-2">
                  {editItems.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input value={item} onChange={e => { const u = [...editItems]; u[idx] = e.target.value; setEditItems(u); }} />
                      <Button variant="ghost" size="icon" onClick={() => setEditItems(editItems.filter((_, i) => i !== idx))}><X className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => setEditItems([...editItems, ""])}><Plus className="h-3 w-3 mr-1" />Add Item</Button>
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveEdit}><Check className="h-4 w-4 mr-1" />Save</Button>
                  <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">Icon: {service.icon_name} • {service.items.length} items</p>
                  <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside">
                    {service.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(service)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminServices;
