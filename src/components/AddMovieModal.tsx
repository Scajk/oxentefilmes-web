import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AddMovieModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    release_year: "",
    genre: "",
    poster_url: "",
    trailer_url: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { title, description, release_year, genre, poster_url, trailer_url } = form;

    if (!title || !description || !release_year || !genre || !poster_url) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      title,
      description,
      release_year: Number(release_year),
      genre,
      poster_url,
      trailer_url,
    };

    try {
      const res = await fetch("http://localhost:3001/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Erro do servidor:", text);
        throw new Error("Erro ao adicionar filme.");
      }

      setSuccess("Filme adicionado com sucesso!");
      setForm({
        title: "",
        description: "",
        release_year: "",
        genre: "",
        poster_url: "",
        trailer_url: "",
      });
      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-background hover:bg-primary/90">+ Adicionar Filme</Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold text-primary mb-4">Novo Filme</h2>

        {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
        {success && <p className="text-green-500 font-semibold mb-4">{success}</p>}

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
            Salvar Filme
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}