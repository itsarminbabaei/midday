import {
  Body,
  Container,
  Font,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { getEmailUrl } from "@travelese/utils/envs";
import { Footer } from "../components/footer";
import { GetStarted } from "../components/get-started";
import { Logo } from "../components/logo";

const baseUrl = getEmailUrl();

interface WelcomeProps {
  fullName: string;
}

export const WelcomeEmail = ({ fullName = "Armin Babaei" }: WelcomeProps) => {
  const firstName = fullName.split(" ").at(0);
  const text = `Hi ${firstName}, Welcome to Travelese! I'm Armin, the founder. It's really important to us that you have a great experience ramping up.`;

  return (
    <Html>
      <Tailwind>
        <head>
          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-400-normal.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />

          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-500-normal.woff2",
              format: "woff2",
            }}
            fontWeight={500}
            fontStyle="normal"
          />
        </head>
        <Preview>{text}</Preview>

        <Body className="bg-[#fff] my-auto mx-auto font-sans">
          <Container
            className="border-transparent md:border-[#E8E7E1] my-[40px] mx-auto p-[20px] max-w-[600px]"
            style={{ borderStyle: "solid", borderWidth: 1 }}
          >
            <Logo />
            <Heading className="text-[#121212] text-[21px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome to Travelese
            </Heading>

            <br />

            <span className="font-medium">Hi {firstName},</span>
            <Text className="text-[#121212]">
              I'm Armin. Co-Founder of Travelese.
              <br />
              <br />
              Should you have any questions, please don't hesitate to reply
              directly to this email or to{" "}
              <Link
                href="https://cal.com/itsarminbabaei/30min"
                className="text-[#121212] underline"
              >
                schedule a call with me
              </Link>
              .
            </Text>

            <br />

            {/* <Img
              src={`${baseUrl}/founder.jpeg`}
              alt="Founder"
              className="my-0 mx-auto block w-full"
            /> */}

            <Text className="text-[#707070]">Armin</Text>

            {/* <Img
              src={`${baseUrl}/signature.png`}
              alt="Signature"
              className="block w-full w-[143px] h-[20px]"
            /> */}

            <br />
            <br />

            <GetStarted />

            <br />

            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
