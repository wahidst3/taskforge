import { 
  ShieldCheckIcon, 
  SparklesIcon, 
  LockClosedIcon, 
  GlobeAltIcon,
  BoltIcon,
  ClockIcon,
  ServerIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function TrustBadges() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4 py-8 max-w-7xl mx-auto text-center">
        <TrustBadge 
          icon={<ShieldCheckIcon className="h-8 w-8 mx-auto text-green-500"/>} 
          text="Bank-Grade Security"
          color="green"
        />
        <TrustBadge 
          icon={<SparklesIcon className="h-8 w-8 mx-auto text-indigo-500"/>} 
          text="AI-Powered"
          color="indigo"
        />
        <TrustBadge 
          icon={<LockClosedIcon className="h-8 w-8 mx-auto text-blue-500"/>} 
          text="Private by Design"
          color="blue"
        />
        <TrustBadge 
          icon={<GlobeAltIcon className="h-8 w-8 mx-auto text-amber-500"/>} 
          text="Global Users"
          color="amber"
        />
        <TrustBadge 
          icon={<BoltIcon className="h-8 w-8 mx-auto text-purple-500"/>} 
          text="Lightning Fast"
          color="purple"
        />
        <TrustBadge 
          icon={<ClockIcon className="h-8 w-8 mx-auto text-cyan-500"/>} 
          text="24/7 Availability"
          color="cyan"
        />
      
      </div>
    </div>
  );
}

function TrustBadge({ icon, text, color = 'indigo' }) {
  const colorClasses = {
    green: 'text-green-500',
    indigo: 'text-indigo-500',
    blue: 'text-blue-500',
    amber: 'text-amber-500',
    purple: 'text-purple-500',
    cyan: 'text-cyan-500',
    red: 'text-red-500'
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all">
      <div className={`${colorClasses[color]} mb-2`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-slate-700">{text}</p>
    </div>
  );
}