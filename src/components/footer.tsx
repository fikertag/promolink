import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">TalentHub</h3>
            <p className="text-gray-600 mb-4">
              Connecting businesses with top marketers and influencers to help
              brands grow.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Businesses</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Find Influencers
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Talent</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} TalentHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
