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
export default function Footer1() {
  return (
    <>
      <footer>
        <div className="footer1-content">
          <div className="mx-6">
            <div className="pt-16 pb-8">
              <div
                className="grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]
    gap-10"
              >
                <div className="">
                  <div className="flex flex-wrap items-center p-3 text-[13px] text-textMain">
                    <div className="w-full">
                      <a href="#" className="w-48 block">
                        <Image
                          src={logo}
                          alt="Description"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    </div>
                    <div className="w-full">
                      <p>Got Question? Call us 24/7</p>
                    </div>
                      <div className="w-full">
                        <a href="tel:18005807777" className="text-lg font-semibold text-black hover:underline">1-800-580-7777</a>
                      </div>
                    <div className="w-full">
                      <p>
                        Register now to get updates on pronot get up ions &
                        coupons ster now toon.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 w-full">
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
                </div>
                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
