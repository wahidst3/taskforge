import { 
  ClipboardDocumentIcon,
  CpuChipIcon,
  ListBulletIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          How It <span className="text-indigo-600">Works</span>
        </h2>
        <div className="grid md:grid-cols-5 gap-6">
          <StepCard 
            number="1" 
            icon={<ClipboardDocumentIcon className="h-10 opacity-40 hover:opacity-100 w-10 text-indigo-600"/>}
            title="Paste Content"
            description="Add emails, notes, or meeting transcripts"
            accentColor="indigo"
          />
          <StepCard 
            number="2" 
            icon={<EyeIcon className="h-10 opacity-40 hover:opacity-100 w-10 text-blue-600"/>}
            title="Review"
            description="AI highlights detected tasks and deadlines"
            accentColor="blue"
          />
          <StepCard 
            number="3" 
            icon={<AdjustmentsHorizontalIcon className="h-10 opacity-40 hover:opacity-100 w-10 text-purple-600"/>}
            title="Customize"
            description="Edit priorities and categories"
            accentColor="purple"
          />
          <StepCard 
            number="4" 
            icon={<ListBulletIcon className="h-10 opacity-40 hover:opacity-100 w-10 text-green-600"/>}
            title="Organize"
            description="Tasks auto-sort into your workflow"
            accentColor="green"
          />
          <StepCard 
            number="5" 
            icon={<UserGroupIcon className="h-10 opacity-40 hover:opacity-100 w-10 text-amber-600"/>}
            title="Collaborate"
            description="Share boards with your team"
            accentColor="amber"
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({ number, icon, title, description, accentColor = 'indigo' }) {
  const colorMap = {
    indigo: 'bg-indigo-100 text-indigo-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600'
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all h-full">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${colorMap[accentColor]} font-bold`}>
          {number}
        </div>
        <div className='text-3xl'>
          {icon }
        </div>
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}