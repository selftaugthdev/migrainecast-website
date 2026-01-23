import { Background } from "@/components/Background";

export const metadata = {
  title: "Privacy Policy — MigraineCast",
  description:
    "MigraineCast Privacy Policy. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Background />

      <article className="pt-[140px] pb-20 relative z-10">
        <div className="max-w-[720px] mx-auto px-6">
          {/* Header */}
          <header className="mb-12">
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-4">
              MigraineCast – Privacy Policy
            </h1>
            <p className="text-text-muted">Last updated: October 2025</p>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-accent-soft prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-ul:text-text-muted prose-li:marker:text-accent/50">
            <p>
              This Privacy Policy explains how MigraineCast, developed by
              Thierry De Belder (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), collects, uses, and
              protects your information.
            </p>
            <p>By using MigraineCast, you agree to this Privacy Policy.</p>

            <hr className="border-white/10 my-10" />

            <h2>1. Information We Collect</h2>

            <h3>a) Data You Provide</h3>
            <p>
              MigraineCast allows you to log migraine-related information such
              as:
            </p>
            <ul>
              <li>Pain intensity</li>
              <li>Symptoms and triggers</li>
              <li>Notes and timestamps</li>
            </ul>
            <p>
              These entries are stored securely in Firebase Firestore and linked
              only to a random, anonymous user ID.
            </p>
            <p>
              We do not require or collect your name, email, or contact
              information within the app itself.
            </p>

            <h3>b) Automatically Collected Data</h3>
            <p>
              The app uses Firebase Analytics and Crashlytics to collect
              anonymous usage data such as:
            </p>
            <ul>
              <li>Device type and OS version</li>
              <li>App performance and crash logs</li>
              <li>Feature usage (for improving the experience)</li>
            </ul>
            <p>This data is aggregated and cannot identify you personally.</p>

            <hr className="border-white/10 my-10" />

            <h2>2. How We Use Your Data</h2>
            <p>We use this data to:</p>
            <ul>
              <li>Provide and improve the app&apos;s functionality</li>
              <li>Identify bugs and performance issues</li>
              <li>
                Understand general usage patterns (e.g., which screens are most
                helpful)
              </li>
              <li>Improve future updates and premium features</li>
            </ul>
            <p>
              <strong>
                We do not sell or share your data with advertisers or third
                parties for marketing purposes.
              </strong>
            </p>

            <hr className="border-white/10 my-10" />

            <h2>3. Data Storage & Security</h2>
            <p>
              All data is stored on Firebase servers (Google Cloud Platform),
              which comply with GDPR and ISO 27001 security standards.
            </p>
            <p>
              We take reasonable technical and organizational measures to
              protect your data from unauthorized access or misuse.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>
                Delete your data (by deleting the app and requesting removal of
                stored logs)
              </li>
              <li>Request access or correction of your data</li>
              <li>Withdraw consent for data collection at any time</li>
            </ul>
            <p>For any such requests, contact us at:</p>
            <p className="text-accent-soft">
              thierrydebelder (at) gmail (dot) com
            </p>

            <hr className="border-white/10 my-10" />

            <h2>5. Location Data</h2>
            <p>
              MigraineCast uses your device&apos;s approximate location to fetch
              local weather and air pressure information.
            </p>
            <p>
              Location data is not stored permanently and is used only to
              display relevant forecasts and insights.
            </p>
            <p>
              You can disable location access anytime via your device&apos;s
              Settings.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>6. Third-Party Services</h2>
            <p>
              MigraineCast relies on the following trusted third-party services:
            </p>
            <ul>
              <li>
                <strong>Firebase (Google LLC)</strong> – analytics, crash
                reporting, and cloud database
              </li>
              <li>
                <strong>Open-Meteo</strong> – weather and barometric pressure
                data
              </li>
            </ul>
            <p>
              Each provider processes data in accordance with their own privacy
              policies:
            </p>
            <ul>
              <li>
                <a
                  href="https://firebase.google.com/support/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firebase Privacy & Security
                </a>
              </li>
              <li>
                <a
                  href="https://open-meteo.com/en/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open-Meteo Privacy Policy
                </a>
              </li>
            </ul>

            <hr className="border-white/10 my-10" />

            <h2>7. Children&apos;s Privacy</h2>
            <p>
              MigraineCast is intended for users 16 years and older.
            </p>
            <p>We do not knowingly collect data from children under this age.</p>

            <hr className="border-white/10 my-10" />

            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time.</p>
            <p>
              The &quot;Last updated&quot; date at the top will always reflect the most
              recent version.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>9. Contact Us</h2>
            <p>
              If you have questions, requests, or concerns about your privacy,
              please contact:
            </p>
            <p className="text-accent-soft">
              thierrydebelder (at) gmail (dot) com
            </p>

            <hr className="border-white/10 my-10" />

            <h2>10. Apple EULA</h2>
            <p>
              By using MigraineCast, you also agree to Apple&apos;s Standard End User
              License Agreement (EULA), available here:
            </p>
            <p>
              <a
                href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
              </a>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
