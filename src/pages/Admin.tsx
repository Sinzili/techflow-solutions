import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminPortfolio from "@/components/admin/AdminPortfolio";
import AdminPrices from "@/components/admin/AdminPrices";
import AdminTraining from "@/components/admin/AdminTraining";
import AdminSubmissions from "@/components/admin/AdminSubmissions";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-header text-header-foreground py-4">
        <div className="container mx-auto px-5 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-primary">Eagle</span>
              <span className="text-secondary">Vision</span>
              <span className="text-muted-foreground ml-2 text-lg font-normal">Admin</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-5 py-8">
        <Tabs defaultValue="submissions" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="prices">Service Prices</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <AdminSubmissions />
          </TabsContent>

          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="portfolio">
            <AdminPortfolio />
          </TabsContent>

          <TabsContent value="prices">
            <AdminPrices />
          </TabsContent>

          <TabsContent value="training">
            <AdminTraining />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
