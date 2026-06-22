import Image from "next/image";
import payment from "../../assets/images/payment.png";
import { useTranslation } from "react-i18next";
export default function Footer2() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 bg-secondary text-[#999] text-[13px] lg:max-xl:text-sm">
        <div className="mx-2 xl:mx-6">
          <div className="xl:flex justify-between items-center xl:p-2 text-center">
            <div>
              <p>{t("footer.copyright")}</p>
            </div>
            <div className="md:flex justify-center items-center xl:gap-7">
              <p className="sm:max-xl:my-3 sm:max-xl:mr-3">{t("footer.safePayment")}</p>
              <div className="sm:max-xl:w-fit sm:max-md:mx-auto">
                <Image src={payment} alt="Safe Payment" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
