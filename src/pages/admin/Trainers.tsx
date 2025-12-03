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
  User,
  Star,
  BookOpen,
  Mail,
  Phone
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const Trainers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const trainers = [
    {
      id: 1,
      name: 'Dr. Ahmed Benali',
      email: 'ahmed.benali@bcos.com',
      phone: '+33 1 23 45 67 89',
      specialty: 'Sales Training',
      experience: '15 years',
      rating: 4.9,
      courses: 12,
      students: 450,
      status: 'Active',
      image: 'https://i.postimg.cc/TPBc4x45/Artboard-1.webp',
      bio: 'Expert en techniques de vente avec plus de 15 ans d\'expérience dans la formation commerciale.'
    },
    {
      id: 2,
      name: 'Marie Dubois',
      email: 'marie.dubois@bcos.com',
      phone: '+33 1 23 45 67 90',
      specialty: 'Management',
      experience: '12 years',
      rating: 4.8,
      courses: 8,
      students: 320,
      status: 'Active',
      image: 'https://i.postimg.cc/TPBc4x41/Artboard-1-copy.webp',
      bio: 'Spécialiste en management et développement des équipes, formatrice certifiée.'
    },
    {
      id: 3,
      name: 'Jean-Pierre Martin',
      email: 'jp.martin@bcos.com',
      phone: '+33 1 23 45 67 91',
      specialty: 'Procurement',
      experience: '20 years',
      rating: 4.7,
      courses: 6,
      students: 180,
      status: 'Active',
      image: 'https://i.postimg.cc/Gp4QKtqs/Artboard-1-copy-2.webp',
      bio: 'Expert en achats et approvisionnements, ancien directeur des achats dans une multinationale.'
    },
    {
      id: 4,
      name: 'Sophie Laurent',
      email: 'sophie.laurent@bcos.com',
      phone: '+33 1 23 45 67 92',
      specialty: 'Communication',
      experience: '10 years',
      rating: 4.9,
      courses: 10,
      students: 380,
      status: 'On Leave',
      image: 'https://i.postimg.cc/g01KTpT2/Artboard-1-copy-3.webp',
      bio: 'Formatrice en communication interpersonnelle et prise de parole en public.'
    },
  ];

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || trainer.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    return matchesSearch && matchesSpecialty;
  });

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case 'Sales Training': return 'bg-blue-100 text-blue-800';
      case 'Management': return 'bg-green-100 text-green-800';
      case 'Procurement': return 'bg-purple-100 text-purple-800';
      case 'Communication': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Trainers Management</h1>
            <p className="text-gray-600 mt-1">Manage your training team</p>
          </div>
          <div className="flex-shrink-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Trainer
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Trainer</DialogTitle>
                <DialogDescription>
                  Add a new trainer to your team.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Full Name" />
                  <Input placeholder="Email Address" type="email" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Phone Number" />
                  <select className="p-2 border rounded-md">
                    <option value="">Select Specialty</option>
                    <option value="sales">Sales Training</option>
                    <option value="management">Management</option>
                    <option value="procurement">Procurement</option>
                    <option value="communication">Communication</option>
                  </select>
                </div>
                <Input placeholder="Years of Experience" />
                <Textarea placeholder="Bio/Description" rows={3} />
                <Input placeholder="Profile Image URL" />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Add Trainer</Button>
                </div>
              </div>
            </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Trainers List</CardTitle>
            <CardDescription>Manage all trainers in your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search trainers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                className="px-3 py-2 border rounded-md"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="all">All Specialties</option>
                <option value="sales">Sales Training</option>
                <option value="management">Management</option>
                <option value="procurement">Procurement</option>
                <option value="communication">Communication</option>
              </select>
            </div>

            {/* Trainers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredTrainers.map((trainer) => (
                <Card key={trainer.id} className="hover:shadow-lg transition-shadow flex flex-col h-full">
                  <CardHeader className="text-center flex-shrink-0">
                    <div className="relative mx-auto mb-4 w-20 h-20">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                      <Badge className={`absolute -top-1 -right-1 text-xs ${getStatusColor(trainer.status)}`} variant="secondary">
                        {trainer.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-base lg:text-lg line-clamp-1">{trainer.name}</CardTitle>
                    <Badge className={getSpecialtyColor(trainer.specialty)} variant="secondary">
                      {trainer.specialty}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <p className="text-xs lg:text-sm text-gray-600 line-clamp-2">
                        {trainer.bio}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs lg:text-sm">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 mr-1" />
                          {trainer.rating}
                        </div>
                        <div className="text-gray-600 truncate">
                          {trainer.experience}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs lg:text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                          {trainer.courses}
                        </div>
                        <div className="flex items-center">
                          <User className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                          {trainer.students}
                        </div>
                      </div>

                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{trainer.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{trainer.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t flex space-x-2 mt-auto">
                      <Button variant="outline" size="sm" className="flex-1 text-xs lg:text-sm">
                        <Edit className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTrainers.length === 0 && (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No trainers found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Trainers;
