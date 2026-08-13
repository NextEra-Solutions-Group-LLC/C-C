import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FloatingActions from "./components/Floating";

export default function Home() {
  return (
    <div>

      <Hero />
      <FloatingActions />
    </div>
  );
}
