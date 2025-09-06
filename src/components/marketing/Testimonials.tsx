import { Section, Heading, Text, Card } from "@/components/ui";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      rating: 5,
      content:
        "This platform has completely transformed how our team works. The collaboration features are intuitive and the performance is outstanding. Highly recommended!",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Developer",
      rating: 5,
      content:
        "The API integration was seamless and the documentation is excellent. It's rare to find a platform that's both powerful and easy to use. Great job!",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Startup Founder",
      rating: 5,
      content:
        "We've tried many solutions, but this one stands out. The customer support is fantastic and the platform scales perfectly with our growing business.",
      avatar: "ER",
    },
  ];

  return (
    <Section id="testimonials" spacing="xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="text-3xl lg:text-4xl mb-4">
            What our users say
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
            Real users. Real stories. Real results.
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <Heading level={6} className="mb-0">
                    {testimonial.name}
                  </Heading>
                  <Text size="xs" variant="muted">
                    {testimonial.role}
                  </Text>
                </div>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-warning">
                    ⭐
                  </div>
                ))}
              </div>

              {/* Content */}
              <Text className="mb-6 leading-relaxed">
                {`"${testimonial.content}"`}
              </Text>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
