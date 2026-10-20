import "./globals.css";

export const metadata = {
  title: "No Name Tutor",
  description: "I spent over 70 hours making this website so y'all could study with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
