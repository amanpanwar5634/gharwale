
import { TrendingUp, Shield, Users, MapPin } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Happy Residents",
      description: "Students & professionals trust us",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      number: "500+",
      label: "Verified PGs",
      description: "Personally verified by our team",
      color: "from-green-500 to-green-600"
    },
    {
      icon: MapPin,
      number: "15+",
      label: "Cities",
      description: "Across major Indian cities",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: "Satisfaction Rate",
      description: "Based on resident feedback",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-mint/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Trusted by <span className="text-blue-600">Thousands</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join the growing community of satisfied residents across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="relative group p-8 bg-card rounded-3xl border hover:shadow-xl transition-all duration-300"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-3xl group-hover:opacity-10 transition-opacity`}></div>
                
                {/* Content */}
                <div className="relative text-center space-y-4">
                  {/* Icon */}
                  <div className="mx-auto w-16 h-16 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Number */}
                  <div className="space-y-2">
                    <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
