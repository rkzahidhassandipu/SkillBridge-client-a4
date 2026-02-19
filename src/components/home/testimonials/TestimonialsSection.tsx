
import { testimonials } from "./data/testimonials";
import { TestimonialCard } from "./TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-orange-50 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="uppercase tracking-wide font-medium text-gray-500">TESTIMONIALS</p>
          <h2 className="text-3xl font-bold mt-2 text-black">
            Positive Reviews From Our Students
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

      
      </div>
    </section>
  );
}
