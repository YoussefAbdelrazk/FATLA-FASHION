'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDeleteSlider, useGetAllSliders, useToggleSliderVisibility } from '@/hooks/useSliders';
import { Slider } from '@/types/slider';
import { format } from 'date-fns';
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  Image as ImageIcon,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SlidersTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Slider>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedSlider, setSelectedSlider] = useState<Slider | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sliderToDelete, setSliderToDelete] = useState<Slider | null>(null);

  // React Query hooks
  const { data: sliders = [], isLoading, error } = useGetAllSliders('en');
  const deleteSliderMutation = useDeleteSlider();
  const toggleVisibilityMutation = useToggleSliderVisibility();

  // Debug logging
  console.log('SlidersTable - data:', sliders);
  console.log('SlidersTable - isLoading:', isLoading);
  console.log('SlidersTable - error:', error);

  const handleSort = (field: keyof Slider) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // const handleToggleVisibility = useCallback(
  //   (slider: Slider) => {
  //     toggleVisibilityMutation.mutate({
  //       id: slider.id,
  //       isVisible: !slider.isVisible,
  //       lang: 'en',
  //     });
  //   },
  //   [toggleVisibilityMutation],
  // );

  const handleShowDetails = (slider: Slider) => {
    setSelectedSlider(slider);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (slider: Slider) => {
    router.push(`/sliders/edit/${slider.id}`);
  };

  const handleDelete = (slider: Slider) => {
    setSliderToDelete(slider);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (sliderToDelete) {
      deleteSliderMutation.mutate(
        { id: sliderToDelete.id.toString(), lang: 'en' },
        {
          onSuccess: () => {
            setIsDeleteModalOpen(false);
            setSliderToDelete(null);
          },
        },
      );
    }
  };

  // Filter and sort sliders
  const filteredAndSortedSliders = sliders
    .filter(
      slider =>
        slider.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slider.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (slider.brandName &&
          typeof slider.brandName === 'string' &&
          slider.brandName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (slider.variantName &&
          typeof slider.variantName === 'string' &&
          slider.variantName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (slider.categoryName &&
          typeof slider.categoryName === 'string' &&
          slider.categoryName.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortDirection === 'asc'
          ? aValue === bValue
            ? 0
            : aValue
            ? -1
            : 1
          : aValue === bValue
          ? 0
          : aValue
          ? 1
          : -1;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

  const SortIcon = ({ field }: { field: keyof Slider }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className='w-4 h-4 ml-1' />
    ) : (
      <ChevronDown className='w-4 h-4 ml-1' />
    );
  };

  if (isLoading && sliders.length === 0) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-muted-foreground'>Loading sliders...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && sliders.length === 0) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <p className='text-destructive mb-2'>Error loading sliders</p>
            <p className='text-muted-foreground text-sm'>
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>Sliders Management</span>
            <Button onClick={() => router.push('/sliders/add')} className='flex items-center gap-2'>
              <Plus className='w-4 h-4' />
              Add New Slider
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className='mb-6'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Search sliders by name, brand, product, or category...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
          </div>

          {/* Table */}
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('id')}
                  >
                    <div className='flex items-center'>
                      ID
                      <SortIcon field='id' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('nameAr')}
                  >
                    <div className='flex items-center'>
                      Arabic Name
                      <SortIcon field='nameAr' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('nameEn')}
                  >
                    <div className='flex items-center'>
                      English Name
                      <SortIcon field='nameEn' />
                    </div>
                  </TableHead>
                  <TableHead>Arabic Image</TableHead>
                  <TableHead>English Image</TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('brandName')}
                  >
                    <div className='flex items-center'>
                      Brand Name
                      <SortIcon field='brandName' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('variantName')}
                  >
                    <div className='flex items-center'>
                      Product Name
                      <SortIcon field='variantName' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('categoryName')}
                  >
                    <div className='flex items-center'>
                      Category Name
                      <SortIcon field='categoryName' />
                    </div>
                  </TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedSliders.map(slider => (
                  <TableRow key={slider.id} className='hover:bg-muted/50'>
                    <TableCell className='font-mono text-sm'>{slider.id}</TableCell>
                    <TableCell>
                      <div className='max-w-[150px] truncate' title={slider.nameAr}>
                        {slider.nameAr}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='max-w-[150px] truncate' title={slider.nameEn}>
                        {slider.nameEn}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='w-16 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden'>
                        {slider.imageUrlAr ? (
                          <Image
                            src={slider.imageUrlAr}
                            alt='Arabic Image'
                            width={64}
                            height={48}
                            className='object-cover w-full h-full'
                          />
                        ) : (
                          <ImageIcon className='w-6 h-6 text-muted-foreground' />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='w-16 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden'>
                        {slider.imageUrlEn ? (
                          <Image
                            src={slider.imageUrlEn}
                            alt='English Image'
                            width={64}
                            height={48}
                            className='object-cover w-full h-full'
                          />
                        ) : (
                          <ImageIcon className='w-6 h-6 text-muted-foreground' />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant='secondary' className='font-normal'>
                        {slider.brandName || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline' className='font-normal'>
                        {slider.variantName || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline' className='font-normal'>
                        {slider.categoryName || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-2'>
                        <Switch
                          checked={slider.isVisible}
                          onCheckedChange={() => {}}
                          className='data-[state=checked]:bg-green-600'
                        />
                        <span className='text-sm text-muted-foreground'>
                          {slider.isVisible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => handleShowDetails(slider)}>
                            <Eye className='mr-2 h-4 w-4' />
                            Show Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(slider)}>
                            <Edit className='mr-2 h-4 w-4' />
                            Edit Slider
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(slider)}
                            className='text-red-600 focus:text-red-600'
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            Delete Slider
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {filteredAndSortedSliders.length === 0 && (
            <div className='text-center py-12'>
              <ImageIcon className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-semibold mb-2'>No sliders found</h3>
              <p className='text-muted-foreground mb-4'>
                {searchTerm
                  ? 'Try adjusting your search terms.'
                  : 'Get started by creating your first slider.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => router.push('/sliders/add')}>
                  <Plus className='w-4 h-4 mr-2' />
                  Create First Slider
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Slider Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>Slider Details</DialogTitle>
            <DialogDescription>Detailed information about the selected slider</DialogDescription>
          </DialogHeader>
          {selectedSlider && (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Arabic Content</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Arabic Name
                      </label>
                      <p className='text-lg font-semibold'>{selectedSlider.nameAr}</p>
                    </div>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Arabic Image
                      </label>
                      <div className='w-full h-32 bg-muted rounded-lg flex items-center justify-center overflow-hidden mt-2'>
                        {selectedSlider.imageUrlAr ? (
                          <Image
                            src={selectedSlider.imageUrlAr}
                            alt='Arabic Image'
                            width={400}
                            height={128}
                            className='object-cover w-full h-full'
                          />
                        ) : (
                          <ImageIcon className='w-12 h-12 text-muted-foreground' />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>English Content</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        English Name
                      </label>
                      <p className='text-lg font-semibold'>{selectedSlider.nameEn}</p>
                    </div>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        English Image
                      </label>
                      <div className='w-full h-32 bg-muted rounded-lg flex items-center justify-center overflow-hidden mt-2'>
                        {selectedSlider.imageUrlEn ? (
                          <Image
                            src={selectedSlider.imageUrlEn}
                            alt='English Image'
                            width={400}
                            height={128}
                            className='object-cover w-full h-full'
                          />
                        ) : (
                          <ImageIcon className='w-12 h-12 text-muted-foreground' />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>Brand Name</label>
                  <p className='text-lg font-semibold'>{selectedSlider.brandName || 'N/A'}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>Product Name</label>
                  <p className='text-lg font-semibold'>{selectedSlider.variantName || 'N/A'}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>Category Name</label>
                  <p className='text-lg font-semibold'>{selectedSlider.categoryName || 'N/A'}</p>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>
                    Visibility Status
                  </label>
                  <Badge variant={selectedSlider.isVisible ? 'default' : 'destructive'}>
                    {selectedSlider.isVisible ? 'Visible' : 'Hidden'}
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>Created At</label>
                  <p className='text-lg'>
                    {selectedSlider.createdAt
                      ? format(new Date(selectedSlider.createdAt), 'MMM dd, yyyy HH:mm')
                      : 'N/A'}
                  </p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>Created By</label>
                  <p className='text-lg'>{selectedSlider.createdBy}</p>
                </div>
              </div>

              <div className='flex space-x-2 pt-4'>
                <Button onClick={() => handleEdit(selectedSlider)} className='flex-1'>
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Slider
                </Button>
                <Button variant='outline' className='flex-1'>
                  <Eye className='w-4 h-4 mr-2' />
                  Preview Slider
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete slider <strong>{sliderToDelete?.nameEn}</strong>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
