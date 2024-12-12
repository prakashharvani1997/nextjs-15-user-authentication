// export default function AuthLayout({children}) {
    
//     return
// }

import '../globals.css';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

export default function AuthRootLayout({ children }) {
  return (
    <html lang="en">


      <body>
        <header>
            <p>Welcome back</p>
            <form>
              <button > Logout </button>
            </form>
        </header>
        {children}</body>
    </html>
  );
}

