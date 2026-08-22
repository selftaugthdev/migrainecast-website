import { Background } from "@/components/Background";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: "Privacy Policy — MigraineCast",
    description:
      "MigraineCast Privacy Policy. Learn how we collect, use, and protect your information.",
    alternates: buildAlternates("/privacy", locale),
  };
}

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
            <p className="text-text-muted">Last updated: August 22, 2026</p>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-accent-soft prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-ul:text-text-muted prose-ol:text-text-muted prose-li:marker:text-accent/50">
            <p>
              This Privacy Policy explains how MigraineCast, developed by
              Thierry De Belder (&quot;MigraineCast&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;), collects, uses, stores, and shares information when
              you use the MigraineCast app and related services.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>1. Information we collect</h2>

            <h3>Migraine and ordinary-day records</h3>
            <p>
              MigraineCast lets you create migraine records and ordinary-day
              check-ins. Depending on what you choose to record, these records
              may include dates and times, pain intensity, symptoms, suspected
              triggers or causes, medications and treatments, notes, stress,
              menstrual-cycle context, and weather or health context associated
              with the record.
            </p>
            <p>
              Migraine and ordinary-day records are stored on your device. To
              support backup and restoration, they may also be stored in
              Firebase Firestore under your Firebase user identifier.
            </p>
            <p>
              We use these records to provide tracking, forecasts, personal
              baselines, trigger analysis, insights, and other app features. We
              do not use them for advertising.
            </p>

            <h3>Apple Health and HealthKit information</h3>
            <p>
              Connecting Apple Health is optional. If you grant permission,
              MigraineCast may read:
            </p>
            <ul>
              <li>Sleep analysis</li>
              <li>Heart rate variability (HRV)</li>
              <li>Resting heart rate</li>
              <li>Menstrual flow information</li>
            </ul>
            <p>
              If you grant write permission, MigraineCast may write headache
              events, including onset time and severity, to Apple Health when
              you log a migraine.
            </p>
            <p>
              MigraineCast reads HealthKit information on your device to
              calculate and display personal health and migraine context.
              HealthKit data is not used for advertising or sold. Some
              health-derived values, such as sleep duration or quality, HRV,
              resting heart rate, sleep debt, or menstrual-cycle context, may be
              saved as part of a migraine or ordinary-day record. When cloud
              backup is enabled by the app, those record snapshots may be
              stored in Firebase Firestore. MigraineCast does not upload your
              complete Apple Health record to its servers.
            </p>
            <p>
              You can grant or revoke Health permissions at any time in your
              device settings. Revoking access stops future HealthKit access
              but does not automatically remove information already saved in
              MigraineCast records.
            </p>

            <h3>Location and weather information</h3>
            <p>
              With your permission, MigraineCast uses your device location to
              request relevant local weather information from Open-Meteo and
              provide weather-based migraine forecasts and insights. This may
              include latitude and longitude, city and country, barometric
              pressure, temperature, humidity, wind, and changes in those
              conditions.
            </p>
            <p>
              Location and weather context may be saved with migraine and
              ordinary-day records and included in their Firebase Firestore
              backup. MigraineCast does not use location information for
              advertising. You can disable location access at any time in your
              device settings, although local forecasts and related features
              may then be unavailable or less accurate.
            </p>

            <h3>Firebase Authentication and Firestore</h3>
            <p>
              MigraineCast uses Firebase Authentication to create and maintain
              an account identifier. The app currently supports anonymous
              authentication. Firebase assigns a unique user ID even when you
              do not provide a name or email address.
            </p>
            <p>
              MigraineCast uses Firebase Firestore to store cloud backups of
              migraine records and ordinary-day records and to store optional
              user-research sign-ups. Firestore information is associated with
              your Firebase user ID. Google may process technical information
              needed to provide Firebase services in accordance with its own
              privacy terms.
            </p>

            <h3>Firebase Analytics and app diagnostics</h3>
            <p>
              MigraineCast uses Firebase Analytics to understand how the app is
              used and to improve features, onboarding, reliability, and
              subscription experiences. Analytics events may include app
              interactions, feature usage, general device or app information,
              permission or subscription states, and coarse count ranges.
            </p>
            <p>
              We do not intentionally send migraine notes, medication names,
              symptoms, exact HealthKit measurements, precise location, or
              research email addresses as Firebase Analytics event parameters.
            </p>
            <p>
              Firebase Crashlytics may collect crash reports, device and
              operating-system information, app version, and technical
              diagnostics used to identify and fix errors.
            </p>

            <h3>RevenueCat subscription information</h3>
            <p>
              MigraineCast uses RevenueCat to manage subscriptions, purchases,
              trials, entitlements, and paywall offerings. RevenueCat receives
              a user identifier linked to your Firebase account and may process
              product identifiers, purchase and renewal status, trial
              eligibility, subscription dates, transaction information, app
              version, device information, and related diagnostics. Payment
              details are processed by Apple, not directly by MigraineCast.
            </p>
            <p>
              We use this information to provide premium access, restore
              purchases, show the correct subscription offering, support
              customers, and understand subscription performance.
            </p>

            <h3>AppFeedbackKit feedback</h3>
            <p>
              MigraineCast uses AppFeedbackKit to present optional feedback
              prompts and collect feedback that you choose to submit. Feedback
              may include your ratings, written comments, answers provided in
              the feedback form, and technical information needed to operate
              and protect the feedback service. Please do not include sensitive
              health information in free-text feedback unless you want it to be
              included in your submission.
            </p>
            <p>
              We use submitted feedback to improve the app, diagnose problems,
              and understand user experience. Feedback is not used for
              advertising.
            </p>

            <h3>Optional user-research email collection</h3>
            <p>
              You may voluntarily sign up to be contacted about MigraineCast
              user research. If you do, we collect your email address, your
              consent to be contacted, how long you have used the app, whether
              you have premium access, broad usage-count information, time
              zone, locale, app version and build, sign-up source, submission
              time, and your Firebase user ID. This information is stored in
              Firebase Firestore.
            </p>
            <p>
              Research sign-up is optional and is not required to use
              MigraineCast. We use this information only to administer
              research recruitment, contact you about relevant research, and
              manage any stated research incentive. You can withdraw your
              research-contact consent by emailing us at{" "}
              <a href="mailto:migrainecast@gmail.com">
                migrainecast@gmail.com
              </a>
              .
            </p>

            <hr className="border-white/10 my-10" />

            <h2>2. How we use information</h2>
            <p>We use the information described above to:</p>
            <ul>
              <li>Operate, maintain, and improve MigraineCast</li>
              <li>Save, back up, restore, and synchronize app records</li>
              <li>
                Provide migraine forecasts, personal baselines, trigger
                analysis, and insights
              </li>
              <li>Read from and write to Apple Health when you authorize it</li>
              <li>Provide and manage subscriptions and premium access</li>
              <li>Measure app performance and understand feature usage</li>
              <li>Diagnose crashes and technical problems</li>
              <li>Collect and respond to optional feedback</li>
              <li>
                Recruit and contact people who voluntarily join user research
              </li>
              <li>Protect the app and prevent misuse</li>
              <li>Meet legal obligations and enforce our terms</li>
            </ul>
            <p>
              <strong>
                We do not sell personal information or health information. We
                do not share your information with advertisers for targeted
                advertising.
              </strong>
            </p>

            <hr className="border-white/10 my-10" />

            <h2>3. Service providers</h2>
            <p>
              We use service providers that process information on our behalf
              or as independent providers under their own terms, including:
            </p>
            <ul>
              <li>
                Apple, for HealthKit, App Store purchases, and subscription
                payment processing
              </li>
              <li>
                Google Firebase, for Authentication, Firestore, Analytics, and
                Crashlytics
              </li>
              <li>RevenueCat, for subscription and entitlement management</li>
              <li>AppFeedbackKit, for optional in-app feedback</li>
              <li>Open-Meteo, for weather information</li>
            </ul>
            <p>
              These providers may process information in countries other than
              your own. Their processing is governed by their privacy terms
              and applicable data-protection law.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>4. Data retention and security</h2>
            <p>
              We keep information for as long as reasonably necessary to
              provide the app, meet legal obligations, resolve disputes, and
              protect our rights. The exact period depends on the type of
              information and why it was collected.
            </p>
            <p>
              We use reasonable technical and organizational measures intended
              to protect information. No storage or transmission method is
              completely secure, and we cannot guarantee absolute security.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>5. Your choices and rights</h2>
            <p>
              Depending on where you live, you may have rights to access,
              correct, export, restrict, object to the processing of, or
              delete your personal information, and to withdraw consent where
              processing is based on consent.
            </p>
            <p>
              You can manage HealthKit, location, and other device permissions
              in iOS Settings. You can also use the app&apos;s available
              settings to manage or delete records.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>6. How to request deletion</h2>
            <p>You can request deletion in either of these ways:</p>
            <ol>
              <li>
                Use the account-deletion option in MigraineCast settings. This
                deletes the Firebase account and the migraine and ordinary-day
                records stored under that account in Firebase Firestore.
              </li>
              <li>
                Email{" "}
                <a href="mailto:migrainecast@gmail.com">
                  migrainecast@gmail.com
                </a>{" "}
                with the subject &quot;Privacy deletion request&quot;. Include
                enough information for us to locate the relevant account or
                submission. Do not send migraine details or other unnecessary
                health information by email.
              </li>
            </ol>
            <p>
              You may also ask us to delete an optional user-research sign-up
              or feedback submission. Because those submissions may be held by
              separate service providers, identify which type of submission
              you want deleted and provide the email address or other
              information used when submitting it.
            </p>
            <p>
              Deleting the app alone removes local app data from that device
              but may not delete cloud backups, analytics records, subscription
              records, feedback, or research sign-ups. Some information may be
              retained where required by law, for fraud prevention, financial
              recordkeeping, security, or another legitimate legal purpose.
              Apple and other independent providers may require separate
              requests for information they control.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>7. Children&apos;s privacy</h2>
            <p>
              MigraineCast is intended for users aged 16 and older. We do not
              knowingly collect personal information from children under 16.
              If you believe a child has provided personal information,
              contact us so we can investigate and delete it where
              appropriate.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>8. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy as the app or legal
              requirements change. We will update the date at the top of this
              policy and provide any additional notice required by law.
            </p>

            <hr className="border-white/10 my-10" />

            <h2>9. Contact</h2>
            <p>
              For privacy questions, rights requests, or deletion requests,
              contact:
            </p>
            <p className="text-accent-soft">
              MigraineCast
              <br />
              Email:{" "}
              <a href="mailto:migrainecast@gmail.com">
                migrainecast@gmail.com
              </a>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
