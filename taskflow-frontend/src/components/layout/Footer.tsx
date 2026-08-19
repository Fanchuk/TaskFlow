import Button from "../ui/Button";

const SOCIALS = [
  { name: "LinkedIn", d: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z" },
  { name: "Facebook", d: "M13 3h4V0h-4a5 5 0 00-5 5v3H5v4h3v9h4v-9h3l1-4h-4V5a1 1 0 011-1z" },
  { name: "Twitter", d: "M22 5.8a8 8 0 01-2.3.6 4 4 0 001.8-2.2 8 8 0 01-2.5 1A4 4 0 0012 8.7 11.3 11.3 0 013.1 4.1a4 4 0 001.2 5.3 4 4 0 01-1.8-.5 4 4 0 003.2 4 4 4 0 01-1.8.1 4 4 0 003.7 2.8A8 8 0 012 17.5 11.3 11.3 0 008.1 19c7.3 0 11.3-6 11.3-11.3v-.5A8 8 0 0022 5.8z" },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1322px] px-4 pt-16 pb-8">
      <div className="grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <img src="/Container.png" alt="" className="h-7 w-7 rounded-md object-cover" />
            <span className="font-serif text-2xl font-bold text-black">Task Flow</span>
          </div>
          <p className="mt-4 text-black/70">Stay organized and productive with Fintask.io</p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-lg font-semibold text-black">Explore</h4>
          <ul className="mt-4 space-y-3 text-black/80">
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Integration</a></li>
            <li><a href="#">Download</a></li>
            <li><a href="#">Blog</a></li>
            <li className="flex items-center gap-2 text-black/40">
              Features
              <span className="rounded-full bg-[#ffe0d8] px-2 py-0.5 text-xs font-semibold text-[#e8582c]">Soon!</span>
            </li>
          </ul>
        </div>

        {/* Keep in touch */}
        <div>
          <h4 className="text-lg font-semibold text-black">Keep in touch</h4>
          <form className="mt-4 inline-flex items-stretch rounded-lg bg-black/[0.03] p-1" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="email address" className="w-44 bg-transparent px-3 outline-none" />
            <Button variant="subscribe">Subscribe</Button>
          </form>
          <h4 className="mt-8 text-lg font-semibold text-black">Follow us</h4>
          <div className="mt-4 flex gap-3">
            {SOCIALS.map((s) => (
              <a key={s.name} href="#" aria-label={s.name}
                 className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 hover:bg-black/5">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d={s.d} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-black/10 pt-6 text-sm text-black/70 md:flex-row md:items-center md:justify-between">
        <p>Copyright © Webuir 2022·All Rights Reserved</p>
        <div className="flex flex-wrap gap-6">
          {["Cookies", "Privacy policy", "Security", "Legal documents"].map((t) => (
            <a key={t} href="#">{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}