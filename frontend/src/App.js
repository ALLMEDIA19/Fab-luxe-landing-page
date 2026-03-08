import { useMemo, useState } from "react";
import axios from "axios";
import "@/App.css";
import { CheckCircle2, ChevronRight, Leaf, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster, toast } from "@/components/ui/sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const images = {
  hero: "https://images.unsplash.com/photo-1745091722150-dc7aaf6eeb21?crop=entropy&cs=srgb&fm=jpg&q=85",
  interior: "https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?crop=entropy&cs=srgb&fm=jpg&q=85",
  pool: "https://images.unsplash.com/photo-1758448756167-88dc934c58e4?crop=entropy&cs=srgb&fm=jpg&q=85",
  exterior: "https://images.unsplash.com/photo-1676287734314-b7616c3c5e5a?crop=entropy&cs=srgb&fm=jpg&q=85",
};

const bentoHighlights = [
  { title: "Supreme Trust", desc: "Hon'ble Supreme Court monitored project executed by NBCC (India) Ltd.", span: "md:col-span-7" },
  { title: "AQI-Managed Living", desc: "India's first AQI-managed luxury ecosystem with filtered indoor and outdoor air.", span: "md:col-span-5" },
  { title: "Prime Address", desc: "Sector 4, Greater Noida West with direct link-road access and mall adjacency.", span: "md:col-span-5" },
  { title: "Investment Position", desc: "Starting from ₹2.97 CR with premium low-density planning over 13 acres.", span: "md:col-span-7" },
];

const specs = [
  "13 acres premium development",
  "11 iconic G+35 towers",
  "Low-density with 4 units per floor",
  "35,000 sq. ft. branded clubhouse",
  "3 BHK + Study + 4T and 4 BHK + Study + 5T",
  "Super area options: 2690, 2718 and 3307 sq. ft.",
];

const lifestylePoints = [
  "AQI-managed fresh air systems in every room with PM2.5 / PM10 filtration",
  "Centralized water softening for healthier everyday living",
  "Resort-style wellness with yoga, meditation, fitness and spa zones",
  "Sports & Art Academy coaching for children for 3 years",
  "Smart home controls + advanced security stack with panic and sensor systems",
  "Expansive podium greens, amphitheatre, nature trails, lily ponds and themed gardens",
];

const connectivity = [
  "Adjacent to Gaur City Mall and close to key schools and hospitals",
  "Quick access to Noida City Centre and NH-24 via major link roads",
  "Proposed 17.4 km Aqua Line metro extension (expected by Dec 2029)",
  "Approx. 60 mins to IGI Airport and 75 mins to Jewar Airport",
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
    setFormData(initialForm);
    setSubmitted(false);
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
      toast.success("Thank you. Our advisor will connect with you shortly.");
      setSubmitted(true);
    } catch (error) {
      toast.error("Unable to submit right now. Please try again.");
      console.error("Lead submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-testid="lead-form-dialog"
        className="max-w-xl border-[#D4AF37] bg-[#FDFBF7] p-8 shadow-[0_30px_80px_rgba(6,78,59,0.25)] sm:rounded-sm"
      >
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-3xl text-[#1A1A1A]" data-testid="lead-form-title">
                Book Your Private Viewing
              </DialogTitle>
              <DialogDescription className="text-base text-[#4A4A4A]" data-testid="lead-form-description">
                Share your details and our luxury property advisor will call you back.
              </DialogDescription>
            </DialogHeader>

            <form className="mt-4 space-y-4" onSubmit={handleSubmit} data-testid="lead-form">
              <Input
                data-testid="lead-form-name-input"
                value={formData.name}
                onChange={onChange("name")}
                placeholder="Full Name"
                className="h-11 rounded-sm border-[#D9C79A] bg-white text-base focus-visible:ring-[#D4AF37]"
              />
              <Input
                data-testid="lead-form-phone-input"
                value={formData.phone}
                onChange={onChange("phone")}
                placeholder="Phone Number"
                className="h-11 rounded-sm border-[#D9C79A] bg-white text-base focus-visible:ring-[#D4AF37]"
              />
              <Input
                data-testid="lead-form-budget-input"
                value={formData.budget}
                onChange={onChange("budget")}
                placeholder="Budget (e.g. ₹3.5 CR+)"
                className="h-11 rounded-sm border-[#D9C79A] bg-white text-base focus-visible:ring-[#D4AF37]"
              />
              <Input
                data-testid="lead-form-callback-input"
                value={formData.preferred_callback_time}
                onChange={onChange("preferred_callback_time")}
                placeholder="Preferred Callback Time"
                className="h-11 rounded-sm border-[#D9C79A] bg-white text-base focus-visible:ring-[#D4AF37]"
              />

              <Button
                data-testid="lead-form-submit"
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-sm bg-[#064E3B] text-base text-[#FDFBF7] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#043529]"
              >
                {loading ? "Submitting..." : "Request Callback"}
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-6 py-6 text-center" data-testid="lead-form-success-state">
            <CheckCircle2 className="mx-auto h-14 w-14 text-[#064E3B]" aria-hidden="true" />
            <h3 className="font-display text-3xl text-[#1A1A1A]" data-testid="lead-form-success-title">
              Request Received
            </h3>
            <p className="text-base text-[#4A4A4A]" data-testid="lead-form-success-description">
              Thank you for your interest in Fab Luxe. Our specialist will get in touch shortly.
            </p>
            <Button
              data-testid="lead-form-success-close-button"
              onClick={resetAndClose}
              className="h-11 rounded-sm bg-[#064E3B] px-8 text-[#FDFBF7] hover:bg-[#043529]"
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

  return (
    <div className="luxury-page min-h-screen bg-[#FDFBF7] text-[#1A1A1A]" data-testid="landing-page-root">
      <Toaster position="top-center" richColors />

      <header className="fixed left-0 top-0 z-40 w-full border-b border-[#D4AF37]/30 bg-[#FDFBF7]/90 backdrop-blur" data-testid="landing-header">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <div className="leading-tight" data-testid="brand-block">
            <p className="font-display text-xl text-[#064E3B] md:text-2xl" data-testid="brand-name">
              Fab Luxe
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#7A6845]" data-testid="brand-subtitle">
              by Forbes Global Properties
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                data-testid="header-inquire-button"
                className="rounded-sm border border-[#D4AF37] bg-[#064E3B] px-5 text-[#FDFBF7] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#043529]"
              >
                Inquire Now
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </header>

      <main className="pt-20" data-testid="landing-main-content">
        <section
          className="relative overflow-hidden"
          style={{ minHeight: "88vh" }}
          data-testid="hero-section"
        >
          <div
            className="hero-image absolute inset-0"
            style={{ backgroundImage: `linear-gradient(rgba(5, 24, 19, 0.58), rgba(5, 24, 19, 0.58)), url(${images.hero})` }}
            data-testid="hero-background"
          />

          <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 pb-20 pt-24 md:px-12 md:pt-32">
            <p className="mb-4 inline-block w-fit border border-[#D4AF37] px-4 py-2 text-xs uppercase tracking-[0.26em] text-[#FDFBF7]" data-testid="hero-tagline">
              India's First AQI-Managed Luxury Address
            </p>
            <h1 className="font-display text-4xl leading-tight text-[#FDFBF7] md:max-w-4xl md:text-6xl" data-testid="hero-main-heading">
              Fab Luxe by Forbes Global Properties
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#FDFBF7]/90 md:text-lg" data-testid="hero-description">
              A Supreme Court monitored, NBCC-executed landmark in Greater Noida West where wellness engineering,
              elite services, and low-density luxury converge.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4" data-testid="hero-action-group">
              <Button
                data-testid="hero-cta-button"
                onClick={() => setOpen(true)}
                className="h-11 rounded-sm border border-[#D4AF37] bg-[#FDFBF7] px-7 text-[#064E3B] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#f6f0e2]"
              >
                Book Private Viewing <ChevronRight className="h-4 w-4" />
              </Button>
              <p className="text-base text-[#FDFBF7] md:text-lg" data-testid="hero-price">
                Price starts at <span className="font-semibold text-[#D4AF37]">₹2.97 CR</span>
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-16 md:grid-cols-4 md:px-12" data-testid="trust-metrics-section">
          {[
            { label: "Land Parcel", value: "13 Acres" },
            { label: "Vertical Presence", value: "11 Towers (G+35)" },
            { label: "Density", value: "4 Units / Floor" },
            { label: "Club Experience", value: "35,000 sq. ft." },
          ].map((item) => (
            <article
              key={item.label}
              className="group border border-[#D4AF37]/40 bg-[#F5F2EA] p-5 transition-transform duration-300 hover:-translate-y-1"
              data-testid={`metric-card-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7A6845]" data-testid={`metric-label-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                {item.label}
              </p>
              <p className="mt-2 font-display text-2xl text-[#064E3B]" data-testid={`metric-value-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                {item.value}
              </p>
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 md:px-12" data-testid="highlights-bento-section">
          <h2 className="font-display text-3xl text-[#064E3B] md:text-5xl" data-testid="highlights-heading">
            Why Discerning Buyers Choose Fab Luxe
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-[#4A4A4A] md:text-lg" data-testid="highlights-subheading">
            Every detail is curated for health, prestige, and long-term value creation in NCR's evolving luxury corridor.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12" data-testid="highlights-grid">
            {bentoHighlights.map((item) => (
              <article
                key={item.title}
                className={`reveal-card border border-[#D4AF37]/35 bg-white p-6 shadow-[0_14px_35px_rgba(6,78,59,0.08)] ${item.span}`}
                data-testid={`highlight-card-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <h3 className="font-display text-2xl text-[#1A1A1A]" data-testid={`highlight-title-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A] md:text-base" data-testid={`highlight-desc-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-24 md:grid-cols-2 md:px-12" data-testid="lifestyle-section">
          <div className="space-y-6">
            <h2 className="font-display text-3xl text-[#064E3B] md:text-5xl" data-testid="lifestyle-heading">
              Elevated Lifestyle, Engineered Wellness
            </h2>
            <ul className="space-y-3" data-testid="lifestyle-bullet-list">
              {lifestylePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-[#3D3D3D] md:text-base" data-testid={`lifestyle-bullet-${point.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2" data-testid="spec-cards-grid">
              {specs.map((spec) => (
                <div
                  key={spec}
                  className="border border-[#D4AF37]/30 bg-[#F5F2EA] px-4 py-3 text-sm text-[#1A1A1A]"
                  data-testid={`spec-item-${spec.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                >
                  {spec}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5" data-testid="lifestyle-images-grid">
            <figure className="aspect-[16/10] overflow-hidden border border-[#D4AF37]/30" data-testid="image-interior-card">
              <img src={images.interior} alt="Luxury interior at Fab Luxe" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" data-testid="image-interior" />
            </figure>
            <figure className="aspect-[16/10] overflow-hidden border border-[#D4AF37]/30" data-testid="image-pool-card">
              <img src={images.pool} alt="Luxury amenity pool at Fab Luxe" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" data-testid="image-pool" />
            </figure>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12" data-testid="configuration-section">
          <h2 className="font-display text-3xl text-[#064E3B] md:text-5xl" data-testid="configuration-heading">
            Configurations Designed for Grand Living
          </h2>
          <p className="mt-4 text-sm text-[#4A4A4A] md:text-lg" data-testid="configuration-subheading">
            Spacious formats with expansive balconies, multiple toilets, and low-loading planning for premium comfort.
          </p>

          <div className="mt-8 overflow-x-auto border border-[#D4AF37]/35 bg-white" data-testid="configuration-table-wrapper">
            <table className="min-w-full text-left" data-testid="configuration-table">
              <thead className="bg-[#F5F2EA] text-xs uppercase tracking-[0.15em] text-[#6A593A] md:text-sm" data-testid="configuration-table-head">
                <tr>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Super Area</th>
                  <th className="px-4 py-3">Carpet Area</th>
                  <th className="px-4 py-3">Balcony</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#1A1A1A] md:text-base" data-testid="configuration-table-body">
                {[
                  ["3 BHK + Study + 4T", "2690 - 2718 sq. ft.", "1598 - 1608 sq. ft.", "327 - 364 sq. ft."],
                  ["4 BHK + Study + 5T", "3307 sq. ft.", "1946 sq. ft.", "448 sq. ft."],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-[#EFE3C8]" data-testid={`configuration-row-${row[0].toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-3" data-testid={`configuration-cell-${cell.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-24 md:grid-cols-2 md:px-12" data-testid="location-section">
          <figure className="aspect-[16/11] overflow-hidden border border-[#D4AF37]/35" data-testid="location-image-card">
            <img src={images.exterior} alt="Exterior skyline view of Fab Luxe residences" className="h-full w-full object-cover" data-testid="location-image" />
          </figure>

          <div className="space-y-5">
            <h2 className="font-display text-3xl text-[#064E3B] md:text-5xl" data-testid="location-heading">
              Strategic Connectivity for a Future-Ready Address
            </h2>
            <div className="space-y-3" data-testid="location-bullet-list">
              {connectivity.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-[#3F3F3F] md:text-base" data-testid={`location-bullet-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-3" data-testid="assurance-cards-grid">
              <article className="border border-[#D4AF37]/30 bg-[#F5F2EA] p-4" data-testid="assurance-card-trust">
                <ShieldCheck className="h-5 w-5 text-[#064E3B]" />
                <p className="mt-2 text-sm" data-testid="assurance-card-trust-text">Supreme Court Monitored</p>
              </article>
              <article className="border border-[#D4AF37]/30 bg-[#F5F2EA] p-4" data-testid="assurance-card-air">
                <Leaf className="h-5 w-5 text-[#064E3B]" />
                <p className="mt-2 text-sm" data-testid="assurance-card-air-text">Advanced AQI Management</p>
              </article>
              <article className="border border-[#D4AF37]/30 bg-[#F5F2EA] p-4" data-testid="assurance-card-brand">
                <Sparkles className="h-5 w-5 text-[#064E3B]" />
                <p className="mt-2 text-sm" data-testid="assurance-card-brand-text">Forbes Global Branding</p>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-28 md:px-12" data-testid="final-cta-section">
          <div className="border border-[#D4AF37]/40 bg-[#064E3B] px-6 py-10 text-[#FDFBF7] md:px-12" data-testid="final-cta-card">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]" data-testid="final-cta-tagline">
              Limited Inventory • Premium Tower Views
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl" data-testid="final-cta-heading">
              Experience Fab Luxe in a Curated Private Tour
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[#FDFBF7]/85 md:text-lg" data-testid="final-cta-description">
              Discover corner residences, expansive balconies, and wellness-first architecture built for families who settle for nothing less than extraordinary.
            </p>
            <Button
              data-testid="final-cta-button"
              onClick={() => setOpen(true)}
              className="mt-6 h-11 rounded-sm border border-[#D4AF37] bg-[#FDFBF7] px-6 text-[#064E3B] hover:bg-[#f8f2e6]"
            >
              Reserve Consultation <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <button
        data-testid="sticky-cta-button"
        className="sticky-cta fixed bottom-5 left-5 z-[120] hidden items-center gap-2 border border-[#D4AF37] bg-[#064E3B]/90 px-5 py-3 text-sm text-[#FDFBF7] backdrop-blur md:flex"
        onClick={() => setOpen(true)}
      >
        Book Private Viewing <ChevronRight className="h-4 w-4" />
      </button>

      <button
        data-testid="mobile-sticky-cta-button"
        className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-center gap-2 border-t border-[#D4AF37] bg-[#064E3B] px-4 py-3 text-sm text-[#FDFBF7] md:hidden"
        onClick={() => setOpen(true)}
      >
        Book Private Viewing <ChevronRight className="h-4 w-4" />
      </button>

      <LeadFormPopup open={open} setOpen={setOpen} />
    </div>
  );
}
