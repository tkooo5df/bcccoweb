import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Consultation from "./pages/Consultation";
import IntraEnterprise from "./pages/IntraEnterprise";
import Formations from "./pages/Formations";
import Blog from "./pages/Blog";
import CourseDetail from "./pages/CourseDetail";
import TestCourseLinks from "./pages/TestCourseLinks";
import TestEnrollmentForm from "./pages/TestEnrollmentForm";
import TestCourseCreation from "./pages/TestCourseCreation";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Courses from "./pages/admin/Courses";
import CoursesFixed from "./pages/admin/CoursesFixed";
import Trainers from "./pages/admin/Trainers";
import References from "./pages/admin/References";
import Enrollments from "./pages/admin/Enrollments";
import GalleryManagement from "./pages/admin/GalleryManagement";
import Login from "./pages/admin/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Header />
              <Index />
            </>
          } />
          <Route path="/gallery" element={
            <>
              <Header />
              <Gallery />
            </>
          } />
          <Route path="/consultation" element={
            <>
              <Header />
              <Consultation />
            </>
          } />
          <Route path="/formations-intra" element={
            <>
              <Header />
              <IntraEnterprise />
            </>
          } />
          <Route path="/formations" element={
            <>
              <Header />
              <Formations />
            </>
          } />
          <Route path="/blog" element={
            <>
              <Header />
              <Blog />
            </>
          } />
          <Route path="/formation/:slug" element={
            <>
              <Header />
              <CourseDetail />
            </>
          } />
          <Route path="/test-course-links" element={
            <>
              <Header />
              <TestCourseLinks />
            </>
          } />
          <Route path="/test-enrollment-form" element={
            <>
              <Header />
              <TestEnrollmentForm />
            </>
          } />
          <Route path="/test-course-creation" element={
            <>
              <Header />
              <TestCourseCreation />
            </>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/courses" element={<CoursesFixed />} />
          <Route path="/admin/trainers" element={<Trainers />} />
          <Route path="/admin/references" element={<References />} />
          <Route path="/admin/enrollments" element={<Enrollments />} />
          <Route path="/admin/gallery" element={<GalleryManagement />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
