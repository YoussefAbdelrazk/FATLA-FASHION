'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/types/product';
import {
  Building,
  Edit,
  Eye,
  MoreHorizontal,
  Package,
  Power,
  PowerOff,
  Tag,
  Trash2,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setDeletingId(id);
      // TODO: Implement delete API call
      setTimeout(() => setDeletingId(null), 1000);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    // TODO: Implement toggle active API call
    console.log(`Toggling product ${id} to ${!currentStatus}`);
  };

  const handleShowDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      handleDelete(productToDelete.id);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const getTotalQuantity = (variants: Product['variants']) => {
    return variants.reduce((total, variant) => total + variant.currentQty, 0);
  };

  const getMinPrice = (variants: Product['variants']) => {
    return Math.min(...variants.map(v => v.salePrice));
  };

  const getMaxPrice = (variants: Product['variants']) => {
    return Math.max(...variants.map(v => v.salePrice));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-16'>ID</TableHead>
              <TableHead className='w-20'>Image</TableHead>
              <TableHead>Arabic Name</TableHead>
              <TableHead>English Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className='w-24'>Qty</TableHead>
              <TableHead className='w-24'>Price</TableHead>
              <TableHead className='w-24'>Status</TableHead>
              <TableHead className='w-32'>Created</TableHead>
              <TableHead className='w-16 text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell className='font-mono text-sm'>{product.id}</TableCell>
                <TableCell>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src={product.mainImage} alt={product.enName} />
                    <AvatarFallback>{product.enName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className='max-w-32 truncate' title={product.arName}>
                  {product.arName}
                </TableCell>
                <TableCell className='max-w-32 truncate' title={product.enName}>
                  {product.enName}
                </TableCell>
                <TableCell>
                  <Badge variant='secondary'>{product.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant='outline'>{product.brand}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.gender === 'male'
                        ? 'default'
                        : product.gender === 'female'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {product.gender}
                  </Badge>
                </TableCell>
                <TableCell className='text-center'>{getTotalQuantity(product.variants)}</TableCell>
                <TableCell className='text-right'>
                  <div className='text-sm'>
                    <div className='font-medium'>${getMinPrice(product.variants).toFixed(2)}</div>
                    {getMinPrice(product.variants) !== getMaxPrice(product.variants) && (
                      <div className='text-xs text-muted-foreground'>
                        - ${getMaxPrice(product.variants).toFixed(2)}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={product.isActive ? 'default' : 'secondary'}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className='text-sm text-muted-foreground'>
                  {formatDate(product.createdAt)}
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
                      <DropdownMenuItem onClick={() => handleShowDetails(product)}>
                        <Eye className='mr-2 h-4 w-4' />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/products/edit/${product.id}`} className='flex items-center'>
                          <Edit className='mr-2 h-4 w-4' />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleActive(product.id, product.isActive)}
                        className='flex items-center'
                      >
                        {product.isActive ? (
                          <>
                            <PowerOff className='mr-2 h-4 w-4 text-orange-600' />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Power className='mr-2 h-4 w-4 text-green-600' />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(product)}
                        className='text-destructive flex items-center'
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Product Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>Detailed information about the selected product</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className='space-y-6'>
              {/* Basic Information */}
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Arabic Content</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Arabic Name
                      </label>
                      <p className='text-lg font-semibold'>{selectedProduct.arName}</p>
                    </div>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Arabic Description
                      </label>
                      <p className='text-sm'>{selectedProduct.descriptionAr}</p>
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
                      <p className='text-lg font-semibold'>{selectedProduct.enName}</p>
                    </div>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        English Description
                      </label>
                      <p className='text-sm'>{selectedProduct.descriptionEn}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className='space-y-3'>
                <label className='text-sm font-medium text-muted-foreground'>Main Image</label>
                <div className='w-full h-48 bg-muted rounded-lg flex items-center justify-center overflow-hidden'>
                  <Avatar className='h-full w-full'>
                    <AvatarImage src={selectedProduct.mainImage} alt={selectedProduct.enName} />
                    <AvatarFallback className='text-4xl'>
                      {selectedProduct.enName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Product Metadata */}
              <div className='grid grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground flex items-center'>
                    <Tag className='w-4 h-4 mr-2' />
                    Category
                  </label>
                  <Badge variant='secondary'>{selectedProduct.category}</Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground flex items-center'>
                    <Building className='w-4 h-4 mr-2' />
                    Brand
                  </label>
                  <Badge variant='outline'>{selectedProduct.brand}</Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground flex items-center'>
                    <Users className='w-4 h-4 mr-2' />
                    Gender
                  </label>
                  <Badge
                    variant={
                      selectedProduct.gender === 'male'
                        ? 'default'
                        : selectedProduct.gender === 'female'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {selectedProduct.gender}
                  </Badge>
                </div>
              </div>

              {/* Variants */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold flex items-center'>
                  <Package className='w-5 h-5 mr-2' />
                  Product Variants ({selectedProduct.variants.length})
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {selectedProduct.variants.map((variant, index) => (
                    <div key={variant.id} className='border rounded-lg p-4 space-y-3'>
                      <div className='flex items-center justify-between'>
                        <h4 className='font-medium'>Variant {index + 1}</h4>
                        <div className='flex space-x-2'>
                          {variant.bestSeller && (
                            <Badge variant='default' className='text-xs'>
                              Best Seller
                            </Badge>
                          )}
                          {variant.todayDeals && (
                            <Badge variant='secondary' className='text-xs'>
                              Today Deals
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-2 text-sm'>
                        <div>
                          <span className='text-muted-foreground'>Size:</span> {variant.size}
                        </div>
                        <div>
                          <span className='text-muted-foreground'>Color:</span> {variant.color}
                        </div>
                        <div>
                          <span className='text-muted-foreground'>Price:</span> ${variant.price}
                        </div>
                        <div>
                          <span className='text-muted-foreground'>Sale Price:</span> $
                          {variant.salePrice}
                        </div>
                        <div>
                          <span className='text-muted-foreground'>Quantity:</span>{' '}
                          {variant.currentQty}
                        </div>
                        <div>
                          <span className='text-muted-foreground'>SKU:</span> {variant.sku || 'N/A'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Dates */}
              <div className='grid grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>Status</label>
                  <Badge variant={selectedProduct.isActive ? 'default' : 'secondary'}>
                    {selectedProduct.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>Created At</label>
                  <p className='text-sm'>{formatDate(selectedProduct.createdAt)}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>Created By</label>
                  <p className='text-sm'>{selectedProduct.createdBy}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex space-x-2 pt-4'>
                <Button
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    // Navigate to edit page
                    window.location.href = `/products/edit/${selectedProduct.id}`;
                  }}
                  className='flex-1'
                >
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Product
                </Button>
                <Button variant='outline' className='flex-1'>
                  <Eye className='w-4 h-4 mr-2' />
                  Preview Product
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
              Are you sure you want to delete product <strong>{productToDelete?.enName}</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={confirmDelete}
              disabled={deletingId === productToDelete?.id}
            >
              {deletingId === productToDelete?.id ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
