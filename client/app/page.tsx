"use client";

import { Button } from "@/components/ui/button"; // ShadCN Button
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const steps = [
    {
      title: "Define Your Needs",
      description:
        "Tell us about your business and the ERP modules you require (HR, Finance, Inventory, CRM, etc.).",
    },
    {
      title: "Customize & Configure",
      description:
        "Tailor fields, workflows, and integrations to perfectly match your operations.",
    },
    {
      title: "Deploy Your ERP",
      description:
        "Generate and deploy your bespoke ERP solution with minimal effort.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 transition-colors duration-500 font-sans">
      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 sm:px-20 pt-32 gap-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          AutoERP: Dynamic ERP Scaffolder
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl">
          Quickly generate customized ERP modules like HR, Finance, and Inventory based on your unique business needs.
          Save time, reduce complexity, and empower small and medium businesses with powerful ERP solutions.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 w-full sm:w-auto">
          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          >
            Get Started Free
          </Button>

          <Button
            variant="outline"
            onClick={() => console.log("Learn more clicked")}
            className="w-full sm:w-auto px-8 py-3 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 shadow hover:shadow-md transform transition-all hover:-translate-y-1"
          >
            Learn More
          </Button>
        </div>

        {/* How it Works Cards */}
        <section className="w-full max-w-5xl mt-16 grid sm:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {idx + 1}. {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-wrap justify-center gap-6 py-8 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <a href="#" className="hover:underline hover:underline-offset-4">Features</a>
        <a href="#" className="hover:underline hover:underline-offset-4">Pricing</a>
        <a href="#" className="hover:underline hover:underline-offset-4">Contact Us</a>
      </footer>
    </div>
  );
}
