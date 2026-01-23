export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
}

// Blog posts - you can later migrate this to MDX files or a CMS
const posts: BlogPost[] = [
  {
    slug: "barometric-pressure-science",
    title: "Why Barometric Pressure Triggers Migraines: The Science Explained",
    excerpt:
      "For decades, migraine sufferers have reported that they can 'feel a storm coming' hours or even days before the first raindrop falls. Modern research has validated what millions already knew: barometric pressure changes are a legitimate migraine trigger.",
    date: "January 23, 2025",
    category: "Science",
    content: `
      <p>For decades, migraine sufferers have reported that they can "feel a storm coming" hours or even days before the first raindrop falls. Doctors once dismissed these claims as coincidental, but modern research has validated what millions of people already knew from experience: barometric pressure changes are a legitimate migraine trigger.</p>

      <p>But why does atmospheric pressure—an invisible force we can't consciously perceive—have such a profound effect on the brain? Let's break down the science.</p>

      <h2>What Is Barometric Pressure?</h2>
      <p>Barometric pressure, also called atmospheric pressure, is the weight of the air pressing down on the Earth's surface. It's measured in millimeters of mercury (mmHg) or millibars (mb), and it fluctuates constantly based on weather patterns.</p>

      <ul>
        <li><strong>High pressure</strong> typically brings clear, stable weather</li>
        <li><strong>Low pressure</strong> is associated with storms, clouds, and precipitation</li>
        <li><strong>Pressure changes</strong> occur when weather systems move through an area</li>
      </ul>

      <p>For most people, these fluctuations go completely unnoticed. But for migraine sufferers, the story is very different.</p>

      <h2>The Research: Pressure Changes and Migraine Risk</h2>
      <p>Multiple peer-reviewed studies have established a clear connection between barometric pressure drops and increased migraine incidence:</p>

      <p>A 2015 study in <em>Neurology</em> found that for every 5 mmHg decrease in barometric pressure, migraine risk increased among weather-sensitive patients. The effect was most pronounced when pressure dropped rapidly over 12-24 hours.</p>

      <p>Research published in <em>The Journal of Headache and Pain</em> tracked migraine patients over several months and found that atmospheric pressure changes were the most commonly identified weather-related trigger, more significant than temperature, humidity, or precipitation.</p>

      <p>A Japanese study using detailed weather data and emergency room visits demonstrated that low atmospheric pressure days correlated with increased migraine-related medical visits, with the effect peaking approximately 24 hours after significant pressure drops.</p>

      <p>The evidence is clear: this isn't psychological or coincidental—there's a measurable physiological response.</p>

      <h2>The Mechanism: Why Your Brain Reacts to Pressure</h2>
      <p>So what's actually happening inside your body when barometric pressure drops? Scientists have identified several interconnected mechanisms:</p>

      <h3>1. Sinus and Inner Ear Pressure Imbalances</h3>
      <p>Your sinuses and inner ear contain air-filled spaces. When external atmospheric pressure drops, the pressure inside these spaces becomes relatively higher, creating an imbalance. This can:</p>

      <ul>
        <li>Trigger inflammation in sinus membranes</li>
        <li>Activate pain-sensitive nerve endings</li>
        <li>Create tension that radiates to the trigeminal nerve (the main nerve involved in migraine)</li>
      </ul>

      <p>Think of it like the ear pressure you feel on an airplane, but subtler and more prolonged.</p>

      <h3>2. Blood Vessel Changes</h3>
      <p>Barometric pressure changes affect blood vessel dilation and constriction. When atmospheric pressure drops:</p>

      <ul>
        <li>Blood vessels may expand slightly to compensate</li>
        <li>This vascular change can trigger the cascade of events that lead to migraine</li>
        <li>The trigeminal vascular system (blood vessels surrounding the brain) becomes activated</li>
      </ul>

      <p>Research suggests that people with migraine have blood vessels that are more reactive to these pressure changes than non-migraine sufferers.</p>

      <h3>3. Oxygen Level Fluctuations</h3>
      <p>Lower barometric pressure means less oxygen is available in each breath. While this effect is minimal at normal altitudes, even small decreases in oxygen availability can affect cerebral blood flow and trigger migraine in susceptible individuals.</p>

      <p>This is why some people experience migraines at high altitudes or during flights—the principle is the same as weather-related pressure changes, just more extreme.</p>

      <h3>4. Chemical Mediator Release</h3>
      <p>Pressure changes may trigger the release of neurochemicals involved in migraine:</p>

      <ul>
        <li>Serotonin fluctuations affect blood vessel tone and pain signaling</li>
        <li>Calcitonin gene-related peptide (CGRP), a key player in migraine pathophysiology, may be released in response to pressure changes</li>
        <li>Inflammatory mediators can be activated by the physical stress of pressure imbalances</li>
      </ul>

      <h3>5. The Sensitized Nervous System</h3>
      <p>People with migraine have nervous systems that are more sensitive to environmental changes. The prevailing theory suggests that the migraine brain has a lower threshold for triggering protective responses to perceived threats—including atmospheric pressure changes that non-migraine brains simply ignore.</p>

      <h2>Why the Timing Matters</h2>
      <p>One of the most important findings from pressure-migraine research is the temporal relationship: migraines typically occur 12-48 hours before or during rapid pressure drops, not after the storm has passed.</p>

      <p>This means:</p>

      <ul>
        <li>You might get a migraine on a sunny day because a storm system is approaching</li>
        <li>The migraine often peaks before the weather actually changes</li>
        <li>By the time it's raining, your attack may already be resolving</li>
      </ul>

      <p>This lag time is actually your advantage—if you know a pressure drop is coming, you have a window to take preventive action.</p>

      <h2>Individual Variability: Your Personal Pressure Threshold</h2>
      <p>Not everyone responds to the same pressure changes. Research shows that:</p>

      <ul>
        <li>Some people are triggered by drops as small as 3-5 mmHg</li>
        <li>Others only respond to rapid drops of 10+ mmHg</li>
        <li>The rate of change often matters more than the absolute pressure level</li>
        <li>Some individuals are more sensitive to rising pressure (less common)</li>
      </ul>

      <p>This variability means generic weather forecasts aren't enough—you need to understand your specific pressure threshold and response pattern.</p>

      <h2>Beyond Just "Checking the Weather"</h2>
      <p>Standard weather apps show temperature, precipitation, and maybe general pressure readings. But they don't:</p>

      <ul>
        <li>Track pressure trends (the rate of change that matters most)</li>
        <li>Alert you to upcoming drops before you feel symptoms</li>
        <li>Correlate pressure patterns with your migraine history</li>
        <li>Identify your personal pressure threshold</li>
      </ul>

      <p>This is where specialized migraine forecasting becomes essential.</p>

      <h2>Turning Knowledge Into Prevention</h2>
      <p>Understanding the barometric pressure-migraine connection is valuable, but tracking it in real-time transforms that knowledge into actionable prevention.</p>

      <p>When you know a significant pressure drop is approaching your location in the next 24-48 hours, you can:</p>

      <ul>
        <li>Increase hydration and ensure consistent sleep</li>
        <li>Avoid other known triggers (certain foods, stress, bright lights)</li>
        <li>Have acute medication ready and take it early</li>
        <li>Adjust your schedule to avoid high-stakes commitments during high-risk periods</li>
        <li>Use preventive treatments as recommended by your doctor</li>
      </ul>

      <p>The difference between reactive and proactive migraine management is often just having advance warning.</p>

      <h2>Your Personal Pressure Pattern</h2>
      <p>MigraineCast continuously monitors barometric pressure at your specific location and learns your individual response pattern. By correlating pressure changes with your migraine history, the app identifies:</p>

      <ul>
        <li>Your personal pressure threshold</li>
        <li>How quickly you respond to drops (12 hours? 36 hours?)</li>
        <li>Which types of weather systems affect you most</li>
        <li>Patterns you might not notice on your own</li>
      </ul>

      <p>Instead of wondering "is this weather going to trigger me?", you'll know in advance—giving you the power to prepare instead of just endure.</p>

      <blockquote>
        <p>Ready to stop being caught off guard by weather triggers? MigraineCast provides personalized barometric pressure forecasts and alerts tailored to your migraine pattern. Download now and get 7 days free.</p>
      </blockquote>
    `,
  },
  {
    slug: "winter-migraines",
    title: "Why You Get More Migraines in Winter (It's Not Just the Cold)",
    excerpt:
      "If you've noticed your migraines spike between November and March, you're not imagining it. Understanding the actual triggers can help you prepare for and potentially prevent these seasonal attacks.",
    date: "January 20, 2025",
    category: "Science",
    content: `
      <p>If you've noticed your migraines spike between November and March, you're not imagining it. While many people assume winter migraines are simply caused by cold temperatures, the reality is far more complex—and understanding the actual triggers can help you prepare for and potentially prevent these seasonal attacks.</p>

      <h2>The Barometric Pressure Roller Coaster</h2>
      <p>Winter weather systems create dramatic fluctuations in atmospheric pressure, and research suggests this may be the primary culprit behind seasonal migraine increases. A study published in the journal <em>Neurology</em> found that for every 5 mmHg drop in barometric pressure, migraine risk increased significantly among weather-sensitive individuals.</p>

      <p>Winter is particularly challenging because:</p>

      <ul>
        <li><strong>Storm systems are more frequent and intense.</strong> Cold fronts, nor'easters, and winter storms bring rapid pressure drops that can trigger attacks 24-48 hours before the weather actually changes.</li>
        <li><strong>Temperature inversions create pressure instability.</strong> When warm air traps cold air near the surface, barometric pressure becomes unpredictable—exactly the kind of volatility that migraine-prone nervous systems struggle with.</li>
        <li><strong>Multiple systems collide.</strong> Winter weather patterns often involve several competing air masses, creating repeated pressure swings within short timeframes.</li>
      </ul>

      <h2>The Indoor-Outdoor Temperature Swing</h2>
      <p>Moving between heated indoor spaces and frigid outdoor air forces your blood vessels to rapidly constrict and dilate. This vascular response can trigger migraines in susceptible individuals, especially when the temperature difference exceeds 20-30 degrees Fahrenheit.</p>

      <p>Research from the Harvard Medical School has noted that sudden temperature changes can activate the trigeminal nerve—the same nerve pathway involved in migraine pain signals.</p>

      <h2>Dehydration in Disguise</h2>
      <p>Winter air is remarkably dry, both outdoors and in heated indoor environments. Many people don't realize they're becoming dehydrated because they're not sweating or feeling hot. Dehydration is a well-established migraine trigger, and winter's hidden fluid loss catches many sufferers off guard.</p>

      <p>The combination of:</p>

      <ul>
        <li>Low humidity levels (often below 30% indoors)</li>
        <li>Reduced thirst perception in cold weather</li>
        <li>Increased respiratory water loss in cold, dry air</li>
      </ul>

      <p>...creates perfect conditions for dehydration-triggered migraines.</p>

      <h2>Reduced Daylight and Disrupted Circadian Rhythms</h2>
      <p>Shorter days and reduced sunlight exposure affect melatonin production and circadian rhythm stability. Studies have shown that circadian disruption can lower the threshold for migraine attacks.</p>

      <p>Additionally, reduced natural light exposure may contribute to:</p>

      <ul>
        <li>Vitamin D deficiency (linked to increased migraine frequency in some research)</li>
        <li>Altered sleep-wake cycles</li>
        <li>Changes in serotonin levels</li>
      </ul>

      <h2>Seasonal Behavioral Changes</h2>
      <p>Winter often brings lifestyle shifts that compound weather-related triggers:</p>

      <ul>
        <li><strong>Dietary changes:</strong> Holiday foods, increased alcohol consumption, and irregular eating schedules during winter celebrations can add trigger exposure.</li>
        <li><strong>Sleep disruption:</strong> Holiday stress, travel, and time zone changes (even the fall time change) affect sleep consistency.</li>
        <li><strong>Reduced physical activity:</strong> Cold weather often means less outdoor exercise, which can affect overall migraine management.</li>
      </ul>

      <h2>What You Can Actually Do About It</h2>
      <p>Understanding these winter-specific triggers allows for targeted prevention strategies:</p>

      <h3>Track pressure patterns, not just temperature</h3>
      <p>Standard weather apps show temperature and precipitation, but barometric pressure trends are what matter most for weather-sensitive migraine sufferers. Knowing when pressure is dropping allows you to take preventive measures before symptoms begin.</p>

      <h3>Create a pressure plan</h3>
      <p>When you know a pressure drop is coming (typically 24-48 hours before a storm), you can:</p>

      <ul>
        <li>Stay extra hydrated</li>
        <li>Avoid other known triggers</li>
        <li>Have medication ready</li>
        <li>Adjust your schedule if possible</li>
      </ul>

      <h3>Manage the indoor environment</h3>
      <p>Use a humidifier to keep indoor humidity between 30-50%, and try to minimize the number of times you transition between extreme temperatures.</p>

      <h3>Maintain consistency</h3>
      <p>Keep sleep schedules, meal times, and exercise routines as regular as possible despite holiday disruptions.</p>

      <h2>The Bottom Line</h2>
      <p>Winter migraines aren't just about cold weather—they're about barometric pressure volatility, environmental transitions, and seasonal lifestyle changes that converge during the coldest months. The good news? Once you understand your specific winter triggers, you can move from reactive management to proactive prevention.</p>

      <p>The key is knowing when these pressure changes are coming. That's where specialized migraine forecasting becomes invaluable—giving you the advance warning you need to prepare instead of simply endure.</p>

      <blockquote>
        <p>MigraineCast helps you track barometric pressure patterns specific to your location and correlate them with your migraine history, giving you personalized forecasts so you can stay ahead of winter weather triggers.</p>
      </blockquote>
    `,
  },
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
