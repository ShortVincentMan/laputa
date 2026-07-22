import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New Laputa OS transmission from {name}
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.kicker}>
            LAPUTA OS // CONTACT RELAY
          </Text>

          <Heading style={styles.heading}>
            New Contact Transmission
          </Heading>

          <Hr style={styles.rule} />

          <Section style={styles.panel}>
            <Text style={styles.label}>Operator</Text>
            <Text style={styles.value}>{name}</Text>

            <Text style={styles.label}>Return Channel</Text>
            <Text style={styles.value}>{email}</Text>

            <Text style={styles.label}>Subject</Text>
            <Text style={styles.value}>{subject}</Text>
          </Section>

          <Section style={styles.messagePanel}>
            <Text style={styles.label}>Transmission</Text>
            <Text style={styles.message}>{message}</Text>
          </Section>

          <Hr style={styles.rule} />

          <Text style={styles.footer}>
            Reply directly to this email to contact the sender.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: "0",
    padding: "32px 16px",
    backgroundColor: "#05080c",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },
  container: {
    maxWidth: "620px",
    margin: "0 auto",
    padding: "28px",
    backgroundColor: "#0a1016",
    border: "1px solid #ff5963",
  },
  kicker: {
    margin: "0 0 8px",
    color: "#66f1f1",
    fontSize: "11px",
    letterSpacing: "2px",
  },
  heading: {
    margin: "0",
    color: "#ff5963",
    fontSize: "28px",
    fontWeight: "500",
  },
  rule: {
    margin: "24px 0",
    borderColor: "#26343c",
  },
  panel: {
    padding: "18px",
    backgroundColor: "#0d171f",
    borderLeft: "3px solid #66f1f1",
  },
  messagePanel: {
    marginTop: "16px",
    padding: "18px",
    backgroundColor: "#102019",
    borderLeft: "3px solid #92ffd9",
  },
  label: {
    margin: "0 0 5px",
    color: "#66f1f1",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1.4px",
    textTransform: "uppercase" as const,
  },
  value: {
    margin: "0 0 16px",
    color: "#f3ffff",
    fontSize: "15px",
  },
  message: {
    margin: "0",
    color: "#f3ffff",
    fontSize: "15px",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap" as const,
  },
  footer: {
    margin: "0",
    color: "#7f9098",
    fontSize: "11px",
  },
};