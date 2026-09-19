import { Button } from "@/components/ui/Button";

export function EnquiryForm() {
  return <form className="grid gap-5" action="/enquiry" method="get">
    <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold" htmlFor="name">Name<input className="min-h-12 rounded-xl border border-border bg-surface px-4 font-normal outline-none focus:border-teal" id="name" name="name" required type="text" /></label><label className="grid gap-2 text-sm font-semibold" htmlFor="phone">Phone<input className="min-h-12 rounded-xl border border-border bg-surface px-4 font-normal outline-none focus:border-teal" id="phone" name="phone" required type="tel" /></label></div>
    <label className="grid gap-2 text-sm font-semibold" htmlFor="interest">What are you interested in?<select className="min-h-12 rounded-xl border border-border bg-surface px-4 font-normal outline-none focus:border-teal" defaultValue="" id="interest" name="interest" required><option disabled value="">Choose one</option><option value="trek">A trek</option><option value="tour">A tour package</option><option value="vehicle">A travel vehicle</option></select></label>
    <label className="grid gap-2 text-sm font-semibold" htmlFor="message">Tell us a little about your plans<textarea className="min-h-32 rounded-xl border border-border bg-surface px-4 py-3 font-normal outline-none focus:border-teal" id="message" name="message" /></label>
    <div><Button type="submit">Send Enquiry</Button></div>
  </form>;
}