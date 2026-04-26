import heroImage from "../../assets/hero-image.png";
import { motion, useScroll, useTransform } from "motion/react";
import { Linkedin, Mail, ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRef } from "react";
import { Link } from "react-router";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#F1EFE8' }}>
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ 
          backgroundColor: 'rgba(241, 239, 232, 0.7)', 
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(15, 110, 86, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl tracking-tight" style={{ color: '#04342C', fontWeight: '600' }}>
              TIWANI
            </span>
            <motion.span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: '#D85A30' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <Link
            to="/waitlist"
            className="px-8 py-3 rounded-full text-sm flex items-center gap-2 shadow-lg"
            style={{ backgroundColor: '#D85A30', color: '#ffffff', fontWeight: '500' }}
          >
            Join waitlist
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#1D9E75' }}
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#0F6E56' }}
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            className="space-y-10"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{ backgroundColor: 'rgba(29, 158, 117, 0.15)', border: '1px solid rgba(29, 158, 117, 0.3)' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles size={16} style={{ color: '#1D9E75' }} />
                <span className="text-sm" style={{ color: '#0F6E56', fontWeight: '500' }}>
                  Launching 2026
                </span>
              </motion.div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8" style={{ 
                color: '#04342C', 
                lineHeight: '1',
                fontWeight: '700',
                letterSpacing: '-0.02em'
              }}>
                What if nothing had to give?
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-xl" 
              style={{ color: '#5F5E5A', lineHeight: '1.6' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              You coordinate everything. You plan for every outcome. You carry the weight of a world not built for your reality.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link
                to="/waitlist"
                className="px-10 py-5 rounded-full text-lg flex items-center gap-3 shadow-xl"
                style={{ backgroundColor: '#D85A30', color: '#ffffff', fontWeight: '500' }}
              >
                Join the waitlist
                <ArrowRight size={20} />
              </Link>
              <motion.button
                className="px-10 py-5 rounded-full text-lg"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#0F6E56',
                  border: '2px solid #0F6E56',
                  fontWeight: '500'
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 110, 86, 0.05)' }}
                whileTap={{ scale: 0.95 }}
              >
                Learn more
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <motion.div
                className="absolute -inset-4 rounded-[50px] opacity-40"
                style={{ background: 'linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)' }}
                animate={{ rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={heroImage}
                  alt="Serene moment"
                  className="w-full h-[650px] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Quote Section */}
      <section className="py-32 px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-16 rounded-[40px] text-center space-y-8" style={{ backgroundColor: '#ffffff' }}>
            <p className="text-3xl md:text-5xl" style={{ 
              color: '#04342C', 
              lineHeight: '1.3',
              fontWeight: '600'
            }}>
              "And somewhere along the way, your own life got smaller."
            </p>
            
            <div className="pt-8 space-y-4">
              <p className="text-xl" style={{ color: '#5F5E5A' }}>
                We see that. We are building something about it.
              </p>
            </div>
          </div>
        </motion.div>
      </section>


      {/* Visual Break */}
      <section className="py-32 px-6" style={{ backgroundColor: '#ffffff' }}>
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative rounded-[50px] overflow-hidden h-[600px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1556484687-30636164638b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxkaXZlcnNlJTIwaGFuZHMlMjB0b2dldGhlciUyMGRpZmZlcmVudCUyMGFnZXMlMjByYWNlcyUyMHVuaXR5fGVufDF8fHx8MTc3NjYyMTAwMnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Diverse hands together"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(15, 110, 86, 0.2)' }}
            >
              <div className="text-center space-y-6 px-6">
                <h3 className="text-4xl md:text-6xl" style={{ 
                  color: '#ffffff',
                  fontWeight: '700',
                  textShadow: '0 2px 20px rgba(0,0,0,0.2)'
                }}>
                  Stay connected. Stay whole.
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl" style={{
                color: '#04342C',
                lineHeight: '1.1',
                fontWeight: '700',
                letterSpacing: '-0.02em'
              }}>
                You are early
              </h2>

              <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: '#5F5E5A', lineHeight: '1.6' }}>
                That matters.
              </p>
            </div>
            
            <Link
              to="/waitlist"
              className="px-14 py-6 rounded-full text-xl flex items-center gap-3 mx-auto shadow-2xl"
              style={{ backgroundColor: '#D85A30', color: '#ffffff', fontWeight: '500' }}
            >
              Join the waitlist
              <ArrowRight size={24} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6" style={{ backgroundColor: '#04342C' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl" style={{ color: '#ffffff', fontWeight: '700' }}>TIWANI</span>
                <motion.span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: '#D85A30' }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <p className="text-lg" style={{ color: '#5F5E5A' }}>
                Life Continuity · Launching 2026
              </p>
            </div>
            
            <div className="flex flex-col md:items-end gap-6">
              <a 
                href="mailto:hello@tiwanilife.com" 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity text-lg"
                style={{ color: '#ffffff' }}
              >
                <Mail size={22} />
                <span>hello@tiwanilife.com</span>
              </a>
              
              <a 
                href="#" 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity text-lg"
                style={{ color: '#ffffff' }}
              >
                <Linkedin size={22} />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div className="pt-12 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <p className="text-center md:text-left" style={{ color: '#5F5E5A' }}>
              © 2026 TIWANI Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
