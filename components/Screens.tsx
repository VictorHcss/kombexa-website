import Image from "next/image";
import { SCREENS, type ScreenKey } from "@/lib/screens";

/** Tela real do sistema em uma moldura de janela discreta. */
export function ScreenFrame({ screen, priority = false, sizes = "(min-width: 1100px) 760px, 100vw", className = "" }: { screen: ScreenKey; priority?: boolean; sizes?: string; className?: string }) {
  const s = SCREENS[screen];
  return (
    <figure className={`screen-frame ${className}`}>
      <div className="screen-frame-bar" aria-hidden="true"><span /><span /><span /></div>
      <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes={sizes} priority={priority} />
    </figure>
  );
}

/** Tela real do celular em uma moldura de aparelho. */
export function PhoneFrame({ screen, priority = false, sizes = "280px", className = "" }: { screen: ScreenKey; priority?: boolean; sizes?: string; className?: string }) {
  const s = SCREENS[screen];
  return (
    <figure className={`phone-frame ${className}`}>
      <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes={sizes} priority={priority} />
    </figure>
  );
}
