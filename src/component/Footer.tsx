function Footer() {
    return (
        <div>
            {/* Footer */}
            {/* Background for light mode is gray-100, for dark mode is gray-900.
                Text color adjusted for both modes to fit the new palette. */}
            <footer className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="space-y-8 xl:col-span-1">
                            <div className="flex items-center">
                                <svg
                                    className="h-8 w-8 text-emerald-600 dark:text-teal-400" // Logo icon color: emerald for light, teal for dark
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                    />
                                </svg>
                                <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">FinAnalyzer</span> {/* Logo text color adjusted */}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-base"> {/* Description text color adjusted */}
                                Making financial analysis accessible to everyone through AI technology.
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase"> {/* Heading text color adjusted */}
                                        Solutions
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {footerNavigation.solutions.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="text-base text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-teal-300 transition-colors duration-200" // Link colors adjusted
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-12 md:mt-0">
                                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase">
                                        Support
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {footerNavigation.support.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="text-base text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-teal-300 transition-colors duration-200"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase">
                                        Company
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {footerNavigation.company.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="text-base text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-teal-300 transition-colors duration-200"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-12 md:mt-0">
                                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase">
                                        Legal
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {footerNavigation.legal.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="text-base text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-teal-300 transition-colors duration-200"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-8"> {/* Border color adjusted */}
                        <p className="text-base text-gray-600 dark:text-gray-400 xl:text-center"> {/* Copyright text color adjusted */}
                            &copy; {new Date().getFullYear()} FinAnalyzer. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer

const footerNavigation = {
  solutions: [
    { name: 'Financial Analysis (dummy)', href: '#' },
    { name: 'Risk Assessment (dummy)', href: '#' },
    { name: 'Investment Insights (dummy)', href: '#' },
    { name: 'Cash Flow Optimization (dummy)', href: '#' },
  ],
  support: [
    { name: 'Documentation (dummy)', href: '#' },
    { name: 'Guides (dummy)', href: '#' },
    { name: 'API Status (dummy)', href: '#' },
    { name: 'Live Support (dummy)', href: '#' },
  ],
  company: [
    { name: 'About (dummy)', href: '#' },
    { name: 'Blog (dummy)', href: '#' },
    { name: 'Careers (dummy)', href: '#' },
    { name: 'Press (dummy)', href: '#' },
  ],
  legal: [
    { name: 'Privacy (dummy)', href: '#' },
    { name: 'Terms (dummy)', href: '#' },
    { name: 'Cookie Policy (dummy)', href: '#' },
    { name: 'GDPR (dummy)', href: '#' },
  ],
};
