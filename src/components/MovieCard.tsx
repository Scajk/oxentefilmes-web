import { Button } from "./ui/button";
import { PlayCircle } from "lucide-react";

export type MovieProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  year: number;
  category: string;
  trailerUrl: string;
};

export default function MovieCard({
  title,
  description,
  imageUrl,
  year,
  category,
  trailerUrl,
}: MovieProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm border border-border bg-card text-card-foreground hover:shadow-md transition-shadow">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-60 object-cover"
        loading="lazy"
      />
      <div className="p-4 space-y-2">
        <span className="text-xs text-muted-foreground capitalize">{category}</span>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <p className="text-sm text-primary">Ano: {year}</p>
      </div>
      <div className="p-4">
        <Button asChild variant="default" className="w-full gap-2">
          <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
            <PlayCircle size={18} />
            Assistir Trailer
          </a>
        </Button>
      </div>
    </div>
  );
}