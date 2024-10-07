"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Code,
  Database,
  Zap,
  Server,
  BookOpen,
  GraduationCap,
  Users,
  Globe,
  Copy, // Import the Copy icon
} from "lucide-react";

export default function LandingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            FreeAPI
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="https://github.com/hiteshchoudhary/apihub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.section
          className="text-center mb-24"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h2 className="text-6xl font-bold mb-6" variants={fadeIn}>
            <motion.span
              className="inline-block"
              animate={{
                rotateX: [0, 360],
                transition: { duration: 1, repeat: Infinity, repeatDelay: 5 },
              }}
            >
              Learn
            </motion.span>{" "}
            APIs the Right Way
          </motion.h2>
          <motion.p className="text-2xl text-gray-400 mb-8" variants={fadeIn}>
            Explore, Learn, and Build with our Comprehensive API Learning
            Platform
          </motion.p>
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="https://freeapi.hashnode.space/api-guide/apireference/getARandomQuote"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Interactive Docs
            </a>
          </motion.div>
        </motion.section>

        <motion.section
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <Feature
            icon={<Code className="w-8 h-8" />}
            title="API Basics"
            description="Master GET, POST, PUT, and other fundamental API concepts."
          />
          <Feature
            icon={<Database className="w-8 h-8" />}
            title="Response Types"
            description="Explore various API responses including Brotli, images, and GZIP."
          />
          <Feature
            icon={<Server className="w-8 h-8" />}
            title="Complete Backends"
            description="Dive into authentication, todo lists, social media, and e-commerce backends."
          />
          <Feature
            icon={<Zap className="w-8 h-8" />}
            title="Real-time Chat"
            description="Build socket-based chat applications with our API."
          />
          <Feature
            icon={<BookOpen className="w-8 h-8" />}
            title="Interactive Docs"
            description="Learn and test APIs with our interactive documentation."
          />
          <Feature
            icon={<Github className="w-8 h-8" />}
            title="Open Source"
            description="Contribute to and learn from our open-source codebase."
          />
        </motion.section>

        <motion.section
          className="mb-24"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h3
            className="text-4xl font-bold mb-8 text-center"
            variants={fadeIn}
          >
            Why FreeAPI for Students?
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            <StudentBenefit
              icon={<GraduationCap className="w-12 h-12" />}
              title="Learn by Doing"
              description="Gain hands-on experience with real-world API scenarios and projects."
            />
            <StudentBenefit
              icon={<Users className="w-12 h-12" />}
              title="Community Driven"
              description="Join a community of learners and contribute to open-source development."
            />
            <StudentBenefit
              icon={<Globe className="w-12 h-12" />}
              title="Industry Relevance"
              description="Develop skills that are in high demand in the tech industry."
            />
          </div>
        </motion.section>

        <motion.section
          className="mb-24"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h3
            className="text-4xl font-bold mb-8 text-center"
            variants={fadeIn}
          >
            Code Available in Multiple Languages
          </motion.h3>
          <CodeExamples />
          <div className="text-center mt-8">
            <a
              href="https://freeapi.hashnode.space/api-guide/apireference/getARandomQuote"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Interactive Docs
            </a>
          </div>
        </motion.section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-400">
        <p>&copy; 2023 FreeAPI. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg"
      variants={{
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4 },
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

function StudentBenefit({ icon, title, description }) {
  return (
    <motion.div
      className="text-center"
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      }}
    >
      <motion.div
        className="text-blue-400 mb-4 inline-block"
        whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
      >
        {icon}
      </motion.div>
      <h4 className="text-2xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

function CodeExamples() {
  const [activeTab, setActiveTab] = useState("javascript");
  const [isCopied, setIsCopied] = useState(false);

  const codeExamples = {
    javascript: `const fetch = require('node-fetch');

const url = 'https://example.com/public/quotes/quote/random';
const options = {method: 'GET', headers: {accept: 'application/json'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}`,
    python: `import requests

url = "https://example.com/public/quotes/quote/random"

headers = {"accept": "application/json"}

response = requests.get(url, headers=headers)

print(response.text)`,
    curl: `curl --request GET \\
     --url 'https://example.com/public/quotes/quote/random' \\
     --header 'accept: application/json'`,
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden relative">
      <div className="flex border-b border-gray-700">
        {Object.keys(codeExamples).map((lang) => (
          <button
            key={lang}
            className={`px-4 py-2 font-medium ${
              activeTab === lang
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(lang)}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center p-4">
        <pre className="text-sm overflow-x-auto">
          <code className="language-javascript">{codeExamples[activeTab]}</code>
        </pre>
        <button
          onClick={() => handleCopy(codeExamples[activeTab])}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isCopied ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
          } backdrop-blur-md bg-opacity-30`}
        >
          {isCopied ? "Copied" : <Copy className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
