import { languages, contactDetails } from '@/data/siteData';
import { Phone, Mail, MapPin } from 'lucide-react';

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function ContactPage({ params }: { params: { lang: 'en' | 'it' } }) {
  const { lang } = params;
  const isEn = lang === 'en';

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
       {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-luxury-gold blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            {isEn ? 'Contact Us' : 'Contattaci'}
          </h1>
          <div className="w-px h-16 bg-luxury-gold mx-auto opacity-50"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
          {/* Info */}
          <div className="space-y-10 p-10 bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
            <h2 className="text-3xl font-serif text-luxury-gold mb-8">
              {isEn ? 'Get in Touch' : 'Mettiti in Contatto'}
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6 group">
                <div className="p-4 border border-white/10 bg-white/5 text-luxury-gold group-hover:bg-luxury-gold group-hover:text-black transition-all duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-1">{isEn ? 'Phone' : 'Telefono'}</h3>
                  <p className="text-xl text-luxury-silver font-serif">{contactDetails.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="p-4 border border-white/10 bg-white/5 text-luxury-gold group-hover:bg-luxury-gold group-hover:text-black transition-all duration-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-1">Email</h3>
                  <p className="text-xl text-luxury-silver font-serif">{contactDetails.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="p-4 border border-white/10 bg-white/5 text-luxury-gold group-hover:bg-luxury-gold group-hover:text-black transition-all duration-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-1">{isEn ? 'Address' : 'Indirizzo'}</h3>
                  <p className="text-xl text-luxury-silver font-serif">{contactDetails.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-10 bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
             <h2 className="text-3xl font-serif text-luxury-gold mb-8">
              {isEn ? 'Send a Message' : 'Invia un Messaggio'}
            </h2>
            <form className="space-y-8">
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-luxury-gold transition-colors">{isEn ? 'Name' : 'Nome'}</label>
                <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-luxury-gold outline-none transition-all placeholder-white/10" placeholder={isEn ? "Your Name" : "Il tuo nome"} />
              </div>
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-luxury-gold transition-colors">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-luxury-gold outline-none transition-all placeholder-white/10" placeholder="name@example.com" />
              </div>
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-luxury-gold transition-colors">{isEn ? 'Message' : 'Messaggio'}</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-luxury-gold outline-none transition-all placeholder-white/10" placeholder={isEn ? "Your message..." : "Il tuo messaggio..."}></textarea>
              </div>
              <button type="submit" className="w-full bg-white/5 text-luxury-gold border border-luxury-gold/20 font-bold py-4 px-8 hover:bg-luxury-gold hover:text-black transition-all duration-500 uppercase tracking-[0.2em]">
                {isEn ? 'Send Message' : 'Invia Messaggio'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
