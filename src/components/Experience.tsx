import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    year: "2023 - Present",
    title: "Senior Land Surveyor",
    company: "Precision Surveying Co.",
    description: "Leading complex surveying projects and mentoring junior surveyors."
  },
  {
    year: "2020 - 2023",
    title: "Project Surveyor",
    company: "Metro Development Group",
    description: "Managed large-scale construction surveys and site planning projects."
  },
  {
    year: "2017 - 2020",
    title: "Land Surveyor",
    company: "City Planning Department",
    description: "Conducted boundary and topographic surveys for urban development."
  },
  {
    year: "2015 - 2017",
    title: "Junior Surveyor",
    company: "Regional Survey Solutions",
    description: "Assisted in various surveying projects and learned advanced techniques."
  }
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4 md:px-8 bg-muted/30">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Experience</h2>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border" />
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} mb-8`}
            >
              <Card className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">{exp.year}</div>
                  <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                  <div className="text-primary mb-2">{exp.company}</div>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
