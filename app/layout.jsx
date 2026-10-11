import "./globals.css";

export const metadata = {
  title: "NoNameTutor — Your NCERT Study Space",
  description: "Choose your class and subject to learn, practise and revise with NoNameTutor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
