
function Footer() {
    return (
        <div>
            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-200">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="space-y-8 xl:col-span-1">
                            <div className="flex items-center">
                                <svg
                                    className="h-8 w-8 text-blue-300"
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
                                <span className="ml-2 text-xl font-bold ">FinAnalyzer</span>
                            </div>
                            <p className="text-blue-400 text-base">
                                Making financial analysis accessible to everyone through AI technology.
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-blue-500 tracking-wider uppercase">
                                        Solutions
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {footerNavigation.solutions.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="text-base text-blue-400 hover:"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-12 md:mt-0">
                                    <h3 className="text-sm font-semibold text-blue-500 tracking-wider uppercase">
                                        Support
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {footerNavigation.support.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="text-base text-blue-400 hover:"
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
                                    <h3 className="text-sm font-semibold text-blue-500 tracking-wider uppercase">
                                        Company
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {footerNavigation.company.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="text-base text-blue-400 hover:"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-12 md:mt-0">
                                    <h3 className="text-sm font-semibold text-blue-500 tracking-wider uppercase">
                                        Legal
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {footerNavigation.legal.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="text-base text-blue-400 hover:"
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
                    <div className="mt-12 border-t border-blue-500 pt-8">
                        <p className="text-base text-blue-500 xl:text-center">
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
    { name: 'Financial Analysis', href: '#' },
    { name: 'Risk Assessment', href: '#' },
    { name: 'Investment Insights', href: '#' },
    { name: 'Cash Flow Optimization', href: '#' },
  ],
  support: [
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
    { name: 'Live Support', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR', href: '#' },
  ],
};