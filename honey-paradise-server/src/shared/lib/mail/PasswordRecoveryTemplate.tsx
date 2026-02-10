import * as React from "react";

import {
  Body,
  Button,
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
  link: string;
  email: string;
  metadata: SessionMetadata;
  domain: string;
  t: any;
};

const PasswordRecoveryTemplate: React.FC<Props> = ({
  link,
  t,
  domain,
  metadata,
  email,
}) => {
  const index_page = `${domain}${EnumClientRoutes.INDEX}`;
  const change_password_page = `${domain}${EnumClientRoutes.RESET_PASSWORD}`;
  const devices_page = `${domain}${EnumClientRoutes.DEVICES}`;

  return (
    <Html>
      <Preview>{t.password_recovery.preview}</Preview>
      <Head>
        <title>{t.password_recovery.title}</title>
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

            <p className="mb-2 text-center">
              {t.password_recovery.content.greeting["1"]}
            </p>
            <p className="mb-5">
              {t.password_recovery.content.greeting["2"]}{" "}
              <a href={devices_page} className="text-black underline">
                {t.password_recovery.content.greeting.link}
              </a>{" "}
              {t.password_recovery.content.greeting["3"]}
            </p>

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

            <p className="mb-5">{t.password_recovery.content.button.label}</p>
            <Section className="text-center">
              <Button
                href={link}
                type="button"
                className="bg-[#FFD700] py-2 px-3 rounded-md w-fit cursor-pointer text-black"
              >
                {t.password_recovery.content.button.text}
              </Button>
              <p className="text-gray-600 text-xs text-center mt-2">
                {t.password_recovery.content.button.link}{" "}
                <a href={link} className="underline text-gray-600">
                  {link}
                </a>
              </p>
            </Section>

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

export { PasswordRecoveryTemplate };
