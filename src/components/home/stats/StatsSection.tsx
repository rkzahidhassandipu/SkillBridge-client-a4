import { stats } from "./data/stats";
import { StatCard } from "./StatCard";

export default function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold">
              Stats that explain everything about <span className="text-primary">#Our success</span>
            </h2>
          </div>
          <div>
            <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
              See how it works
            </button>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
