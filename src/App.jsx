import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
const schoolName = "Saraswati Public School, Kalawar";

const navigation = [
  ["Home", "/"],
  ["About", "/about"],
  ["Academics", "/academics"],
  ["Admissions", "/admissions"],
  ["Facilities", "/facilities"],
  ["Gallery", "/gallery"],
  ["Faculty", "/faculty"],
  ["News", "/news"],
  ["Contact", "/contact"],
];

const pageMetadata = {
  "/": [
    `${schoolName} | Home`,
    "Premium modern school website for Saraswati Public School, Kalawar. Admissions open from Pre-Nursery to Class 12.",
  ],
  "/about": [
    `About Us | ${schoolName}`,
    "Learn about Saraswati Public School, Kalawar vision, mission, history, and leadership messages.",
  ],
  "/academics": [
    `Academics | ${schoolName}`,
    "Academic structure from Pre-Primary to Senior Secondary with streams and methodology.",
  ],
  "/admissions": [
    `Admissions | ${schoolName}`,
    "Admissions process, eligibility, fee details and online inquiry for Saraswati Public School.",
  ],
  "/facilities": [
    `Facilities | ${schoolName}`,
    "Explore modern infrastructure and student facilities at Saraswati Public School.",
  ],
  "/gallery": [
    `Gallery | ${schoolName}`,
    "School events, annual functions, sports day and classroom activity gallery.",
  ],
  "/faculty": [
    `Faculty | ${schoolName}`,
    "Meet experienced faculty and mentors at Saraswati Public School.",
  ],
  "/news": [
    `News & Events | ${schoolName}`,
    "Latest notices, events, circulars and exam announcements.",
  ],
  "/contact": [
    `Contact Us | ${schoolName}`,
    "Get in touch with Saraswati Public School for admissions and queries.",
  ],
  "/privacy-policy": [`Privacy Policy | ${schoolName}`, "Privacy policy for Saraswati Public School website."],
  "/terms-and-conditions": [
    `Terms & Conditions | ${schoolName}`,
    "Terms and conditions for Saraswati Public School website.",
  ],
  "/refund-policy": [`Refund Policy | ${schoolName}`, "Refund policy for school admissions and fee payments."],
  "/disclaimer": [`Disclaimer | ${schoolName}`, "Disclaimer for Saraswati Public School website."],
};

function Counter({ value }) {
  const counterRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return undefined;

    let timer;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const target = Number(value);
      const startedAt = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - startedAt) / 1000, 1);
        setCount(Math.floor(target * progress));
        if (progress < 1) timer = requestAnimationFrame(animate);
      };
      timer = requestAnimationFrame(animate);
    }, { threshold: 0.5 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(timer);
    };
  }, [value]);

  return <span ref={counterRef}>{count.toLocaleString()}</span>;
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setPopupOpen(true), 2200);
    const hideTimer = window.setTimeout(() => setPopupOpen(false), 9000);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div className="announcement-bar">
        <div className="container mx-auto px-4">
          <p>
            <strong>Latest Update:</strong> Admissions Open for Session 2026-27 | New STEM Lab
            Inauguration | Board Exam Preparation Workshops Live
          </p>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary font-bold text-white">SPS</div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-primary md:text-xl">Saraswati Public School</h1>
              <p className="text-xs text-slate-500">Kalawar | Pre-Nursery to Class 12</p>
            </div>
          </Link>
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            ☰
          </button>
          <nav className="hidden items-center gap-5 text-sm font-medium lg:flex" aria-label="Main navigation">
            {navigation.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `${isActive ? "text-primary" : "text-slate-700 hover:text-primary"} transition`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link to="/admissions#apply-now" className="btn-gold">Admissions Open</Link>
          </nav>
        </div>
        {mobileMenuOpen && (
          <nav className="px-4 pb-4 lg:hidden" aria-label="Mobile navigation">
            <div className="glass-card flex flex-col gap-3 p-4">
              {navigation.map(([label, path]) => (
                <Link key={path} to={path} onClick={closeMenu} className="text-slate-700 hover:text-primary">
                  {label}
                </Link>
              ))}
              <Link to="/admissions#apply-now" onClick={closeMenu} className="btn-gold text-center">
                Admissions Open
              </Link>
            </div>
          </nav>
        )}
      </header>

      {popupOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setPopupOpen(false);
          }}
        >
          <section className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="admission-popup-title">
            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
              aria-label="Close popup"
            >
              ✕
            </button>
            <h2 id="admission-popup-title" className="mb-2 text-2xl font-bold text-primary">Admissions 2026-27 Open</h2>
            <p className="mb-4 text-slate-600">
              Secure your child’s future with Saraswati Public School, Kalawar. Limited seats available in key classes.
            </p>
            <div className="flex gap-3">
              <Link to="/admissions#apply-now" onClick={() => setPopupOpen(false)} className="btn-primary">Apply Now</Link>
              <Link to="/contact" onClick={() => setPopupOpen(false)} className="btn-outline">Talk to Counsellor</Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <>
      <a
        href="https://wa.me/918053500028"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us"
      >
        WhatsApp
      </a>
      <footer className="mt-12 bg-dark pb-8 pt-14 text-slate-200">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-xl font-semibold text-white">Saraswati Public School</h3>
            <p className="text-sm text-slate-300">
              A future-ready institution in Kalawar nurturing learners from Pre-Nursery to Class 12 with values,
              excellence, and innovation.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-gold">Home</Link></li>
              <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
              <li><Link to="/admissions" className="hover:text-gold">Admissions</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-gold">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="hover:text-gold">Refund Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-gold">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white">Contact</h4>
            <p className="text-sm">Near Model Town, Nagla Road, YamunaNagar, Haryana</p>
            <p className="mt-2 text-sm">+91 8053500028</p>
            <p className="text-sm">info@saraswatikalawar.edu.in</p>
            <div className="mt-3 flex gap-3 text-sm">
              <a href="#" className="hover:text-gold">Facebook</a>
              <a href="https://www.instagram.com/saraswati_public_school123" className="hover:text-gold">Instagram</a>
              <a href="#" className="hover:text-gold">YouTube</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-10 flex flex-wrap justify-between gap-2 border-t border-slate-700 px-4 pt-5 text-xs text-slate-400">
          <a href="https://www.ampixelmedia.xyz/" target="_blank" rel="noopener noreferrer">
            Designed &amp; Developed by Ampixel Media.
          </a>
          <p>© {new Date().getFullYear()} Saraswati Public School, Kalawar. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

function PageLayout() {
  const location = useLocation();

  useEffect(() => {
    const [title, description] = pageMetadata[location.pathname] ?? [
      `Page Not Found | ${schoolName}`,
      "The requested page could not be found.",
    ];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);

    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy" paragraphs={[
            "We collect only necessary information through inquiry forms such as name, contact number, email, and message details.",
            "Your information is used strictly for admission communication, support, and school updates.",
            "We do not sell or share personal data with unauthorized third parties.",
            "By using this website, you consent to this privacy policy and future updates.",
          ]} />} />
          <Route path="/terms-and-conditions" element={<LegalPage title="Terms & Conditions" paragraphs={[
            "This website content is for informational purposes related to school programs, admissions, and announcements.",
            "School reserves the right to revise admissions, fee details, and policies without prior notice.",
            "Unauthorized use, copying, or commercial redistribution of website content is prohibited.",
            "All disputes are subject to local jurisdiction as per applicable law.",
          ]} />} />
          <Route path="/refund-policy" element={<LegalPage title="Refund Policy" paragraphs={[
            "Admission and registration charges are generally non-refundable unless approved under exceptional conditions.",
            "Any approved refund will be processed within standard timelines after document verification.",
            "Refund requests must be submitted in writing to the school administration.",
            "Transport and activity charges are handled as per policy guidelines shared at the time of enrollment.",
          ]} />} />
          <Route path="/disclaimer" element={<LegalPage title="Disclaimer" paragraphs={[
            "All information on this website is published in good faith for general educational and admission communication.",
            "While efforts are made to keep information updated, the school does not guarantee completeness at all times.",
            "External links are provided for convenience; school is not responsible for third-party content.",
            "Official notices from school administration shall supersede website content wherever applicable.",
          ]} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function HomePage() {
  const slides = ["F1", "Yoga1", "Sch1", "Sch2"];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const facilities = [
    "Smart Classrooms", "Science & Computer Labs", "Digital Library", "Sports Arena",
    "GPS Transport", "Medical Care", "CCTV Security", "Activity Studios",
  ];

  return (
    <>
      <section className="hero-slider relative min-h-[72vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div key={slide} className={`hero-slide absolute inset-0 ${index === activeSlide ? "" : "hidden"}`}>
            <img src={asset(`Images/${slide}`)} alt={["School Campus View", "Students learning in class", "Modern school building", "Students in school corridor"][index]} />
          </div>
        ))}
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative mx-auto px-4 py-20 text-white md:py-28">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-gold">Excellence. Values. Innovation.</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">
              Empowering Future Leaders at Saraswati Public School, Kalawar
            </h2>
            <p className="mt-5 text-lg text-slate-100">
              A premium learning ecosystem from Pre-Nursery to Class 12 focused on academics, character, and co-curricular excellence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admissions#apply-now" className="btn-gold">Admissions Open</Link>
              <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-primary">Explore School</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {[[326, "Students"], [17, "Faculty & Staff"], [98, "Board Result %"], [3, "Years of Legacy"]].map(([value, label]) => (
          <div key={label} className="premium-card p-5 text-center">
            <p className="counter text-3xl"><Counter value={value} /></p><p>{label}</p>
          </div>
        ))}
      </section>

      <section className="container mx-auto grid gap-7 px-4 py-8 lg:grid-cols-2">
        <div className="glass-card p-7">
          <h3 className="section-title mb-3 text-2xl">About School</h3>
          <p className="text-slate-600">
            Saraswati Public School, Kalawar is a progressive educational institution that combines strong academic foundations with ethics, sportsmanship, and creativity. Our student-centered approach ensures every learner grows with confidence and competence.
          </p>
          <Link to="/about" className="btn-primary mt-5">Read More</Link>
        </div>
        <div className="glass-card p-7">
          <h3 className="section-title mb-3 text-2xl">Principal’s Message</h3>
          <p className="text-slate-600">
            “We believe every child can excel when provided with the right guidance, care, and opportunities. Our vision is to shape informed and compassionate global citizens.”
          </p>
          <Link to="/about#principal-message" className="btn-outline mt-5">View Message</Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <h3 className="section-title mb-8 text-center text-3xl">Facilities at a Glance</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility) => (
            <div key={facility} className="premium-card p-5"><h4 className="font-semibold text-primary">{facility}</h4></div>
          ))}
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-3">
        <div className="premium-card p-6 lg:col-span-2">
          <h3 className="section-title mb-3 text-2xl">Latest News &amp; Announcements</h3>
          <ul className="space-y-3 text-slate-600">
            <li>• Class 10 &amp; 12 Board Preparatory Schedule released for May cycle.</li>
            <li>• Olympiad achievers felicitated in special morning assembly.</li>
            <li>• Summer camp registrations now open for coding, arts, and robotics.</li>
            <li>• Parent orientation session for new admissions on 20th June.</li>
          </ul>
          <Link to="/news" className="btn-primary mt-5">View All News</Link>
        </div>
        <div className="premium-card p-6">
          <h3 className="section-title mb-3 text-2xl">Achievements</h3>
          <p className="text-slate-600">National Science Olympiad Rank Holders, District Basketball Champions, and 100% distinction in coding challenge finals.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <h3 className="section-title mb-8 text-center text-3xl">School Topper Results</h3>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="premium-card p-5"><h4 className="font-semibold text-primary">Class 12 Science</h4><p>Ananya Sharma - 97.8%</p></div>
          <div className="premium-card p-5"><h4 className="font-semibold text-primary">Class 12 Commerce</h4><p>Raghav Gupta - 96.4%</p></div>
          <div className="premium-card p-5"><h4 className="font-semibold text-primary">Class 10</h4><p>Kavya Jain - 98.2%</p></div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-2">
        <div className="premium-card p-6">
          <h3 className="section-title mb-4 text-2xl">Co-curricular Activities</h3>
          <p className="text-slate-600">Debate club, theatre, music, visual arts, coding club, eco-club, MUN, yoga and leadership camps for well-rounded growth.</p>
        </div>
        <div className="premium-card p-6">
          <h3 className="section-title mb-4 text-2xl">Olympiad Achievements</h3>
          <p className="text-slate-600">45+ students qualified for national level olympiads in Mathematics, Science, English, and Cyber Talent Search this year.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <h3 className="section-title mb-8 text-center text-3xl">Gallery Preview</h3>
        <GalleryGrid images={["Lib1", "Off1", "Fun1"]} localImages />
        <div className="mt-5 text-center"><Link to="/gallery" className="btn-outline">View Full Gallery</Link></div>
      </section>

      <section className="container mx-auto grid gap-5 px-4 py-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="premium-card p-5"><p className="italic">“Dedicated teachers and excellent discipline.”</p><p className="mt-3 text-sm">- Parent, Class 8</p></div>
        <div className="premium-card p-5"><p className="italic">“Best combination of academics and sports.”</p><p className="mt-3 text-sm">- Alumni, Batch 2022</p></div>
        <div className="premium-card p-5"><p className="italic">“Infrastructure and safety standards are top-notch.”</p><p className="mt-3 text-sm">- Parent, Class 3</p></div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-14 lg:grid-cols-2">
        <div className="premium-card p-6">
          <h3 className="section-title mb-4 text-2xl">Annual Calendar Highlights</h3>
          <ul className="space-y-2 text-slate-600">
            <li>• June: Session Orientation &amp; Parent Interaction</li>
            <li>• August: Independence Week and Science Expo</li>
            <li>• November: Sports Meet and Annual Cultural Fest</li>
            <li>• February: Board Revision Program &amp; Career Fair</li>
          </ul>
        </div>
        <div className="premium-card p-6">
          <h3 className="section-title mb-4 text-2xl">Transport Routes</h3>
          <p className="text-slate-600">Well-monitored GPS buses covering Kalawar, Jhotwara, Vaishali Nagar, Sirsi Road, and nearby townships with trained support staff.</p>
          <Link to="/facilities#transport-routes" className="btn-primary mt-4">Check Route Details</Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h3 className="section-title mb-8 text-center text-3xl">Frequently Asked Questions</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <Faq title="What is the admission age for Pre-Nursery?">Children must be 3+ years as on 31st March of the academic year.</Faq>
          <Faq title="Do you offer transport?">Yes, GPS-enabled buses are available on all major routes.</Faq>
          <Faq title="Which board curriculum is followed?">School follows a modern curriculum aligned to CBSE style standards.</Faq>
          <Faq title="How can parents track progress?">Via periodic PTMs, parent app dashboards, and digital report cards.</Faq>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-14 lg:grid-cols-2">
        <div className="premium-card p-6">
          <h3 className="section-title mb-3 text-2xl">Contact Us</h3>
          <p className="text-slate-600">Near Model Town, Nagla Road, YamunaNagar, Haryana</p>
          <p className="mt-2 text-slate-600">Email: info@saraswatikalawar.edu.in</p>
          <p className="mt-3 text-slate-600">Phone: +91 8053500028</p>
          <Link to="/contact" className="btn-primary mt-5">Get in Touch</Link>
        </div>
        <div className="premium-card overflow-hidden">
          <iframe title="Saraswati Public School Location" src="https://www.google.com/maps?q=Kalwar+Road+Jaipur&output=embed" width="100%" height="320" style={{ border: 0 }} loading="lazy" />
        </div>
      </section>
    </>
  );
}

function Faq({ title, children }) {
  return (
    <div className="premium-card p-5">
      <h4 className="font-semibold text-primary">{title}</h4>
      <p className="mt-2 text-slate-600">{children}</p>
    </div>
  );
}

const galleryImages = [
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
];

function GalleryGrid({ images, localImages = false }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const resolvedImages = localImages ? images.map((image) => asset(`Images/${image}`)) : images;

  useEffect(() => {
    if (!selectedImage) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className="gallery-grid grid gap-4 md:grid-cols-3">
        {resolvedImages.map((image, index) => (
          <button
            key={image}
            type="button"
            className="cursor-pointer rounded-xl"
            onClick={() => setSelectedImage(image)}
            aria-label={`Open gallery image ${index + 1}`}
          >
            <img className="gallery-image" src={image} alt={localImages ? ["School library", "School activity", "Classroom learning"][index] : "Saraswati School Gallery"} loading="lazy" />
          </button>
        ))}
      </div>
      {selectedImage && (
        <div
          className="lightbox"
          style={{ display: "flex" }}
          role="presentation"
          onClick={() => setSelectedImage(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selectedImage} alt="Selected school gallery item" />
          </div>
          <button
            type="button"
            className="absolute right-6 top-6 rounded-full bg-white px-3 py-2 text-slate-900"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}

function AboutPage() {
  return (
    <>
      <section className="container mx-auto px-4 py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="section-title mb-4 text-4xl">About Saraswati Public School</h2>
            <p className="max-w-2xl text-slate-600">Founded with the mission of quality education for all, Saraswati Public School, Kalawar is a respected institution preparing students from foundational years to senior secondary for academic excellence and life leadership.</p>
            <p className="mt-4 max-w-2xl text-slate-600">Our campus blends modern infrastructure, value-based culture, and future-ready pedagogy to ensure each learner develops confidence, curiosity, communication skills, and character.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="btn-outline">Pre-Nursery to Class 12</span>
              <span className="btn-outline">CBSE/ICSE Style Standards</span>
              <span className="btn-outline">Holistic Development</span>
            </div>
          </div>
          <div className="premium-card overflow-hidden">
            <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80" alt="Saraswati Public School Campus" className="h-[320px] w-full object-cover" />
          </div>
        </div>
      </section>
      <section className="container mx-auto grid gap-6 px-4 pb-10 lg:grid-cols-2">
        <div className="premium-card p-6">
          <h3 className="section-title mb-2 text-2xl">Vision</h3>
          <p>To build confident, compassionate, and competent learners ready for a global future.</p>
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80" alt="Students in classroom" className="mt-4 h-48 w-full rounded-xl object-cover" loading="lazy" />
        </div>
        <div className="premium-card p-6">
          <h3 className="section-title mb-2 text-2xl">Mission</h3>
          <p>Deliver value-based education with innovation, inclusivity, and experiential pedagogy.</p>
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80" alt="School learning environment" className="mt-4 h-48 w-full rounded-xl object-cover" loading="lazy" />
        </div>
      </section>
      <section className="container mx-auto px-4 pb-10">
        <div className="premium-card p-6">
          <h3 className="section-title mb-2 text-2xl">History of School</h3>
          <p className="text-slate-600">Over three decades, the school has expanded from primary classrooms to a full Pre-Nursery to Class 12 institution with modern labs, digital infrastructure, and community trust.</p>
          <div className="mt-5 grid gap-4 text-center md:grid-cols-4">
            {[[1991, "Founded"], [2500, "Students"], [180, "Faculty"], [35, "Years Legacy"]].map(([value, label]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-4"><p className="counter text-2xl"><Counter value={value} /></p><p className="text-sm">{label}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section id="principal-message" className="container mx-auto grid scroll-mt-24 gap-6 px-4 pb-10 lg:grid-cols-2">
        <div className="premium-card p-6">
          <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80" alt="Principal message" className="mb-4 h-56 w-full rounded-xl object-cover" loading="lazy" />
          <h3 className="section-title mb-2 text-2xl">Principal’s Message</h3>
          <p>“Our focus is to nurture thinking minds and kind hearts. Every child receives opportunities to discover strengths and pursue excellence.”</p>
        </div>
        <div className="premium-card p-6">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80" alt="Chairman message" className="mb-4 h-56 w-full rounded-xl object-cover" loading="lazy" />
          <h3 className="section-title mb-2 text-2xl">Chairman’s Message</h3>
          <p>“Education must be future-oriented yet rooted in values. SPS Kalawar is committed to both outcomes and character.”</p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-14">
        <h3 className="section-title mb-5 text-3xl">Core Values</h3>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="premium-card p-5"><h4 className="font-semibold text-primary">🤝 Integrity &amp; Respect</h4><p className="mt-2 text-sm text-slate-600">We foster ethical conduct, empathy, and responsibility in all interactions.</p></div>
          <div className="premium-card p-5"><h4 className="font-semibold text-primary">🎯 Academic Excellence</h4><p className="mt-2 text-sm text-slate-600">Strong conceptual clarity, regular assessments, and enrichment programs.</p></div>
          <div className="premium-card p-5"><h4 className="font-semibold text-primary">💡 Innovation &amp; Teamwork</h4><p className="mt-2 text-sm text-slate-600">Project-based learning, clubs, and collaborative leadership opportunities.</p></div>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-14">
        <h3 className="section-title mb-5 text-3xl">Campus Highlights</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Lib1", "Digital Library"],
            ["Sch1", "STEM & Science Labs"],
            ["Off1", "Sports Infrastructure"],
            ["Fun1", "Computer Lab"],
          ].map(([image, label]) => (
            <div key={label} className="premium-card overflow-hidden">
              <img src={asset(`Images/${image}`)} alt={label} className="h-40 w-full object-cover" loading="lazy" />
              <div className="p-4"><h4 className="font-semibold text-primary">{label}</h4></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const academicLevels = [
  ["Pre-Primary", "Play-based and sensory learning foundation."],
  ["Primary (I-V)", "Language fluency, numeracy, and curiosity-driven projects."],
  ["Middle School (VI-VIII)", "Concept building with labs, digital tools, and formative assessments."],
  ["Secondary (IX-X)", "Board-aligned preparation and skill development."],
  ["Senior Secondary (XI-XII)", "Advanced subject mastery with career guidance."],
  ["Curriculum", "Competency-based, activity-rich, and value-integrated model."],
];

function AcademicsPage() {
  return (
    <>
      <section className="container mx-auto px-4 py-14">
        <h2 className="section-title mb-6 text-4xl">Academic Framework</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {academicLevels.map(([name, detail]) => (
            <div key={name} className="premium-card p-5">
              <h3 className="font-semibold text-primary">{name}</h3>
              <p className="mt-2 text-sm text-slate-600">{detail}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container mx-auto px-4 pb-12">
        <div className="premium-card p-6">
          <h3 className="section-title mb-3 text-2xl">Streams Offered in Class 11-12</h3>
          <ul className="grid gap-3 text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
            <li>• Science (PCM/PCB)</li><li>• Commerce (With/Without Maths)</li><li>• Humanities</li>
            <li>• Computer Science Elective</li><li>• Physical Education</li><li>• Entrepreneurship</li>
          </ul>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-14">
        <div className="premium-card p-6">
          <h3 className="section-title mb-3 text-2xl">Teaching Methodology</h3>
          <p className="text-slate-600">Our methodology blends concept clarity, differentiated instruction, experiential projects, peer collaboration, regular diagnostics, and exam readiness modules supported by mentorship.</p>
        </div>
      </section>
    </>
  );
}

function AdmissionsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="container mx-auto px-4 py-14">
        <h2 className="section-title mb-4 text-4xl">Admissions Open 2026-27</h2>
        <p className="max-w-4xl text-slate-600">Join a premium learning environment focused on academic excellence and holistic growth from Pre-Nursery to Class 12.</p>
      </section>
      <section className="container mx-auto grid gap-6 px-4 pb-10 lg:grid-cols-2">
        <div className="premium-card p-6">
          <h3 className="section-title mb-3 text-2xl">Admission Process</h3>
          <ol className="space-y-2 text-slate-600">
            <li>1. Submit inquiry form online/offline.</li><li>2. Attend counselling session with admissions team.</li>
            <li>3. Document verification and student interaction.</li><li>4. Fee payment and confirmation of seat.</li>
          </ol>
        </div>
        <div className="premium-card p-6">
          <h3 className="section-title mb-3 text-2xl">Eligibility Criteria</h3>
          <p className="text-slate-600">Age and grade placement follow school norms and previous academic records. Entrance assessment may apply for higher classes.</p>
          <h4 className="mt-4 font-semibold text-primary">Required Documents</h4>
          <ul className="mt-2 space-y-2 text-slate-600">
            <li>• Birth Certificate</li><li>• Previous Report Card</li>
            <li>• Transfer Certificate (if applicable)</li><li>• Aadhaar copy and passport photos</li>
          </ul>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-10">
        <div className="premium-card p-6">
          <h3 className="section-title mb-3 text-2xl">Fee Structure (Indicative)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-primary"><th className="py-2">Category</th><th className="py-2">Annual Fee</th><th className="py-2">Other Charges</th></tr></thead>
              <tbody className="text-slate-600">
                <tr className="border-b"><td className="py-2">Pre-Primary</td><td>INR 48,000</td><td>Uniform, Books, Activities</td></tr>
                <tr className="border-b"><td className="py-2">Primary</td><td>INR 62,000</td><td>Lab &amp; Activity Charges</td></tr>
                <tr className="border-b"><td className="py-2">Middle/Secondary</td><td>INR 74,000</td><td>Labs, Sports, Exam Module</td></tr>
                <tr><td className="py-2">Senior Secondary</td><td>INR 92,000</td><td>Stream-based Practical Modules</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="apply-now" className="container mx-auto scroll-mt-24 px-4 pb-14">
        <div className="glass-card p-6">
          <h3 className="section-title mb-4 text-2xl">Online Inquiry Form</h3>
          <FormNotice submitted={submitted} />
          <form
            className="grid gap-4 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <input className="rounded-xl border p-3" name="parentName" placeholder="Parent Name" required />
            <input className="rounded-xl border p-3" name="phone" type="tel" placeholder="Phone Number" required />
            <input className="rounded-xl border p-3" name="email" type="email" placeholder="Email Address" required />
            <input className="rounded-xl border p-3" name="class" placeholder="Child's Current Class" required />
            <textarea className="rounded-xl border p-3 md:col-span-2" name="message" rows="4" placeholder="Your Message" />
            <button type="submit" className="btn-primary md:col-span-2">Submit Inquiry</button>
          </form>
        </div>
      </section>
    </>
  );
}

function FormNotice({ submitted }) {
  return (
    <p className="mb-4 text-sm text-slate-600" role={submitted ? "status" : undefined}>
      {submitted
        ? "Your details have been checked, but this website is not connected to an inquiry service yet. Please contact the school by phone or email to send your inquiry."
        : "Online form submissions are not connected yet. Please contact the school by phone or email to send an inquiry."}
    </p>
  );
}

const facilityItems = [
  "Smart Classrooms", "Computer Lab", "Science Labs", "Library",
  "Sports Facilities", "Transport", "CCTV Security", "Medical Room",
];

function FacilitiesPage() {
  return (
    <>
      <section className="container mx-auto px-4 py-14">
        <h2 className="section-title mb-6 text-4xl">World-Class Facilities</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {facilityItems.map((item) => (
            <div key={item} className="premium-card p-5">
              <h3 className="font-semibold text-primary">{item}</h3>
              <p className="mt-2 text-sm text-slate-600">Modern standards with student safety and comfort.</p>
            </div>
          ))}
        </div>
      </section>
      <section id="transport-routes" className="container mx-auto scroll-mt-24 px-4 pb-14">
        <div className="premium-card p-6">
          <h3 className="section-title mb-3 text-2xl">Transport Routes</h3>
          <p className="mb-4 text-slate-600">GPS-enabled buses with trained staff and emergency protocols.</p>
          <div className="grid gap-4 text-slate-600 md:grid-cols-2">
            <div>Route A: Kalawar - Sirsi Road - SPS Campus</div>
            <div>Route B: Vaishali Nagar - Jhotwara - SPS Campus</div>
            <div>Route C: Bani Park - Civil Lines - SPS Campus</div>
            <div>Route D: Murlipura - VKI - SPS Campus</div>
          </div>
        </div>
      </section>
    </>
  );
}

function GalleryPage() {
  return (
    <section className="container mx-auto px-4 py-14">
      <h2 className="section-title mb-6 text-4xl">Image Gallery</h2>
      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        <span className="btn-outline">School Events</span><span className="btn-outline">Annual Functions</span>
        <span className="btn-outline">Sports Day</span><span className="btn-outline">Classroom Activities</span>
      </div>
      <GalleryGrid images={galleryImages} />
    </section>
  );
}

const faculty = [
  ["Ms. Neha Verma", "Mathematics", "M.Sc, B.Ed"],
  ["Mr. Aman Choudhary", "Physics", "M.Tech, B.Ed"],
  ["Mrs. Ritu Sharma", "English", "M.A (English), B.Ed"],
  ["Mr. Dev Malhotra", "Computer Science", "MCA, B.Ed"],
  ["Ms. Priyal Singh", "Biology", "M.Sc Biology, B.Ed"],
  ["Mr. Karan Saini", "Commerce", "M.Com, B.Ed"],
];

function FacultyPage() {
  return (
    <section className="container mx-auto px-4 py-14">
      <h2 className="section-title mb-6 text-4xl">Our Faculty</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {faculty.map(([name, subject, qualification]) => (
          <div key={name} className="premium-card p-5">
            <img className="h-52 w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80" alt={name} loading="lazy" />
            <h3 className="mt-4 font-semibold text-primary">{name}</h3>
            <p className="text-sm text-slate-600">Subject: {subject}</p>
            <p className="text-sm text-slate-600">Qualification: {qualification}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsPage() {
  const news = [
    "Circular: New assessment pattern briefing for Classes IX-XII.",
    "Notice: Summer vacation schedule released.",
    "Event: Inter-school debate competition on 18th July.",
    "Exam Announcement: Unit Test II timetable uploaded.",
    "Workshop: Cyber safety session for parents and students.",
  ];

  return (
    <section className="container mx-auto px-4 py-14">
      <h2 className="section-title mb-6 text-4xl">News &amp; Events</h2>
      <div className="space-y-4">
        {news.map((item) => <div key={item} className="premium-card p-5">{item}</div>)}
      </div>
    </section>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="container mx-auto px-4 py-14">
      <h2 className="section-title mb-6 text-4xl">Contact Saraswati Public School</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="premium-card p-6">
          <h3 className="section-title mb-3 text-2xl">Contact Form</h3>
          <FormNotice submitted={submitted} />
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <input name="name" className="rounded-xl border p-3" placeholder="Your Name" autoComplete="name" required />
            <input name="email" type="email" className="rounded-xl border p-3" placeholder="Email Address" autoComplete="email" required />
            <input name="phone" type="tel" className="rounded-xl border p-3" placeholder="Phone Number" autoComplete="tel" required />
            <textarea name="message" className="rounded-xl border p-3" rows="5" placeholder="Your Message" required />
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
        <div className="premium-card p-6">
          <h3 className="section-title mb-3 text-2xl">School Details</h3>
          <p>Address: Kalawar Road, Jaipur District, Rajasthan</p>
          <p className="mt-2">Phone: +91 98765 43210</p>
          <p className="mt-2">Email: info@saraswatikalawar.edu.in</p>
          <div className="mt-4 flex gap-3">
            <a href="#" className="btn-outline">Facebook</a>
            <a href="#" className="btn-outline">Instagram</a>
            <a href="#" className="btn-outline">YouTube</a>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl">
            <iframe title="School location map" src="https://www.google.com/maps?q=Kalwar+Road+Jaipur&output=embed" width="100%" height="260" style={{ border: 0 }} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

function LegalPage({ title, paragraphs }) {
  return (
    <section className="container mx-auto px-4 py-14">
      <h2 className="section-title mb-4 text-4xl">{title}</h2>
      <div className="premium-card space-y-3 p-6 text-slate-600">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h2 className="section-title text-4xl">Page not found</h2>
      <p className="mt-3 text-slate-600">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn-primary mt-6">Back to Home</Link>
    </section>
  );
}

export default function App() {
  return <PageLayout />;
}
