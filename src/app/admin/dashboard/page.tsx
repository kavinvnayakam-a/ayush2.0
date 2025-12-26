'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { collection, query, orderBy, getFirestore, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, ShieldCheck, Users, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useCollection } from '@/firebase/firestore/use-collection';


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

function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = useAuth();
  const firestore = getFirestore();

  const adminRoleRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'admin_roles', user.uid);
  }, [firestore, user]);

  const { data: adminRole, isLoading: isAdminLoading } = useDoc(adminRoleRef);
  
  const isHardcodedAdmin = user?.email === 'kavinvnayakam@gmail.com' || user?.email === 'mainadmin@shreevarma.org';
  const hasAdminRole = !!adminRole;
  const isAdmin = isHardcodedAdmin || hasAdminRole;

  const visitorPassesQuery = useMemoFirebase(() => {
      // Only run the query if the user is a confirmed admin
      if (!firestore || !isAdmin) return null;
      return query(collection(firestore, 'visitor_passes'), orderBy('registrationDate', 'desc'));
  }, [firestore, isAdmin]);


  const { data: visitorPasses, isLoading: isLoadingPasses, error } = useCollection<VisitorPass>(visitorPassesQuery);

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
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="rounded-[1.5rem] bg-white shadow-sm border-slate-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Total Enrollments</CardTitle>
                    <Ticket className="h-5 w-5 text-accent" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-black text-foreground">
                        {isLoadingPasses ? '...' : (visitorPasses?.length ?? 0)}
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">Free visitor passes registered</p>
                </CardContent>
            </Card>
        </div>


        <Card className="rounded-[2rem] bg-white shadow-xl shadow-slate-200/60">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary"/>
              <CardTitle className="text-2xl font-black tracking-tight text-foreground">Visitor Pass Registrations</CardTitle>
            </div>
            <CardDescription className="!mt-2 italic font-semibold">
              A list of all visitors who have registered for a free pass for the Arogya Expo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingPasses && (
                <div className="text-center py-20 text-muted-foreground font-bold">
                    <p>Loading visitor data...</p>
                </div>
            )}
            {error && <p className="text-destructive p-4 bg-destructive/10 rounded-lg">Error loading visitors: {error.message}</p>}
            {!isLoadingPasses && visitorPasses && (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-black uppercase text-xs tracking-wider">Name</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-wider">Email</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-wider">Mobile</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-wider">Location</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-wider">Registered On</TableHead>
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
                          {pass.registrationDate
                            ? format(new Date(pass.registrationDate.seconds * 1000), 'MMM d, yyyy h:mm a')
                            : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
             {!isLoadingPasses && (!visitorPasses || visitorPasses.length === 0) && (
                <div className="text-center py-20 text-muted-foreground">
                    <p className="font-bold mb-2">No Visitors Yet</p>
                    <p className="text-sm">No visitor passes have been registered.</p>
                </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
