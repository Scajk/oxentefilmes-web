import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type EditMovieModalProps = {
  movieId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMovieUpdated: () => void;
};

export function EditMovieModal({ movieId, open, onOpenChange, onMovieUpdated }: EditMovieModalProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    release_year: "",
    genre: "",
    poster_url: "",
    trailer_url: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && movieId) {
      const fetchMovieData = async () => {
        setLoading(true);
        try {
          const res = await fetch(`http://localhost:3001/movies/${movieId}`);
          if (!res.ok) throw new Error("Filme não encontrado.");
          const data = await res.json();
          setForm({
            title: data.title || "",
            description: data.description || "",
            release_year: data.release_year || "",
            genre: data.genre || "",
            poster_url: data.poster_url || "",
            trailer_url: data.trailer_url || "",
          });
        } catch (err) {
            let errorMessage = "Erro ao carregar dados do filme.";
            if (err instanceof Error) errorMessage = err.message;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
      };
      fetchMovieData();
    }
  }, [open, movieId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = { ...form, release_year: Number(form.release_year) };

    try {
      const res = await fetch(`http://localhost:3001/movies/${movieId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao atualizar o filme.");

      onMovieUpdated();
      onOpenChange(false);
    } catch (err) {
        let errorMessage = "Ocorreu um erro desconhecido.";
        if (err instanceof Error) errorMessage = err.message;
        setError(errorMessage);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold text-primary mb-4">Editar Filme</h2>

        {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
        
        {loading ? <p>Carregando...</p> : (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="title">Título</Label>
                    <Input name="title" value={form.title} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea name="description" value={form.description} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="release_year">Ano de Lançamento</Label>
                    <Input type="number" name="release_year" value={form.release_year} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="genre">Gênero</Label>
                    <Input name="genre" value={form.genre} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="poster_url">URL da Imagem</Label>
                    <Input name="poster_url" value={form.poster_url} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="trailer_url">URL do Trailer (opcional)</Label>
                    <Input name="trailer_url" value={form.trailer_url} onChange={handleChange} />
                </div>

                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                    Salvar Alterações
                </Button>
            </form>
        )}
      </DialogContent>
    </Dialog>
  );
}