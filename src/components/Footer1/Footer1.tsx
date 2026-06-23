import Image from "next/image";
import logo from "../../assets/images/logo2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faPinterestP,
} from "@fortawesome/free-brands-svg-icons";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
const footerSections = [
  {
    title: "company",
    links: [
      "aboutUs",
      "teamMember",
      "career",
      "contactUs",
      "affilate",
      "orderHistory",
    ],
  },
  {
    title: "myAccount",
    links: [
      "trackOrder",
      "viewCart",
      "signIn",
      "help",
      "myWishlist",
      "privacyPolicy",
    ],
  },
  {
    title: "customerService",
    links: [
      "paymentMethods",
      "moneyBackGuarantee",
      "returns",
      "supportCenter",
      "shipping",
      "termsOfService",
    ],
  },
];
export default function Footer1() {
  const { t } = useTranslation();
  return (
    <>
      <footer>
        <div className="footer1-content bg-white">
          <div className="mx-2 xl:mx-3 2xl:mx-5">
            <div className="pt-9 2xl:pt-16 pb-8">
              <div
                className="grid
    grid-cols-1
    xl:grid-cols-2
    2xl:grid-cols-12
    gap-2 xl:gap-10 
    text-[13px]"
              >
                <div className="2xl:col-span-3 flex flex-wrap items-center p-3  text-textMain gap-2">
                  <div className="w-full">
                    <a href="#" className="w-48 block">
                      <Image
                        src={logo}
                        alt="Description"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                  <div className="w-full lg:max-2xl:text-sm">
                    <p>{t("footer.supportText")}</p>
                  </div>
                  <div className="w-full ">
                    <a
                      href="tel:18005807777"
                      className="text-lg font-semibold text-secondary hover:underline"
                    >
                      1-800-580-7777
                    </a>
                  </div>
                  <div className="w-full leading-7 mb-3 lg:max-2xl:text-sm">
                    <p>{t("footer.description")}</p>
                  </div>
                  <div className="w-full flex items-center gap-3">
                    <a
                      href="#"
                      className="size-8 rounded-full flex items-center justify-center bg-[#1b4f9b]"
                    >
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="text-white size-4"
                      />
                    </a>

                    <a
                      href="#"
                      className="size-8 rounded-full flex items-center justify-center bg-[#00adef]"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="text-white size-4"
                      />
                    </a>

                    <a
                      href="#"
                      className="size-8 rounded-full flex items-center justify-center bg-[#cc0001]"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="text-white size-4"
                      />
                    </a>

                    <a
                      href="#"
                      className="size-8 rounded-full flex items-center justify-center bg-[#2c567e]"
                    >
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className="text-white size-4"
                      />
                    </a>

                    <a
                      href="#"
                      className="size-8 rounded-full flex items-center justify-center bg-[#f96a02]"
                    >
                      <FontAwesomeIcon
                        icon={faPinterestP}
                        className="text-white size-4"
                      />
                    </a>
                  </div>
                </div>
                {footerSections.map((section) => (
                    <div
                      key={section.title}
                      className="2xl:col-span-2 flex flex-col p-3"
                    >
                      <div className="mb-5 uppercase font-bold text-[14px] lg:max-2xl:text-base text-secondary">
                        {t(`footer.${section.title}`)}
                      </div>

                      <ul className="flex flex-col gap-3 text-textMain">
                        {section.links.map((link) => (
                          <li
                            key={link}
                            className="hover:text-primary transition-colors duration-300 cursor-pointer lg:max-2xl:text-sm"
                          >
                            {t(`footer.${link}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                <div className="2xl:col-span-3 xl:col-span-2 2xl:flex justify-center sm:max-2xl:-order-1">
                  <div className="p-3 sm:max-xl:mb-6">
                    <div>
                      <div className="sm:max-2xl:text-center 2xl:flex justify-center items-center mb-6 gap-4">
                        <Mail
                          strokeWidth={1.5}
                          className="text-secondary w-[36px] h-[36px] xl:w-[47px] xl:h-[47px] 2xl:w-[57px] 2xl:h-[57px] sm:max-2xl:mx-auto xl:max-2xl:mb-3"
                        />

                        <div>
                          <h2 className="text-sm md:text-base lg:text-lg 2xl:text-base font-semibold transform uppercase text-secondary">
                            {t("footer.subscribe")}
                          </h2>
                          <p className="text-[#999999] lg:max-2xl:text-sm ">
                            {t("footer.subscribeDescription")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 xl:max-2xl:w-[70%] xl:max-2xl:mx-auto">
                        <input
                          type="email"
                          placeholder={t("footer.emailPlaceholder")}
                          className="bg-[#f0f0f0] placeholder:text-textMain
                           placeholder:focus:text-opacity-0
                            placeholder:focus:transition-all
                             placeholder:focus:duration-300
                              placeholder:focus:ease 
                              placeholder:sm:max-lg:text-xs
                               text-[#333333]
                              px-4
                               py-2
                                focus:outline-none
                                focus:ring-0 flex-1"
                        />
                        <button className="bg-primary text-white px-4 py-2 md:py-3 md:px-5 rounded hover:bg-opacity-85 transition-colors duration-300 text-xs lg:text-sm font-semibold">
                          {t("footer.signUp")}
                        </button>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
