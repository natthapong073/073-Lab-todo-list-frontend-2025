import './globals.css'

export const metadata = {
  title: 'My Todo List',
  description: 'Frontend for Flask Todo App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
