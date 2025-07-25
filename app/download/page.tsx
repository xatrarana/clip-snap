import DownloadPage  from "@/components/DownloadPage"
export const metadata = {
  title: "Download Videos - ClipSnap",
  description: "Download full videos, thumbnails, or clips easily with ClipSnap.",
  keywords: ["video download", "clip download", "thumbnails", "ClipSnap"],
  authors: [{ name: "Chhatra Rana" }],
  openGraph: {
    title: "Download Videos - ClipSnap",
    description: "Download full videos, thumbnails, or clips easily with ClipSnap.",
    url: "https://clip-snap.com/download",
    siteName: "ClipSnap",
    locale: "en_US",
    type: "website",
  },
};
export default function Page() {
    return <DownloadPage/>
}

