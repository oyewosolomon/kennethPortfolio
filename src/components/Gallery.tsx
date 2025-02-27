import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
  "https://images.unsplash.com/photo-1489514354504-1653aa90e34e",
  "/images/image-2.jpg",
  "/images/image-3.jpg",
  "/images/image-3.jpg",
  "/images/image-4.jpg",
  "/images/image-5.jpg",
  "/images/image-6.jpg",
  "/images/image-7.jpg",
  "/images/image-8.jpg",
  "/images/image-9.jpg",
  "/images/image-10.jpg",
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { top } = container.getBoundingClientRect();
      if (top < window.innerHeight && top > -container.offsetHeight) {
        container.style.willChange = 'transform';
      } else {
        container.style.willChange = 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="py-20 px-4 md:px-8 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Project Gallery</h2>
      
      <motion.div
        style={{ y }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto"
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="aspect-[3/4] rounded-lg overflow-hidden"
          >
            <img
              src={src}
              alt={`Project ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
