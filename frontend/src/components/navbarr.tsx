import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import SubscriptionStatus from './SubscriptionStatus';
import { useState } from 'react';
import {
  Bell,
  Blocks,
  ChevronsRight,
  CircleUser,
  ExternalLink,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem,  BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';

const Sidebar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [open, SetOpen] = useState(true);

    return (
      <div className="w-[0vw]  sm:w-[20vw] h-[100vh]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-[100vh] flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">Arty</span>
              </Link>
              {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button> */}
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <button
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => navigate('/dashboard')}
                  >
                  <Home className="h-4 w-4" />
                  Dashboard
                </button>
                <button
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => navigate('/guide')}
                  >
                  <Blocks className="h-4 w-4"/>
                  {/* <ShoppingCart className="h-4 w-4" /> */}
                  My Arts
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </button>
                
                  <button
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => navigate('/friends')}
                  >
                  <Users className="h-4 w-4" />
                  Friends
                  </button>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LineChart className="h-4 w-4" />
                  Contests
                </Link>
              </nav>
            </div>
            
          <SubscriptionStatus />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {user && (
             <Card className='flex items-center justify-between p-4'>
             <span className="text-gray-700">{user.fullName}</span>
               <UserButton />
           </Card>
           
            )}
          </SignedIn>
            
          </div>
        </div>
 
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 md:hidden">
        <header className=" sticky top-0 z-30 flex h-14 w-[100vw] items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <ChevronsRight  className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <div className='flex flex-col'>
                <div className='flex items-center'>

              <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  {/* <Package2 className="h-5 w-5 transition-all group-hover:scale-110" /> */}
                  ART
                </Link>
                <p className="font-bold text-lg pl-1">Y</p>

                </div>
                <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <button
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => navigate('/dashboard')}
                  >
                  <Home className="h-4 w-4" />
                  Dashboard
                </button>
                <button
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => navigate('/guide')}
                  >
                  <Blocks className="h-4 w-4"/>
                  {/* <ShoppingCart className="h-4 w-4" /> */}
                  My Arts
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </button>
                
                  <button
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => navigate('/friends')}
                  >
                  <Users className="h-4 w-4" />
                  Friends
                  </button>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LineChart className="h-4 w-4" />
                  Contests
                </Link>
              </nav>
            </div>
              </div>
            {/* <div className="">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </div> */}
            </SheetContent>
          </Sheet>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {user && (
               <UserButton />
           
            )}
          </SignedIn>
        </header>
      </div>
      
      </div>
    
  );
};

export default Sidebar;
