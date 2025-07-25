import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { PlayCircle, Edit, Trash2 } from "lucide-react";
import { EditMovieModal } from "./ui/EditMovieModal";
import { ConfirmationDialog } from "./ui/ConfirmationDialog";
import { TrailerModal } from "./ui/TrailerModal";

export type MovieProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  year: number;
  category: string;
  trailerUrl: string;
  onMovieDeleted: (id: number) => void;
  onMovieUpdated: () => void;
};

export default function MovieCard({
  id,
  title,
  description,
  imageUrl,
  year,
  category,
  trailerUrl,
  onMovieDeleted,
  onMovieUpdated,
}: MovieProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSynopsisVisible, setIsSynopsisVisible] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  async function handleDelete() {
    try {
      const res = await fetch(`http://localhost:3001/movies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao apagar o filme.");
      onMovieDeleted(id);
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro ao apagar o filme.");
    }
  }
  
  const handleActionClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsSynopsisVisible(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsSynopsisVisible(false);
    }, 200);
  };

  const descriptionLimit = 100;

  return (
    <>
      <div className="rounded-lg overflow-hidden shadow-sm border border-border bg-card text-card-foreground hover:shadow-md transition-shadow flex flex-col">
        <img src={imageUrl} alt={title} className="w-full h-60 object-cover" loading="lazy" />
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow space-y-2">
            <span className="text-xs text-muted-foreground capitalize">{category}</span>
            <h3 className="font-semibold text-lg min-h-[3.5rem] my-2">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
          
          <div className="pt-2">
            {description.length > descriptionLimit && (
              <div 
                className="relative inline-block"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="text-xs text-primary cursor-pointer hover:underline">
                  Ver mais...
                </span>
                
                {isSynopsisVisible && (
                  <div 
                    className="absolute bottom-full left-0 mb-2 w-64 bg-popover text-popover-foreground p-3 rounded-md shadow-lg border z-30"
                  >
                    <p className="text-sm max-h-40 overflow-y-auto">{description}</p>
                  </div>
                )}
              </div>
            )}
            <p className="text-sm text-primary pt-1">Ano: {year}</p>
          </div>
        </div>

        <div className="p-4 border-t z-10 bg-card">
          <Button 
            variant="default" 
            className="w-full gap-2 mb-2"
            onClick={(e) => {
              handleActionClick(e);
              if (trailerUrl) setIsTrailerOpen(true);
            }}
            disabled={!trailerUrl}
          >
            <PlayCircle size={18} />
            Assistir Trailer
          </Button>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full gap-2" onClick={(e) => { handleActionClick(e); setIsEditModalOpen(true); }}>
              <Edit size={16} /> Editar
            </Button>
            <Button variant="destructive" className="w-full gap-2" onClick={(e) => { handleActionClick(e); setIsConfirmOpen(true); }}>
              <Trash2 size={16} /> Apagar
            </Button>
          </div>
        </div>
      </div>

      <EditMovieModal movieId={id} open={isEditModalOpen} onOpenChange={setIsEditModalOpen} onMovieUpdated={onMovieUpdated} />
      <ConfirmationDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen} onConfirm={handleDelete} title="Confirmar Exclusão" description={`Tem certeza que deseja apagar o filme "${title}"? Esta ação não pode ser desfeita.`} />
      
      {trailerUrl && <TrailerModal open={isTrailerOpen} onOpenChange={setIsTrailerOpen} trailerUrl={trailerUrl} />}
    </>
  );
}