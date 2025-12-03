import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight,
  Calendar,
  Clock,
  User,
  Search,
  TrendingUp,
  BookOpen,
  Users,
  Lightbulb,
  Target,
  Briefcase,
  Heart,
  Monitor,
  Eye,
  MessageCircle,
  Share2,
  Award,
  Shield,
  MessageSquare
} from 'lucide-react';
import { useBlogArticles, useBlogCategories, useFeaturedBlogArticles } from '@/hooks/useSupabase';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Fetch data from Supabase
  const { articles: allArticles, loading: articlesLoading } = useBlogArticles();
  const { categories: blogCategories, loading: categoriesLoading } = useBlogCategories();
  const { articles: featuredArticles, loading: featuredLoading } = useFeaturedBlogArticles();

  // Fallback categories with icons
  const categoryIcons: { [key: string]: any } = {
    'management': Target,
    'commercial': TrendingUp,
    'digital': Monitor,
    'rh': Heart,
    'conseils': Lightbulb,
    'qualite': Award,
    'securite': Shield,
    'communication': MessageSquare,
    'innovation': Lightbulb,
    'gestion-projet': Briefcase,
    'developpement-personnel': User,
    'all': BookOpen
  };

  // Transform Supabase categories to include icons and counts
  const categories = useMemo(() => {
    const transformedCategories = blogCategories.map(cat => ({
      id: cat.slug,
      name: cat.name,
      icon: categoryIcons[cat.slug] || BookOpen,
      count: allArticles.filter(article => article.category?.slug === cat.slug).length
    }));

    return [
      { id: 'all', name: 'Tous les articles', icon: BookOpen, count: allArticles.length },
      ...transformedCategories
    ];
  }, [blogCategories, allArticles]);

  // Fallback articles for when Supabase data is not available
  const fallbackArticles = [
    {
      id: 1,
      title: 'Les 10 compétences clés du manager de demain',
      excerpt: 'Découvrez les compétences essentielles que tout manager doit développer pour réussir dans un monde en constante évolution.',
      content: 'Le management évolue rapidement avec les nouvelles technologies et les changements sociétaux...',
      category: 'management',
      author: 'Dr. Ahmed Benali',
      authorImage: 'https://i.postimg.cc/TPBc4x45/Artboard-1.webp',
      publishDate: '2024-01-15',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 1250,
      comments: 23,
      featured: true,
      tags: ['Leadership', 'Management', 'Compétences']
    },
    {
      id: 2,
      title: 'Comment optimiser votre processus de vente en 2024',
      excerpt: 'Les techniques de vente évoluent. Découvrez comment adapter votre approche commerciale aux nouvelles attentes clients.',
      content: 'La vente moderne nécessite une approche plus consultative et personnalisée...',
      category: 'commercial',
      author: 'Marie Dubois',
      authorImage: 'https://i.postimg.cc/TPBc4x41/Artboard-1-copy.webp',
      publishDate: '2024-01-12',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 980,
      comments: 15,
      featured: true,
      tags: ['Vente', 'Commercial', 'Stratégie']
    }
  ];

  // Use Supabase articles or fallback
  const articles = allArticles.length > 0 ? allArticles.map(article => ({
    id: parseInt(article.id),
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category?.slug || 'general',
    author: article.author?.full_name || 'Auteur',
    authorImage: article.author?.avatar_url || 'https://i.postimg.cc/TPBc4x45/Artboard-1.webp',
    publishDate: new Date(article.published_at || article.created_at).toISOString().split('T')[0],
    readTime: `${article.read_time} min`,
    image: article.image_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    views: article.views,
    comments: article.comments_count,
    featured: article.is_featured,
    tags: article.tags || []
  })) : fallbackArticles;

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Use featured articles from Supabase or filter from all articles
  const displayFeaturedArticles = featuredArticles.length > 0 
    ? featuredArticles.map(article => ({
        id: parseInt(article.id),
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category?.slug || 'general',
        author: article.author?.full_name || 'Auteur',
        authorImage: article.author?.avatar_url || 'https://i.postimg.cc/TPBc4x45/Artboard-1.webp',
        publishDate: new Date(article.published_at || article.created_at).toISOString().split('T')[0],
        readTime: `${article.read_time} min`,
        image: article.image_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        views: article.views,
        comments: article.comments_count,
        featured: article.is_featured,
        tags: article.tags || []
      }))
    : articles.filter(article => article.featured);

  const recentArticles = articles.slice(0, 4);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'management': return 'bg-blue-100 text-blue-800';
      case 'commercial': return 'bg-green-100 text-green-800';
      case 'digital': return 'bg-purple-100 text-purple-800';
      case 'rh': return 'bg-pink-100 text-pink-800';
      case 'conseils': return 'bg-yellow-100 text-yellow-800';
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
              backgroundImage: `url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(37, 59, 116, 0.7)' }} />
          
          {/* Content */}
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6">
                Blog BCOS
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Découvrez nos conseils d'experts, tendances et bonnes pratiques pour développer vos compétences
              </p>
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-3 bg-white/90 border-white/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Articles à la une
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Nos derniers articles
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Restez informé des dernières tendances et bonnes pratiques
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {displayFeaturedArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                      À la une
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getCategoryColor(article.category)} variant="secondary">
                        {categories.find(cat => cat.id === article.category)?.name}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {article.views}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {article.comments}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-3 line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3 mb-4">
                      {article.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={article.authorImage}
                          alt={article.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{article.author}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {article.publishDate}
                            <Clock className="w-3 h-3 ml-2 mr-1" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Lire plus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Explorez par catégorie
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Trouvez les articles qui vous intéressent selon vos domaines d'expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {categories.filter(cat => cat.id !== 'all').map((category) => (
                <Card 
                  key={category.id} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    selectedCategory === category.id ? 'ring-2 ring-accent' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <category.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{category.name}</h3>
                    <p className="text-muted-foreground">{category.count} articles</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 ${
                    selectedCategory === category.id 
                      ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {article.featured && (
                      <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                        À la une
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getCategoryColor(article.category)} variant="secondary">
                        {categories.find(cat => cat.id === article.category)?.name}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500 space-x-2">
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {article.views}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          {article.comments}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 mb-3">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3 mb-4">
                      {article.excerpt}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={article.authorImage}
                          alt={article.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-xs font-medium">{article.author}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {article.publishDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          Lire
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-500">Aucun article trouvé pour cette recherche.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 lg:py-32" style={{ background: 'linear-gradient(135deg, rgba(37, 59, 116, 0.1) 0%, rgba(37, 59, 116, 0.05) 100%)' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
                Restez informé de nos derniers articles
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Recevez nos conseils d'experts directement dans votre boîte mail
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  placeholder="Votre adresse email"
                  type="email"
                  className="flex-1"
                />
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                  S'abonner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
