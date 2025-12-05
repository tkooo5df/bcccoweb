import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import { SupabaseService } from '@/lib/supabase';
import { 
  Search,
  Filter,
  Eye,
  Edit,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  Loader2,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';
import type { Enrollment } from '../../../supabase-config';

const EnrollmentsCRM = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const statusOptions = [
    { value: 'new', label: 'Nouveau', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
    { value: 'to_confirm', label: 'À confirmer', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { value: 'confirmed', label: 'Confirmé', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { value: 'cancelled', label: 'Annulé', color: 'bg-red-100 text-red-800', icon: XCircle },
  ];

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      const data = await SupabaseService.getEnrollments();
      setEnrollments(data || []);
    } catch (error: any) {
      console.error('Error loading enrollments:', error);
      toast.error('Erreur lors du chargement des inscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = enrollments;

    if (searchTerm) {
      filtered = filtered.filter(e =>
        e.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(e => e.status === statusFilter);
    }

    if (sourceFilter !== 'all') {
      filtered = filtered.filter(e => e.source === sourceFilter);
    }

    if (languageFilter !== 'all') {
      filtered = filtered.filter(e => e.language_preference === languageFilter);
    }

    setFilteredEnrollments(filtered);
  }, [enrollments, searchTerm, statusFilter, sourceFilter, languageFilter]);

  const handleViewDetails = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    setIsDetailsOpen(true);
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedEnrollment) return;

    try {
      setUpdating(true);
      await SupabaseService.updateEnrollmentStatus(selectedEnrollment.id, { status });
      toast.success('Statut mis à jour');
      loadEnrollments();
      setIsDetailsOpen(false);
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateNotes = async (notes: string) => {
    if (!selectedEnrollment) return;

    try {
      setUpdating(true);
      await SupabaseService.updateEnrollmentStatus(selectedEnrollment.id, { commercial_notes: notes });
      toast.success('Notes mises à jour');
      loadEnrollments();
    } catch (error: any) {
      console.error('Error updating notes:', error);
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const stats = {
    total: enrollments.length,
    new: enrollments.filter(e => e.status === 'new').length,
    to_confirm: enrollments.filter(e => e.status === 'to_confirm').length,
    confirmed: enrollments.filter(e => e.status === 'confirmed').length,
  };

  const getStatusConfig = (status: string) => {
    return statusOptions.find(opt => opt.value === status) || statusOptions[0];
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Chargement...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CRM - Inscriptions</h1>
          <p className="text-gray-600 mt-1">Gérez les inscriptions et le suivi commercial</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Nouveaux</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">À confirmer</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.to_confirm}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Confirmés</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Inscriptions</CardTitle>
            <CardDescription>
              {filteredEnrollments.length} inscription(s) trouvée(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {statusOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sources</SelectItem>
                  <SelectItem value="website">Site web</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Téléphone</SelectItem>
                </SelectContent>
              </Select>

              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les langues</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participant</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Langue</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnrollments.map((enrollment) => {
                    const statusConfig = getStatusConfig(enrollment.status);
                    const IconComponent = statusConfig.icon;

                    return (
                      <TableRow key={enrollment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{enrollment.full_name}</div>
                            {enrollment.company && (
                              <div className="text-sm text-gray-500">{enrollment.company}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {enrollment.formation_id || 'Formation supprimée'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="w-3 h-3 mr-1" />
                              {enrollment.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="w-3 h-3 mr-1" />
                              {enrollment.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig.color} variant="secondary">
                            <IconComponent className="w-3 h-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            {enrollment.language_preference === 'ar' ? 'عربي' : 'FR'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{formatDate(enrollment.enrollment_date)}</div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(enrollment)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {filteredEnrollments.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucune inscription trouvée</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedEnrollment && (
              <>
                <DialogHeader>
                  <DialogTitle>Détails de l'inscription</DialogTitle>
                  <DialogDescription>
                    {selectedEnrollment.full_name} - {formatDate(selectedEnrollment.enrollment_date)}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Contact Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations de contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div><strong>Nom:</strong> {selectedEnrollment.full_name}</div>
                      <div><strong>Email:</strong> {selectedEnrollment.email}</div>
                      <div><strong>Téléphone:</strong> {selectedEnrollment.phone}</div>
                      {selectedEnrollment.company && (
                        <div><strong>Entreprise:</strong> {selectedEnrollment.company}</div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Status Update */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Statut</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 flex-wrap">
                        {statusOptions.map(opt => (
                          <Button
                            key={opt.value}
                            variant={selectedEnrollment.status === opt.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleUpdateStatus(opt.value)}
                            disabled={updating}
                          >
                            {opt.label}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes commerciales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={selectedEnrollment.commercial_notes || ''}
                        onChange={(e) => handleUpdateNotes(e.target.value)}
                        placeholder="Ajoutez vos notes..."
                        rows={5}
                        onBlur={(e) => handleUpdateNotes(e.target.value)}
                      />
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default EnrollmentsCRM;


