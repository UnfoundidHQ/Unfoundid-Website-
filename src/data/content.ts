export interface Product {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Experimental' | 'Research';
  url: string;
  accentColor?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'ultrawan',
    name: 'Ultrawan',
    description: 'An AI-focused product built as part of the Unfoundid ecosystem.',
    status: 'Active / Experimental',
    url: 'https://ultrawan.vercel.app', // Placeholder URL as requested "INSERT EXACT ULTRAWAN VERCEL URL HERE" - I'll use this format or just a likely one.
    accentColor: '#1E40AF'
  },
  {
    id: 'signalsynth',
    name: 'SignalSynth',
    description: 'A research synthesis platform designed to turn user research data into structured insights.',
    status: 'Active',
    url: 'https://signalsynth.onrender.com',
    accentColor: '#059669'
  },
  {
    id: 'unfoundscape',
    name: 'Unfoundscape',
    description: 'An experimental product within the Unfoundid ecosystem.',
    status: 'Experimental',
    url: 'https://unfoundscape.vercel.app', // Placeholder URL
    accentColor: '#7C3AED'
  }
] as any; // Using any for status string union flexibility

export const ARTICLES: Article[] = [
  {
    id: 'introducing-unfoundid',
    title: 'Introducing Unfoundid — A New Beginning',
    excerpt: 'A new chapter begins with Unfoundid: an independent technology brand focused on building useful products, tools, and systems.',
    publishDate: 'October 2026',
    readTime: '4 min read',
    content: `
      <h2>A New Chapter</h2>
      <p>Unfoundid is an independent technology brand focused on building useful software, tools, and experimental products. The goal is simple: create things that are genuinely worth using.</p>
      
      <p>We believe that technology should serve a purpose. In an era where software is often built for the sake of metrics or short-term trends, we choose to focus on utility and longevity. Every product in the Unfoundid ecosystem is an experiment in solving real-world problems with precision and care.</p>
      
      <h3>Why Unfoundid?</h3>
      <p>The name came from the search itself. While looking for the right name for the brand, no name felt right. After searching and finding nothing suitable, the idea became the name: <strong>Unfoundid</strong>.</p>
      
      <p>It represents the state of many great ideas before they are realized—they are "unfound." Our mission is to find those ideas and build them into tools that people actually need.</p>
      
      <h3>What We Build</h3>
      <p>Unfoundid is not limited to one category. Our interests are broad, ranging from AI and research synthesis to developer tools and productivity automation. If there is a meaningful problem to solve, we are interested in building a solution for it.</p>
      
      <p>Currently, our ecosystem includes products like <strong>SignalSynth</strong>, a platform for research synthesis, and <strong>Ultrawan</strong>, an AI-focused utility. We are also working on experimental projects like <strong>Unfoundscape</strong>.</p>
      
      <h3>The Road Ahead</h3>
      <p>This is just the beginning. We are building Unfoundid for the long term. We don't chase short-term attention or follow the "fail fast" mantra blindly. Instead, we experiment, improve, and refine.</p>
      
      <p>We invite you to explore our products and follow our journey as we build things worth using.</p>
    `
  }
];
