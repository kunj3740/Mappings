import { LucideIcon } from 'lucide-react';

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const Feature = ({ icon: Icon, title, description }: FeatureProps) => {
  return (
    <div className="group relative overflow-hidden p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl p-3 w-fit">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};