import { Dialog, DialogContent } from "@/components/ui/dialog";

type TrailerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trailerUrl: string;
};

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  } catch (e) {
    console.error("URL do trailer inválida:", e);
    return null;
  }
  return null;
};

export function TrailerModal({ open, onOpenChange, trailerUrl }: TrailerModalProps) {
  const embedUrl = getYouTubeEmbedUrl(trailerUrl);

  if (!embedUrl) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 border-0">
        <div className="relative aspect-video">
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer do filme"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}