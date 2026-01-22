import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import {
  useTrainingPrograms,
  useCreateTrainingProgram,
  useUpdateTrainingProgram,
  useDeleteTrainingProgram,
} from "@/hooks/useTrainingPrograms";

const AdminTraining = () => {
  const { data: programs, isLoading } = useTrainingPrograms();
  const createProgram = useCreateTrainingProgram();
  const updateProgram = useUpdateTrainingProgram();
  const deleteProgram = useDeleteTrainingProgram();

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    duration: "",
    features: "",
    sort_order: 0,
  });

  const resetForm = () => {
    setFormData({ title: "", price: "", duration: "", features: "", sort_order: 0 });
    setEditingId(null);
  };

  const handleEdit = (program: any) => {
    setEditingId(program.id);
    setFormData({
      title: program.title,
      price: program.price,
      duration: program.duration,
      features: program.features.join("\n"),
      sort_order: program.sort_order,
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = formData.features.split("\n").filter((f) => f.trim());

    try {
      if (editingId) {
        await updateProgram.mutateAsync({
          id: editingId,
          title: formData.title,
          price: formData.price,
          duration: formData.duration,
          features: featuresArray,
          sort_order: formData.sort_order,
        });
        toast.success("Training program updated!");
      } else {
        await createProgram.mutateAsync({
          title: formData.title,
          price: formData.price,
          duration: formData.duration,
          features: featuresArray,
          sort_order: formData.sort_order || (programs?.length || 0) + 1,
        });
        toast.success("Training program added!");
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save training program");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    try {
      await deleteProgram.mutateAsync(id);
      toast.success("Training program deleted!");
    } catch (error) {
      toast.error("Failed to delete training program");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Training Programs</h2>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Program" : "Add New Program"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Beginner Track"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., R2,999 or Custom"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 4 Weeks"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Arduino Basics&#10;Sensor Integration&#10;Simple Projects"
                  className="min-h-[120px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  placeholder="1"
                />
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Update Program" : "Add Program"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Features</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs?.map((program) => (
            <TableRow key={program.id}>
              <TableCell>
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </TableCell>
              <TableCell className="font-medium">{program.title}</TableCell>
              <TableCell>{program.price}</TableCell>
              <TableCell>{program.duration}</TableCell>
              <TableCell className="max-w-xs truncate">
                {program.features.join(", ")}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(program)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(program.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTraining;
