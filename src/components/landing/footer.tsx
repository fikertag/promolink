import SocialIcon from "@/components/SocialIcons";

<footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-8 pb-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2  md:grid-cols-5 gap-8 mb-12">
      <div className="col-span-2">
        <div className="flex items-center mb-4">
          <span className="font-bold text-lg text-gradient">PromoLink</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Transforming how businesses, creators, and customers connect in the
          digital economy.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <SocialIcon platform={"instagram"} color="#99a1af" size={18} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <SocialIcon platform={"telegram"} color="#99a1af" size={18} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <SocialIcon platform={"youtube"} color="#99a1af" size={18} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <SocialIcon platform={"tiktok"} color="#99a1af" size={18} />
          </a>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Resources</h4>
        <ul className="space-y-3 text-gray-500 dark:text-gray-400">
          <li>
            <a href="#" className="hover:text-primary grow-underline">
              Help Center
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Company</h4>
        <ul className="space-y-3 text-gray-500 dark:text-gray-400">
          <li>
            <a href="#" className="hover:text-primary grow-underline">
              About Us
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
        © 2023 PromoLink. All rights reserved.
      </p>
      <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
        <a href="#" className="hover:text-primary grow-underline">
          Terms
        </a>
        <a href="#" className="hover:text-primary grow-underline">
          Privacy
        </a>
        <a href="#" className="hover:text-primary grow-underline">
          Cookies
        </a>
      </div>
    </div>
  </div>
</footer>;
