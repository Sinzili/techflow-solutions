import { useContactSubmissions } from "@/hooks/useContactSubmissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Phone, Mail, Building, AlertTriangle, Briefcase, GraduationCap } from "lucide-react";

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-500" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500" },
  { value: "in_progress", label: "In Progress", color: "bg-orange-500" },
  { value: "completed", label: "Completed", color: "bg-green-500" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-500" },
];

const formTypeIcons: Record<string, React.ReactNode> = {
  emergency: <AlertTriangle className="h-4 w-4 text-red-500" />,
  project: <Briefcase className="h-4 w-4 text-blue-500" />,
  training: <GraduationCap className="h-4 w-4 text-green-500" />,
};

const formTypeLabels: Record<string, string> = {
  emergency: "Emergency Repair",
  project: "Project Quote",
  training: "Training Inquiry",
};

export default function AdminSubmissions() {
  const { submissions, isLoading, updateStatus } = useContactSubmissions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!submissions || submissions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No contact submissions yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Contact Submissions
            <Badge variant="secondary">{submissions.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {formTypeIcons[submission.form_type]}
                        <span className="text-sm font-medium">
                          {formTypeLabels[submission.form_type] || submission.form_type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{submission.name || "N/A"}</div>
                      {submission.company && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {submission.company}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {submission.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            <a href={`tel:${submission.phone}`} className="hover:underline">
                              {submission.phone}
                            </a>
                          </div>
                        )}
                        {submission.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            <a href={`mailto:${submission.email}`} className="hover:underline">
                              {submission.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs text-sm">
                        {submission.repair_type && (
                          <div><span className="font-medium">Repair:</span> {submission.repair_type}</div>
                        )}
                        {submission.project_type && (
                          <div><span className="font-medium">Project:</span> {submission.project_type}</div>
                        )}
                        {submission.training_interest && (
                          <div><span className="font-medium">Training:</span> {submission.training_interest}</div>
                        )}
                        {submission.description && (
                          <div className="truncate" title={submission.description}>
                            {submission.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(new Date(submission.created_at), "MMM d, yyyy")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(submission.created_at), "h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={submission.status || "new"}
                        onValueChange={(value) =>
                          updateStatus({ id: submission.id, status: value })
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background border">
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${option.color}`} />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
