import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { 
  ArrowRight,
  Clock,
  Users,
  Star,
  Calendar,
  BookOpen,
  TrendingUp,
  Target,
  Briefcase,
  DollarSign,
  Truck,
  Heart,
  Monitor,
  Zap,
  PieChart,
  Award,
  Shield,
  MessageSquare,
  Lightbulb,
  User
} from 'lucide-react';
import { useFormations, useCategories, usePopularFormations } from '@/hooks/useSupabase';
import EnrollmentForm from '@/components/EnrollmentForm';

const Formations = () => {
  // Fetch data from Supabase
  const { formations: allFormations, loading: formationsLoading } = useFormations();
  const { formations: popularFormations, loading: popularLoading } = usePopularFormations();
  const { categories: supabaseCategories, loading: categoriesLoading } = useCategories();

  // Fallback categories with icons
  const categoryIcons: { [key: string]: any } = {
    'commercial': TrendingUp,
    'management': Target,
    'finance': PieChart,
    'logistique': Truck,
    'rh': Heart,
    'digital': Monitor,
    'soft-skills': Zap,
    'qualite': Award,
    'securite': Shield,
    'communication': MessageSquare,
    'innovation': Lightbulb,
    'gestion-projet': Briefcase,
    'developpement-personnel': User
  };

  const categories = supabaseCategories.length > 0 
    ? supabaseCategories.map(cat => ({
        id: cat.slug,
        name: cat.name,
        icon: categoryIcons[cat.slug] || BookOpen,
        color: cat.color
      }))
    : [
    { id: 'commercial', name: 'Commercial & Vente', icon: TrendingUp, color: '#253b74' },
    { id: 'management', name: 'Management & Leadership', icon: Target, color: '#253b74' },
    { id: 'finance', name: 'Finance & Comptabilité', icon: PieChart, color: '#253b74' },
    { id: 'logistique', name: 'Logistique & Supply Chain', icon: Truck, color: '#253b74' },
    { id: 'rh', name: 'Ressources Humaines', icon: Heart, color: '#253b74' },
    { id: 'digital', name: 'Digital & IA', icon: Monitor, color: '#253b74' },
    { id: 'soft-skills', name: 'Soft Skills', icon: Zap, color: '#253b74' },
    { id: 'qualite', name: 'Qualité & Certification', icon: Award, color: '#16a34a' },
    { id: 'securite', name: 'Sécurité & Environnement', icon: Shield, color: '#dc2626' },
    { id: 'communication', name: 'Communication & Relations', icon: MessageSquare, color: '#7c3aed' },
    { id: 'innovation', name: 'Innovation & Créativité', icon: Lightbulb, color: '#f59e0b' },
    { id: 'gestion-projet', name: 'Gestion de Projet', icon: Briefcase, color: '#0ea5e9' },
    { id: 'developpement-personnel', name: 'Développement Personnel', icon: User, color: '#ec4899' }
  ];

  // Use Supabase formations or fallback data
  const formations = allFormations.length > 0 
    ? allFormations.map(formation => ({
        id: parseInt(formation.id),
        title: formation.title,
        description: formation.description,
        category: formation.category?.slug || 'general',
        duration: formation.duration,
        level: formation.level,
        participants: formation.current_participants || 0,
        rating: formation.rating || 0,
        price: `€${formation.price}`,
        image: formation.image_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        objectives: formation.objectives || [],
        popular: formation.is_popular,
        slug: formation.slug
      }))
    : [
    // Commercial & Vente
    {
      id: 1,
      title: 'La vente par téléphone',
      description: 'Maîtrisez les techniques de closing à distance et développez votre portefeuille clients',
      category: 'commercial',
      duration: '3 jours',
      level: 'Intermédiaire',
      participants: 45,
      rating: 4.9,
      price: '€899',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Maîtriser les techniques de prospection téléphonique', 'Développer son argumentaire de vente', 'Gérer les objections clients'],
      popular: true
    },
    {
      id: 2,
      title: 'Techniques de prospection et closing',
      description: 'Développez votre portefeuille clients efficacement avec les meilleures techniques',
      category: 'commercial',
      duration: '3 jours',
      level: 'Débutant',
      participants: 67,
      rating: 4.8,
      price: '€799',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Identifier et qualifier les prospects', 'Maîtriser les techniques de closing', 'Construire une relation client durable']
    },
    {
      id: 3,
      title: 'Négociation commerciale avancée',
      description: 'Perfectionnez vos compétences en négociation pour maximiser vos résultats',
      category: 'commercial',
      duration: '2 jours',
      level: 'Avancé',
      participants: 32,
      rating: 4.9,
      price: '€1299',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Préparer efficacement ses négociations', 'Utiliser les leviers psychologiques', 'Conclure des accords gagnant-gagnant']
    },
    {
      id: 28,
      title: 'Relation client et fidélisation',
      description: 'Développez une relation client durable et profitable',
      category: 'commercial',
      duration: '2 jours',
      level: 'Intermédiaire',
      participants: 39,
      rating: 4.7,
      price: '€799',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Analyser la satisfaction client', 'Mettre en place un programme de fidélisation', 'Gérer les réclamations']
    },
    {
      id: 29,
      title: 'Vente consultative et solutions',
      description: 'Adoptez une approche conseil pour vendre des solutions complexes',
      category: 'commercial',
      duration: '3 jours',
      level: 'Avancé',
      participants: 24,
      rating: 4.8,
      price: '€1199',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Diagnostiquer les besoins complexes', 'Construire une proposition de valeur', 'Vendre en mode projet']
    },
    // Management & Leadership
    {
      id: 4,
      title: 'Leadership et management d\'équipe',
      description: 'Développez votre leadership pour motiver et fédérer vos équipes',
      category: 'management',
      duration: '4 jours',
      level: 'Intermédiaire',
      participants: 28,
      rating: 4.7,
      price: '€1599',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Développer son style de leadership', 'Motiver et fédérer son équipe', 'Gérer les conflits et les résistances'],
      popular: true
    },
    {
      id: 5,
      title: 'Gestion de projet agile',
      description: 'Maîtrisez les méthodologies agiles pour optimiser vos projets',
      category: 'management',
      duration: '3 jours',
      level: 'Intermédiaire',
      participants: 41,
      rating: 4.8,
      price: '€1199',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Comprendre les principes agiles', 'Utiliser Scrum et Kanban', 'Animer des équipes agiles']
    },
    {
      id: 26,
      title: 'Conduite du changement',
      description: 'Accompagnez efficacement les transformations organisationnelles',
      category: 'management',
      duration: '3 jours',
      level: 'Avancé',
      participants: 26,
      rating: 4.7,
      price: '€1399',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Diagnostiquer la résistance au changement', 'Élaborer un plan de conduite', 'Mobiliser les acteurs']
    },
    {
      id: 27,
      title: 'Délégation et autonomisation',
      description: 'Apprenez à déléguer efficacement pour développer vos équipes',
      category: 'management',
      duration: '2 jours',
      level: 'Intermédiaire',
      participants: 33,
      rating: 4.6,
      price: '€899',
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Identifier les tâches à déléguer', 'Accompagner la montée en compétences', 'Contrôler sans micro-manager']
    },
    // Finance & Comptabilité
    {
      id: 6,
      title: 'Analyse financière et budgétaire',
      description: 'Maîtrisez les outils d\'analyse financière pour piloter votre activité',
      category: 'finance',
      duration: '3 jours',
      level: 'Intermédiaire',
      participants: 23,
      rating: 4.6,
      price: '€1399',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Lire et analyser les états financiers', 'Construire un budget prévisionnel', 'Utiliser les ratios financiers']
    },
    {
      id: 7,
      title: 'Contrôle de gestion opérationnel',
      description: 'Optimisez la performance de votre organisation avec les outils de contrôle de gestion',
      category: 'finance',
      duration: '4 jours',
      level: 'Avancé',
      participants: 19,
      rating: 4.7,
      price: '€1699',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Mettre en place un système de contrôle', 'Analyser les écarts budgétaires', 'Optimiser la rentabilité']
    },
    {
      id: 24,
      title: 'Fiscalité des entreprises',
      description: 'Maîtrisez les obligations fiscales et optimisez votre fiscalité',
      category: 'finance',
      duration: '3 jours',
      level: 'Avancé',
      participants: 18,
      rating: 4.5,
      price: '€1499',
      image: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Connaître les obligations fiscales', 'Optimiser la charge fiscale', 'Gérer les contrôles fiscaux']
    },
    {
      id: 25,
      title: 'Trésorerie et financement',
      description: 'Gérez efficacement la trésorerie et les besoins de financement',
      category: 'finance',
      duration: '2 jours',
      level: 'Intermédiaire',
      participants: 24,
      rating: 4.6,
      price: '€999',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Prévoir les besoins de trésorerie', 'Négocier avec les banques', 'Optimiser les placements']
    },
    // Logistique & Supply Chain
    {
      id: 8,
      title: 'Gestion des achats & approvisionnements',
      description: 'Réduisez vos coûts et sécurisez votre supply chain',
      category: 'logistique',
      duration: '4 jours',
      level: 'Tous niveaux',
      participants: 35,
      rating: 4.8,
      price: '€1299',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Optimiser le processus achats', 'Négocier avec les fournisseurs', 'Gérer les risques supply chain'],
      popular: true
    },
    {
      id: 9,
      title: 'Techniques d\'inventaires physiques',
      description: 'Optimisez vos processus de contrôle et valorisation des stocks',
      category: 'logistique',
      duration: '2 jours',
      level: 'Avancé',
      participants: 22,
      rating: 4.7,
      price: '€699',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Organiser un inventaire physique', 'Analyser les écarts de stock', 'Optimiser la valorisation']
    },
    {
      id: 22,
      title: 'Transport et distribution',
      description: 'Optimisez vos opérations de transport et de livraison',
      category: 'logistique',
      duration: '3 jours',
      level: 'Intermédiaire',
      participants: 28,
      rating: 4.6,
      price: '€1099',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Planifier les tournées', 'Optimiser les coûts transport', 'Gérer la relation transporteurs']
    },
    {
      id: 23,
      title: 'Lean Manufacturing et amélioration continue',
      description: 'Éliminez les gaspillages et améliorez votre productivité',
      category: 'logistique',
      duration: '4 jours',
      level: 'Avancé',
      participants: 20,
      rating: 4.8,
      price: '€1599',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Appliquer les principes Lean', 'Mettre en place le 5S', 'Conduire des projets Kaizen']
    },
    // Digital & IA
    {
      id: 10,
      title: 'Intelligence Artificielle pour les entreprises',
      description: 'Découvrez comment l\'IA peut transformer votre business',
      category: 'digital',
      duration: '2 jours',
      level: 'Débutant',
      participants: 38,
      rating: 4.9,
      price: '€999',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Comprendre les enjeux de l\'IA', 'Identifier les cas d\'usage', 'Mettre en place une stratégie IA']
    },
    {
      id: 11,
      title: 'Transformation digitale',
      description: 'Accompagnez votre organisation dans sa transformation numérique',
      category: 'digital',
      duration: '3 jours',
      level: 'Intermédiaire',
      participants: 29,
      rating: 4.6,
      price: '€1199',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Élaborer une stratégie digitale', 'Conduire le changement', 'Mesurer la performance digitale']
    },
    {
      id: 12,
      title: 'Marketing Digital et Réseaux Sociaux',
      description: 'Maîtrisez les outils du marketing digital moderne',
      category: 'digital',
      duration: '3 jours',
      level: 'Intermédiaire',
      participants: 45,
      rating: 4.7,
      price: '€1099',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Créer une stratégie social media', 'Optimiser le ROI digital', 'Analyser les performances']
    },
    {
      id: 13,
      title: 'Cybersécurité pour les entreprises',
      description: 'Protégez votre organisation contre les cybermenaces',
      category: 'digital',
      duration: '2 jours',
      level: 'Avancé',
      participants: 25,
      rating: 4.8,
      price: '€1399',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Identifier les risques cyber', 'Mettre en place des protections', 'Gérer les incidents']
    },
    // Ressources Humaines
    {
      id: 14,
      title: 'Recrutement et sélection',
      description: 'Optimisez vos processus de recrutement pour attirer les meilleurs talents',
      category: 'rh',
      duration: '2 jours',
      level: 'Intermédiaire',
      participants: 32,
      rating: 4.6,
      price: '€899',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Définir les profils de poste', 'Conduire des entretiens efficaces', 'Évaluer les candidats']
    },
    {
      id: 15,
      title: 'Gestion des conflits en entreprise',
      description: 'Apprenez à gérer et résoudre les conflits au travail',
      category: 'rh',
      duration: '2 jours',
      level: 'Intermédiaire',
      participants: 28,
      rating: 4.7,
      price: '€799',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Identifier les sources de conflit', 'Techniques de médiation', 'Prévenir les conflits']
    },
    {
      id: 16,
      title: 'Formation des formateurs',
      description: 'Développez vos compétences pédagogiques et d\'animation',
      category: 'rh',
      duration: '3 jours',
      level: 'Tous niveaux',
      participants: 35,
      rating: 4.8,
      price: '€1199',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Concevoir un programme de formation', 'Animer avec impact', 'Évaluer les apprentissages']
    },
    {
      id: 17,
      title: 'Droit du travail et législation sociale',
      description: 'Maîtrisez le cadre juridique des relations de travail',
      category: 'rh',
      duration: '3 jours',
      level: 'Avancé',
      participants: 22,
      rating: 4.5,
      price: '€1299',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Connaître la législation', 'Gérer les procédures disciplinaires', 'Éviter les contentieux']
    },
    // Soft Skills
    {
      id: 18,
      title: 'Communication interpersonnelle',
      description: 'Améliorez votre communication pour des relations plus efficaces',
      category: 'soft-skills',
      duration: '2 jours',
      level: 'Tous niveaux',
      participants: 42,
      rating: 4.8,
      price: '€699',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Développer l\'écoute active', 'Gérer les émotions', 'Communiquer avec assertivité']
    },
    {
      id: 19,
      title: 'Gestion du stress et bien-être au travail',
      description: 'Apprenez à gérer le stress pour améliorer votre performance',
      category: 'soft-skills',
      duration: '2 jours',
      level: 'Tous niveaux',
      participants: 38,
      rating: 4.7,
      price: '€599',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Identifier les sources de stress', 'Techniques de relaxation', 'Équilibre vie pro/perso']
    },
    {
      id: 20,
      title: 'Créativité et innovation',
      description: 'Développez votre créativité pour innover dans votre travail',
      category: 'soft-skills',
      duration: '2 jours',
      level: 'Intermédiaire',
      participants: 30,
      rating: 4.6,
      price: '€799',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Stimuler la créativité', 'Méthodes d\'innovation', 'Mettre en œuvre des idées']
    },
    {
      id: 21,
      title: 'Prise de parole en public',
      description: 'Maîtrisez l\'art de la présentation et de la prise de parole',
      category: 'soft-skills',
      duration: '2 jours',
      level: 'Débutant',
      participants: 25,
      rating: 4.9,
      price: '€899',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      objectives: ['Vaincre le trac', 'Structurer son discours', 'Captiver son audience'],
      popular: true
    }
  ];

  // Use popular formations from Supabase or filter from all formations
  const displayPopularFormations = popularFormations.length > 0 
    ? popularFormations.map(formation => ({
        id: parseInt(formation.id),
        title: formation.title,
        description: formation.description,
        category: formation.category?.slug || 'general',
        duration: formation.duration,
        level: formation.level,
        participants: formation.current_participants || 0,
        rating: formation.rating || 0,
        price: `€${formation.price}`,
        image: formation.image_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        objectives: formation.objectives || [],
        popular: formation.is_popular,
        slug: formation.slug
      }))
    : formations.filter(formation => formation.popular);

  const getFormationsByCategory = (categoryId: string) => {
    return formations.filter(formation => formation.category === categoryId);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-blue-100 text-blue-800';
      case 'Avancé': return 'bg-purple-100 text-purple-800';
      case 'Tous niveaux': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden min-h-[70vh] flex items-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(37, 59, 116, 0.7)' }} />
          
          {/* Content */}
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6">
                Nos Formations
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Développez vos compétences avec nos formations expertes adaptées à vos besoins
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-4 shadow-lg">
                  Découvrir nos formations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Catalogue PDF
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Formations Carousel */}
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Formations populaires
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Nos formations les plus demandées
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Découvrez les formations qui ont le plus de succès auprès de nos clients
              </p>
            </div>

            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {displayPopularFormations.map((formation) => (
                  <CarouselItem key={formation.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card className="hover:shadow-lg transition-shadow h-full">
                      <div className="relative">
                        <img
                          src={formation.image}
                          alt={formation.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                          Populaire
                        </Badge>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getLevelColor(formation.level)} variant="secondary">
                            {formation.level}
                          </Badge>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm font-medium">{formation.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{formation.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {formation.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {formation.duration}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {formation.participants}
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold" style={{ color: '#253b74' }}>
                                {formation.price}
                              </span>
                              <Button size="sm" variant="outline" asChild>
                                <Link to={`/formation/${formation.slug || formation.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                  En savoir plus
                                </Link>
                              </Button>
                            </div>
                            <EnrollmentForm
                              courseId={formation.id}
                              courseTitle={formation.title}
                              coursePrice={formation.price}
                              courseCurrency={formation.currency}
                              trigger={
                                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                                  S'inscrire
                                </Button>
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-12 hidden lg:flex" />
              <CarouselNext className="-right-12 hidden lg:flex" />
            </Carousel>
          </div>
        </section>

        {/* Categories with Carousels */}
        {categories.map((category) => {
          const categoryFormations = getFormationsByCategory(category.id);
          
          if (categoryFormations.length === 0) return null;
          
          return (
            <section key={category.id} className="py-8 lg:py-12">
              <div className="container mx-auto px-4 lg:px-8">
                {/* Category Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }}>
                      <category.icon className="w-6 h-6" style={{ color: '#253b74' }} />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                      {category.name}
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    {categoryFormations.length} formation{categoryFormations.length > 1 ? 's' : ''} disponible{categoryFormations.length > 1 ? 's' : ''}
                  </p>
                  <Button variant="outline" className="mx-auto">
                    Voir tout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Category Carousel */}
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {categoryFormations.map((formation) => (
                      <CarouselItem key={formation.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                          <div className="relative">
                            <img
                              src={formation.image}
                              alt={formation.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            {formation.popular && (
                              <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                                Populaire
                              </Badge>
                            )}
                          </div>
                          <CardHeader className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className={getLevelColor(formation.level)} variant="secondary">
                                {formation.level}
                              </Badge>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                <span className="text-sm font-medium">{formation.rating}</span>
                              </div>
                            </div>
                            <CardTitle className="text-base lg:text-lg line-clamp-2">{formation.title}</CardTitle>
                            <CardDescription className="line-clamp-2 text-sm">
                              {formation.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0 mt-auto">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {formation.duration}
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {formation.participants}
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold" style={{ color: '#253b74' }}>
                                    {formation.price}
                                  </span>
                                  <Button size="sm" variant="outline" className="text-xs" asChild>
                                    <Link to={`/formation/${formation.slug || formation.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                      Détails
                                    </Link>
                                  </Button>
                                </div>
                                <EnrollmentForm
                                  courseId={formation.id}
                                  courseTitle={formation.title}
                                  coursePrice={formation.price}
                                  courseCurrency={formation.currency}
                                  trigger={
                                    <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full text-xs">
                                      S'inscrire
                                    </Button>
                                  }
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-12 hidden lg:flex" />
                  <CarouselNext className="-right-12 hidden lg:flex" />
                </Carousel>
              </div>
            </section>
          );
        })}

        {/* Overview Section */}
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Nos formations en chiffres
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Découvrez l'impact de nos programmes de formation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }}>
                    <BookOpen className="h-8 w-8" style={{ color: '#253b74' }} />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{formations.length}+</h3>
                  <p className="text-muted-foreground">Formations disponibles</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }}>
                    <Users className="h-8 w-8" style={{ color: '#253b74' }} />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">500+</h3>
                  <p className="text-muted-foreground">Participants formés</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }}>
                    <Star className="h-8 w-8" style={{ color: '#253b74' }} />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">4.8/5</h3>
                  <p className="text-muted-foreground">Note moyenne</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(37, 59, 116, 0.1)' }}>
                    <Briefcase className="h-8 w-8" style={{ color: '#253b74' }} />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{categories.length}</h3>
                  <p className="text-muted-foreground">Domaines d'expertise</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32" style={{ background: 'linear-gradient(135deg, rgba(37, 59, 116, 0.1) 0%, rgba(37, 59, 116, 0.05) 100%)' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
                Besoin d'une formation sur mesure ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Nos experts conçoivent des programmes personnalisés selon vos besoins spécifiques
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4">
                  Demander un devis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4">
                  Nous contacter
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Formations;
