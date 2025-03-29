"use client";

// components/LandingPage.tsx
import { useState, useEffect } from "react";
import Head from "next/head";
import { MenuIcon, Camera } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    // Dark mode detection
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }

    const darkModeListener = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", darkModeListener);

    return () => {
      mediaQuery.removeEventListener("change", darkModeListener);
    };
  }, []);

  // const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  // };

  const animateCounters = () => {
    if (counted) return;

    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    counters.forEach((counter) => {
      const target = +(counter.getAttribute("data-target") || 0);
      let count = 0;

      const inc = target / speed;

      const updateCount = () => {
        if (count < target) {
          count += inc;
          if (counter) counter.textContent = Math.floor(count).toLocaleString();
          setTimeout(updateCount, 20);
        } else if (counter) {
          counter.textContent = target.toLocaleString();
        }
      };

      updateCount();
    });

    setCounted(true);
  };

  useEffect(() => {
    // Initialize counters when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    const metricsSection =
      document.querySelector(".counter")?.parentElement?.parentElement
        ?.parentElement;
    if (metricsSection) {
      observer.observe(metricsSection);
    }

    return () => {
      if (metricsSection) observer.unobserve(metricsSection);
    };
  }, []);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <Head>
        <title>PromoLink - Turn Social Reach Into Revenue</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <div className="bg-light dark:bg-dark text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {/* Top Navigation */}
        <nav className="glass fixed w-full top-0 z-50 transition-colors duration-300 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-3 shadow-lg">
                    <Camera />{" "}
                  </div>
                  <span className="font-extrabold text-2xl text-gradient">
                    PromoLink
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium hidden md:block">
                  About
                </button>
                <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium hidden md:block">
                  socials
                </button>
                <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium hidden md:block">
                  Support
                </button>
                <Link
                  href={"/signup"}
                  className="py-1.5 ml-3 px-4 bg-primary hover:bg-secondary text-white rounded-lg transition-colors hidden md:block"
                >
                  Sign Up
                </Link>
                <button className="md:hidden">
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-dark rounded-3xl p-4 md:p-10  md:px-24 h-fit">
              <div className="grid grid-cols-1 md:grid-cols-2  ">
                <div className="mb-10 md:mb-0 mt-5">
                  <h1 className="text-3xl  sm:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-6">
                    <span className="text-gradient">Rurn Social Reach</span>
                    <span className="block">Into Revenue</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                    The first platform that bridges the gap between{" "}
                    <span className="font-semibold">businesses</span>,{" "}
                    <span className="font-semibold">influencers</span>, and{" "}
                    <span className="font-semibold">customers</span> in a
                    seamless ecosystem where everyone wins.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button className="py-3 px-8 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl font-semibold">
                      Get Started
                      <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                    <button className="py-3 px-8 border border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center justify-center font-medium">
                      <i className="fas fa-play text-primary mr-2"></i>
                      Watch Demo
                    </button>
                  </div>
                  <div className="flex items-center mt-6 md:mt-10">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center border-2 border-white dark:border-gray-900">
                        <span className="font-bold text-blue-600 dark:text-blue-300 text-xs">
                          EG
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center border-2 border-white dark:border-gray-900">
                        <span className="font-bold text-green-600 dark:text-green-300 text-xs">
                          NF
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center border-2 border-white dark:border-gray-900">
                        <span className="font-bold text-purple-600 dark:text-purple-300 text-xs">
                          FK
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center border-2 border-white dark:border-gray-900">
                        <span className="font-bold text-yellow-600 dark:text-yellow-300 text-xs">
                          K
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                        </div>
                        <span className=" font-medium">4.8/5</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        from 500+ reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" relative">
                  <div className="relative h-[450px] sm:h-[450px] md:h-[450px]">
                    <div className="absolute top-5 right-5 w-32 h-32 bg-purple-400/20 dark:bg-purple-600/20 rounded-full filter blur-xl"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-400/20 dark:bg-blue-600/20 rounded-full filter blur-xl"></div>

                    <div className="absolute  right-0  w-full max-w-sm neumorph rounded-xl overflow-hidden shadow-xl floating">
                      <div className="bg-white dark:bg-gray-800 p-4 mt-10 md:mt-0 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2">
                              <i className="fas fa-link text-white text-xs"></i>
                            </div>
                            <span className="font-bold text-sm">PromoLink</span>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              <i className="fas fa-bell text-gray-500 dark:text-gray-400 text-xs"></i>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <span className="font-bold text-blue-600 dark:text-blue-300 text-xs">
                                ST
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium">
                              Total Earnings
                            </p>
                            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                              +15%
                            </span>
                          </div>
                          <p className="text-2xl font-bold">$1,249.87</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Performance</p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              This Month
                            </span>
                          </div>
                          <div className="h-12 bg-white dark:bg-gray-800 rounded-lg"></div>
                        </div>
                        <p className="text-sm font-medium mt-4 mb-2">
                          Active Links
                        </p>
                        <div className="space-y-3">
                          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg flex items-center">
                            <div className="w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-600 mr-2"></div>
                            <div className="flex-1 text-xs">
                              <p className="font-medium">smart wactch</p>
                              <div className="Eden Girum-between">
                                <span>smart Tech</span>
                                <span className="text-primary">86 sales</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg flex items-center">
                            <div className="w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-600 mr-2"></div>
                            <div className="flex-1 text-xs">
                              <p className="font-medium">Protein Powder Pack</p>
                              <div className="numan-between">
                                <span>GreenLeaf Supplements</span>
                                <span className="text-primary">62 sales</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-24 overflow-hidden relative">
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium tracking-wide mb-5 text-center">
                Trusted by leading brands
              </p>

              {/* Marquee Container */}
              <div className="relative w-full">
                {/* Gradient fade effects */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-light dark:from-dark to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-light dark:from-dark to-transparent z-10"></div>

                {/* Marquee Content - Double the items for seamless looping */}
                <div className="flex overflow-x-hidden">
                  <div className="flex py-2 animate-marquee whitespace-nowrap">
                    {[
                      "smart tech",
                      "lekecoffe",
                      "TechPro",
                      "StyleX",
                      "mks",
                    ].map((brand, index) => (
                      <div
                        key={index}
                        className="mx-8 text-gray-400 dark:text-gray-500 font-bold text-lg"
                      >
                        {brand}
                      </div>
                    ))}
                  </div>

                  {/* Duplicated content for seamless looping */}
                  <div className="flex py-2 animate-marquee2 whitespace-nowrap">
                    {[
                      "smart tech",
                      "lekecoffe",
                      "TechPro",
                      "StyleX",
                      "mks",
                    ].map((brand, index) => (
                      <div
                        key={`copy-${index}`}
                        className="mx-8 text-gray-400 dark:text-gray-500 font-bold text-lg"
                      >
                        {brand}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Animation Styles */}
              <style jsx>{`
                @keyframes marquee {
                  0% {
                    transform: translateX(0%);
                  }
                  100% {
                    transform: translateX(-100%);
                  }
                }
                @keyframes marquee2 {
                  0% {
                    transform: translateX(100%);
                  }
                  100% {
                    transform: translateX(0%);
                  }
                }
                .animate-marquee {
                  animation: marquee 15s linear infinite;
                }
                .animate-marquee2 {
                  animation: marquee2 15s linear infinite;
                  position: absolute;
                  top: 0;
                }
              `}</style>
            </div>
          </section>

          {/* Metrics Section */}
          <section className="max-w-7xl mx-auto px-4 mt-18">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center neumorph dark:bg-gray-800 rounded-xl p-8 transform transition hover:scale-105 duration-300">
                <div
                  className="text-primary text-5xl font-extrabold mb-2 counter"
                  data-target="10000"
                >
                  0
                </div>
                <div className="text-lg font-medium">Active Creators</div>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Growing every day with successful partnerships
                </p>
              </div>
              <div className="text-center neumorph dark:bg-gray-800 rounded-xl p-8 transform transition hover:scale-105 duration-300">
                <div
                  className="text-primary text-5xl font-extrabold mb-2 counter"
                  data-target="5000"
                >
                  0
                </div>
                <div className="text-lg font-medium">Business Partners</div>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Brands seeing real growth through collaborations
                </p>
              </div>
              <div className="text-center neumorph dark:bg-gray-800 rounded-xl p-8 transform transition hover:scale-105 duration-300">
                <div
                  className="text-primary text-5xl font-extrabold mb-2 counter"
                  data-target="500000"
                >
                  0
                </div>
                <div className="text-lg font-medium">Successful Sales</div>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Creating win-win scenarios for everyone involved
                </p>
              </div>
            </div>
          </section>

          {/* Roles Section */}
          <section className="max-w-7xl mx-auto px-4 mt-18">
            <div className="text-center mb-16 ">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Who Benefits from PromoLink?
              </h2>
              <p className=" text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our platform creates a seamless ecosystem that benefits everyone
                involved in the collaboration economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Business Card */}
              <div className="relative group">
                <div className="absolute inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative card-hover bg-white dark:bg-gray-800 rounded-xl shadow-lg py-8 px-4 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 mx-auto transform transition group-hover:rotate-6 duration-300">
                    <i className="fas fa-store text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">
                    For Businesses
                  </h3>
                  <ul className="space-y-4 text-gray-600 dark:text-gray-300 mb-6 flex-grow ">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt- mr-2"></i>
                      <span className="">
                        Create a profile showcasing your products to relevant
                        audiences
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500  mr-2"></i>
                      <span>
                        Get exposure to influencers whose followers match your
                        target market
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500  mr-2"></i>
                      <span>
                        Track performance with real-time analytics and insights
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      <span>
                        Pay only for results with our commission-based system
                      </span>
                    </li>
                  </ul>
                  <button className="mt-3 w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    Enter as Business
                    <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all"></i>
                  </button>
                </div>
              </div>

              {/* Influencer Card */}
              <div className="relative group">
                <div className="absolute inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative card-hover bg-white dark:bg-gray-800 rounded-xl shadow-lg py-8 px-4 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3 mx-auto transform transition group-hover:rotate-6 duration-300">
                    <i className="fas fa-bullhorn text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">
                    For Influencers
                  </h3>
                  <ul className="space-y-4 text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500  mr-2"></i>
                      <span>
                        Browse businesses that align with your audience&apos;s
                        interests
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500  mr-2"></i>
                      <span>
                        Generate custom promo codes and earn 5-15% commission on
                        sales
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      <span>
                        Track earnings and conversions in an intuitive dashboard
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500  mr-2"></i>
                      <span>
                        Build long-term relationships with brands you love
                      </span>
                    </li>
                  </ul>
                  <button className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all">
                    Enter as Influencer
                    <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all"></i>
                  </button>
                </div>
              </div>

              {/* Customer Card */}
              <div className="relative group">
                <div className="absolute inset-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative card-hover bg-white dark:bg-gray-800 rounded-xl shadow-lg py-8 px-4 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-3 mx-auto transform transition group-hover:rotate-6 duration-300">
                    <i className="fas fa-user text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">
                    For Customers
                  </h3>
                  <ul className="space-y-4 text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>
                        Discover exclusive deals from your favorite influencers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500  mr-2"></i>
                      <span>
                        Enjoy special discounts not available elsewhere
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500  mr-2"></i>
                      <span>
                        Explore new brands through trusted recommendations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-500  mr-2"></i>
                      <span>Support both businesses and creators you love</span>
                    </li>
                  </ul>
                  <button className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-lg transition-all">
                    Enter as Customer
                    <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="max-w-7xl mx-auto mt-18 px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold ">
                How PromoLink Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="absolute top-12 left-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
                <div className="relative z-10 bg-white dark:bg-gray-800 p-4 py-6 rounded-xl shadow-lg text-center transform transition-all hover:-translate-y-2 duration-300">
                  <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center mb-2 mx-auto">
                    <span className="font-bold text-white text-xl">1</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Businesses Join
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Companies create profiles and set rates for their products
                  </p>
                  <div className="h-1 w-12 bg-primary mx-auto mt-4 rounded"></div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-12 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
                <div className="relative z-10 bg-white dark:bg-gray-800 p-4 py-6  rounded-xl shadow-lg text-center transform transition-all hover:-translate-y-2 duration-300">
                  <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-2 mx-auto">
                    <span className="font-bold text-white text-xl">2</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Influencers Connect
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Creators find relevant products and generate unique promo
                    codes
                  </p>
                  <div className="h-1 w-12 bg-secondary mx-auto mt-4 rounded"></div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-12 right-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
                <div className="relative z-10 bg-white dark:bg-gray-800 p-4 py-6  rounded-xl shadow-lg text-center transform transition-all hover:-translate-y-2 duration-300">
                  <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center mb-2 mx-auto">
                    <span className="font-bold text-white text-xl">3</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Audiences Engage
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Followers discover products ough authentic recommendations
                  </p>
                  <div className="h-1 w-12 bg-accent mx-auto mt-4 rounded"></div>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 bg-white dark:bg-gray-800 p-4 py-6  rounded-xl shadow-lg text-center transform transition-all hover:-translate-y-2 duration-300">
                  <div className="h-14 w-14 rounded-full bg-accent2 flex items-center justify-center mb-2 mx-auto">
                    <span className="font-bold text-white text-xl">4</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Everyone Wins</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Businesses grow, influencers earn, and customers discover
                  </p>
                  <div className="h-1 w-12 bg-accent2 mx-auto mt-4 rounded"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="max-w-7xl mx-auto mt-16">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Real stories from businesses, influencers, and customers using
                PromoLink.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-16 h-16 text-5xl text-primary opacity-20">
                  &quot
                </div>
                <div className="glass p-8 rounded-xl relative z-10 bg-accent/10">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                      <span className="font-bold text-blue-600 dark:text-blue-300">
                        N
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold">numan</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Founder, smartTech
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    &quotPromoLink transformed how we connect with our audience.
                    Our sales have increased by 135% since joining, and
                    we&apos;ve built relationships with amazing creators who
                    truly understand our brand.&quot
                  </p>
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 md:mt-0 ">
                <div className="absolute -top-4 -right-4 w-16 h-16 text-5xl text-primary opacity-20">
                  &quot
                </div>
                <div className="glass p-8 rounded-xl relative z-10 bg-accent/10">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                      <span className="font-bold text-purple-600 dark:text-purple-300">
                        E
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold">Eden</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Influencer, 200K followers
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    &quotPromoLink is different. The analytics are incredible,
                    and I only promote products I believe in. My audience trusts
                    my recommendations, and I earn consistent income.&quot
                  </p>
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 md:mt-0">
                <div className="absolute -top-4 -right-4 w-16 h-16 text-5xl text-primary opacity-20">
                  &quot
                </div>
                <div className="glass p-8 rounded-xl relative z-10 bg-accent/10">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                      <span className="font-bold text-green-600 dark:text-green-300">
                        F
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold">Fiker</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Customer
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    &quotI love finding new products through the creators I
                    follow. The discounts are great, but what I appreciate most
                    is knowing these are genuine recommendations, not just paid
                    ads.&quot
                  </p>
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-7xl mx-auto mt-18 mb-16">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 animate-gradient opacity-90"></div>
              <div className="relative glass px-2  md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  Ready to Join the Economy?
                </h2>
                <p className="text-lg text-white/90 max-w-3xl mx-auto mb-6">
                  Whether you&apos;re a business looking to grow, an influencer
                  wanting to monetize your audience, or a customer seeking great
                  deals, PromoLink is your gateway to meaningful connections.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <button className="py-4 w-full max-w-[300px] bg-white text-primary hover:bg-gray-100 rounded-lg transition-colors duration-300 flex items-center justify-center shadow-lg hover:shadow-xl font-semibold">
                    Create Your Account
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                  <button className="py-4 w-full max-w-[300px] border border-white text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center font-medium">
                    <i className="fas fa-headset mr-2"></i>
                    Talk to Our Team
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-8 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2  md:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2">
                    <Camera />{" "}
                  </div>
                  <span className="font-bold text-lg text-gradient">
                    PromoLink
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Transforming how businesses, creators, and customers connect
                  in the digital economy.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    tiwter
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <i className="fab fa-instagram text-lg"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <i className="fab fa-linkedin text-lg"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <i className="fab fa-youtube text-lg"></i>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-3 text-gray-500 dark:text-gray-400">
                  <li>
                    <a href="#" className="hover:text-primary grow-underline">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary grow-underline">
                      Success Stories
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary grow-underline">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary grow-underline">
                      API Docs
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
                  <li>
                    <a href="#" className="hover:text-primary grow-underline">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary grow-underline">
                      Press
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary grow-underline">
                      Contact
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
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
