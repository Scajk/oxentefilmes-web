import { Instagram, Linkedin } from "lucide-react";
import { FaXTwitter, FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="py-6 px-4 border-t mt-12 text-sm text-primary bg-background flex flex-col sm:flex-row justify-between items-center">
      <div className="flex gap-4 mb-4 sm:mb-0">
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram className="h-5 w-5 hover:text-pink-500 transition-colors" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X">
          <FaXTwitter className="h-5 w-5 hover:text-white transition-colors" />
        </a>
        <a href="https://linkedin.com/in/sergiodecastroo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin className="h-5 w-5 hover:text-blue-700 transition-colors" />
        </a>
        <a href="https://github.com/scajk" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub className="h-5 w-5 hover:text-gray-400 transition-colors" />
        </a>
      </div>

      <p className="text-center sm:text-right text-muted-foreground text-primary">
        © 2025 OxenteFilmes. Todos os direitos reservados.
      </p>
    </footer>
  );
}