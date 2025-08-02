// export default function AppFooter() {
//   return (
//     <footer className="bg-slate-900 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
//         <div>
//           <h3 className="text-lg font-semibold mb-4">TaskForge</h3>
//           <p className="text-slate-400">
//             AI-powered task extraction
//           </p>
//         </div>
//         <FooterColumn 
//           title="Product" 
//           links={['Features', 'Pricing', 'Integrations']}
//         />
//         {/* Add other columns */}
//       </div>
//       <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-slate-800">
//         <p className="text-slate-400 text-sm">
//           © {new Date().getFullYear()} TaskForge. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

// function FooterColumn({ title, links }) {
//   return (
//     <div>
//       <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-300">
//         {title}
//       </h4>
//       <ul className="space-y-2">
//         {links.map((link, index) => (
//           <li key={index}>
//             <a href="#" className="text-slate-400 hover:text-white transition-colors">
//               {link}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
export default function AppFooter() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
        <div className="flex items-center h-10"> <img src="/vite.svg" className="h-8 w-8 mr-2 "alt="" /> <h3 className="text-lg font-semibold ">TaskForge</h3></div> 
          <p className="text-slate-400">AI-powered task extraction</p>

          {/* Social Links */}
          <div className="flex space-x-4 mt-6">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/wahid-ali-467855235/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5 fill-slate-400 hover:fill-white transition-colors"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C4.98 5 3.87 6 2.49 6S0 5 0 3.5 1.09 1 2.48 1s2.5 1 2.5 2.5zM0 8.98h5V24H0V8.98zM8.36 8.98h4.78v2.05h.07c.67-1.26 2.3-2.6 4.73-2.6 5.06 0 5.99 3.33 5.99 7.65V24h-5v-6.75c0-1.61-.03-3.68-2.25-3.68s-2.6 1.75-2.6 3.56V24h-5V8.98z" />
              </svg>
            </a>

            {/* Portfolio */}
            <a
              href="https://github.com/wahidst3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio"
            >
              <svg
                className="w-5 h-5 fill-slate-400 hover:fill-white transition-colors"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 4.584 2.584 8.546 6.36 10.458.465.084.636-.198.636-.44 0-.216-.008-.79-.012-1.552-2.59.564-3.138-1.25-3.138-1.25-.423-1.074-1.034-1.36-1.034-1.36-.846-.578.064-.566.064-.566.935.066 1.428.96 1.428.96.832 1.428 2.185 1.016 2.716.778.084-.603.325-1.016.59-1.25-2.07-.234-4.243-1.036-4.243-4.61 0-1.017.36-1.85.946-2.502-.096-.234-.41-1.176.09-2.45 0 0 .776-.25 2.54.95A8.853 8.853 0 0112 6.8c.79.004 1.59.107 2.336.314 1.76-1.2 2.536-.95 2.536-.95.5 1.274.186 2.216.092 2.45.59.652.944 1.485.944 2.502 0 3.582-2.18 4.372-4.26 4.6.334.29.63.85.63 1.72 0 1.244-.012 2.246-.012 2.552 0 .244.168.528.642.438C21.416 20.54 24 16.58 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Product Links */}
        <FooterColumn title="Product" links={['Features', 'Pricing', 'Integrations']} />

        {/* Resources */}
        <FooterColumn title="Resources" links={['Docs', 'Tutorials', 'Blog']} />

        {/* Company */}
        <FooterColumn title="Company" links={['About', 'Careers', 'Contact']} />
      </div>

      {/* Bottom Line */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-slate-800">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} TaskForge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-300">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
