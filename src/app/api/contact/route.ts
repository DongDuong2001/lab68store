import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const serviceType = formData.get("serviceType") as string;
    const budget = formData.get("budget") as string;
    const timeline = formData.get("timeline") as string;
    const message = formData.get("message") as string;

    // Validate required fields
    if (!name || !email || !serviceType || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to database
    await db.customServiceRequest.create({
      data: {
        name,
        email,
        serviceType,
        budget: budget || null,
        timeline: timeline || null,
        message,
        status: "pending",
      },
    });

    // Email body
    const emailBody = `
New Custom Service Request

Name: ${name}
Email: ${email}
Service Type: ${serviceType}
Budget: ${budget || "Not specified"}
Timeline: ${timeline || "Not specified"}

Project Details:
${message}

---
Sent from Lab68 Store Contact Form
    `.trim();

    // For now, we'll use a simple nodemailer setup
    // You'll need to install nodemailer: npm install nodemailer
    // And configure your SMTP settings in environment variables
    
    // Temporary solution: Log to console and return success
    // In production, you should use a proper email service
    console.log("New contact form submission:");
    console.log(emailBody);

    // Here you would normally send the email using nodemailer or Resend
    // Example with nodemailer (requires configuration):
    /*
    const nodemailer = require("nodemailer");
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "dongduong840@gmail.com",
      subject: `New Custom Service Request from ${name}`,
      text: emailBody,
      replyTo: email,
    });
    */

    // For a quick solution without backend setup, you can use Web3Forms API
    // Get your free access key from https://web3forms.com
    
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
    
    if (!web3FormsKey) {
      // If no Web3Forms key is configured, log the submission and return instructions
      console.log("\n=== NEW CONTACT FORM SUBMISSION ===");
      console.log(emailBody);
      console.log("\n To enable email sending, get a free API key from https://web3forms.com");
      console.log("   Then add WEB3FORMS_ACCESS_KEY to your .env.local file\n");
      
      // Still redirect to success page
      return NextResponse.redirect(new URL("/custom-services/success", request.url));
    }
    
    // Using Web3Forms (free service):
    const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: web3FormsKey,
        name: name,
        email: email,
        subject: `New Custom Service Request - ${serviceType}`,
        message: `Service Type: ${serviceType}\nBudget: ${budget}\nTimeline: ${timeline}\n\n${message}`,
        to: "dongduong840@gmail.com",
      }),
    });

    const web3FormsData = await web3FormsResponse.json();

    if (web3FormsData.success) {
      // Redirect to success page
      return NextResponse.redirect(new URL("/custom-services/success", request.url));
    } else {
      throw new Error("Failed to send email");
    }

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
