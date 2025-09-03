'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Send, Upload, UserCheck, Users, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

// Mock users data - replace with actual API call
const mockUsers: User[] = [
  { id: '1', name: 'Ahmed Hassan', email: 'ahmed@example.com', mobile: '+20 123 456 7890' },
  { id: '2', name: 'Fatima Ahmed', email: 'fatima@example.com', mobile: '+20 111 222 3333' },
  { id: '3', name: 'Mohammed Ali', email: 'mohammed@example.com', mobile: '+20 987 654 3210' },
  { id: '4', name: 'Aisha Mohammed', email: 'aisha@example.com', mobile: '+20 555 666 7777' },
  { id: '5', name: 'Ali Ahmed', email: 'ali@example.com', mobile: '+20 444 333 2222' },
];

interface NotificationModalProps {
  onNotificationSent?: () => void;
}

export default function NotificationModal({ onNotificationSent }: NotificationModalProps) {
  const [open, setOpen] = useState(false);
  const [sendToAll, setSendToAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (file: File) => {
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const handleUserSelection = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user && !selectedUsers.find(u => u.id === userId)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('يرجى إدخال عنوان الإشعار');
      return;
    }

    if (!description.trim()) {
      toast.error('يرجى إدخال وصف الإشعار');
      return;
    }

    if (!sendToAll && selectedUsers.length === 0) {
      toast.error('يرجى اختيار مستخدمين أو تحديد إرسال للجميع');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual notification sending API call
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('sendToAll', sendToAll.toString());

      if (!sendToAll) {
        formData.append('userIds', JSON.stringify(selectedUsers.map(u => u.id)));
      }

      if (image) {
        formData.append('image', image);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('تم إرسال الإشعار بنجاح');

      // Reset form
      setTitle('');
      setDescription('');
      setImage(null);
      setImagePreview('');
      setSelectedUsers([]);
      setSendToAll(false);
      setOpen(false);

      // Callback to refresh the notifications list
      if (onNotificationSent) {
        onNotificationSent();
      }
    } catch (error) {
      toast.error('فشل في إرسال الإشعار');
      console.error('Error sending notification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
          <Send className='w-4 h-4 mr-2' />
          إضافة إشعار
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-xl'>
            <Send className='w-5 h-5' />
            إرسال إشعار جديد
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* User Selection Toggle */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='send-to-all' className='text-base font-semibold'>
                اختيار المستخدمين
              </Label>
              <div className='flex items-center space-x-3'>
                <span className='text-sm text-muted-foreground'>
                  {sendToAll ? 'إرسال للجميع' : 'إرسال لمستخدمين محددين'}
                </span>
                <Switch id='send-to-all' checked={sendToAll} onCheckedChange={setSendToAll} />
              </div>
            </div>

            {!sendToAll && (
              <div className='space-y-3'>
                <Label htmlFor='user-select'>اختيار المستخدمين</Label>
                <Select onValueChange={handleUserSelection}>
                  <SelectTrigger>
                    <SelectValue placeholder='اختر المستخدمين...' />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers
                      .filter(user => !selectedUsers.find(u => u.id === user.id))
                      .map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className='flex flex-col'>
                            <span className='font-medium'>{user.name}</span>
                            <span className='text-sm text-muted-foreground'>
                              {user.email} • {user.mobile}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                {/* Selected Users Display */}
                {selectedUsers.length > 0 && (
                  <div className='space-y-2'>
                    <Label className='text-sm font-medium'>المستخدمون المحددون:</Label>
                    <div className='flex flex-wrap gap-2'>
                      {selectedUsers.map(user => (
                        <Badge
                          key={user.id}
                          variant='secondary'
                          className='flex items-center gap-1 px-3 py-1'
                        >
                          <UserCheck className='w-3 h-3' />
                          {user.name}
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='h-4 w-4 p-0 hover:bg-transparent'
                            onClick={() => handleRemoveUser(user.id)}
                          >
                            <X className='w-3 h-3' />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {sendToAll && (
              <div className='flex items-center gap-2 p-3 bg-blue-50 rounded-lg'>
                <Users className='w-5 h-5 text-blue-600' />
                <span className='text-blue-800 font-medium'>
                  سيتم إرسال الإشعار لجميع المستخدمين المسجلين
                </span>
              </div>
            )}
          </div>

          {/* Notification Title */}
          <div className='space-y-2'>
            <Label htmlFor='title'>عنوان الإشعار *</Label>
            <Input
              id='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='أدخل عنوان الإشعار'
              required
            />
          </div>

          {/* Notification Description */}
          <div className='space-y-2'>
            <Label htmlFor='description'>وصف الإشعار *</Label>
            <Textarea
              id='description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder='أدخل وصف الإشعار'
              className='min-h-[100px]'
              required
            />
          </div>

          {/* Image Upload */}
          <div className='space-y-3'>
            <Label htmlFor='image'>صورة الإشعار (اختياري)</Label>
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors'>
              {imagePreview ? (
                <div className='space-y-4'>
                  <div className='relative inline-block'>
                    <img
                      src={imagePreview}
                      alt='Preview'
                      className='max-w-xs max-h-32 rounded-lg shadow-md'
                    />
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      className='absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full'
                      onClick={handleRemoveImage}
                    >
                      <X className='w-3 h-3' />
                    </Button>
                  </div>
                  <p className='text-sm text-muted-foreground'>تم اختيار: {image?.name}</p>
                </div>
              ) : (
                <div className='space-y-4'>
                  <Upload className='w-8 h-8 mx-auto text-muted-foreground' />
                  <div>
                    <p className='font-medium text-foreground mb-2'>
                      انقر لاختيار صورة أو اسحبها هنا
                    </p>
                    <p className='text-sm text-muted-foreground'>PNG, JPG, GIF حتى 5MB</p>
                  </div>
                  <Input
                    id='image'
                    type='file'
                    accept='image/*'
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          toast.error('حجم الصورة يجب أن يكون أقل من 5MB');
                          return;
                        }
                        handleImageUpload(file);
                      }
                    }}
                    className='hidden'
                  />
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => document.getElementById('image')?.click()}
                  >
                    اختيار صورة
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-3 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button type='submit' disabled={isLoading} className='min-w-[120px]'>
              {isLoading ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className='w-4 h-4 mr-2' />
                  إرسال الإشعار
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
