import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Plus, Minus, Trash2, Send } from "lucide-react";
import { toast } from "sonner";

const CartDrawer = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const handleSubmitOrder = async () => {
    if (!form.name || !form.phone) {
      toast.error("Please fill in your name and phone number");
      return;
    }

    setIsSubmitting(true);

    const orderLines = items.map(i => `• ${i.product.name} x${i.quantity} — R${(i.product.price * i.quantity).toLocaleString()}`).join("\n");
    const orderSummary = `NEW ORDER\n\nCustomer: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "N/A"}\nAddress: ${form.address || "N/A"}\n\nItems:\n${orderLines}\n\nTotal: R${totalPrice.toLocaleString()}`;

    try {
      await fetch("https://formsubmit.co/ajax/eaglevision.dev30@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Order from ${form.name} — R${totalPrice.toLocaleString()}`,
          name: form.name,
          phone: form.phone,
          email: form.email || "N/A",
          address: form.address || "N/A",
          order_details: orderLines,
          total: `R${totalPrice.toLocaleString()}`,
          message: orderSummary,
          _captcha: "false",
          _replyto: form.email || undefined,
        }),
      });

      toast.success("Order submitted! We'll contact you shortly.");
      clearCart();
      setIsCheckout(false);
      setForm({ name: "", email: "", phone: "", address: "" });
      setOpen(false);
    } catch {
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2" aria-label="Shopping cart">
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>{isCheckout ? "Checkout" : `Cart (${totalItems})`}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Your cart is empty
          </div>
        ) : isCheckout ? (
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Your phone number" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Your email (optional)" />
              </div>
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Input id="address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Your address (optional)" />
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <h4 className="font-semibold text-sm">Order Summary</h4>
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>R{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>R{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsCheckout(false)}>Back</Button>
              <Button className="flex-1" onClick={handleSubmitOrder} disabled={isSubmitting}>
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Submit Order"}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 bg-muted rounded-lg p-3">
                  <div className="w-16 h-16 rounded overflow-hidden bg-background flex-shrink-0">
                    {item.product.image_url ? (
                      <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No img</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                    <p className="text-primary font-bold text-sm">R{item.product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto" onClick={() => removeItem(item.product.id)}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>R{totalPrice.toLocaleString()}</span>
              </div>
              <Button className="w-full" size="lg" onClick={() => setIsCheckout(true)}>
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
