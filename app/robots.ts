import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/landing-content"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/style-tile"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
