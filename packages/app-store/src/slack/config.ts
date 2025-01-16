import image from "./assets/image.png";
import { Logo } from "./assets/logo";
import { onInitialize } from "./initialize";

export default {
  name: "Slack",
  id: "slack",
  category: "Assistant",
  active: true,
  logo: Logo,
  short_description:
    "Integrating with Slack enables you to use Travelese Assistant right from your Slack workspace, you will also get notifications when you have new bookings and more.",
  description:
    "Integrating Travelese with Slack brings powerful travel management capabilities directly into your team's communication hub. With this integration, you can seamlessly interact with Travelese Assistant without leaving your Slack workspace, enabling quick access to travel insights and actions. \n\nYou'll receive timely notifications about new bookings, ensuring you're always up-to-date with your travel activities. Moreover, this integration streamlines your workflow by allowing you to upload attachments for transactions directly from Slack. \n\nWhether it's receipts, invoices, or any other relevant documents, you can easily attach them to your transactions without switching between multiple applications. This feature not only saves time but also ensures that all your travel documentation is properly organized and linked to the correct bookings, enhancing your overall bookkeeping efficiency.",
  images: [image],
  onInitialize,
  settings: [
    {
      id: "bookings",
      label: "Bookings",
      description:
        "Get notified when a new booking is added. This will notify you in the channel you have selected.",
      type: "switch",
      required: false,
      value: true,
    },
  ],
};
