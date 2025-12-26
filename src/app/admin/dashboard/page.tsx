'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { collection, query, orderBy, getFirestore } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, ShieldCheck, Users } from 'lucide-react';
import { format } from 'date-fns';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';

interface VisitorPass {
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
  
  const visitorPassesQuery = useMemoFirebase(() => {
      if (!firestore) return null;
      return query(collection(firestore, 'visitor_passes'), orderBy('registrationDate', 'desc'));
  }, [firestore]);


  const { data: visitorPasses, isLoading: isLoadingPasses, error } = useCollection<VisitorPass>(visitorPassesQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const isLoading = isUserLoading || isAdminLoading;

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><p>Loading dashboard...</p></div>;
  }
  
  if (!user) {
     return null;
  }

  if (!adminRole) {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-red-50 text-red-700 p-4">
            <ShieldCheck className="w-16 h-16 mb-4"/>
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-center">You do not have permission to view this page.</p>
            <Button onClick={handleLogout} variant="destructive" className="mt-8">
                <LogOut className="mr-2 h-4 w-4" /> Go to Login
            </Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className='text-center sm:text-left'>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {user.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="mt-4 sm:mt-0">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </header>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary"/>
              <CardTitle>Visitor Pass Registrations</CardTitle>
            </div>
            <CardDescription>
              A list of all visitors who have registered for a free pass.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingPasses && <p>Loading visitors...</p>}
            {error && <p className="text-destructive">Error loading visitors: {error.message}</p>}
            {!isLoadingPasses && visitorPasses && (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Registered On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visitorPasses.map((pass) => (
                      <TableRow key={pass.id}>
                        <TableCell className="font-medium">{pass.name}</TableCell>
                        <TableCell>{pass.mailId}</TableCell>
                        <TableCell>{pass.number}</TableCell>
                        <TableCell>{pass.location}</TableCell>
                        <TableCell>
                          {pass.registrationDate
                            ? format(new Date(pass.registrationDate.seconds * 1000), 'PPp')
                            : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
             {!isLoadingPasses && (!visitorPasses || visitorPasses.length === 0) && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No visitor passes have been registered yet.</p>
                </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
