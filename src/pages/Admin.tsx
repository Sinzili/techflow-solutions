import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminPortfolio from "@/components/admin/AdminPortfolio";
import AdminPrices from "@/components/admin/AdminPrices";
import AdminTraining from "@/components/admin/AdminTraining";
import AdminSubmissions from "@/components/admin/AdminSubmissions";
import AdminServices from "@/components/admin/AdminServices";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/auth");
      } else {
        setChecking(false);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">Loading...</div>;
  }

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
          <div className="ml-auto">
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-5 py-8">
        <Tabs defaultValue="submissions" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="prices">Service Prices</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <AdminSubmissions />
          </TabsContent>

          <TabsContent value="services">
            <AdminServices />
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
