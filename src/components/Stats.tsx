import { useEffect, useRef, useState } from 'react';

interface StatItemProps {
  value: string;
  label: string;
  delay?: number;
  isGreen?: boolean;
}

const StatItem = ({ value, label, delay = 0, isGreen = false }: StatItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  // Extract number from value string
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const prefix = value.match(/^[^\d]*/)?.[0] || '';
  const suffix = value.match(/[^\d]*$/)?.[0] || '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, numericValue]);

  return (
    <div
      ref={ref}
      className={`rounded-2xl p-6 lg:p-8 text-center transform transition-smooth hover:scale-105 ${
        isGreen 
          ? 'bg-gradient-to-br from-bcos-lime to-[#a8d84a]' 
          : 'bg-gradient-to-br from-primary to-[#5ba3f5]'
      }`}
    >
      <div className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-2">
        {prefix}
        {isVisible ? count.toLocaleString('fr-FR') : '0'}
        {suffix}
      </div>
      <div className="text-sm lg:text-base font-medium text-white/90">
        {label}
      </div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { value: '+20000', label: 'formations et programmes', isGreen: true },
    { value: '+1100', label: 'entreprises nous ont fait confiance', isGreen: false },
    { value: '+700', label: 'entreprises clientes', isGreen: true },
    { value: '18', label: 'ans', isGreen: false },
  ];

  return (
    <section className="py-8 lg:py-12 relative overflow-hidden -mt-16 lg:-mt-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={index * 100}
              isGreen={stat.isGreen}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
