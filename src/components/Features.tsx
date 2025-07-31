
import { Check, Shield, Clock, MapPin, Users, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Features = () => {
  const features = [
    {
      icon: Check,
      title: "100% Verified PGs",
      description: "Every listing is personally verified with real photos and authentic reviews"
    },
    {
      icon: Shield,
      title: "Zero Brokerage",
      description: "Direct connect with owners. No hidden fees or brokerage charges"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for maintenance and support requests"
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book your PG in minutes with our seamless digital process"
    }
  ];

  const steps = [
    {
      icon: MapPin,
      step: "01",
      title: "Search & Filter",
      description: "Find PGs by location, budget, gender preference, and amenities",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Clock,
      step: "02", 
      title: "Schedule Visit",
      description: "Book a free visit online and explore the PG in person",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      step: "03",
      title: "Book Room",
      description: "Secure your room with minimal advance payment",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Heart,
      step: "04",
      title: "Move In Safely",
      description: "Enjoy verified PG with all amenities and 24/7 support",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="space-y-32">
      {/* Why Choose Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50/50 to-mint/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Why Choose <span className="text-blue-600">Gharpayy</span>?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                India's most trusted PG platform with verified listings and hassle-free booking
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Features List */}
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-6 bg-card rounded-2xl border hover:shadow-md transition-all group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}

                {/* CTA Section */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
                  <h3 className="text-xl font-semibold mb-4">Ready to find your perfect PG?</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input 
                      placeholder="Enter your location" 
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white/50" 
                    />
                    <Button className="bg-white text-blue-600 hover:bg-white/90 font-semibold">
                      Search PGs
                    </Button>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-yellow-400/20 rounded-3xl blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
                  alt="Happy PG residents"
                  className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                How <span className="text-blue-600">Gharpayy</span> Works
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Get your dream PG in 4 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="relative group"
                >
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0"></div>
                  )}
                  
                  <div className="relative text-center space-y-6 p-6 bg-card rounded-2xl border hover:shadow-lg transition-all">
                    {/* Step Icon */}
                    <div className="relative mx-auto w-16 h-16">
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{step.step}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
