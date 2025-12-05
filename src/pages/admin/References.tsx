import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Building,
  Star,
  Globe,
  Calendar,
  Users
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const References = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const references = [
    {
      id: 1,
      companyName: 'Société Générale',
      logo: 'https://via.placeholder.com/100x60/0052CC/FFFFFF?text=SG',
      category: 'Banking',
      description: 'Formation en techniques de vente et relation client pour 150 collaborateurs',
      website: 'https://www.societegenerale.com',
      contactPerson: 'Marie Dubois',
      email: 'marie.dubois@sg.com',
      phone: '+33 1 42 14 20 00',
      projectDate: '2024-01-15',
      duration: '6 mois',
      participants: 150,
      rating: 4.9,
      status: 'Completed',
      testimonial: 'Excellente formation qui a permis d\'améliorer significativement nos performances commerciales.'
    },
    {
      id: 2,
      companyName: 'Orange Business',
      logo: 'https://via.placeholder.com/100x60/FF6600/FFFFFF?text=Orange',
      category: 'Telecommunications',
      description: 'Programme de formation en management et leadership pour les équipes dirigeantes',
      website: 'https://www.orange-business.com',
      contactPerson: 'Jean-Pierre Martin',
      email: 'jp.martin@orange.com',
      phone: '+33 1 44 44 22 22',
      projectDate: '2023-11-20',
      duration: '4 mois',
      participants: 85,
      rating: 4.8,
      status: 'Completed',
      testimonial: 'Formation très professionnelle avec des résultats concrets sur le terrain.'
    },
    {
      id: 3,
      companyName: 'Carrefour',
      logo: 'https://via.placeholder.com/100x60/0066CC/FFFFFF?text=Carrefour',
      category: 'Retail',
      description: 'Formation en gestion des stocks et optimisation des approvisionnements',
      website: 'https://www.carrefour.fr',
      contactPerson: 'Sophie Laurent',
      email: 'sophie.laurent@carrefour.com',
      phone: '+33 1 58 47 90 00',
      projectDate: '2024-03-01',
      duration: '3 mois',
      participants: 200,
      rating: 4.7,
      status: 'In Progress',
      testimonial: 'Approche très pratique et adaptée à nos besoins spécifiques.'
    },
    {
      id: 4,
      companyName: 'Renault Group',
      logo: 'https://via.placeholder.com/100x60/FFCC00/000000?text=Renault',
      category: 'Automotive',
      description: 'Formation en négociation commerciale pour les équipes de vente',
      website: 'https://www.renaultgroup.com',
      contactPerson: 'Ahmed Benali',
      email: 'ahmed.benali@renault.com',
      phone: '+33 1 76 84 04 04',
      projectDate: '2024-02-10',
      duration: '5 mois',
      participants: 120,
      rating: 4.9,
      status: 'Completed',
      testimonial: 'Formation exceptionnelle qui a transformé notre approche commerciale.'
    }
  ];

  const filteredReferences = references.filter(reference => {
    const matchesSearch = reference.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reference.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || reference.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Banking': return 'bg-blue-100 text-blue-800';
      case 'Telecommunications': return 'bg-orange-100 text-orange-800';
      case 'Retail': return 'bg-green-100 text-green-800';
      case 'Automotive': return 'bg-yellow-100 text-yellow-800';
      case 'Technology': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">References Management</h1>
            <p className="text-gray-600 mt-1">Manage client references and testimonials</p>
          </div>
          <div className="flex-shrink-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reference
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Reference</DialogTitle>
                  <DialogDescription>
                    Add a new client reference to showcase your success stories.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Company Name" />
                    <select className="p-2 border rounded-md">
                      <option value="">Select Category</option>
                      <option value="banking">Banking</option>
                      <option value="telecommunications">Telecommunications</option>
                      <option value="retail">Retail</option>
                      <option value="automotive">Automotive</option>
                      <option value="technology">Technology</option>
                    </select>
                  </div>
                  <Textarea placeholder="Project Description" rows={3} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Website URL" />
                    <Input placeholder="Logo URL" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Contact Person" />
                    <Input placeholder="Email" type="email" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="Phone" />
                    <Input placeholder="Duration" />
                    <Input placeholder="Participants" type="number" />
                  </div>
                  <Input type="date" placeholder="Project Date" />
                  <Textarea placeholder="Client Testimonial" rows={3} />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="p-2 border rounded-md">
                      <option value="">Project Status</option>
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                    </select>
                    <select className="p-2 border rounded-md">
                      <option value="">Rating</option>
                      <option value="5">5 Stars</option>
                      <option value="4.9">4.9 Stars</option>
                      <option value="4.8">4.8 Stars</option>
                      <option value="4.7">4.7 Stars</option>
                      <option value="4.5">4.5 Stars</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Add Reference</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Client References</CardTitle>
            <CardDescription>Manage all client references and success stories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search references..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                className="px-3 py-2 border rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="banking">Banking</option>
                <option value="telecommunications">Telecommunications</option>
                <option value="retail">Retail</option>
                <option value="automotive">Automotive</option>
                <option value="technology">Technology</option>
              </select>
            </div>

            {/* References Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReferences.map((reference) => (
                <Card key={reference.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={reference.logo}
                          alt={`${reference.companyName} logo`}
                          className="w-16 h-10 object-contain bg-gray-50 rounded border"
                        />
                        <div>
                          <CardTitle className="text-lg">{reference.companyName}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getCategoryColor(reference.category)} variant="secondary">
                              {reference.category}
                            </Badge>
                            <Badge className={getStatusColor(reference.status)} variant="secondary">
                              {reference.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span className="text-sm font-medium">{reference.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {reference.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{reference.projectDate}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{reference.participants} participants</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p><strong>Duration:</strong> {reference.duration}</p>
                        <p><strong>Contact:</strong> {reference.contactPerson}</p>
                        <p><strong>Email:</strong> {reference.email}</p>
                        <p><strong>Phone:</strong> {reference.phone}</p>
                      </div>

                      {reference.testimonial && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm italic text-gray-700">
                            "{reference.testimonial}"
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-2">
                          {reference.website && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={reference.website} target="_blank" rel="noopener noreferrer">
                                <Globe className="w-4 h-4 mr-1" />
                                Website
                              </a>
                            </Button>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReferences.length === 0 && (
              <div className="text-center py-8">
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No references found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{references.length}</p>
                  <p className="text-sm text-gray-600">Total References</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{references.reduce((sum, ref) => sum + ref.participants, 0)}</p>
                  <p className="text-sm text-gray-600">Total Participants</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {(references.reduce((sum, ref) => sum + ref.rating, 0) / references.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{references.filter(ref => ref.status === 'Completed').length}</p>
                  <p className="text-sm text-gray-600">Completed Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default References;




