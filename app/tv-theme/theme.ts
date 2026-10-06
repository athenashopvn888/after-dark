import type { CSSProperties } from "react";
export type TvTheme = { headerImage:string; backgroundImage:string; cornerLeft?:string; cornerRight?:string; primary:string; accent:string; glow:string; cardBorder:string; headerText:string; sloganLeft:string; sloganRight:string; footerLeft:string; footerRight:string; };
export const TV_THEMES: Readonly<Record<string,TvTheme>> = {
  MJ01: { headerImage:"/tv-theme/mj01/header.webp", backgroundImage:"/tv-theme/mj01/background.webp", cornerLeft:"/tv-theme/mj01/corner-left.png", cornerRight:"/tv-theme/mj01/corner-right.png", primary:"#160B26", accent:"#C9A24A", glow:"rgba(158, 84, 255, 0.44)", cardBorder:"rgba(230, 200, 255, 0.92)", headerText:"#FFF8E6", sloganLeft:"AFTER DARK", sloganRight:"NIGHT MODE", footerLeft:"AFTER DARK CANNABIS", footerRight:"PREMIUM CANNABIS · AFTER DARK" },
};
export function getTvTheme(storeCode?:string|null):TvTheme|undefined { return storeCode ? TV_THEMES[storeCode] : undefined; }
type TvThemeVariables = CSSProperties & { "--tv-theme-header-image":string; "--tv-theme-background-image":string; "--tv-theme-primary":string; "--tv-theme-accent":string; "--tv-theme-glow":string; "--tv-theme-card-border":string; "--tv-theme-header-text":string; };
export function getTvThemeVariables(theme:TvTheme):TvThemeVariables { return { "--tv-theme-header-image":`url("${theme.headerImage}")`, "--tv-theme-background-image":`url("${theme.backgroundImage}")`, "--tv-theme-primary":theme.primary, "--tv-theme-accent":theme.accent, "--tv-theme-glow":theme.glow, "--tv-theme-card-border":theme.cardBorder, "--tv-theme-header-text":theme.headerText }; }

