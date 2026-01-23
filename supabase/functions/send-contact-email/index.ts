import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  formType: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  description?: string;
  repairType?: string;
  trainingInterest?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();
    const brevoApiKey = Deno.env.get("BREVO_API_KEY");

    if (!brevoApiKey) {
      throw new Error("BREVO_API_KEY not configured");
    }

    // Build email content based on form type
    let subject = "";
    let htmlContent = "";

    switch (data.formType) {
      case "emergency":
        subject = `🚨 URGENT: Emergency Repair Request from ${data.name}`;
        htmlContent = `
          <h2>Emergency Repair Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Repair Type:</strong> ${data.repairType}</p>
          <p><strong>Description:</strong> ${data.description || "Not provided"}</p>
        `;
        break;
      case "project":
        subject = `📋 New Project Quote Request from ${data.company || data.name}`;
        htmlContent = `
          <h2>Project Quote Request</h2>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Contact:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Project Type:</strong> ${data.projectType}</p>
          <p><strong>Description:</strong> ${data.description || "Not provided"}</p>
        `;
        break;
      case "training":
        subject = `🎓 Training Inquiry from ${data.name}`;
        htmlContent = `
          <h2>Training Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
          <p><strong>Interest:</strong> ${data.trainingInterest}</p>
        `;
        break;
      default:
        subject = `New Contact Form Submission from ${data.name}`;
        htmlContent = `<p>${JSON.stringify(data)}</p>`;
    }

    // Send email via Brevo API
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Eagle Vision Website", email: "noreply@brevo.com" },
        to: [{ email: "eaglevision.dev30@gmail.com", name: "Eagle Vision" }],
        subject: subject,
        htmlContent: htmlContent,
        replyTo: data.email ? { email: data.email, name: data.name } : undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Brevo API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify({ success: true, messageId: result.messageId }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
