
import Navbar from "../components/Navbar";
import CategoryNav from "../components/CategoryNav";
import PGCard from "../components/PGCard";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Calendar, MapPin, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 animate-fade-up">
            <p className="text-accent text-lg mb-4">
              India's First Fully-Managed PG & Rental Ecosystem 🏠
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-primary">
              Find Your Perfect PG Home Today
            </h1>
            <p className="text-lg text-accent mb-8">
              Verified PGs, flexi stays, daily cleaning, WiFi, and 24/7 support. 
              Book visits online and move in hassle-free!
            </p>
            <button 
              onClick={() => navigate('/marketplace')}
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2 text-lg"
            >
              Explore PGs
              <span className="inline-block">→</span>
            </button>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 relative">
            <div className="absolute -z-10 top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -z-10 bottom-0 right-20 w-48 h-48 bg-yellow-400 rounded-full opacity-30 blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
              alt="Modern PG accommodation"
              className="rounded-2xl shadow-lg relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Category Navigation - PG Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Find PGs by Type</h2>
          <CategoryNav />
        </div>
      </section>

      {/* Featured PGs Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 px-4">Featured PGs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            <PGCard
              name="Premium Boys PG Koramangala"
              rent="₹12,000/month"
              image="https://images.unsplash.com/photo-1555854877-bab0e460b513"
              rating={5}
              reviews={12}
              location="Koramangala, Bangalore"
              roomType="Single"
              gender="Boys"
            />
            <PGCard
              name="Girls PG Near Whitefield"
              rent="₹10,500/month"
              image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
              rating={4}
              reviews={8}
              location="Whitefield, Bangalore"
              roomType="Double"
              gender="Girls"
            />
            <PGCard
              name="Co-ed PG HSR Layout"
              rent="₹11,000/month"
              image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
              rating={5}
              reviews={15}
              location="HSR Layout, Bangalore"
              roomType="Single"
              gender="Co-ed"
            />
            <PGCard
              name="Budget PG Electronic City"
              rent="₹8,500/month"
              image="https://images.unsplash.com/photo-1560448204-603b3fc33ddc"
              rating={4}
              reviews={10}
              location="Electronic City, Bangalore"
              roomType="Triple"
              gender="Boys"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Gharpayy Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold">Why Choose Gharpayy?</h2>
            <p className="text-accent">India's most trusted PG platform with verified listings and hassle-free booking</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">✓</span>
                <span>100% Verified PGs with real photos</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold">✓</span>
                <span>Zero brokerage & transparent pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm font-semibold">✓</span>
                <span>24/7 support & maintenance</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-semibold">✓</span>
                <span>Flexible stays & easy booking</span>
              </div>
            </div>

            <div className="flex gap-2 max-w-md">
              <Input placeholder="Enter your location" className="flex-1" />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
              alt="Happy PG residents"
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How Gharpayy Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-50 w-20 h-20 mx-auto rounded-lg flex items-center justify-center">
                <MapPin className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-sm text-blue-600 font-semibold">Step 1</p>
              <h3 className="font-semibold text-lg">Search & Filter</h3>
              <p className="text-accent text-sm">Find PGs by location, budget, gender preference, and amenities</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-green-50 w-20 h-20 mx-auto rounded-lg flex items-center justify-center">
                <Calendar className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-sm text-green-600 font-semibold">Step 2</p>
              <h3 className="font-semibold text-lg">Schedule Visit</h3>
              <p className="text-accent text-sm">Book a free visit online and explore the PG in person</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-yellow-50 w-20 h-20 mx-auto rounded-lg flex items-center justify-center">
                <Users className="w-10 h-10 text-yellow-600" />
              </div>
              <p className="text-sm text-yellow-600 font-semibold">Step 3</p>
              <h3 className="font-semibold text-lg">Book Room</h3>
              <p className="text-accent text-sm">Secure your room with minimal advance payment</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-purple-50 w-20 h-20 mx-auto rounded-lg flex items-center justify-center">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <p className="text-sm text-purple-600 font-semibold">Step 4</p>
              <h3 className="font-semibold text-lg">Move In Safely</h3>
              <p className="text-accent text-sm">Enjoy verified PG with all amenities and 24/7 support</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
