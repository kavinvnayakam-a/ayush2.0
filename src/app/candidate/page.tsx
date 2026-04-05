import React from 'react';
import { Smartphone, CheckCircle, Search, MapPin, PhoneCall, Globe } from 'lucide-react';

const ManyJobsLanding = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-red-600 tracking-tighter">MANY JBS</h1>
          <span className="text-[10px] uppercase text-slate-500 leading-tight">
            Entry level Sales, Service and<br/>Manufacturing jobs
          </span>
        </div>
        <div className="flex bg-slate-100 rounded-full p-1">
          <button className="px-4 py-1 text-sm font-medium">Recruiter</button>
          <button className="px-4 py-1 text-sm font-medium bg-red-600 text-white rounded-full">Candidate</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 space-y-8">
          <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            Entry level Sales, Service and Manufacturing jobs
          </h2>
          
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                <Globe size={24} />
              </div>
              <p className="text-sm font-medium text-slate-600">Use app in English<br/>and Tamil</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Search size={24} />
              </div>
              <p className="text-sm font-medium text-slate-600">Discover jobs from<br/>multiple industries</p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-4 border border-slate-200 rounded-2xl w-fit">
            <div className="w-24 h-24 bg-slate-200 flex items-center justify-center rounded-lg">
              {/* Placeholder for QR Code */}
              <span className="text-[10px] text-center text-slate-500">QR CODE</span>
            </div>
            <p className="text-sm text-slate-600 max-w-[200px]">
              Scan the QR code with your mobile to download <strong>Many Jobs app</strong> & get instant updates
            </p>
          </div>
        </div>

        {/* Hero Image / Illustration Area */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          <div className="relative z-10">
             <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600" 
              alt="Candidate using app" 
              className="rounded-3xl shadow-2xl"
            />
            {/* Floating Badges */}
            <div className="absolute -left-10 top-1/2 bg-white p-3 rounded-xl shadow-lg border border-orange-100 flex items-center gap-2 animate-bounce">
              <div className="bg-orange-400 p-1 rounded-full text-white"><CheckCircle size={14}/></div>
              <div>
                <p className="text-[10px] font-bold text-orange-500 italic">Shortlisted</p>
                <p className="text-[8px] text-slate-500 leading-tight">Your profile is shortlisted<br/>by a recruiter</p>
              </div>
            </div>
            <div className="absolute -right-6 top-1/4 bg-white p-3 rounded-xl shadow-lg border border-green-100 flex items-center gap-2">
              <div className="bg-green-500 p-1 rounded-full text-white"><CheckCircle size={14}/></div>
              <div>
                <p className="text-[10px] font-bold text-green-600 italic">Congrats!</p>
                <p className="text-[8px] text-slate-500 leading-tight">Your application is sent<br/>successfully!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold">Explore Sales, Service and Manufacturing jobs</h3>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Verified Recruiters", desc: "Our screening process allows only verified job providers.", icon: <CheckCircle className="text-red-500"/> },
            { title: "Use in Tamil", desc: "You can use the app easily in your mother tongue.", icon: <Globe className="text-blue-500"/> },
            { title: "Talk to HRs Directly", desc: "Call recruiters directly to know your interview status.", icon: <PhoneCall className="text-green-500"/> },
            { title: "Location Features", desc: "Find jobs nearby using advanced map & distance filters.", icon: <MapPin className="text-purple-500"/> },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{item.icon}</div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6 italic underline decoration-red-500 underline-offset-8">Qualification based jobs</h3>
          <div className="flex flex-wrap gap-3">
            {['Bachelor Degree', 'Diploma', 'ITI', '12th Pass', '10th & Below'].map(q => (
              <span key={q} className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">{q}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6 italic underline decoration-red-500 underline-offset-8">Job Types</h3>
          <div className="flex flex-wrap gap-3">
            {['Full time', 'Part time', 'Contract', 'Temporary'].map(t => (
              <span key={t} className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <h4 className="text-xl font-bold mb-4">Many Jobs</h4>
            <p className="text-slate-400 text-sm">TVH Belicia towers,<br/>Raja Annamalai Puram, Chennai,<br/>Tamil Nadu 600028</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-red-500">Legal</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-red-500">Contact Us</h4>
            <p className="text-slate-400 text-sm">support@manyjobs.com</p>
          </div>
          <div className="text-sm text-slate-500">
            <p>© 2026 Many Jobs (A product of Matrimony group). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ManyJobsLanding;