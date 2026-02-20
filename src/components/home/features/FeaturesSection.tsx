
import { features } from "./data/features";
import { FeatureCard } from "./FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mt-2">
          Online education platform for all
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Accusamus et iusido dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et molestias sint occaecati cupiditate non provident.
        </p>

        <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* <div className="mt-12">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center gap-2 mx-auto">
            🔒 Join our Community
          </button>
        </div> */}
      </div>
    </section>
  );
}
