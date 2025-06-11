import { LocaleSwitcher } from "@/components/locale-switcher";
import { useTranslations } from "next-intl";

export function Home() {
  const t = useTranslations("home");

  return (
    <div>
      <LocaleSwitcher />
      <h1>{t("title")}</h1>
    </div>
  );
}
