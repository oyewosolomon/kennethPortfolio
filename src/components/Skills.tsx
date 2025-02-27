import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const skills = [
  { name: "Land Surveying", level: 95 },
  { name: "GPS Technology", level: 90 },
  { name: "AutoCAD", level: 85 },
  { name: "GIS Mapping", level: 88 },
  { name: "Construction Staking", level: 92 },
  { name: "Boundary Surveys", level: 94 }
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4 md:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Skills</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress
                  value={skill.level}
                  className="h-2"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
