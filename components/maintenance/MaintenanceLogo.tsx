import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function MaintenanceLogo() {
  return (
    <div className="logo-block js-enter">
      <Image
        className="maintenance-logo"
        src={`${basePath}/images/LOGO.PNG`}
        alt="劇団ケッペキ 2026年度新歓特設サイト ロゴ"
        width={3163}
        height={936}
        priority
      />
    </div>
  );
}
