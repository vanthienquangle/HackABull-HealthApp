import { Users, Award, TrendingUp, Calendar } from 'lucide-react';
import aboutImage from '../sub_assets/about_pic.jpg'

function AboutSection() {
  const stats = [
    { icon: <Users size={20} />, value: '500+', label: 'Beta Users' },
    { icon: <Award size={20} />, value: '1st', label: 'USF Innovation' },
    { icon: <TrendingUp size={20} />, value: '75%', label: 'Risk Detection' },
    { icon: <Calendar size={20} />, value: '48 hrs', label: 'Development Time' }
  ];

  return (
    <div id="about" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-teal-100 text-teal-700 rounded-full text-sm font-medium px-4 py-1.5 inline-block mb-4">
            OUR TEAM
          </span>
          <h2 className="text-3xl font-bold text-neutral-800 max-w-2xl mx-auto leading-tight">
            USF Students Creating{" "}
            <span className="bg-gradient-to-r from-teal-500 to-teal-700 text-transparent bg-clip-text">
              Healthcare Solutions
            </span>
          </h2>
          <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
            A team of USF students passionate about using technology to revolutionize stroke prevention
            and make healthcare more accessible for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="absolute -left-2 -top-2 w-16 h-16 bg-teal-100 rounded-lg opacity-50"></div>
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-teal-100 rounded-lg opacity-50"></div>
            
            <div className="relative z-10 overflow-hidden rounded-xl shadow-md">
              <img 
                src={aboutImage || '/api/placeholder/600/400'}
                alt="The NeuroSure Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-neutral-800 mb-3">Our Hackathon Project</h3>
            <p className="text-neutral-600 mb-4">
              Created during the USF Health Hackathon 2025, NeuroSure is our solution to make stroke 
              prevention accessible using AI and medical research to help people understand and reduce their risk.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:border-teal-200 transition-all">
                  <div className="flex items-center mb-1">
                    <div className="text-teal-600 mr-2">
                      {stat.icon}
                    </div>
                    <h4 className="text-xl font-bold text-teal-700">{stat.value}</h4>
                  </div>
                  <p className="text-neutral-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Evidence-Based',
                description: 'Built on current medical research and neural health data'
              },
              {
                title: 'User-Friendly',
                description: 'Designed with simplicity and accessibility at its core'
              },
              {
                title: 'Privacy-Focused',
                description: 'Respects user data with secure, ethical handling practices'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all">
                <h4 className="text-lg font-bold text-neutral-800 mb-2">{value.title}</h4>
                <p className="text-neutral-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;