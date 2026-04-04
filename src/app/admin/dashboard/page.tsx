'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useMemoFirebase, useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, ShieldCheck, Users, Ticket, Download, Printer, HeartPulse, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useCollection } from '@/firebase/firestore/use-collection';
import * as XLSX from 'xlsx';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// --- Interfaces ---
interface VisitorPass {
  id: string;
  name: string;
  gender: string;
  number: string;
  mailId: string;
  location: string;
  registrationDate: {
    seconds: number;
    nanoseconds: number;
  };
}

interface WellnessRegistration {
  id: string;
  name: string;
  age: number;
  gender: string;
  locality: string;
  whatsappNumber: string;
  mailId: string;
  registrationDate: {
    seconds: number;
    nanoseconds: number;
  };
}

function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const [activeTab, setActiveTab] = useState('visitors');

  // RBAC Check via Firestore
  const adminRoleRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'admin_roles', user.uid);
  }, [firestore, user]);

  const { data: adminRole, isLoading: isAdminLoading } = useDoc(adminRoleRef);
  
  // Logic for your requested admins
  const isHardcodedAdmin = user?.email === 'kavinvnayakam@gmail.com' || user?.email === 'mainadmin@shreevarma.org';
  const hasAdminRole = !!adminRole;
  const isAdmin = isHardcodedAdmin || hasAdminRole;

  // --- Queries (Updated to ASCENDING as requested) ---
  const visitorPassesQuery = useMemoFirebase(() => {
      if (!firestore || !isAdmin) return null;
      // Note: If some documents are missing 'registrationDate', they will be excluded from results when using orderBy
      return query(collection(firestore, 'visitor_passes'), orderBy('registrationDate', 'asc'));
  }, [firestore, isAdmin]);

  const wellnessQuery = useMemoFirebase(() => {
      if (!firestore || !isAdmin) return null;
      return query(collection(firestore, 'wellness_registrations'), orderBy('registrationDate', 'asc'));
  }, [firestore, isAdmin]);

  const { data: visitorPasses, isLoading: isLoadingPasses, error: errorPasses } = useCollection<VisitorPass>(visitorPassesQuery);
  const { data: wellnessRegistrations, isLoading: isLoadingWellness, error: errorWellness } = useCollection<WellnessRegistration>(wellnessQuery);

  // --- Auth Guards ---
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/admin/login');
    }
  };
  
  // --- Handlers ---
  const handleExport = (formatType: 'csv' | 'xlsx') => {
    let dataToExport: any[] = [];
    let fileName = '';

    if (activeTab === 'visitors' && visitorPasses) {
        dataToExport = visitorPasses.map(pass => ({
            Name: pass.name,
            Gender: pass.gender || 'N/A',
            Email: pass.mailId,
            Mobile: pass.number,
            Location: pass.location,
            'Registered On': pass.registrationDate
                ? format(new Date(pass.registrationDate.seconds * 1000), 'MMM d, yyyy h:mm a')
                : 'N/A',
        }));
        fileName = 'visitor_passes';
    } else if (activeTab === 'wellness' && wellnessRegistrations) {
        dataToExport = wellnessRegistrations.map(reg => ({
            Name: reg.name,
            Age: reg.age,
            Gender: reg.gender || 'N/A',
            Locality: reg.locality,
            'WhatsApp Number': reg.whatsappNumber,
            'Mail ID': reg.mailId,
            'Registered On': reg.registrationDate
                ? format(new Date(reg.registrationDate.seconds * 1000), 'MMM d, yyyy h:mm a')
                : 'N/A',
        }));
        fileName = 'wellness_registrations';
    }

    if (dataToExport.length === 0) return;
    
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, activeTab === 'visitors' ? 'Visitors' : 'Wellness');
    XLSX.writeFile(workbook, `${fileName}.${formatType === 'xlsx' ? 'xlsx' : 'csv'}`, { bookType: formatType });
  };
  
  const handlePrint = () => window.print();

  if (isUserLoading || isAdminLoading) {
    return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                <p className="text-muted-foreground font-bold">Loading Dashboard...</p>
            </div>
        </div>
    );
  }
  
  if (!user) return null;

  if (!isAdmin) {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-red-50 text-red-700 p-4">
            <ShieldCheck className="w-16 h-16 mb-4"/>
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-center">You do not have permission to view this page.</p>
            <Button onClick={() => router.push('/admin/login')} variant="destructive" className="mt-8">Go to Login</Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 pt-24 sm:pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 no-print">
          <div>
              <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground font-bold italic">Welcome, {user.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="mt-4 sm:mt-0 bg-white shadow-sm font-bold">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </header>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 no-print">
            <Card className="rounded-[1.5rem] bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Visitor Passes</CardTitle>
                    <Ticket className="h-5 w-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-black">
                      {isLoadingPasses ? '...' : (visitorPasses?.length ?? 0)}
                    </div>
                    {errorPasses && <p className="text-xs text-destructive mt-2 font-bold">Query Error: {errorPasses.message}</p>}
                </CardContent>
            </Card>

            <Card className="rounded-[1.5rem] bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Wellness Program</CardTitle>
                    <HeartPulse className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-black">
                      {isLoadingWellness ? '...' : (wellnessRegistrations?.length ?? 0)}
                    </div>
                    {errorWellness && <p className="text-xs text-destructive mt-2 font-bold">Query Error: {errorWellness.message}</p>}
                </CardContent>
            </Card>
        </div>

        {/* Tab Selection & Actions */}
        <Tabs defaultValue="visitors" className="w-full no-print" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <TabsList className="bg-white border p-1 rounded-2xl">
              <TabsTrigger value="visitors" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                Visitor Passes
              </TabsTrigger>
              <TabsTrigger value="wellness" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                Wellness Program
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="font-bold bg-white" onClick={() => handleExport('csv')}><Download className="mr-2 h-4 w-4" /> CSV</Button>
                <Button variant="outline" size="sm" className="font-bold bg-white" onClick={() => handleExport('xlsx')}><Download className="mr-2 h-4 w-4" /> XLSX</Button>
                <Button variant="outline" size="sm" className="font-bold bg-white" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
            </div>
          </div>

          <TabsContent value="visitors">
             <DataTable 
                title="Visitor Pass Registrations" 
                data={visitorPasses} 
                loading={isLoadingPasses} 
                error={errorPasses}
                type="visitors" 
             />
          </TabsContent>

          <TabsContent value="wellness">
             <DataTable 
                title="Wellness Program Enrollments" 
                data={wellnessRegistrations} 
                loading={isLoadingWellness} 
                error={errorWellness}
                type="wellness" 
             />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Sub-component for Cleaner Table Management
function DataTable({ 
  title, 
  data, 
  loading, 
  error,
  type 
}: { 
  title: string, 
  data: any[] | null, 
  loading: boolean, 
  error: Error | null | undefined,
  type: 'visitors' | 'wellness' 
}) {
    if (error) {
      return (
        <Alert variant="destructive" className="rounded-[2rem] bg-white border-destructive/20 shadow-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-black uppercase">Query Error</AlertTitle>
          <AlertDescription className="font-semibold italic">
            Failed to load data from Firestore. This might be due to a missing index or permission rules.
            <br />
            <span className="text-xs opacity-70">Details: {error.message}</span>
          </AlertDescription>
        </Alert>
      );
    }

    return (
        <Card className="rounded-[2rem] bg-white shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-black uppercase">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="text-center py-20 font-bold text-muted-foreground">Loading records...</div>
                ) : !data || data.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="font-bold text-muted-foreground italic">No registration records found.</p>
                      <p className="text-xs text-muted-foreground/60 mt-2">Check the Firestore console to ensure the collection exists and contains documents with a 'registrationDate' field.</p>
                    </div>
                ) : (
                    <div className="border rounded-lg overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="font-black uppercase text-xs">Name</TableHead>
                                    <TableHead className="font-black uppercase text-xs">Gender</TableHead>
                                    <TableHead className="font-black uppercase text-xs">Email</TableHead>
                                    <TableHead className="font-black uppercase text-xs">{type === 'visitors' ? 'Mobile' : 'WhatsApp'}</TableHead>
                                    <TableHead className="font-black uppercase text-xs">{type === 'visitors' ? 'Location' : 'Locality'}</TableHead>
                                    <TableHead className="font-black uppercase text-xs">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.id} className="font-semibold">
                                        <TableCell className="font-bold">{row.name}</TableCell>
                                        <TableCell className="text-xs uppercase font-black text-primary/70">{row.gender || 'N/A'}</TableCell>
                                        <TableCell className="text-muted-foreground">{row.mailId}</TableCell>
                                        <TableCell className="text-muted-foreground">{type === 'visitors' ? row.number : row.whatsappNumber}</TableCell>
                                        <TableCell className="text-muted-foreground">{type === 'visitors' ? row.location : row.locality}</TableCell>
                                        <TableCell className="text-muted-foreground text-xs">
                                            {row.registrationDate ? format(new Date(row.registrationDate.seconds * 1000), 'MMM d, yyyy') : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default AdminDashboard;