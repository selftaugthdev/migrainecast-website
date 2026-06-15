import { Background } from "@/components/Background";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service — MigraineCast",
  description:
    "MigraineCast Terms of Service. Please read these terms carefully before using the app.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Background />

      <article className="pt-[140px] pb-20 relative z-10">
        <div className="max-w-[720px] mx-auto px-6">
          {/* Header */}
          <header className="mb-12">
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-4">
              MigraineCast – Terms of Service
            </h1>
            <p className="text-text-muted">Last updated: October 2025</p>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-accent-soft prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-ul:text-text-muted prose-li:marker:text-accent/50">
            <p>
              Welcome to MigraineCast, a mobile application developed by Thierry
              De Belder (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
            </p>
            <p>
              By downloading or using MigraineCast, you agree to these Terms of
              Service (&quot;Terms&quot;).
            </p>
            <p>Please read them carefully before using the app.</p>

            <hr className="border-white/10 my-10" />

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using MigraineCast, you agree to be bound by these
              Terms.
            </p>
            <p>If you do not agree, please do not use the app.</p>
            <p>We may update these Terms periodically.</p>
            <p>
              Continued use of the app after updates means you accept the
              revised Terms.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>2. Description of the Service</h2>
            <p>
              MigraineCast is a personal wellness tool that helps users:
            </p>
            <ul>
              <li>Log migraine episodes, triggers, and related notes.</li>
              <li>
                View weather-related data that may correlate with migraine
                occurrences.
              </li>
              <li>
                Gain insights based on logged data and local weather patterns.
              </li>
            </ul>
            <p>
              <strong>
                MigraineCast is not a medical device and does not provide
                medical advice, diagnosis, or treatment.
              </strong>
            </p>
            <p>
              Always consult a qualified healthcare professional for medical
              concerns.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>3. Eligibility</h2>
            <p>You must be at least 16 years old to use MigraineCast.</p>
            <p>
              By using the app, you confirm that you meet this age requirement.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>4. User Accounts (if applicable)</h2>
            <p>
              Some features may require creating an account or signing in with a
              third-party provider (e.g., Apple or Google).
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your
              login credentials and any activity that occurs under your account.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>5. Data & Privacy</h2>
            <p>
              MigraineCast uses Firebase and other third-party services to store
              anonymized app data (such as weather logs, analytics events, or
              crash reports).
            </p>
            <p>
              We do not sell or share your personal data with advertisers.
            </p>
            <p>
              For full details on how we collect, store, and use your data,
              please review our{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
            <p>
              If you delete the app, some data may remain stored on secure
              Firebase servers until automatically purged.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>6. Premium Features</h2>
            <p>
              MigraineCast may offer optional paid or &quot;premium&quot; features in the
              future.
            </p>
            <p>
              Details of pricing, duration, and renewal terms will be shown
              clearly before purchase inside the app.
            </p>
            <p>
              All payments will be processed securely via the App Store and are
              subject to Apple&apos;s terms of sale.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>7. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Reverse engineer, decompile, or modify the app.</li>
              <li>
                Use MigraineCast in any way that violates laws or regulations.
              </li>
              <li>Interfere with or disrupt our servers or networks.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate your access if you
              misuse the app.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>8. Disclaimer of Warranties</h2>
            <p>
              MigraineCast is provided &quot;as is&quot; and &quot;as available&quot;, without
              warranties of any kind.
            </p>
            <p>
              We make no guarantees regarding the accuracy, reliability, or
              completeness of any weather data or migraine predictions.
            </p>
            <p>Use MigraineCast at your own discretion and risk.</p>

            <hr className="border-white/10 my-10" />

            <h2>9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, we are not liable for:
            </p>
            <ul>
              <li>Any indirect, incidental, or consequential damages,</li>
              <li>
                Loss of data, health consequences, or missed diagnoses arising
                from app use,
              </li>
            </ul>
            <p>
              even if we were advised of the possibility of such damages.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>10. Changes to the Service</h2>
            <p>
              We may modify, suspend, or discontinue MigraineCast at any time,
              with or without notice.
            </p>
            <p>
              If we discontinue the app, we will make reasonable efforts to
              inform users in advance.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>11. Governing Law</h2>
            <p>
              These Terms are governed by and interpreted under the laws of
              Belgium, without regard to conflict-of-law principles.
            </p>
            <p>
              You agree that any disputes will be handled in Belgian courts.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>12. Contact</h2>
            <p>
              For questions, feedback, or legal inquiries, please contact:
            </p>
            <p className="text-accent-soft">
              thierrydebelder (at) gmail (dot) com
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
