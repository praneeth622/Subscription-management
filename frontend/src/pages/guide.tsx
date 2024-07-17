import React from 'react';
import Sidebar from '../components/navbarr';
import { Link, Menu, Search, Sheet } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ArtworksList } from '@/components/component/artworks-list';
const initialArtworks =[
  {
    id: 1,
    title: 'Serene Landscape',
    image: '/placeholder.svg',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    title: 'Vibrant Sunset',
    image: '/placeholder.svg',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    title: 'Cozy Cabin',
    image: '/placeholder.svg',
    timestamp: '8 hours ago'
  },
  {
    id: 4,
    title: 'Misty Mountains',
    image: '/placeholder.svg',
    timestamp: '12 hours ago'
  },
  {
    id: 5,
    title: 'Autumn Foliage',
    image: '/placeholder.svg',
    timestamp: '1 day ago'
  },
  {
    id: 6,
    title: 'Serene Lake',
    image: '/placeholder.svg',
    timestamp: '2 days ago'
  },
  {
    id: 7,
    title: 'Snowy Peaks',
    image: '/placeholder.svg',
    timestamp: '3 days ago'
  },
  {
    id: 8,
    title: 'Enchanted Forest',
    image: '/placeholder.svg',
    timestamp: '4 days ago'
  }
];
const Guide = () => {
  return (
    <div className='flex w-full'>
        <Sidebar />
        {/* <ArtworksList/> */}

     <div className="flex flex-col w-[80vw]">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Artworks </h1>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
            >
              {
                initialArtworks.length > 0 ? (
                  <ArtworksList artworksData={initialArtworks} />
                ) : <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  No Artwork Yet
                </h3>
                <p className="text-sm text-muted-foreground">
                  lets start creating your first artwork
                </p>
                <Button className="mt-4">Start Art</Button>
              </div>
              }
              
            </div>
          </main>
        </div>
  </div>
);
}
 

export default Guide;
