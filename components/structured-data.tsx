export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Asana Task Calendar",
    "description": "Transform your Asana project exports into beautiful, interactive calendars. Visualize deadlines, track progress, and plan your work like never before.",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://asana-task-calendar.vercel.app",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Import Asana JSON exports",
      "Interactive calendar visualization", 
      "Task filtering and organization",
      "Due date tracking",
      "Section-based task management",
      "Custom color coding",
      "No account required",
      "Free to use"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_APP_URL || "https://asana-task-calendar.vercel.app"}/api/og`,
    "softwareVersion": "1.0.0",
    "author": {
      "@type": "Organization",
      "name": "Asana Task Calendar Team"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Asana Task Calendar"
    },
    "browserRequirements": "Requires JavaScript. Modern web browser required.",
    "softwareHelp": {
      "@type": "CreativeWork",
      "text": "Export your Asana project as JSON and import it to create a beautiful calendar view of your tasks."
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}