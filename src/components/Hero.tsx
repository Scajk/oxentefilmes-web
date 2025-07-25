import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      className="relative py-20 px-4 text-center text-white bg-center bg-cover"
      style={{
        backgroundImage: "url('./Hero.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-primary text-4xl sm:text-5xl font-bold mb-4">
          Novos Filmes
        </h1>
        <p className="text-primary-foreground text-lg mb-6">
          Filmes retrô, filmes atuais e trailers.
        </p>
        <Button size="lg" className="text-base cursor-pointer">
          Veja Mais
        </Button>
      </div>
    </section>
  );
}
