import Link from "next/link"; // Import the Link component

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
          AutoERP: Dynamic ERP Scaffolder
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
          Quickly generate customized ERP modules like HR, Finance, and Inventory based on your unique business needs.
          Save time, reduce complexity, and make powerful ERP solutions accessible for small and medium businesses.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
          <Link href="/dashboard" passHref>
            <span
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 dark:hover:bg-blue-500 font-medium text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto"
              rel="noopener noreferrer"
            >
              Get Started Free
            </span>
          </Link>
          {/* For external links or placeholder links, a regular <a> can still be used */}
          <a
            className="rounded-full border border-solid border-gray-300 dark:border-gray-700 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-transparent font-medium text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto"
            href="#" // Replace with your "Learn More" link
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>

        <section className="mt-12 w-full max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            How it Works
          </h2>
          <ol className="list-decimal list-inside text-lg text-gray-800 dark:text-gray-200 grid sm:grid-cols-3 gap-8">
            <li className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">1. Define Your Needs</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your business and the ERP modules you require (HR, Finance, Inventory, CRM, etc.).
              </p>
            </li>
            <li className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">2. Customize & Configure</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tailor fields, workflows, and integrations to perfectly match your operations.
              </p>
            </li>
            <li className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">3. Deploy Your ERP</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate and deploy your bespoke ERP solution with minimal effort.
              </p>
            </li>
          </ol>
        </section>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#" // Replace with your "Features" link
          target="_blank"
          rel="noopener noreferrer"
        >
          Features
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#" // Replace with your "Pricing" link
          target="_blank"
          rel="noopener noreferrer"
        >
          Pricing
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#" // Replace with your "Contact Us" link
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us
        </a>
      </footer>
    </div>
  );
}