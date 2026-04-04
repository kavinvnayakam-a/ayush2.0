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
import { LogOut, ShieldCheck, Users, Ticket, Download, Printer, HeartPulse } from 'lucide-react';
import { format } from 'date-fns';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useCollection } from '@/firebase/firestore/use-collection';
import * as XLSX from 'xlsx';
import Image from 'next/image';

interface VisitorPass {
  id: string;
  name: string;
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

  const adminRoleRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'admin_roles', user.uid);
  }, [firestore, user]);

  const { data: adminRole, isLoading: isAdminLoading } = useDoc(adminRoleRef);
  
  const isHardcodedAdmin = user?.email === 'kavinvnayakam@gmail.com' || user?.email === 'mainadmin@shreevarma.org';
  const hasAdminRole = !!adminRole;
  const isAdmin = isHardcodedAdmin || hasAdminRole;

  // Visitor Passes Query
  const visitorPassesQuery = useMemoFirebase(() => {
      if (!firestore || !isAdmin) return null;
      return query(collection(firestore, 'visitor_passes'), orderBy('registrationDate', 'desc'));
  }, [firestore, isAdmin]);

  // Wellness Registrations Query
  const wellnessQuery = useMemoFirebase(() => {
      if (!firestore || !isAdmin) return null;
      return query(collection(firestore, 'wellness_registrations'), orderBy('registrationDate', 'desc'));
  }, [firestore, isAdmin]);


  const { data: visitorPasses, isLoading: isLoadingPasses } = useCollection<VisitorPass>(visitorPassesQuery);
  const { data: wellnessRegistrations, isLoading: isLoadingWellness } = useCollection<WellnessRegistration>(wellnessQuery);

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
  
  const handleGoToLogin = () => {
    router.push('/admin/login');
  };

  const handleExport = (formatType: 'csv' | 'xlsx') => {
    let dataToExport: any[] = [];
    let fileName = '';

    if (activeTab === 'visitors' && visitorPasses) {
        dataToExport = visitorPasses.map(pass => ({
            Name: pass.name,
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

    const fileExtension = formatType === 'xlsx' ? 'xlsx' : 'csv';
    const finalFileName = `${fileName}.${fileExtension}`;

    XLSX.writeFile(workbook, finalFileName, { bookType: formatType });
  };
  
  const handlePrint = () => {
    window.print();
  };


  const isLoading = isUserLoading || isAdminLoading;


  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                <p className="text-muted-foreground font-bold">Loading Dashboard...</p>
            </div>
        </div>
    );
  }
  
  if (!user) {
     return null;
  }

  if (!isAdmin) {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-red-50 text-red-700 p-4">
            <ShieldCheck className="w-16 h-16 mb-4"/>
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-center">You do not have permission to view this page.</p>
            <Button onClick={handleGoToLogin} variant="destructive" className="mt-8">
                Go to Login
            </Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 pt-24 sm:pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 no-print">
          <div className='flex items-center gap-4 text-center sm:text-left'>
            <div>
                <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground font-bold italic">Welcome, {user.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="mt-4 sm:mt-0 bg-white shadow-sm font-bold">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </header>
        
        {/* This div is only for printing */}
        <div className="print-header hidden print:block mb-8">
            <Image 
                src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" 
                alt="AyushConclave Logo" 
                width={150} 
                height={50}
                className="mx-auto"
            />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 no-print">
            <Card className="rounded-[1.5rem] bg-white shadow-sm border-slate-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Visitor Passes</CardTitle>
                    <Ticket className="h-5 w-5 text-accent" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-black text-foreground">
                        {isLoadingPasses ? '...' : (visitorPasses?.length ?? 0)}
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">Free public registrations</p>
                </CardContent>
            </Card>

            <Card className="rounded-[1.5rem] bg-white shadow-sm border-slate-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Wellness Program</CardTitle>
                    <HeartPulse className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-black text-foreground">
                        {isLoadingWellness ? '...' : (wellnessRegistrations?.length ?? 0)}
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">Corporate wellness enrollments</p>
                </CardContent>
            </Card>
        </div>

        <Tabs defaultValue="visitors" className="w-full no-print" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <TabsList className="bg-white border p-1 rounded-2xl">
              <TabsTrigger value="visitors" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                Visitor Passes
              </TabsTrigger>
              <TabsTrigger value="wellness" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                Wellness Program
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="font-bold bg-white" onClick={() => handleExport('csv')}>
                    <Download className="mr-2 h-4 w-4" />
                    CSV
                </Button>
                <Button variant="outline" size="sm" className="font-bold bg-white" onClick={() => handleExport('xlsx')}>
                    <Download className="mr-2 h-4 w-4" />
                    XLSX
                </Button>
                <Button variant="outline" size="sm" className="font-bold bg-white" onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                </Button>
            </div>
          </div>

          <TabsContent value="visitors">
            <Card className="rounded-[2rem] bg-white shadow-xl shadow-slate-200/60 printable-area">
              <CardHeader>
                <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary"/>
                    <CardTitle className="text-2xl font-black tracking-tight text-foreground uppercase">Visitor Pass Registrations</CardTitle>
                </div>
                <CardDescription className="!mt-2 italic font-semibold">
                  List of all visitors who have registered for a free pass for the Arogya Expo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingPasses && <div className="text-center py-20 font-bold text-muted-foreground">Loading visitor data...</div>}
                {!isLoadingPasses && visitorPasses && (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="font-black uppercase text-xs tracking-wider">Name</TableHead>
                          <TableHead className="font-black uppercase text-xs tracking-wider">Email</TableHead>
                          <TableHead className="font-black uppercase text-xs tracking-wider">Mobile</TableHead>
                          <TableHead className="font-black uppercase text-xs tracking-wider">Location</TableHead>
                          <TableHead className="font-black uppercase text-xs tracking-wider">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {visitorPasses.map((pass) => (
                          <TableRow key={pass.id} className="font-semibold">
                            <TableCell className="font-bold text-foreground">{pass.name}</TableCell>
                            <TableCell className="text-muted-foreground">{pass.mailId}</TableCell>
                            <TableCell className="text-muted-foreground">{pass.number}</TableCell>
                            <TableCell className="text-muted-foreground">{pass.location}</TableCell>
                            <TableCell className="text-muted-foreground text-xs">
                              {pass.registrationDate ? format(new Date(pass.registrationDate.seconds * 1000), 'MMM d, yyyy p') : 'N/A'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                {!isLoadingPasses && visitorPasses?.length === 0 && <div className="text-center py-20 font-bold text-muted-foreground">No visitor registrations found.</div>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wellness">
            <Card className="rounded-[2rem] bg-white shadow-xl shadow-slate-200/60 printable-area">
              <CardHeader>
                <div className="flex items-center gap-3">
                    <HeartPulse className="w-6 h-6 text-primary"/>
                    <CardTitle className="text-2xl font-black tracking-tight text-foreground uppercase">Wellness Program Enrollments</CardTitle>
                </div>
                <CardDescription className="!mt-2 italic font-semibold">
                  Participants registered for the Corporate Wellness Program scheduled for April 12.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingWellness && <div className="text-center py-20 font-bold text-muted-foreground">Loading program data...</div>}
                {!isLoadingWellness && wellnessRegistrations && (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="font-black uppercase text-xs tracking-wider">Name</TableHead>
                          <TableHead className="font-black uppercase text-xs tracking-wider">Age</TableHead>
                          <TableHead className="font-black uppercase text-xs tracking-wider">Email</TableHead>
                          <TableHead className="font-black uppercase text-xs tracking-wider">WhatsApp</TableHead>
                          <TableHead className="font-black uppercase text-xs tracking-wider">Locality</TableHead>
                          <TableHead className="font-black uppercase text-xs tracking-wider">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {wellnessRegistrations.map((reg) => (
                          <TableRow key={reg.id} className="font-semibold">
                            <TableCell className="font-bold text-foreground">{reg.name}</TableCell>
                            <TableCell className="text-muted-foreground">{reg.age}</TableCell>
                            <TableCell className="text-muted-foreground">{reg.mailId}</TableCell>
                            <TableCell className="text-muted-foreground">{reg.whatsappNumber}</TableCell>
                            <TableCell className="text-muted-foreground">{reg.locality}</TableCell>
                            <TableCell className="text-muted-foreground text-xs">
                              {reg.registrationDate ? format(new Date(reg.registrationDate.seconds * 1000), 'MMM d, yyyy p') : 'N/A'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                {!isLoadingWellness && wellnessRegistrations?.length === 0 && <div className="text-center py-20 font-bold text-muted-foreground">No wellness program registrations found.</div>}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDashboard;
