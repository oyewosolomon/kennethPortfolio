import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="py-20 px-4 md:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <Card>
              <CardContent className="p-0">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
                  alt="Kenneth's profile"
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              With 8 years of experience in land surveying, I bring precision and expertise to every project. My commitment to accuracy and attention to detail has helped numerous clients achieve their construction and development goals.
            </p>
            <p className="text-lg text-muted-foreground">
              I specialize in topographic surveys, boundary surveys, and construction staking, utilizing the latest technology and methodologies to deliver exceptional results.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
