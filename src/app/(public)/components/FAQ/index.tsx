"use client";

import { Accordion, Container, Grid, Image, Title } from "@mantine/core";
import classes from "./style.module.css";

export default function FAQ() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src="/images/faq.svg"
              alt="Frequently Asked Questions"
              width={500}
              height={500}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
            >
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>
                  How do I update SEO metadata and social tags?
                </Accordion.Control>
                <Accordion.Panel>
                  Edit <code>src/config/app.ts</code>. That single config feeds layouts, sitemap,
                  robots.txt, manifest, and the JSON-LD helper so every metadata surface stays in
                  sync.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>
                  Do I need Postgres and Better Auth to use this?
                </Accordion.Control>
                <Accordion.Panel>
                  The auth flows use Better Auth with Prisma and PostgreSQL out of the box. You can
                  still use the marketing pages without a database, or swap the provider by updating
                  the Prisma schema and env variables.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  How do I disable analytics?
                </Accordion.Control>
                <Accordion.Panel>
                  PostHog only initializes when <code>NEXT_PUBLIC_POSTHOG_KEY</code> is set. Leave it
                  empty and the instrumentation stays off; remove the proxy route in
                  <code>next.config.ts</code> if you don&apos;t need it.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Is PWA/offline support available in development?
                </Accordion.Control>
                <Accordion.Panel>
                  The Serwist service worker is injected on <code>next build</code>. In production it
                  precaches the offline page and enables navigation preload; during dev you can skip
                  it and still build confidently.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
