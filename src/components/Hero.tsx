
import { ArrowRight, Play, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-mint/20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-yellow-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-card border rounded-full px-4 py-2 text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              India's First Instant PG Booking Platform
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Book Your
                <span className="block bg-gradient-to-r from-blue-600 to-yellow-400 bg-clip-text text-transparent">
                  Perfect PG
                </span>
                Instantly
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Skip the hassle! Prebook verified PGs online with flexi stays, 
                daily cleaning, WiFi, and 24/7 support. Move in hassle-free!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="group bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/marketplace')}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Book PG Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group border-2 px-8 py-6 rounded-full text-lg hover:bg-accent/50"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-muted-foreground">Instant Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-sm text-muted-foreground">Ready PGs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">15+</div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 relative max-w-lg lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition"></div>
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
                alt="Modern PG accommodation"
                className="relative rounded-2xl shadow-2xl w-full h-auto transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
