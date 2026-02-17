import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Products = () => {
  const { data: products, isLoading } = useProducts();
  const { items, addItem } = useCart();

  const isInCart = (id: string) => items.some(i => i.product.id === id);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-5">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Products
              </h1>
              <p className="text-muted-foreground">
                Quality smart home and automation products
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                    )}
                    {product.in_stock === false && (
                      <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    {product.category && (
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</span>
                    )}
                    <h3 className="font-semibold text-foreground mt-1">{product.name}</h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-primary">R{product.price.toLocaleString()}</span>
                      <Button
                        size="sm"
                        disabled={product.in_stock === false}
                        variant={isInCart(product.id) ? "secondary" : "default"}
                        onClick={() => {
                          addItem(product);
                          toast.success(`${product.name} added to cart`);
                        }}
                      >
                        {isInCart(product.id) ? (
                          <><Plus className="h-4 w-4 mr-1" />Add More</>
                        ) : (
                          <><ShoppingCart className="h-4 w-4 mr-1" />Add to Cart</>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
