import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Listings", href: "/#listings" },
    { label: "Properties", href: "/#gallery" },
    { label: "Send Message", href: "/", isModal: true },
  ];

  return (
    <>
      <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div
        className={`md:hidden flex flex-col bg-background p-6 space-y-4 items-center absolute w-full left-0 top-full transition-all duration-300 ease-in-out
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.isModal ? "#contactModal" : link.href}
            onClick={(e) => {
              if (link.isModal) {
                e.preventDefault();
                openModal("contactModal");
              }
              setOpen(false);
            }}
            className={
              link.isModal
                ? "bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark font-semibold transition-colors duration-300"
                : "px-3 py-2 text-medium font-medium transition-colors duration-300"
            }>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
