
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategoryNav from "../components/CategoryNav";
import FeaturedPGs from "../components/FeaturedPGs";
import Features from "../components/Features";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <Hero />

      {/* Category Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Find PGs by Type</h2>
            <p className="text-lg text-muted-foreground">Choose the accommodation that suits your needs</p>
          </div>
          <CategoryNav />
        </div>
      </section>

      <FeaturedPGs />
      <Features />
      <Stats />
      
      <Footer />
    </div>
  );
};

export default Index;
