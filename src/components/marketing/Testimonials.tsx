import type { ReactNode } from "react";
import { Section, Heading, Text, Card } from "@/components/ui";

export type Testimonial = {
  name: string;
  role?: string;
  rating?: number;
  content: string;
  avatar?: ReactNode;
};

export interface TestimonialsProps {
  id?: string;
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  className?: string;
  ratingIcon?: ReactNode;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Jordan",
    role: "Founder, Tempo",
    rating: 5,
    content:
      "We swapped in these sections on day one and iterated on the copy later. It saved us days of design and build time.",
    avatar: "J",
  },
  {
    name: "Priya",
    role: "Engineering Lead",
    rating: 5,
    content:
      "The components are flexible enough that we could theme them without rewriting everything. Huge win for our team.",
    avatar: "P",
  },
  {
    name: "Marcus",
    role: "Product Designer",
    rating: 5,
    content:
      "Having defaults for the layout and props made onboarding stakeholders painless. It's the perfect kickoff kit.",
    avatar: "M",
  },
];

export default function Testimonials({
  id = "testimonials",
  title = "What teams are saying",
  description = "Swap these quotes with your own customer stories, tweets, or case studies.",
  testimonials = defaultTestimonials,
  className = "",
  ratingIcon = "⭐",
}: TestimonialsProps = {}) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section id={id} spacing="xl" className={className}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="text-3xl lg:text-4xl mb-4">
            {title}
          </Heading>
          {description && (
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              {description}
            </Text>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {typeof testimonial.avatar === "string" ||
                typeof testimonial.avatar === "number" ? (
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                ) : (
                  testimonial.avatar ?? (
                    <div className="w-12 h-12 bg-primary/10 rounded-full" />
                  )
                )}
                <div>
                  <Heading level={6} className="mb-0">
                    {testimonial.name}
                  </Heading>
                  {testimonial.role && (
                    <Text size="xs" variant="muted">
                      {testimonial.role}
                    </Text>
                  )}
                </div>
              </div>

              {testimonial.rating ? (
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <div
                      key={`${testimonial.name}-rating-${i}`}
                      className="w-5 h-5 text-warning flex items-center"
                    >
                      {ratingIcon}
                    </div>
                  ))}
                </div>
              ) : null}

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
