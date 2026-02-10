import * as React from "react";

import {
  Body,
  Font,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
} from "@react-email/components";

import { EnumClientRoutes } from "src/shared/types/client/enums.type";
import type { SessionMetadata } from "src/shared/types/session-metadata.type";

type Props = {
  token: string;
  email: string;
  metadata: SessionMetadata;
  domain: string;
  t: any;
};

const TFAAuthTemplate: React.FC<Props> = ({
  token,
  t,
  domain,
  metadata,
  email,
}) => {
  const index_page = `${domain}${EnumClientRoutes.INDEX}`;
  const change_password_page = `${domain}${EnumClientRoutes.RESET_PASSWORD}`;

  return (
    <Html>
      <Preview>{t.tfa.preview}</Preview>
      <Head>
        <title>{t.tfa.title}</title>
        <Font fallbackFontFamily={"Arial"} fontFamily="Rubik" />
      </Head>
      <Tailwind>
        <Body className="bg-[#fffcdf] flex flex-col items-center justify-center w-full h-full text-base">
          <Section className="max-w-[550px]">
            <h2 className="text-2xl font-bold mt-8 text-center uppercase">
              <a href={index_page} className="no-underline text-black">
                {t.shared.app_name}
              </a>
            </h2>

            <Hr className="bg-[#FFD700] w-full h-[2px] my-5" />

            <p className="mb-2 text-center">{t.tfa.content.greeting["1"]}</p>
            <p className="mb-5">{t.tfa.content.greeting["2"]}</p>

            <p className="mb-1">{t.shared["device-info"].heading}</p>
            <ul className="list-none rounded-md py-1 px-3 mr-10 mb-5">
              <li className="mb-1">
                <span className="font-semibold">
                  🌍 {t.shared["device-info"].location}
                </span>{" "}
                {metadata.location.country}, {metadata.location.city}
              </li>
              <li className="mb-1">
                <span className="font-semibold">
                  📱 {t.shared["device-info"].os}
                </span>{" "}
                {metadata.device.os}
              </li>
              <li className="mb-1">
                <span className="font-semibold">
                  🌐 {t.shared["device-info"].browser}
                </span>{" "}
                {metadata.device.browser}
              </li>
              <li>
                <span className="font-semibold">
                  💻 {t.shared["device-info"].ip}
                </span>{" "}
                {metadata.ip}
              </li>
            </ul>

            <p className="mb-1">{t.tfa.content.code}</p>
            <div className="bg-gray-500/20 border border-gray-500/40 rounded-sm w-full py-3 mb-1">
              <p className="text-2xl text-center tracking-widest">{token}</p>
            </div>
            <p className="font-semibold italic text-sm text-center">
              {t.shared.codeLifetime}
            </p>

            <Hr className="bg-[#FFD700] w-full h-[2px] my-5" />

            <p className="text-sm text-gray-600">
              {t.shared.notYou.withAdvice["1"]}{" "}
              <a href={change_password_page} className="text-black underline">
                {t.shared.notYou.link}
              </a>
              {t.shared.notYou.withAdvice["2"]}
            </p>

            <footer className="mt-12">
              <p className="text-center text-gray-600 mb-4">
                {t.shared.support}{" "}
                <a href={`mailto:${email}`} className="text-black underline">
                  {email}
                </a>
                .
              </p>

              <p>{t.shared.farewell}</p>

              <p className="text-gray-600 text-sm text-center mt-5">
                {t.shared.noreply}
              </p>
            </footer>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export { TFAAuthTemplate };
