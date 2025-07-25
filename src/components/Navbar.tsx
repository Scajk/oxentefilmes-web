import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./DarkToggle";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    year: "",
    imageUrl: "",
    trailerUrl: "",
    category: "",
  });

  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.description || !form.year || !form.imageUrl || !form.trailerUrl || !form.category) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, year: Number(form.year) }),
      });

      if (!res.ok) throw new Error("Erro ao adicionar filme.");

      setModalOpen(false);
      setForm({ title: "", description: "", year: "", imageUrl: "", trailerUrl: "", category: "" });
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
    }
  }

  return (
    <header className="w-full px-4 py-3 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 bg-background text-foreground relative z-50">
      <div className="flex items-center justify-between w-full sm:w-auto sm:mr-6">
        <a href="#" className="flex items-center gap-2">
          <img
            src="logo.png"
            alt="Oxente Filmes"
            className="h-10 w-auto object-contain"
          />
          <span className="text-primary font-bold">OxenteFilmes</span>
        </a>
        <button
          className="sm:hidden p-2"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6 text-primary" />
        </button>
      </div>

      <div className="hidden sm:flex flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar filmes..."
            className="w-full rounded-md border border-border bg-input px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <nav className="hidden sm:flex flex-row items-center gap-4">
        <Button variant="link" className="text-foreground text-primary cursor-pointer">Início</Button>
        <Button variant="link" className="text-foreground text-primary cursor-pointer">Filmes</Button>
        <Button variant="link" className="text-foreground text-primary cursor-pointer">Contato</Button>
        <Button variant="link" className="text-primary text-foreground cursor-pointer" onClick={() => setModalOpen(true)}> + Adicionar Filme</Button>
        <ThemeToggle />
      </nav>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-background text-foreground z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-bold text-primary">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
            className="p-2"
          >
            <X className="h-6 w-6 text-primary" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4 overflow-y-auto h-[calc(100%-56px)]">
          <Button variant="link" className="text-foreground cursor-pointer text-left" onClick={() => setIsOpen(false)}>
            Início
          </Button>
          <Button variant="link" className="text-foreground cursor-pointer text-left" onClick={() => setIsOpen(false)}>
            Filmes
          </Button>
          <Button variant="link" className="text-foreground cursor-pointer text-left" onClick={() => setIsOpen(false)}>
            Contato
          </Button>

          <div className="flex justify-center mt-4">
            <ThemeToggle />
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Carrinho"
            className="cursor-pointer mt-auto self-start"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </nav>
      </aside>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-primary">Adicionar Novo Filme</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {error && <p className="text-red-500 font-medium">{error}</p>}
            <div>
              <Label htmlFor="title">Título</Label>
              <Input name="title" value={form.title} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea name="description" value={form.description} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="year">Ano</Label>
              <Input type="number" name="year" value={form.year} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Input name="category" value={form.category} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="trailerUrl">URL do Trailer</Label>
              <Input name="trailerUrl" value={form.trailerUrl} onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
              Salvar Filme
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}