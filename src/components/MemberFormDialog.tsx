import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import Select from 'react-select';
import { countries, CountryOption } from "@/lib/countries";

// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MemberData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  occupation?: string;
  gender?: string;
  country?: string;
  state?: string;
  profileImage?: string;
  [key: string]: any; // For any additional fields
}

interface MemberFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberData?: MemberData;
  isEdit?: boolean;
  onSubmit?: (data: MemberData) => void;
}

export const MemberFormDialog: React.FC<MemberFormDialogProps> = ({
  open,
  onOpenChange,
  memberData = {},
  isEdit = false,
  onSubmit
}) => {
  // Hooks
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // State
  const [previewImage, setPreviewImage] = useState<string | null>(
    memberData?.profileImage || null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Derived state
  const selectedCountry = countries.find(
    country => country.value === memberData?.country
  ) || null;

  // Set form values when memberData changes
  useEffect(() => {
    if (formRef.current && memberData) {
      Object.entries(memberData).forEach(([key, value]) => {
        if (value && formRef.current) {
          const input = formRef.current.elements.namedItem(key) as HTMLInputElement;
          if (input) {
            input.value = value;
          }
        }
      });
    }
  }, [memberData]);

  const validateField = (name: string, value: string) => {
    if (!value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'role'];
    
    requiredFields.forEach(field => {
      const value = formData.get(field) as string;
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));
    
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    // Update the form value for the select field
    if (formRef.current) {
      const input = formRef.current.elements.namedItem(name) as HTMLInputElement;
      if (input) {
        input.value = value;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    if (!validateForm(formData)) {
      // Scroll to the first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.getElementById(firstError);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Get form data
    const data: MemberData = Object.fromEntries(formData.entries()) as unknown as MemberData;
    if (previewImage) {
      data.profileImage = previewImage;
    }

    // Add timestamp and ID
    const memberId = isEdit && memberData?.id ? memberData.id : `member-${Date.now()}`;
    const memberWithId = {
      ...data,
      id: memberId,
      updatedAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingMembers = JSON.parse(localStorage.getItem('members') || '[]');
    let updatedMembers;
    
    if (isEdit) {
      // Update existing member
      updatedMembers = existingMembers.map((m: any) => 
        m.id === memberId ? { ...m, ...memberWithId } : m
      );
    } else {
      // Add new member
      updatedMembers = [...existingMembers, memberWithId];
    }
    
    localStorage.setItem('members', JSON.stringify(updatedMembers));
    
    // Call the onSubmit callback if provided
    if (onSubmit) {
      onSubmit(memberWithId);
    } else {
      // Default behavior if no onSubmit provided
      onOpenChange(false);
      if (isEdit) {
        navigate(-1);
      } else {
        navigate(`/members/${memberId}`, { state: memberWithId });
      }
    }
  };
  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    if (!validateForm(formData)) {
      scrollToFirstError();
      return;
    }

    const memberData = processFormData(formData);
    saveMemberData(memberData);
    
    if (onSubmit) {
      onSubmit(memberData);
    } else {
      onOpenChange(false);
      if (isEdit) {
        navigate(-1);
      } else {
        navigate(`/members/${memberData.id}`, { state: memberData });
      }
    }
  };

  // Helper function to scroll to the first error
  const scrollToFirstError = () => {
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      const element = document.getElementById(firstError);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Process form data before submission
  const processFormData = (formData: FormData): MemberData => {
    const data: MemberData = Object.fromEntries(formData.entries()) as unknown as MemberData;
    if (previewImage) {
      data.profileImage = previewImage;
    }

    const memberId = isEdit && memberData?.id ? memberData.id : `member-${Date.now()}`;
    return {
      ...data,
      id: memberId,
      updatedAt: new Date().toISOString()
    };
  };

  // Save member data to localStorage
  const saveMemberData = (member: MemberData) => {
    const existingMembers = JSON.parse(localStorage.getItem('members') || '[]');
    const updatedMembers = isEdit
      ? existingMembers.map((m: any) => m.id === member.id ? { ...m, ...member } : m)
      : [...existingMembers, member];
    
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  // Render the form fields
  const renderFormFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* First Name */}
      <div className="space-y-2">
        <Label htmlFor="firstName">
          First Name <span className="text-destructive">*</span>
        </Label>
        <Input 
          id="firstName" 
          name="firstName" 
          placeholder="Enter first name"
          className={errors.firstName ? 'border-destructive' : ''}
          onChange={handleChange}
          defaultValue={memberData.firstName || ''}
        />
        {errors.firstName && (
          <p className="text-sm text-destructive">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <Label htmlFor="lastName">
          Last Name <span className="text-destructive">*</span>
        </Label>
        <Input 
          id="lastName" 
          name="lastName" 
          placeholder="Enter last name"
          className={errors.lastName ? 'border-destructive' : ''}
          onChange={handleChange}
          defaultValue={memberData.lastName || ''}
        />
        {errors.lastName && (
          <p className="text-sm text-destructive">{errors.lastName}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="Enter email address"
          className={errors.email ? 'border-destructive' : ''}
          onChange={handleChange}
          defaultValue={memberData.email || ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          name="phone" 
          type="tel" 
          placeholder="Enter phone number"
          defaultValue={memberData.phone || ''}
        />
      </div>

      {/* Role */}
      <div className="space-y-2">
        <Label htmlFor="role">
          Role <span className="text-destructive">*</span>
        </Label>
        <ShadcnSelect 
          name="role" 
          onValueChange={(value) => handleSelectChange(value, 'role')}
          defaultValue={memberData.role || ''}
        >
          <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </ShadcnSelect>
        {errors.role && (
          <p className="text-sm text-destructive">{errors.role}</p>
        )}
      </div>

      {/* Occupation */}
      <div className="space-y-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input 
          id="occupation" 
          name="occupation" 
          placeholder="Enter occupation"
          defaultValue={memberData.occupation || ''}
        />
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <ShadcnSelect 
          name="gender" 
          onValueChange={(value) => handleSelectChange(value, 'gender')}
          defaultValue={memberData.gender || ''}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </ShadcnSelect>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <ShadcnSelect
          name="country"
          onValueChange={(value) => {
            handleSelectChange(value, 'country');
            setErrors(prev => ({
              ...prev,
              country: ''
            }));
          }}
          value={selectedCountry?.value || ''}
        >
          <SelectTrigger className={errors.country ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-y-auto">
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </ShadcnSelect>
        {errors.country && (
          <p className="text-sm text-destructive mt-1">{errors.country}</p>
        )}
      </div>

      {/* State */}
      <div className="space-y-2">
        <Label htmlFor="state">State/Province</Label>
        <Input 
          id="state" 
          name="state" 
          placeholder="Enter state/province"
          defaultValue={memberData.state || ''}
        />
      </div>
    </div>
  );

  // Render the profile image upload section
  const renderProfileImage = () => (
    <div className="flex items-center gap-3 mb-6">
      <div className="relative">
        <Avatar className="h-20 w-20">
          {previewImage ? (
            <img 
              src={previewImage} 
              alt="Profile preview" 
              className="h-full w-full object-cover"
            />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary">
              {memberData.firstName?.[0] || 'U'}
            </AvatarFallback>
          )}
        </Avatar>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={triggerFileInput}
        className="flex items-center gap-2"
      >
        <Camera className="h-4 w-4" />
        {previewImage ? 'Change' : 'Upload'} Photo
      </Button>
    </div>
  );

  // Render the form footer with submit button and back button
  const renderFormFooter = () => (
    <div className="flex justify-between mt-6">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => onOpenChange(false)}
      >
        Back
      </Button>
      <Button type="submit" className="bg-[#1DD3B0] hover:bg-[#12b89a] text-white">
        {isEdit ? 'Update Member' : 'Create Member'}
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEdit ? 'Edit Member' : 'New Member Form'}
          </DialogTitle>
        </DialogHeader>

        <form ref={formRef} className="space-y-6 mt-4" onSubmit={handleFormSubmit}>
          <div className="space-y-6">
            {renderProfileImage()}
            {renderFormFields()}
          </div>
          {renderFormFooter()}
        </form>
      </DialogContent>
    </Dialog>
  );
}
