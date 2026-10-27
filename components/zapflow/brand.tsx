export const brandLogoUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_1_de_mai._de_2026_07_10_10_1%20%281%29-ePAqdPm41ih5QKKHvtkU5C6Bp1YtW2.png"

export function Brand() {
  return (
    <a href="#inicio" className="flex items-center gap-2" aria-label="wZapFlow, voltar ao início">
      <img src={brandLogoUrl} alt="" width={40} height={36} className="h-9 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Cardápio</span>
        <span className="text-lg font-extrabold tracking-tight">wZapFlow</span>
      </span>
    </a>
  )
}
