import { useMemo, useState } from "react";
import axios from "axios";
import "@/App.css";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Dumbbell,
  MapPin,
  ShieldCheck,
  Sparkles,
  Waves,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toaster, toast } from "@/components/ui/sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const toSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const projectMetrics = [
  { label: "Land Parcel", value: "13 Acres" },
  { label: "Skyline Scale", value: "11 Towers (G+35)" },
  { label: "Density", value: "4 Units Per Floor" },
  { label: "Clubhouse", value: "35,000 sq. ft." },
];

const trustPillars = [
  {
    title: "Supreme Court Monitored",
    description: "A legally safeguarded framework with NBCC execution for confidence-led delivery.",
    icon: ShieldCheck,
  },
  {
    title: "Forbes Global Affiliation",
    description: "Global luxury alignment with a brand ecosystem known for high-value properties.",
    icon: Sparkles,
  },
  {
    title: "AQI-Managed Community",
    description: "Scientifically managed clean-air systems across residences and common zones.",
    icon: Wind,
  },
  {
    title: "Wellness-Led Masterplan",
    description: "Central greens, aqua zones, meditation decks, and curated well-being infrastructure.",
    icon: Waves,
  },
];

const detailedHighlights = [
  "AQI-managed fresh-air systems in each room with PM2.5 / PM10 filtration and AQI-based auto-switching.",
  "uPVC insulated windows and anti-dust planning to reduce pollutant infiltration.",
  "Centralized soft-water ecosystem designed for skin, hair, and home-finish longevity.",
  "Smart-home controls for lights, fans, AC and integrated safety stack with panic/smoke/gas sensors.",
  "Sports & Art Academy program with complimentary child-focused development support for 3 years.",
  "Exclusive lifestyle zones including curated lounges, co-working suites, reading haven, and amphitheatre.",
];

const connectivityPoints = [
  "Sector 4, Greater Noida West with direct arterial access to Noida City Centre and NH-24.",
  "Adjacent to Gaur City Mall with immediate social infrastructure around the project micro-market.",
  "Proposed 17.4 km Aqua Line extension expected to strengthen metro connectivity by Dec 2029.",
  "Approx. 60 mins to IGI Airport and ~75 mins to Jewar Airport (as per brochure communication).",
];

const brochureShowcase = [
  { title: "Strategic Location Narrative", image: "/pdf-assets/deck_p11.jpg" },
  { title: "Four Dimensions of Elevated Living", image: "/pdf-assets/deck_p15.jpg" },
  { title: "Clean Air Experience", image: "/pdf-assets/deck_p19.jpg" },
  { title: "Resort Wellness Positioning", image: "/pdf-assets/deck_p24.jpg" },
  { title: "3-Year Assurance Program", image: "/pdf-assets/deck_p30.jpg" },
  { title: "Branded Clubhouse Experience", image: "/pdf-assets/deck_p35.jpg" },
];

const floorPlanGallery = [
  { title: "Master Plan Overview", image: "/pdf-assets/floor_p07.jpg" },
  { title: "Site Distribution Plan", image: "/pdf-assets/floor_p10.jpg" },
  { title: "Typical Floor Plate", image: "/pdf-assets/floor_p11.jpg" },
  { title: "3BHK + Study + 4T", image: "/pdf-assets/floor_p12.jpg" },
  { title: "3BHK + Study + 4T Variant", image: "/pdf-assets/floor_p13.jpg" },
  { title: "4BHK + Study + 5T", image: "/pdf-assets/floor_p14.jpg" },
  { title: "4BHK + Study + 5T Variant", image: "/pdf-assets/floor_p15.jpg" },
];

const floorTabs = [
  {
    id: "3bhk",
    label: "3 BHK + Study + 4T",
    summary: [
      "Super Area: 2690 - 2718 sq. ft.",
      "Carpet Area: 1598 - 1608 sq. ft.",
      "Balcony Area: 327 - 364 sq. ft.",
    ],
    plans: [
      { title: "Type 1 Plan", image: "/pdf-assets/floor_p12.jpg" },
      { title: "Type 2 Plan", image: "/pdf-assets/floor_p13.jpg" },
    ],
  },
  {
    id: "4bhk",
    label: "4 BHK + Study + 5T",
    summary: [
      "Super Area: 3307 sq. ft.",
      "Carpet Area: 1946 sq. ft.",
      "Balcony Area: 448 sq. ft.",
    ],
    plans: [
      { title: "Type 3 Plan", image: "/pdf-assets/floor_p14.jpg" },
      { title: "Type 4 Plan", image: "/pdf-assets/floor_p15.jpg" },
    ],
  },
];

const initialForm = {
  name: "",
  phone: "",
  budget: "",
  preferred_callback_time: "",
};

const LeadFormPopup = ({ open, setOpen }) => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formValid = useMemo(() => {
    return (
      formData.name.trim().length > 1 &&
      formData.phone.trim().length >= 8 &&
      formData.budget.trim().length > 1 &&
      formData.preferred_callback_time.trim().length > 1
    );
  }, [formData]);

  const onChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const resetAndClose = () => {
    setOpen(false);
    setSubmitted(false);
    setFormData(initialForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formValid) {
      toast.error("Please complete all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/leads`, formData);
      toast.success("Thank you. Our advisor will connect shortly.");
      setSubmitted(true);
    } catch (error) {
      toast.error("Submission failed. Please try again.");
      console.error("Lead submission error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-testid="lead-form-dialog"
        className="max-w-xl border-[#f00000]/55 bg-white p-8 shadow-[0_34px_100px_rgba(240,0,0,0.22)] sm:rounded-sm"
      >
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-3xl text-[#1a1a1a]" data-testid="lead-form-title">
                Book Your Private Viewing
              </DialogTitle>
              <DialogDescription className="text-base text-[#4a4a4a]" data-testid="lead-form-description">
                Please share your details and our luxury advisor team will call you.
              </DialogDescription>
            </DialogHeader>

            <form className="mt-4 space-y-4" onSubmit={handleSubmit} data-testid="lead-form">
              <Input
                data-testid="lead-form-name-input"
                value={formData.name}
                onChange={onChange("name")}
                placeholder="Full Name"
                className="h-11 rounded-sm border-[#f4a3a3] bg-white text-base focus-visible:ring-[#f00000]"
              />
              <Input
                data-testid="lead-form-phone-input"
                value={formData.phone}
                onChange={onChange("phone")}
                placeholder="Phone Number"
                className="h-11 rounded-sm border-[#f4a3a3] bg-white text-base focus-visible:ring-[#f00000]"
              />
              <Input
                data-testid="lead-form-budget-input"
                value={formData.budget}
                onChange={onChange("budget")}
                placeholder="Budget (e.g. ₹3.5 CR+)"
                className="h-11 rounded-sm border-[#f4a3a3] bg-white text-base focus-visible:ring-[#f00000]"
              />
              <Input
                data-testid="lead-form-callback-input"
                value={formData.preferred_callback_time}
                onChange={onChange("preferred_callback_time")}
                placeholder="Preferred Callback Time"
                className="h-11 rounded-sm border-[#f4a3a3] bg-white text-base focus-visible:ring-[#f00000]"
              />

              <Button
                data-testid="lead-form-submit"
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-sm bg-[#f00000] text-base text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#c60000]"
              >
                {loading ? "Submitting..." : "Request Callback"}
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-6 py-6 text-center" data-testid="lead-form-success-state">
            <CheckCircle2 className="mx-auto h-14 w-14 text-[#f00000]" aria-hidden="true" />
            <h3 className="font-display text-3xl text-[#1a1a1a]" data-testid="lead-form-success-title">
              Request Received
            </h3>
            <p className="text-base text-[#4a4a4a]" data-testid="lead-form-success-description">
              Thank you for your interest in FAB LUXE RESIDENCIES. Our specialist will get in touch shortly.
            </p>
            <Button
              data-testid="lead-form-success-close-button"
              onClick={resetAndClose}
              className="h-11 rounded-sm bg-[#f00000] px-8 text-white hover:bg-[#c60000]"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default function App() {
  const [open, setOpen] = useState(false);
  const [activeFloorTab, setActiveFloorTab] = useState("3bhk");
  const selectedFloorTab = floorTabs.find((tab) => tab.id === activeFloorTab) || floorTabs[0];

  return (
    <div className="luxury-page min-h-screen bg-white text-[#1a1a1a]" data-testid="landing-page-root">
      <Toaster position="top-center" richColors />

      <header
        className="fixed left-0 top-0 z-50 w-full border-b border-[#f00000]/20 bg-white/95 backdrop-blur"
        data-testid="landing-header"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-6 py-3 md:px-12">
          <div className="flex items-center gap-3" data-testid="brand-block">
            <img
              src="/pdf-assets/fab_luxe_logo_full.png"
              alt="FAB LUXE RESIDENCIES logo"
              className="h-8 w-auto object-contain md:h-12"
              data-testid="project-logo"
            />
            <div className="hidden sm:block">
              <p className="font-display text-lg text-[#111] md:text-xl" data-testid="brand-name">
                FAB LUXE RESIDENCIES
              </p>
              <p className="hidden text-[11px] uppercase tracking-[0.17em] text-[#a90000] md:block" data-testid="brand-subtitle">
                by Forbes Global Properties
              </p>
            </div>
          </div>

          <Button
            data-testid="header-inquire-button"
            onClick={() => setOpen(true)}
            className="rounded-sm border border-[#f00000] bg-[#f00000] px-3 text-xs text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#c60000] sm:px-5 sm:text-sm"
          >
            Inquire Now
          </Button>
        </div>
      </header>

      <main className="pt-[86px]" data-testid="landing-main-content">
        <section className="relative overflow-hidden" style={{ minHeight: "85vh" }} data-testid="hero-section">
          <div
            className="hero-image absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(30, 0, 0, 0.72) 10%, rgba(30, 0, 0, 0.42) 65%, rgba(30, 0, 0, 0.35) 100%), url('/pdf-assets/deck_p01.jpg')",
            }}
            data-testid="hero-background"
          />

          <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 pb-20 pt-20 md:px-12 md:pt-28">
            <p
              className="mb-4 inline-block w-fit border border-white/80 bg-[#f00000]/30 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white"
              data-testid="hero-tagline"
            >
              India&apos;s First &amp; Only AQI-Managed Luxury Project
            </p>
            <h1
              className="font-display text-4xl leading-tight text-white sm:text-5xl lg:max-w-5xl lg:text-6xl"
              data-testid="hero-main-heading"
            >
              A Signature Redefined: FAB LUXE RESIDENCIES in Greater Noida West
            </h1>
            <p
              className="mt-6 max-w-3xl text-sm leading-relaxed text-white md:text-lg"
              data-testid="hero-description"
            >
              Supreme Court monitored. NBCC executed. Globally positioned with Forbes association. Crafted for families that value
              trust, wellness, and legacy-grade luxury.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4" data-testid="hero-action-group">
              <Button
                data-testid="hero-cta-button"
                onClick={() => setOpen(true)}
                className="h-11 rounded-sm border border-white bg-white px-7 text-[#b10000] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#f9ecec]"
              >
                Book Private Viewing <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-base text-white md:text-lg" data-testid="hero-price">
                Price starts at <span className="font-semibold text-[#ffd5d5]">₹2.97 CR</span>
              </p>
            </div>
          </div>
        </section>

        <section
          className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-12"
          data-testid="trust-metrics-section"
        >
          {projectMetrics.map((item) => (
            <article
              key={item.label}
              className="metric-tile border border-[#f00000]/25 bg-white p-5"
              data-testid={`metric-card-${toSlug(item.label)}`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#a00000]" data-testid={`metric-label-${toSlug(item.label)}`}>
                {item.label}
              </p>
              <p className="mt-2 font-display text-2xl text-[#1a1a1a]" data-testid={`metric-value-${toSlug(item.label)}`}>
                {item.value}
              </p>
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12" data-testid="project-trust-section">
          <h2 className="font-display text-4xl text-[#1a1a1a] md:text-5xl" data-testid="trust-section-heading">
            Why High-Ticket Buyers Are Engaging with FAB LUXE
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-[#404040] md:text-lg" data-testid="trust-section-subheading">
            Built on institutional trust, clean-air innovation, and premium planning — this is a complete lifestyle proposition,
            not just another high-rise inventory launch.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2" data-testid="trust-pillars-grid">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="reveal-card border border-[#f00000]/25 bg-[#fff8f8] p-6"
                  data-testid={`trust-pillar-card-${toSlug(pillar.title)}`}
                >
                  <Icon className="h-6 w-6 text-[#f00000]" aria-hidden="true" />
                  <h3
                    className="mt-4 font-display text-2xl text-[#1f1f1f]"
                    data-testid={`trust-pillar-title-${toSlug(pillar.title)}`}
                  >
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#454545] md:text-base" data-testid={`trust-pillar-desc-${toSlug(pillar.title)}`}>
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12" data-testid="brochure-image-section">
          <h2 className="font-display text-4xl text-[#1a1a1a] md:text-5xl" data-testid="brochure-image-heading">
            Project Story from the Official Deck
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="brochure-image-grid">
            {brochureShowcase.map((item) => (
              <figure
                key={item.title}
                className="overflow-hidden border border-[#f00000]/20 bg-white"
                data-testid={`brochure-image-card-${toSlug(item.title)}`}
              >
                <div className="aspect-[16/10] overflow-hidden" data-testid={`brochure-image-wrap-${toSlug(item.title)}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    data-testid={`brochure-image-${toSlug(item.title)}`}
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-[#1f1f1f]" data-testid={`brochure-caption-${toSlug(item.title)}`}>
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-20 lg:grid-cols-2 lg:px-12" data-testid="wellness-and-features-section">
          <div>
            <h2 className="font-display text-4xl text-[#1a1a1a] md:text-5xl" data-testid="wellness-heading">
              Deeper Project Information for Serious Decision-Making
            </h2>
            <div className="mt-6 space-y-4" data-testid="wellness-bullet-list">
              {detailedHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#363636] md:text-base"
                  data-testid={`wellness-bullet-${toSlug(highlight.slice(0, 28))}`}
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#f00000]" aria-hidden="true" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5" data-testid="wellness-visual-grid">
            <figure className="overflow-hidden border border-[#f00000]/20" data-testid="wellness-visual-aqi-card">
              <div className="aspect-[16/10]" data-testid="wellness-visual-aqi-wrap">
                <img
                  src="/pdf-assets/deck_p19.jpg"
                  alt="AQI managed luxury visual"
                  className="h-full w-full object-cover"
                  data-testid="wellness-visual-aqi-image"
                />
              </div>
            </figure>
            <figure className="overflow-hidden border border-[#f00000]/20" data-testid="wellness-visual-lifestyle-card">
              <div className="aspect-[16/10]" data-testid="wellness-visual-lifestyle-wrap">
                <img
                  src="/pdf-assets/deck_p35.jpg"
                  alt="Clubhouse and premium amenity visual"
                  className="h-full w-full object-cover"
                  data-testid="wellness-visual-lifestyle-image"
                />
              </div>
            </figure>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12" data-testid="floor-plan-gallery-section">
          <h2 className="font-display text-4xl text-[#1a1a1a] md:text-5xl" data-testid="floor-plan-gallery-heading">
            Floor Plans & Master Planning Gallery
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-[#424242] md:text-lg" data-testid="floor-plan-gallery-subheading">
            Dedicated floor-plan visuals sourced from your PDF, including site layout, floor plate strategy, and unit-wise plan sheets.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2" data-testid="floor-plan-gallery-grid">
            {floorPlanGallery.map((item) => (
              <figure
                key={item.title}
                className="overflow-hidden border border-[#f00000]/25 bg-[#fffdfd]"
                data-testid={`floor-plan-gallery-card-${toSlug(item.title)}`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-white" data-testid={`floor-plan-gallery-wrap-${toSlug(item.title)}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain transition-transform duration-700 hover:scale-105"
                    data-testid={`floor-plan-gallery-image-${toSlug(item.title)}`}
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-[#1f1f1f]" data-testid={`floor-plan-gallery-caption-${toSlug(item.title)}`}>
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12" data-testid="floor-plan-tabs-section">
          <h2 className="font-display text-4xl text-[#1a1a1a] md:text-5xl" data-testid="floor-plan-tabs-heading">
            Configuration Tabs for Buyer Comparison
          </h2>

          <div className="mt-8 flex flex-wrap gap-3" data-testid="floor-plan-tab-buttons-wrap">
            {floorTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFloorTab(tab.id)}
                className={`rounded-sm border px-5 py-2 text-sm transition-colors duration-300 ${
                  activeFloorTab === tab.id
                    ? "border-[#f00000] bg-[#f00000] text-white"
                    : "border-[#f00000]/35 bg-white text-[#8d0000] hover:bg-[#fff2f2]"
                }`}
                data-testid={`floor-tab-button-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6 border border-[#f00000]/25 bg-[#fffafa] p-5 md:p-7" data-testid="selected-floor-tab-content">
            <h3 className="font-display text-3xl text-[#1a1a1a]" data-testid="selected-floor-tab-title">
              {selectedFloorTab.label}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3" data-testid="selected-floor-summary-grid">
              {selectedFloorTab.summary.map((line) => (
                <div
                  key={line}
                  className="border border-[#f00000]/20 bg-white px-4 py-3 text-sm text-[#2f2f2f]"
                  data-testid={`selected-floor-summary-item-${toSlug(line)}`}
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2" data-testid="selected-floor-plan-images-grid">
              {selectedFloorTab.plans.map((plan) => (
                <figure key={plan.title} className="overflow-hidden border border-[#f00000]/20 bg-white" data-testid={`selected-floor-plan-card-${toSlug(plan.title)}`}>
                  <div className="aspect-[16/10]" data-testid={`selected-floor-plan-wrap-${toSlug(plan.title)}`}>
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="h-full w-full object-contain"
                      data-testid={`selected-floor-plan-image-${toSlug(plan.title)}`}
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-sm text-[#2f2f2f]" data-testid={`selected-floor-plan-caption-${toSlug(plan.title)}`}>
                    {plan.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-20 lg:grid-cols-2 lg:px-12" data-testid="location-investment-section">
          <figure className="overflow-hidden border border-[#f00000]/25" data-testid="location-visual-card">
            <div className="aspect-[16/11]" data-testid="location-visual-wrap">
              <img
                src="/pdf-assets/deck_p13.jpg"
                alt="Sector 4 connectivity and location context"
                className="h-full w-full object-cover"
                data-testid="location-visual-image"
              />
            </div>
          </figure>

          <div>
            <h2 className="font-display text-4xl text-[#1a1a1a] md:text-5xl" data-testid="location-section-heading">
              Location & Value Appreciation Context
            </h2>
            <div className="mt-6 space-y-3" data-testid="connectivity-list">
              {connectivityPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#363636] md:text-base"
                  data-testid={`connectivity-item-${toSlug(item.slice(0, 24))}`}
                >
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#f00000]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3" data-testid="investment-badges-grid">
              <article className="border border-[#f00000]/20 bg-white p-4" data-testid="investment-badge-trust">
                <ShieldCheck className="h-5 w-5 text-[#f00000]" />
                <p className="mt-2 text-sm" data-testid="investment-badge-trust-text">Institutional Delivery</p>
              </article>
              <article className="border border-[#f00000]/20 bg-white p-4" data-testid="investment-badge-health">
                <Wind className="h-5 w-5 text-[#f00000]" />
                <p className="mt-2 text-sm" data-testid="investment-badge-health-text">Wellness Infrastructure</p>
              </article>
              <article className="border border-[#f00000]/20 bg-white p-4" data-testid="investment-badge-luxury">
                <Building2 className="h-5 w-5 text-[#f00000]" />
                <p className="mt-2 text-sm" data-testid="investment-badge-luxury-text">Luxury Positioning</p>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-12" data-testid="final-cta-section">
          <div className="border border-[#f00000]/30 bg-[#f00000] px-6 py-10 text-white md:px-12" data-testid="final-cta-card">
            <p className="text-xs uppercase tracking-[0.2em] text-[#ffe8e8]" data-testid="final-cta-tagline">
              Limited Premium Inventory • Forbes Clean Air Residences
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl" data-testid="final-cta-heading">
              Book a Personal Consultation for FAB LUXE RESIDENCIES
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-[#fff1f1] md:text-lg" data-testid="final-cta-description">
              From floor plan matching to investment structuring, our specialist team can walk you through the most suitable option
              based on your family profile and purchase goals.
            </p>
            <Button
              data-testid="final-cta-button"
              onClick={() => setOpen(true)}
              className="mt-6 h-11 rounded-sm border border-white bg-white px-6 text-[#b10000] hover:bg-[#fff2f2]"
            >
              Reserve Consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <button
        data-testid="sticky-cta-button"
        className="sticky-cta fixed bottom-5 left-5 z-[120] hidden items-center gap-2 border border-[#f00000] bg-[#f00000]/92 px-5 py-3 text-sm text-white backdrop-blur md:flex"
        onClick={() => setOpen(true)}
      >
        Book Private Viewing <ArrowRight className="h-4 w-4" />
      </button>

      <button
        data-testid="mobile-sticky-cta-button"
        className="fixed bottom-28 left-3 right-3 z-40 flex items-center justify-center gap-2 rounded-sm border border-[#d70000] bg-[#f00000] px-4 py-3 text-sm text-white shadow-[0_20px_40px_rgba(240,0,0,0.3)] md:hidden"
        onClick={() => setOpen(true)}
      >
        Book Private Viewing <ArrowRight className="h-4 w-4" />
      </button>

      <LeadFormPopup open={open} setOpen={setOpen} />
    </div>
  );
}
