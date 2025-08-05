'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  useDeleteSlider,
  useGetAllSliders,
  useToggleSliderVisibility,
  useUpdateSlider,
} from '@/hooks/useSliders';
import { SliderFormData, sliderFormSchema } from '@/lib/schemas/slider-schema';
import { validateImage } from '@/lib/utils';
import { Slider } from '@/types/slider';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  Eye,
  EyeOff,
  Image as ImageIcon,
  MoreHorizontal,
  Save,
  Search,
  Trash2,
  User,
} from 'lucide-react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

// Sample data for dropdowns - in real app, these would come from API
const brands = [
  { id: '1', name: 'Nike' },
  { id: '2', name: 'Adidas' },
  { id: '3', name: 'Puma' },
  { id: '4', name: 'Under Armour' },
  { id: '5', name: 'New Balance' },
];

const products = [
  { id: '1', name: 'Air Max 270' },
  { id: '2', name: 'Ultraboost 22' },
  { id: '3', name: 'RS-X 3Puzzle' },
  { id: '4', name: 'HOVR Phantom' },
  { id: '5', name: 'Fresh Foam 1080v12' },
];

const categories = [
  { id: '1', name: 'Shoes' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Accessories' },
  { id: '4', name: 'Sports Equipment' },
];

interface EditSliderFormProps {
  slider: Slider;
  onClose: () => void;
}

function EditSliderForm({ slider, onClose }: EditSliderFormProps) {
  const updateSliderMutation = useUpdateSlider();
  const [arImagePreview, setArImagePreview] = useState<string | null>(slider.arImage || null);
  const [enImagePreview, setEnImagePreview] = useState<string | null>(slider.enImage || null);
  const [arImageError, setArImageError] = useState<string | null>(null);
  const [enImageError, setEnImageError] = useState<string | null>(null);

  const form = useForm<SliderFormData>({
    resolver: zodResolver(sliderFormSchema),
    defaultValues: {
      arName: slider.arName,
      enName: slider.enName,
      arImage: slider.arImage,
      enImage: slider.enImage,
      brandName: slider.brandName || '',
      productName: slider.productName || '',
      categoryName: slider.categoryName || '',
      isVisible: slider.isVisible,
    },
  });

  const handleImageUpload = (field: 'arImage' | 'enImage', file: File) => {
    // Validate the image
    const validation = validateImage(file);

    if (!validation.isValid) {
      // Set error message
      if (field === 'arImage') {
        setArImageError(validation.error || 'Invalid image');
        setArImagePreview(null);
        form.setValue('arImage', '');
      } else {
        setEnImageError(validation.error || 'Invalid image');
        setEnImagePreview(null);
        form.setValue('enImage', '');
      }
      return;
    }

    // Clear any previous errors
    if (field === 'arImage') {
      setArImageError(null);
    } else {
      setEnImageError(null);
    }

    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      if (field === 'arImage') {
        setArImagePreview(result);
      } else {
        setEnImagePreview(result);
      }
      form.setValue(field, result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: SliderFormData) => {
    updateSliderMutation.mutate(
      { data: { ...data, id: slider.id }, lang: 'en' },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* Arabic Content Section */}
        <div className='space-y-6'>
          <h3 className='text-xl font-semibold border-b pb-2'>Arabic Content</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='arName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Arabic Name <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='أدخل الاسم بالعربية' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='arImage'
              render={() => (
                <FormItem>
                  <FormLabel>
                    Arabic Image <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <div className='space-y-2'>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload('arImage', file);
                          }
                        }}
                      />
                      {arImageError && <p className='text-sm text-red-500'>{arImageError}</p>}
                      {arImagePreview && (
                        <div className='w-32 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden'>
                          <Image
                            src={arImagePreview}
                            alt='Arabic Image Preview'
                            width={128}
                            height={96}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* English Content Section */}
        <div className='space-y-6'>
          <h3 className='text-xl font-semibold border-b pb-2'>English Content</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='enName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    English Name <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Enter name in English' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='enImage'
              render={() => (
                <FormItem>
                  <FormLabel>
                    English Image <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <div className='space-y-2'>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload('enImage', file);
                          }
                        }}
                      />
                      {enImageError && <p className='text-sm text-red-500'>{enImageError}</p>}
                      {enImagePreview && (
                        <div className='w-32 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden'>
                          <Image
                            src={enImagePreview}
                            alt='English Image Preview'
                            width={128}
                            height={96}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Optional Fields Section */}
        <div className='space-y-6'>
          <h3 className='text-xl font-semibold border-b pb-2'>Optional Information</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <FormField
              control={form.control}
              name='brandName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <Select
                    onValueChange={value => {
                      field.onChange(value);
                      // Auto-hide slider when brand is selected
                      if (value) {
                        form.setValue('isVisible', false);
                      }
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a brand' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand.id} value={brand.name}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='productName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <Select
                    onValueChange={value => {
                      field.onChange(value);
                      // Auto-hide slider when product is selected
                      if (value) {
                        form.setValue('isVisible', false);
                      }
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a product' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map(product => (
                        <SelectItem key={product.id} value={product.name}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoryName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <Select
                    onValueChange={value => {
                      field.onChange(value);
                      // Auto-hide slider when category is selected
                      if (value) {
                        form.setValue('isVisible', false);
                      }
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Visibility Section */}
        <div className='space-y-6'>
          <h3 className='text-xl font-semibold border-b pb-2'>Visibility Settings</h3>
          <FormField
            control={form.control}
            name='isVisible'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Make slider visible</FormLabel>
                  <div className='text-sm text-muted-foreground'>
                    Control whether this slider is visible to users
                  </div>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Save Button */}
        <div className='flex justify-end space-x-4 pt-8 border-t'>
          <Button type='button' variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' disabled={updateSliderMutation.isPending}>
            <Save className='w-4 h-4 mr-2' />
            {updateSliderMutation.isPending ? 'Updating...' : 'Update Slider'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function SlidersTable() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedSlider, setSelectedSlider] = useState<Slider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sliderToDelete, setSliderToDelete] = useState<Slider | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sliderToEdit, setSliderToEdit] = useState<Slider | null>(null);

  // React Query hooks
  const { data: sliders = [], isLoading, error } = useGetAllSliders('en');
  const deleteSliderMutation = useDeleteSlider();
  const toggleVisibilityMutation = useToggleSliderVisibility();

  const handleDeleteSlider = (slider: Slider) => {
    setSliderToDelete(slider);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (sliderToDelete) {
      deleteSliderMutation.mutate(
        { id: sliderToDelete.id, lang: 'en' },
        {
          onSuccess: () => {
            setIsDeleteModalOpen(false);
            setSliderToDelete(null);
          },
        },
      );
    }
  };

  const handleToggleVisibility = useCallback(
    (slider: Slider) => {
      toggleVisibilityMutation.mutate({
        id: slider.id,
        isVisible: !slider.isVisible,
        lang: 'en',
      });
    },
    [toggleVisibilityMutation],
  );

  const handleEditSlider = (slider: Slider) => {
    setSliderToEdit(slider);
    setIsEditModalOpen(true);
  };

  const columns: ColumnDef<Slider>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => (
          <div className='font-mono text-sm text-gray-600 dark:text-gray-400'>
            {row.getValue('id')}
          </div>
        ),
      },
      {
        accessorKey: 'arName',
        header: 'Arabic Name',
        cell: ({ row }) => (
          <div className='max-w-[150px] truncate' title={row.getValue('arName')}>
            <div className='font-medium text-gray-900 dark:text-white'>
              {row.getValue('arName')}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'enName',
        header: 'English Name',
        cell: ({ row }) => (
          <div className='max-w-[150px] truncate' title={row.getValue('enName')}>
            <div className='font-medium text-gray-900 dark:text-white'>
              {row.getValue('enName')}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'arImage',
        header: 'Arabic Image',
        cell: ({ row }) => {
          const image = row.getValue('arImage') as string;
          return (
            <div className='w-12 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden'>
              {image ? (
                <Image
                  src={image}
                  alt='Arabic Image'
                  width={48}
                  height={32}
                  className='object-cover w-full h-full'
                />
              ) : (
                <ImageIcon className='w-4 h-4 text-gray-400' />
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'enImage',
        header: 'English Image',
        cell: ({ row }) => {
          const image = row.getValue('enImage') as string;
          return (
            <div className='w-12 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden'>
              {image ? (
                <Image
                  src={image}
                  alt='English Image'
                  width={48}
                  height={32}
                  className='object-cover w-full h-full'
                />
              ) : (
                <ImageIcon className='w-4 h-4 text-gray-400' />
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'brandName',
        header: 'Brand Name',
        cell: ({ row }) => (
          <div className='font-medium text-gray-900 dark:text-white'>
            {row.getValue('brandName')}
          </div>
        ),
      },
      {
        accessorKey: 'productName',
        header: 'Product Name',
        cell: ({ row }) => (
          <div className='font-medium text-gray-900 dark:text-white'>
            {row.getValue('productName')}
          </div>
        ),
      },
      {
        accessorKey: 'categoryName',
        header: 'Category Name',
        cell: ({ row }) => (
          <div className='font-medium text-gray-900 dark:text-white'>
            {row.getValue('categoryName')}
          </div>
        ),
      },
      {
        accessorKey: 'isVisible',
        header: 'Visibility',
        cell: ({ row }) => {
          const isVisible = row.getValue('isVisible') as boolean;
          return (
            <div className='flex items-center space-x-2'>
              <Button
                variant={isVisible ? 'default' : 'outline'}
                size='sm'
                onClick={() => handleToggleVisibility(row.original)}
                className='h-8 px-3'
              >
                {isVisible ? (
                  <>
                    <Eye className='w-4 h-4 mr-1' />
                    Visible
                  </>
                ) : (
                  <>
                    <EyeOff className='w-4 h-4 mr-1' />
                    Hidden
                  </>
                )}
              </Button>
            </div>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
          const date = new Date(row.getValue('createdAt') as string);
          return (
            <div className='flex items-center space-x-2'>
              <Clock className='w-4 h-4 text-gray-500' />
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                {format(date, 'MMM dd, yyyy')}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'createdBy',
        header: 'Created By',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <User className='w-4 h-4 text-gray-500' />
            <span className='text-sm'>{row.getValue('createdBy')}</span>
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const slider = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedSlider(slider);
                    setIsModalOpen(true);
                  }}
                >
                  <Eye className='mr-2 h-4 w-4' />
                  Show Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEditSlider(slider)}>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit Slider
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDeleteSlider(slider)}
                  className='text-red-600'
                >
                  <Trash2 className='mr-2 h-4 w-4' />
                  Delete Slider
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleToggleVisibility],
  );

  const table = useReactTable({
    data: sliders as Slider[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Card>
          <CardContent className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
              <p className='text-muted-foreground'>Loading sliders...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-4'>
        <Card>
          <CardContent className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <p className='text-destructive mb-2'>Error loading sliders</p>
              <p className='text-muted-foreground text-sm'>
                {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>Sliders Management</span>
            <div className='flex items-center space-x-2'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  placeholder='Search sliders...'
                  value={(table.getColumn('enName')?.getFilterValue() as string) ?? ''}
                  onChange={event => table.getColumn('enName')?.setFilterValue(event.target.value)}
                  className='pl-10 w-64'
                />
              </div>
              <Button onClick={() => router.push('/sliders/single-slider')}>Add Slider</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <div className='max-h-[600px] overflow-x-auto'>
              <table className='w-full min-w-full'>
                <thead className='bg-gray-50 dark:bg-gray-800 sticky top-0 z-10'>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          className='px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800'
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={`flex items-center space-x-1 ${
                                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                              }`}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <ChevronUp className='w-4 h-4' />,
                                desc: <ChevronDown className='w-4 h-4' />,
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className='bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-700'>
                  {table.getRowModel().rows.map(row => (
                    <tr
                      key={row.id}
                      className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                    >
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className='px-3 py-4 whitespace-nowrap'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className='flex items-center justify-between space-x-2 py-4'>
            <div className='flex-1 text-sm text-gray-700 dark:text-gray-300'>
              Showing{' '}
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length,
              )}{' '}
              of {table.getFilteredRowModel().rows.length} results
            </div>
            <div className='flex items-center space-x-4'>
              {/* <div className='flex items-center space-x-2'>
                <span className='text-sm text-gray-700 dark:text-gray-300'>Rows per page:</span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={e => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className='border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <div className='flex items-center space-x-1'>
                  {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                    const pageIndex = table.getState().pagination.pageIndex;
                    const pageCount = table.getPageCount();
                    let startPage = Math.max(0, pageIndex - 2);
                    const endPage = Math.min(pageCount, startPage + 5);
                    if (endPage - startPage < 5) {
                      startPage = Math.max(0, endPage - 5);
                    }
                    return startPage + i;
                  }).map(pageIndex => (
                    <Button
                      key={pageIndex}
                      variant={
                        table.getState().pagination.pageIndex === pageIndex ? 'default' : 'outline'
                      }
                      size='sm'
                      onClick={() => table.setPageIndex(pageIndex)}
                      className='w-8 h-8 p-0'
                    >
                      {pageIndex + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slider Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                      <label className='text-sm font-medium text-gray-500'>Arabic Name</label>
                      <p className='text-lg font-semibold'>{selectedSlider.arName}</p>
                    </div>
                    <div>
                      <label className='text-sm font-medium text-gray-500'>Arabic Image</label>
                      <div className='w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden mt-2'>
                        {selectedSlider.arImage ? (
                          <Image
                            src={selectedSlider.arImage}
                            alt='Arabic Image'
                            width={400}
                            height={128}
                            className='object-cover w-full h-full'
                          />
                        ) : (
                          <ImageIcon className='w-12 h-12 text-gray-400' />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>English Content</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='text-sm font-medium text-gray-500'>English Name</label>
                      <p className='text-lg font-semibold'>{selectedSlider.enName}</p>
                    </div>
                    <div>
                      <label className='text-sm font-medium text-gray-500'>English Image</label>
                      <div className='w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden mt-2'>
                        {selectedSlider.enImage ? (
                          <Image
                            src={selectedSlider.enImage}
                            alt='English Image'
                            width={400}
                            height={128}
                            className='object-cover w-full h-full'
                          />
                        ) : (
                          <ImageIcon className='w-12 h-12 text-gray-400' />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Brand Name</label>
                  <p className='text-lg font-semibold'>{selectedSlider.brandName}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Product Name</label>
                  <p className='text-lg font-semibold'>{selectedSlider.productName}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Category Name</label>
                  <p className='text-lg font-semibold'>{selectedSlider.categoryName}</p>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Visibility Status</label>
                  <Badge
                    variant={selectedSlider.isVisible ? 'default' : 'destructive'}
                    className='capitalize'
                  >
                    {selectedSlider.isVisible ? 'Visible' : 'Hidden'}
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Created At</label>
                  <p className='text-lg'>
                    {format(new Date(selectedSlider.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Created By</label>
                  <p className='text-lg'>{selectedSlider.createdBy}</p>
                </div>
              </div>

              <div className='flex space-x-2 pt-4'>
                <Button className='flex-1'>
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

      {/* Edit Slider Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='max-w-5xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit Slider</DialogTitle>
            <DialogDescription>Update slider information and content</DialogDescription>
          </DialogHeader>
          {sliderToEdit && (
            <div className='py-4'>
              <EditSliderForm slider={sliderToEdit} onClose={() => setIsEditModalOpen(false)} />
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
              Are you sure you want to delete slider <strong>{sliderToDelete?.enName}</strong>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
