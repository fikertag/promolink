import SocialIcon from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-8 pb-8 text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-6 md:mb-12">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <span className="font-bold text-lg text-primary">PromoLink</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Transforming how businesses, creators, and customers connect in
              the digital economy.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://t.me/promolink_hu"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon
                  platform="telegram"
                  color="currentColor"
                  size={18}
                />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Resources</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a
                  href="https://t.me/promolink_hu"
                  className="hover:text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a
                  href="https://t.me/promolink_hu"
                  className="hover:text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-3 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 My kalat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
