'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { categories } from '@/data/categories';
import { ProductFormData, ProductVariant } from '@/types/product';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

// Mock brands data - in real app this would come from API
const mockBrands = [
  { id: '1', name: 'Fashion Brand' },
  { id: '2', name: 'Denim Co' },
  { id: '3', name: 'Leather Works' },
  { id: '4', name: 'Summer Style' },
  { id: '5', name: 'Sport Max' },
];

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'unisex', label: 'Unisex' },
];

export function AddProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    arName: '',
    enName: '',
    mainImage: null,
    descriptionAr: '',
    descriptionEn: '',
    category: '',
    brand: '',
    gender: 'unisex',
    variants: [],
  });

  const [variants, setVariants] = useState<Omit<ProductVariant, 'id'>[]>([]);

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, mainImage: file }));
    }
  };

  const addVariant = () => {
    const newVariant: Omit<ProductVariant, 'id'> = {
      size: '',
      color: '',
      mainImage: '',
      price: 0,
      salePrice: 0,
      currentQty: 0,
      bestSeller: false,
      todayDeals: false,
      sku: '',
      images: [],
    };
    setVariants(prev => [...prev, newVariant]);
  };

  const updateVariant = (
    index: number,
    field: keyof Omit<ProductVariant, 'id'>,
    value: string | number | boolean | string[],
  ) => {
    setVariants(prev =>
      prev.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant)),
    );
  };

  const removeVariant = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add IDs to variants
    const variantsWithIds = variants.map((variant, index) => ({
      ...variant,
      id: `temp-${Date.now()}-${index}`,
    }));

    const finalFormData = {
      ...formData,
      variants: variantsWithIds,
    };

    console.log('Submitting product:', finalFormData);
    // TODO: Implement API call to create product
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      {/* Basic Information */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='arName'>Arabic Name *</Label>
            <Input
              id='arName'
              value={formData.arName}
              onChange={e => handleInputChange('arName', e.target.value)}
              placeholder='اسم المنتج بالعربية'
              required
            />
          </div>

          <div>
            <Label htmlFor='enName'>English Name *</Label>
            <Input
              id='enName'
              value={formData.enName}
              onChange={e => handleInputChange('enName', e.target.value)}
              placeholder='Product name in English'
              required
            />
          </div>
        </div>

        <div className='space-y-4'>
          <div>
            <Label htmlFor='mainImage'>Main Image *</Label>
            <div className='mt-2'>
              <Input
                id='mainImage'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <Label htmlFor='descriptionAr'>Arabic Description *</Label>
          <Textarea
            id='descriptionAr'
            value={formData.descriptionAr}
            onChange={e => handleInputChange('descriptionAr', e.target.value)}
            placeholder='وصف المنتج بالعربية'
            rows={4}
            required
          />
        </div>

        <div>
          <Label htmlFor='descriptionEn'>English Description *</Label>
          <Textarea
            id='descriptionEn'
            value={formData.descriptionEn}
            onChange={e => handleInputChange('descriptionEn', e.target.value)}
            placeholder='Product description in English'
            rows={4}
            required
          />
        </div>
      </div>

      {/* Category, Brand, Gender */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div>
          <Label htmlFor='category'>Category *</Label>
          <Select
            value={formData.category}
            onValueChange={value => handleInputChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.enName}>
                  {category.enName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='brand'>Brand *</Label>
          <Select value={formData.brand} onValueChange={value => handleInputChange('brand', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select brand' />
            </SelectTrigger>
            <SelectContent>
              {mockBrands.map(brand => (
                <SelectItem key={brand.id} value={brand.name}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='gender'>Gender *</Label>
          <Select
            value={formData.gender}
            onValueChange={(value: 'male' | 'female' | 'unisex') =>
              handleInputChange('gender', value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Variants Section */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Product Variants</CardTitle>
          <Button type='button' onClick={addVariant} variant='outline'>
            <Plus className='mr-2 h-4 w-4' />
            Add Variant
          </Button>
        </CardHeader>
        <CardContent>
          {variants.length === 0 ? (
            <div className='text-center py-8 text-muted-foreground'>
              No variants added yet. Click &quot;Add Variant&quot; to get started.
            </div>
          ) : (
            <div className='space-y-6'>
              {variants.map((variant, index) => (
                <Card key={index} className='p-4'>
                  <div className='flex items-center justify-between mb-4'>
                    <h4 className='font-medium'>Variant {index + 1}</h4>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removeVariant(index)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div>
                      <Label>Size</Label>
                      <Input
                        value={variant.size}
                        onChange={e => updateVariant(index, 'size', e.target.value)}
                        placeholder='M, L, XL, etc.'
                      />
                    </div>

                    <div>
                      <Label>Color</Label>
                      <Input
                        value={variant.color}
                        onChange={e => updateVariant(index, 'color', e.target.value)}
                        placeholder='Red, Blue, etc.'
                      />
                    </div>

                    <div>
                      <Label>Price *</Label>
                      <Input
                        type='number'
                        step='0.01'
                        value={variant.price}
                        onChange={e => {
                          const price = parseFloat(e.target.value);
                          updateVariant(index, 'price', price);
                          if (variant.salePrice === 0 || variant.salePrice === variant.price) {
                            updateVariant(index, 'salePrice', price);
                          }
                        }}
                        placeholder='0.00'
                        required
                      />
                    </div>

                    <div>
                      <Label>Sale Price *</Label>
                      <Input
                        type='number'
                        step='0.01'
                        value={variant.salePrice}
                        onChange={e =>
                          updateVariant(index, 'salePrice', parseFloat(e.target.value))
                        }
                        placeholder='0.00'
                        required
                      />
                    </div>

                    <div>
                      <Label>Current Quantity *</Label>
                      <Input
                        type='number'
                        value={variant.currentQty}
                        onChange={e => updateVariant(index, 'currentQty', parseInt(e.target.value))}
                        placeholder='0'
                        required
                      />
                    </div>

                    <div>
                      <Label>SKU</Label>
                      <Input
                        value={variant.sku}
                        onChange={e => updateVariant(index, 'sku', e.target.value)}
                        placeholder='Product-SKU-001'
                      />
                    </div>

                    <div className='flex items-center justify-between'>
                      <Switch
                        id={`bestSeller-${index}`}
                        checked={variant.bestSeller}
                        onCheckedChange={checked => updateVariant(index, 'bestSeller', checked)}
                        variant={variant.bestSeller ? 'success' : 'default'}
                        size='md'
                        showIcon
                        label='Best Seller'
                        description={
                          variant.bestSeller
                            ? 'This variant is marked as best seller'
                            : 'Mark this variant as best seller'
                        }
                      />
                    </div>

                    <div className='flex items-center justify-between'>
                      <Switch
                        id={`todayDeals-${index}`}
                        checked={variant.todayDeals}
                        onCheckedChange={checked => updateVariant(index, 'todayDeals', checked)}
                        variant={variant.todayDeals ? 'warning' : 'default'}
                        size='md'
                        showIcon
                        label='Today Deals'
                        description={
                          variant.todayDeals
                            ? "This variant is in today's deals"
                            : "Mark this variant for today's deals"
                        }
                      />
                    </div>
                  </div>

                  <div className='mt-4'>
                    <Label>Variant Images</Label>
                    <div className='mt-2'>
                      <Input
                        type='file'
                        accept='image/*'
                        multiple
                        onChange={e => {
                          const files = Array.from(e.target.files || []);
                          const imageUrls = files.map(file => URL.createObjectURL(file));
                          updateVariant(index, 'images', imageUrls);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className='flex justify-end space-x-4'>
        <Button type='button' variant='outline'>
          Cancel
        </Button>
        <Button type='submit'>Create Product</Button>
      </div>
    </form>
  );
}
