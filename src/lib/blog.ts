export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
}

// Sample blog posts - you can later migrate this to MDX files or a CMS
const posts: BlogPost[] = [
  {
    slug: "barometric-pressure-migraines",
    title: "How Barometric Pressure Triggers Migraines",
    excerpt:
      "Understanding the science behind weather-related migraines and what you can do to prepare for pressure changes.",
    date: "January 15, 2025",
    category: "Science",
    content: `
      <p>If you've ever felt a migraine coming on before a storm, you're not imagining things. Research shows that changes in barometric pressure can trigger migraines in susceptible individuals.</p>

      <h2>What is Barometric Pressure?</h2>
      <p>Barometric pressure, also called atmospheric pressure, is the weight of the air pressing down on the Earth's surface. It's measured in units like hectopascals (hPa) or millibars (mb). Normal sea-level pressure is around 1013 hPa.</p>

      <p>When the pressure drops — typically before storms or weather fronts — many migraine sufferers report increased symptoms.</p>

      <h2>The Science Behind Pressure-Triggered Migraines</h2>
      <p>While researchers are still studying the exact mechanisms, several theories explain the connection:</p>

      <ul>
        <li><strong>Sinus pressure changes:</strong> Rapid pressure drops can affect the sinuses, potentially triggering head pain.</li>
        <li><strong>Blood vessel changes:</strong> Lower atmospheric pressure may cause blood vessels in the brain to expand.</li>
        <li><strong>Neurotransmitter effects:</strong> Pressure changes might affect serotonin levels, which play a role in migraine development.</li>
      </ul>

      <h2>How to Prepare</h2>
      <p>Knowing when pressure changes are coming gives you the chance to prepare:</p>

      <ol>
        <li>Take preventive medication if prescribed by your doctor</li>
        <li>Stay hydrated and avoid known triggers</li>
        <li>Get adequate sleep the night before</li>
        <li>Have your acute treatment ready</li>
      </ol>

      <blockquote>
        <p>The key is awareness. When you can see a pressure drop coming, you can take proactive steps instead of being caught off guard.</p>
      </blockquote>

      <p>This is exactly why we built MigraineCast — to give you the early warning you need to stay ahead of weather-triggered migraines.</p>
    `,
  },
  {
    slug: "tracking-migraine-patterns",
    title: "Why Tracking Your Migraines Actually Matters",
    excerpt:
      "Discover how consistent migraine tracking can reveal hidden patterns and help you take control of your condition.",
    date: "January 8, 2025",
    category: "Tips",
    content: `
      <p>If you've seen a neurologist about your migraines, you've probably been told to "keep a migraine diary." And if you're like most people, you've tried — and eventually given up.</p>

      <h2>The Problem with Traditional Tracking</h2>
      <p>Paper diaries and basic apps make tracking tedious:</p>

      <ul>
        <li>You have to remember to log entries</li>
        <li>Writing down details takes too long</li>
        <li>You can't easily spot patterns in your data</li>
        <li>Environmental factors aren't captured automatically</li>
      </ul>

      <p>No wonder most migraine diaries get abandoned within weeks.</p>

      <h2>What Good Tracking Looks Like</h2>
      <p>Effective migraine tracking should be:</p>

      <ul>
        <li><strong>Quick:</strong> Log an attack in seconds, not minutes</li>
        <li><strong>Automatic:</strong> Capture environmental data without manual entry</li>
        <li><strong>Insightful:</strong> Show you patterns you'd never spot yourself</li>
        <li><strong>Actionable:</strong> Help you anticipate and prepare for attacks</li>
      </ul>

      <h2>The Patterns You Might Find</h2>
      <p>With consistent tracking combined with environmental data, you might discover:</p>

      <ul>
        <li>Pressure drops of more than 5 hPa trigger your migraines</li>
        <li>Your attacks are more common on certain days of the week</li>
        <li>Temperature swings correlate with your symptoms</li>
        <li>Humidity levels affect your migraine frequency</li>
      </ul>

      <p>These insights are impossible to see without systematic tracking — but they can be life-changing once you have them.</p>

      <h2>Start Simple</h2>
      <p>You don't need to track every detail. Start with the basics:</p>

      <ol>
        <li>When did the migraine start?</li>
        <li>How severe was it (1-10)?</li>
        <li>How long did it last?</li>
      </ol>

      <p>Let the app handle the weather data. Over time, patterns will emerge — and you'll finally have the insights your doctors have been asking for.</p>
    `,
  },
  {
    slug: "preparing-for-weather-changes",
    title: "5 Ways to Prepare for Weather-Related Migraines",
    excerpt:
      "Practical strategies to reduce the impact of weather-triggered migraines when you know a pressure change is coming.",
    date: "December 28, 2024",
    category: "Tips",
    content: `
      <p>You've tracked your migraines. You know weather triggers you. Now what? Here are five practical strategies for when you see a pressure change heading your way.</p>

      <h2>1. Hydrate Proactively</h2>
      <p>Dehydration is a migraine trigger on its own. When you know weather-related stress is coming, increase your water intake the day before.</p>

      <p>Aim for at least 8 glasses of water, and consider adding electrolytes if you tend to sweat or if you'll be exercising.</p>

      <h2>2. Protect Your Sleep</h2>
      <p>Sleep disruption is one of the most common migraine triggers. When pressure changes are forecast:</p>

      <ul>
        <li>Go to bed at your normal time</li>
        <li>Avoid screens an hour before sleep</li>
        <li>Keep your bedroom cool and dark</li>
        <li>Skip the extra coffee or alcohol</li>
      </ul>

      <h2>3. Have Your Medications Ready</h2>
      <p>If you have preventive or acute medications, make sure they're accessible. There's nothing worse than a migraine starting and realizing your medication is at home or expired.</p>

      <blockquote>
        <p>Talk to your doctor about a "rescue plan" — what to take and when if you know a trigger is coming.</p>
      </blockquote>

      <h2>4. Reduce Other Triggers</h2>
      <p>When you can't control the weather, control what you can. Before a pressure change:</p>

      <ul>
        <li>Avoid processed foods and alcohol</li>
        <li>Reduce screen time and bright lights</li>
        <li>Take breaks from loud environments</li>
        <li>Manage stress with breathing exercises or meditation</li>
      </ul>

      <h2>5. Create a Comfortable Environment</h2>
      <p>If a migraine does start, having a prepared space helps:</p>

      <ul>
        <li>Blackout curtains or an eye mask</li>
        <li>A quiet room or noise-canceling headphones</li>
        <li>Ice packs or a cold compress</li>
        <li>Any comfort items that help you rest</li>
      </ul>

      <p>The goal isn't to prevent every migraine — that's often not possible. The goal is to reduce severity and recover faster when they do happen.</p>
    `,
  },
];

export function getAllPosts(): BlogPost[] {
  // Sort by date, newest first
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
