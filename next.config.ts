import type { NextConfig } from "next";
import createNextIntl from "next-intl/plugin";

const withNextIntl = createNextIntl("./src/i18n/request.ts");

const config: NextConfig = {
  /* config options here */
};

export default withNextIntl(config);
