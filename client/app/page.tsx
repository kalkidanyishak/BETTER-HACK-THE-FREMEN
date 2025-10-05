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
    <div className="__variable_fb8f2c __variable_f910ec bg-background font-sans relative min-h-screen flex flex-col justify-between transition-colors duration-500">
      
      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 sm:px-20 pt-32 gap-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          AutoERP: Dynamic ERP Scaffolder
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl">
          Quickly generate customized ERP modules like HR, Finance, and Inventory based on your unique business needs.
          Save time, reduce complexity, and empower small and medium businesses with powerful ERP solutions.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 w-full sm:w-auto">
          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold shadow-xl hover:shadow-2xl rounded-xl transform transition-all hover:-translate-y-1 hover:scale-105"
          >
            Get Started Free
          </Button>

          <Button
            variant="outline"
            onClick={() => console.log("Learn more clicked")}
            className="w-full sm:w-auto px-10 py-4 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 shadow hover:shadow-md rounded-xl transform transition-all hover:-translate-y-1 hover:scale-105"
          >
            Learn More
          </Button>
        </div>

        {/* How it Works Cards */}
        <section className="w-full max-w-6xl mt-16 grid sm:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 border border-transparent hover:border-gradient-to-r from-blue-400 to-indigo-500"
            >
              {/* Number Circle */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xl mb-5 shadow-lg">
                {idx + 1}
              </div>

              {/* Step Title */}
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">{step.description}</p>

              {/* Floating Icon */}
              <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-blue-100 dark:bg-indigo-700 flex items-center justify-center text-blue-500 dark:text-indigo-100 text-xl font-bold shadow-md animate-pulse">
                💡
              </div>

              {/* CTA inside card */}
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full sm:w-auto px-6 py-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors rounded-lg shadow-sm"
                onClick={() => console.log(`Clicked on step ${idx + 1}`)}
              >
                Learn More
              </Button>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-wrap justify-center gap-6 py-8 text-sm md:text-base text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-background transition-colors duration-500">
        <a href="#" className="hover:underline hover:underline-offset-4 transition-colors duration-300">Features</a>
        <a href="#" className="hover:underline hover:underline-offset-4 transition-colors duration-300">Pricing</a>
        <a href="#" className="hover:underline hover:underline-offset-4 transition-colors duration-300">Contact Us</a>
      </footer>
    </div>
  );
}
