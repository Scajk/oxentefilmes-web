import { useEffect, useState } from "react";
import type { MovieProps } from "./MovieCard";
import MovieCard from "./MovieCard";
import { Button } from "@/components/ui/button";

type APIMovie = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  year: number;
  category: string;
  trailerUrl: string;
};

export default function MovieGrid() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const movieRes = await fetch("http://localhost:3001/movies");
        if (!movieRes.ok) throw new Error("Erro ao carregar filmes.");

        const movieData: APIMovie[] = await movieRes.json();

        const allCategories = Array.from(new Set(movieData.map(m => m.category)));
        setCategories(allCategories);

        const transformed: MovieProps[] = movieData.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          year: item.year,
          category: item.category,
          trailerUrl: item.trailerUrl,
        }));

        setMovies(transformed);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredMovies =
    selectedCategory === "all"
      ? movies
      : movies.filter((m) => m.category === selectedCategory);

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Filmes em destaque
      </h2>

      {error && (
        <p className="text-red-500 text-center font-bold mb-6">
          {error}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
        >
          Todos
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {loading && !error && (
        <p className="text-center text-muted-foreground font-bold">
          Carregando filmes...
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </section>
  );
}