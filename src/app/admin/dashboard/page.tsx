'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useMemoFirebase, useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, ShieldCheck, Ticket, Download, Printer, HeartPulse, AlertCircle, ShieldPlus } from 'lucide-react';
import { format } from 'date-fns';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useCollection } from '@/firebase/firestore/use-collection';
import * as XLSX from 'xlsx';
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

// Added AYUSH 2.0 Interface
interface AyushRegistration {
  id: string;
  name: string;
  systemOfMedicine: string;
  working: string;
  mobile: string;
  email: string;
  areasOfInterest: string[];
  createdAt?: {
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

  // --- Queries ---
  const visitorPassesQuery = useMemoFirebase(() => {
      if (!firestore || !isAdmin) return null;
      return query(collection(firestore, 'visitor_passes'), orderBy('registrationDate', 'asc'));
  }, [firestore, isAdmin]);

  const wellnessQuery = useMemoFirebase(() => {
      if (!firestore || !isAdmin) return null;
      return query(collection(firestore, 'wellness_registrations'), orderBy('registrationDate', 'asc'));
  }, [firestore, isAdmin]);

  // Added AYUSH 2.0 Query
  const ayushQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return query(collection(firestore, 'ayush_registrations'), orderBy('createdAt', 'desc'));
  }, [firestore, isAdmin]);

  const { data: visitorPasses, isLoading: isLoadingPasses, error: errorPasses } = useCollection<VisitorPass>(visitorPassesQuery);
  const { data: wellnessRegistrations, isLoading: isLoadingWellness, error: errorWellness } = useCollection<WellnessRegistration>(wellnessQuery);
  // Fetch AYUSH data
  const { data: ayushRegistrations, isLoading: isLoadingAyush, error: errorAyush } = useCollection<AyushRegistration>(ayushQuery);

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
    } else if (activeTab === 'ayush' && ayushRegistrations) {
        // Handle export for AYUSH 2.0
        dataToExport = ayushRegistrations.map(reg => ({
            Name: reg.name,
            Email: reg.email,
            Mobile: reg.mobile,
            'Working At': reg.working,
            'System of Medicine': reg.systemOfMedicine,
            'Areas of Interest': reg.areasOfInterest?.join(', ') || 'N/A',
            'Registered On': reg.createdAt
                ? format(new Date(reg.createdAt.seconds * 1000), 'MMM d, yyyy h:mm a')
                : 'N/A',
        }));
        fileName = 'ayush_2.0_registrations';
    }

    if (dataToExport.length === 0) return;
    
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    const sheetName = activeTab === 'visitors' ? 'Visitors' : activeTab === 'wellness' ? 'Wellness' : 'AYUSH';
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 no-print">
            <Card className="rounded-[1.5rem] bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Visitor Passes</CardTitle>
                    <Ticket className="h-5 w-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-black">
                      {isLoadingPasses ? '...' : (visitorPasses?.length ?? 0)}
                    </div>
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
                </CardContent>
            </Card>

            <Card className="rounded-[1.5rem] bg-white shadow-sm border-[#2c5340]/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-bold uppercase text-[#2c5340] tracking-wider">AYUSH 2.0</CardTitle>
                    <ShieldPlus className="h-5 w-5 text-[#c4643c]" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-black text-[#2c5340]">
                      {isLoadingAyush ? '...' : (ayushRegistrations?.length ?? 0)}
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Tab Selection & Actions */}
        <Tabs defaultValue="visitors" className="w-full no-print" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 overflow-x-auto pb-2">
            <TabsList className="bg-white border p-1 rounded-2xl shrink-0">
              <TabsTrigger value="visitors" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                Visitor Passes
              </TabsTrigger>
              <TabsTrigger value="wellness" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                Wellness Program
              </TabsTrigger>
              <TabsTrigger value="ayush" className="rounded-xl px-6 font-bold data-[state=active]:bg-[#2c5340] data-[state=active]:text-white">
                AYUSH 2.0
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 shrink-0">
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

          <TabsContent value="ayush">
             <AyushDataTable 
                title="AYUSH 2.0 Registrations" 
                data={ayushRegistrations} 
                loading={isLoadingAyush} 
                error={errorAyush}
             />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Existing Sub-component
function DataTable({ title, data, loading, error, type }: { title: string, data: any[] | null, loading: boolean, error: Error | null | undefined, type: 'visitors' | 'wellness' }) {
    if (error) {
      return (
        <Alert variant="destructive" className="rounded-[2rem] bg-white border-destructive/20 shadow-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-black uppercase">Query Error</AlertTitle>
          <AlertDescription className="font-semibold italic">
            Failed to load data from Firestore.
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
                    <div className="text-center py-20 font-bold text-muted-foreground italic">No registration records found.</div>
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

// New Sub-component specifically for AYUSH 2.0 layout
function AyushDataTable({ title, data, loading, error }: { title: string, data: AyushRegistration[] | null, loading: boolean, error: Error | null | undefined }) {
    if (error) {
      return (
        <Alert variant="destructive" className="rounded-[2rem] bg-white border-destructive/20 shadow-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-black uppercase">Query Error</AlertTitle>
          <AlertDescription className="font-semibold italic">
            Failed to load AYUSH data from Firestore.
            <br />
            <span className="text-xs opacity-70">Details: {error.message}</span>
          </AlertDescription>
        </Alert>
      );
    }

    return (
        <Card className="rounded-[2rem] bg-white shadow-xl border-[#2c5340]/20">
            <CardHeader className="bg-[#f5f2eb] rounded-t-[2rem] border-b border-[#2c5340]/10 pb-6">
                <CardTitle className="text-2xl font-black uppercase text-[#2c5340]">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                {loading ? (
                    <div className="text-center py-20 font-bold text-muted-foreground">Loading records...</div>
                ) : !data || data.length === 0 ? (
                    <div className="text-center py-20 font-bold text-muted-foreground italic">No AYUSH registrations found yet.</div>
                ) : (
                    <div className="border border-slate-200 rounded-lg overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="font-black uppercase text-xs text-slate-500">Name / Contact</TableHead>
                                    <TableHead className="font-black uppercase text-xs text-slate-500">Institution</TableHead>
                                    <TableHead className="font-black uppercase text-xs text-slate-500">System</TableHead>
                                    <TableHead className="font-black uppercase text-xs text-slate-500">Interests</TableHead>
                                    <TableHead className="font-black uppercase text-xs text-slate-500">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-slate-100">
                                {data.map((row) => (
                                    <TableRow key={row.id} className="hover:bg-slate-50/50">
                                        <TableCell className="p-4">
                                            <p className="font-bold text-slate-800">{row.name}</p>
                                            <p className="text-xs font-medium text-slate-600 mt-1">{row.mobile}</p>
                                            <p className="text-xs text-slate-400">{row.email}</p>
                                        </TableCell>
                                        <TableCell className="p-4">
                                            <p className="text-sm font-medium text-slate-700">{row.working}</p>
                                        </TableCell>
                                        <TableCell className="p-4">
                                            <span className="px-3 py-1 bg-[#c4643c]/10 text-[#c4643c] text-xs font-bold rounded-full">
                                                {row.systemOfMedicine}
                                            </span>
                                        </TableCell>
                                        <TableCell className="p-4">
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {row.areasOfInterest?.map((interest, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">
                                                        {interest}
                                                    </span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-4 text-xs font-medium text-slate-500">
                                            {row.createdAt ? format(new Date(row.createdAt.seconds * 1000), 'MMM d, yyyy') : 'N/A'}
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