"use client";

import React, { useState } from 'react';
import { Calendar, CheckCircle2, Upload, Zap, Clock, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonUploader } from '@/components/json-uploader';

export function LandingPage() {
  const [showUploader, setShowUploader] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Beautiful Calendar View",
      description: "Transform your task lists into an intuitive calendar interface that makes planning effortless."
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description: "Filter by sections, completion status, and custom colors to focus on what matters most."
    },
    {
      icon: CheckCircle2,
      title: "Task Management",
      description: "View due dates, completion status, and organize tasks by project sections seamlessly."
    },
    {
      icon: Zap,
      title: "Instant Import",
      description: "Simply drag & drop your Asana JSON export and watch your calendar come to life instantly."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Export from Asana",
      description: "Go to your Asana project and export your tasks as a JSON file."
    },
    {
      number: "02", 
      title: "Import to Calendar",
      description: "Drag and drop your JSON file or paste the content directly into our uploader."
    },
    {
      number: "03",
      title: "Visualize & Plan",
      description: "View your tasks in a beautiful calendar layout with filtering and customization options."
    }
  ];

  return (
    <div className="min-h-full">
      {!showUploader ? (
        // Landing page content
        <div className="flex flex-col">
          {/* Hero Section */}
          <section className="text-center py-20 px-6 relative overflow-hidden">
            <div className="absolute inset-0 gradient-bg opacity-50" />
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
                <Clock className="h-4 w-4" />
                Turn Tasks into Visual Timeline
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6 animate-slide-up">
                Asana Tasks,
                <br />
                <span className="text-primary">Calendar View</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
                Transform your Asana project exports into beautiful, interactive calendars. 
                Visualize deadlines, track progress, and plan your work like never before.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Button 
                  size="lg" 
                  onClick={() => setShowUploader(true)}
                  className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-6 h-auto glass-effect hover:bg-accent/50 transition-all duration-300"
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 px-6 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Everything you need for better task visualization
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Powerful features designed to transform how you view and manage your Asana tasks.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How it Works Section */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  How it works
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get from Asana export to beautiful calendar in three simple steps.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-12">
                {steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6 bg-primary/5">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to visualize your tasks?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Import your Asana tasks now and see them in a whole new way. 
                No account required, completely free to use.
              </p>
              <Button 
                size="lg" 
                onClick={() => setShowUploader(true)}
                className="text-lg px-8 py-6 h-auto"
              >
                <Upload className="mr-2 h-5 w-5" />
                Start Creating Your Calendar
              </Button>
            </div>
          </section>
        </div>
      ) : (
        // Uploader section
        <div className="flex h-full items-center justify-center py-8">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <Button
                variant="ghost"
                onClick={() => setShowUploader(false)}
                className="mb-4"
              >
                ← Back to overview
              </Button>
              <h2 className="text-3xl font-bold mb-2">Import Your Asana Tasks</h2>
              <p className="text-muted-foreground">
                Upload your Asana JSON export or paste the content directly below
              </p>
            </div>
            
            <div className="bg-card border rounded-xl shadow-sm p-8">
              <JsonUploader />
            </div>
            
            <div className="mt-8 bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                How to export from Asana:
              </h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Open your Asana project</li>
                <li>Click the three dots menu (...) in the top right</li>
                <li>Select "Export/Print" → "JSON"</li>
                <li>Save the file and upload it here</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}