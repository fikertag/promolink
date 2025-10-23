import Link from "next/link";
import SocialIcon from "@/components/SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-4 pb-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Mykalat</h3>
            <p className="text-gray-600 mb-4">
              Connecting businesses with top marketers and influencers to help
              brands grow.
            </p>
          </div>

          <div className="flex flex-col md:items-center">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://t.me/N_96_uman"
                  target="_blank"
                  className="text-gray-600 hover:text-brand-blue underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col md:items-end">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/mykal_at/"
                target="_blank"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <SocialIcon platform={"instagram"} size={18} />
              </a>
              <a
                href="https://t.me/my_kalat"
                target="_blank"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <SocialIcon platform={"telegram"} size={18} />
              </a>
              <a
                href="https://www.youtube.com/@mykalat"
                target="_blank"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <SocialIcon platform={"youtube"} size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@mykalat"
                target="_blnak"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <SocialIcon platform={"tiktok"} size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/mykalat/"
                target="_blank"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <SocialIcon platform={"linkedin"} size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Mykalat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
