# বাজার দর / BazarDor

বাজার দর (BazaarDor) is a modern, real-time web application designed to track, compare, and display up-to-date market prices of daily essential commodities in Bangladesh. Built with performance, responsiveness, and localization in mind, it bridges the gap between consumers and accurate market trends.

---

## Technologies Used

* Next.js (App Router)
* Tailwind CSS
* TypeScript
* HeroUI
* Better Auth (with MongoDB adapter)
* React Hot Toast
* Custom Bengali typography (`Hind_Siliguri`) and numeric script converters

---

## Key Features

* **Real-Time Price Marquee**: A continuous, pause-on-hover moving ticker displaying live commodity updates, price fluctuations, and percentage changes with direct access to product detail pages.
* **Dynamic Price Trend Categorization**: Dedicated views highlighting commodities whose prices have increased or decreased today, complete with skeleton loading states for enhanced perceived performance.
* **Bengali Localization**: Fully localized user interface featuring custom utilities that automatically convert standard numeric digits into authentic Bengali script alongside native unit translations (e.g., কেজি, ডজন, লিটার).
* **Secure Authentication & User Profile**: Complete sign-in, sign-up, and profile management flows supporting email/password and social providers (Google, GitHub) backed by instant header state synchronization and toast notifications.
* **Advanced Server-Side Caching & Routing**: Optimized data fetching utilizing Next.js caching directives and client-side navigation (`useRouter`) to ensure lightning-fast page transitions and reliable error handling (such as 404 fallback views).