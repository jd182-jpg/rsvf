/* =========================================================================
   RSVF site data
   -------------------------------------------------------------------------
   This is the only file you need to touch to update the team or portfolio.
   Everything else on the site renders from here.
   ========================================================================= */


/* -------------------------------------------------------------------------
   PORTFOLIO
   -------------------------------------------------------------------------
   To add a company, copy one block and fill it in:

   {
     name:    "Company name",
     sector:  "Energy" | "Healthcare" | "Consumer" | "Enterprise",
     stage:   "Pre-seed",                       // shown as a small tag
     location:"Houston, TX",
     blurb:   "One or two sentences on what they do.",
     url:     "https://example.com",
     logo:    "assets/img/portfolio/example.png" // .png or .svg, drop the file in that folder
   }

   Leave `logo` out entirely and the card falls back to the company name set
   in type, which still looks correct.
   ------------------------------------------------------------------------- */

const PORTFOLIO = [
  {
    name: "Voltair",
    sector: "Energy",
    stage: "Pre-seed",
    location: "Chicago, IL",
    blurb: "Hybrid fixed-wing autonomous drones that inspect critical utility infrastructure. RGB, thermal, and LiDAR payloads run continuous monitoring missions and rapid post-storm fault localization.",
    url: "https://www.voltairlabs.com/",
    logo: "assets/img/portfolio/voltair.svg"
  },
  {
    name: "Humanaut Health",
    sector: "Healthcare",
    stage: "Seed",
    location: "Austin, TX",
    blurb: "Longevity medicine and health optimization clinics. Members get 300 to 1,000+ biomarker diagnostic panels, personalized protocols, and ongoing care management instead of reactive appointments.",
    url: "https://humanauthealth.com/",
    logo: "assets/img/portfolio/humanaut.svg"
  },
  {
    name: "Veloci",
    sector: "Consumer",
    stage: "Seed",
    location: "United States",
    blurb: "Naturally-fitting running shoes built around a wide toe box, maximum cushioning, and a 10mm drop, engineered to reduce foot pain and lower-leg tightness without giving up support.",
    url: "https://velocirunning.com/",
    logo: "assets/img/portfolio/veloci.png"
  },
  {
    name: "HEXASpec",
    sector: "Enterprise",
    stage: "Pre-seed",
    location: "Houston, TX",
    blurb: "Inorganic fillers for next-generation semiconductor packaging with 20x higher thermal conductivity, cutting operating surface temperatures as transistor density keeps climbing.",
    url: "https://www.hexaspec.com/",
    logo: "assets/img/portfolio/hexaspec.png"
  }
];


/* -------------------------------------------------------------------------
   TEAM
   -------------------------------------------------------------------------
   Groups render in the order listed here.

   To add a headshot, drop a square image in assets/img/team/ and add:
     photo: "assets/img/team/firstname-lastname.jpg"
   Without a photo, the card shows a monogram tile, which is the intended
   placeholder and looks deliberate.

   Optional per person:
     linkedin: "https://www.linkedin.com/in/..."
     note:     "Short line under the role"
   ------------------------------------------------------------------------- */

const TEAM = [
  {
    group: "Managing partners",
    caption: "Fund strategy, investment committee, and final check approval.",
    people: [
      { name: "Raj Shroff",   role: "Managing Partner", linkedin: "https://www.linkedin.com/in/raj-sahir-shroff" },
      { name: "Alena Powell", role: "Managing Partner", linkedin: "https://www.linkedin.com/in/alena-powell" }
    ]
  },
  {
    group: "Sector directors",
    caption: "Each director owns sourcing, diligence, and founder relationships in their sector.",
    people: [
      { name: "Kaira Sheth",     role: "Director, Energy",     sector: "Energy",     linkedin: "https://www.linkedin.com/in/kaira-sheth" },
      { name: "Jackson Darr",    role: "Director, Healthcare", sector: "Healthcare", linkedin: "https://www.linkedin.com/in/jacksondarr" },
      { name: "Sriram Chundi",   role: "Director, Consumer",   sector: "Consumer",   linkedin: "https://www.linkedin.com/in/sriram314" },
      { name: "Muyiwa Ogunsola", role: "Director, Enterprise", sector: "Enterprise", linkedin: "https://www.linkedin.com/in/muyiwao" }
    ]
  }
];


/* -------------------------------------------------------------------------
   FOUNDERS (named in the story section, not rendered as cards)
   ------------------------------------------------------------------------- */
const FOUNDERS = ["Jacob Straube", "Pranai Reddy"];
