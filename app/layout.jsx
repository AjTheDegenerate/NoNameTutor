import "./globals.css";

export const metadata = {
  title: "NoNameTutor — Class 9 Physics",
  description: "A focused study workspace for Class 9 Physics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
