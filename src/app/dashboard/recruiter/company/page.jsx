"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { 
  Form, Fieldset, TextField, Input, Label, TextArea, 
  Select, ListBox, Button, Chip, Card, Tooltip 
} from "@heroui/react";
import { 
  Briefcase, Globe, MapPin, ArrowUpToLine, Pencil, 
  Check, CircleExclamation, Xmark 
} from "@gravity-ui/icons";

// Tailwind কাস্টম ক্লাসেস (আপনার স্টাইল গাইড টেমপ্লেট অনুযায়ী)
const textInputClass = "w-full bg-[#1d1d20]/50 border border-zinc-800/80 focus-within:border-zinc-700 rounded-xl h-11 text-zinc-200 text-sm placeholder:text-zinc-600 outline-none px-3 transition-colors";
const textAreaClass = "w-full bg-[#1d1d20]/50 border border-zinc-800/80 focus-within:border-zinc-700 rounded-xl text-zinc-200 text-sm placeholder:text-zinc-600 outline-none p-3.5 transition-colors resize-none";
const triggerClasses = "w-full flex items-center justify-between bg-[#1d1d20]/50 border border-zinc-800/80 focus-within:border-zinc-700 rounded-xl h-11 px-3 text-zinc-200 text-sm";
const popoverClasses = "bg-[#141416] border border-zinc-900 rounded-xl p-1 shadow-2xl min-w-[200px]";
const listItemClasses = "px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 rounded-lg cursor-pointer transition-colors outline-none data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white";

export default function CompanyProfile() {
  // ডামি ডেটা স্টেট (শুরুতে null দিয়ে টেস্ট করতে পারেন কোম্পানি না থাকলে কী দেখাবে তা দেখার জন্য)
  const [company, setCompany] = useState({
    name: "Acme Corporation",
    website: "acme.com",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=60",
    industry: "technology",
    location: "Dhaka, Bangladesh",
    employeeCount: "11-50",
    description: "Building next-generation workflow optimization architectures and robust cloud pipelines for modern technology businesses.",
    status: "pending", // pending | approved | rejected
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(company?.logo || "");
  const fileInputRef = useRef(null);

  // --- ImgBB লোগো আপলোড হ্যান্ডলার ---
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // VITE_IMGBB_API_KEY অথবা NEXT_PUBLIC_IMGBB_API_KEY ব্যবহার করুন
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API ;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      
      if (result.success) {
        setLogoUrl(result.data.url);
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // --- ফর্ম সাবমিট (রেজিস্ট্রেশন ও আপডেট দুইটাই হ্যান্ডল করবে) ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const updatedCompany = {
      name: data.companyName,
      website: data.websiteUrl,
      industry: data.industry,
      location: data.location,
      employeeCount: data.employeeCount,
      description: data.description,
      logo: logoUrl,
      status: company?.status || "pending",
    };

    setCompany(updatedCompany);
    setIsEditing(false);
  };

  // --- স্ট্যাটাস ব্যাজ কালার ডিটারমাইনার ---
  const getStatusBadge = (status) => {
    const configs = {
      approved: { text: "Approved", bg: "bg-emerald-950/40 text-emerald-400 border-emerald-900/60", icon: Check },
      pending: { text: "Pending Review", bg: "bg-amber-950/40 text-amber-400 border-amber-900/60", icon: CircleExclamation },
      rejected: { text: "Rejected", bg: "bg-rose-950/40 text-rose-400 border-rose-900/60", icon: Xmark },
    };
    const current = configs[status] || configs.pending;
    const Icon = current.icon;

    return (
      <Chip className={`border ${current.bg} px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5`}>
        <Icon className="size-3 shrink-0" />
        {current.text}
      </Chip>
    );
  };

  // ==========================================
  // ১. কোম্পানি যদি রেজিস্টার্ড না থাকে (Prompt Screen)
  // ==========================================
  if (!company && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#0c0c0e] border border-zinc-900 rounded-2xl p-8 text-center max-w-xl mx-auto my-10">
        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-xl text-zinc-500 mb-4">
          <Briefcase className="size-6" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-200">No Company Profile Registered</h3>
        <p className="text-sm text-zinc-500 mt-1.5 max-w-sm">
          You need to register your organization details first before you can begin posting active job roles on HireLoop.
        </p>
        <Button 
          onPress={() => { setIsEditing(true); setLogoUrl(""); }}
          className="mt-6 bg-white text-black font-semibold px-6 h-11 rounded-xl hover:bg-zinc-200 transition-colors"
        >
          Register Company
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 text-white min-h-screen bg-black">
      
      {/* ==========================================
          ২. কোম্পানি ডিটেইলস ভিউ মোড
          ========================================== */}
      {company && !isEditing ? (
        <Card className="bg-[#0c0c0e] border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          
          {/* Header Block with Logo & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center shrink-0">
                {company.logo ? (
                  <Image src={company.logo} alt="Company Logo" className="w-full h-full object-cover" width={64} height={64} />
                ) : (
                  <Briefcase className="size-6 text-zinc-600" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-100">{company.name}</h2>
                  {getStatusBadge(company.status)}
                </div>
                <a 
                  href={`https://${company.website}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-sm text-zinc-500 hover:text-zinc-300 flex items-center gap-1.5 mt-0.5 transition-colors"
                >
                  <Globe className="size-3.5" />
                  {company.website}
                </a>
              </div>
            </div>

            <Button 
              onPress={() => { setIsEditing(true); setLogoUrl(company.logo); }}
              variant="flat" 
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl h-10 px-4 self-start sm:self-center"
            >
              <Pencil className="size-4 mr-1" /> Edit Profile
            </Button>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#141416]/50 border border-zinc-900 p-4 rounded-xl">
            <div>
              <span className="text-xs text-zinc-500 block uppercase tracking-wider font-semibold">Industry</span>
              <span className="text-sm text-zinc-300 mt-1 block capitalize">{company.industry}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-500 block uppercase tracking-wider font-semibold">Location</span>
              <span className="text-sm text-zinc-300 mt-1 block flex items-center gap-1">
                <MapPin className="size-3.5 text-zinc-500" /> {company.location}
              </span>
            </div>
            <div>
              <span className="text-xs text-zinc-500 block uppercase tracking-wider font-semibold">Company Size</span>
              <span className="text-sm text-zinc-300 mt-1 block">{company.employeeCount} Employees</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-zinc-400">About Company</h4>
            <p className="text-sm text-zinc-400 leading-relaxed bg-[#141416]/20 p-4 rounded-xl border border-zinc-900/60">
              {company.description}
            </p>
          </div>
        </Card>
      ) : (

        /* ==========================================
            ৩. কোম্পানি রেজিষ্ট্রেশন / এডিট ফর্ম মোড
            ========================================== */
        <Form onSubmit={handleFormSubmit} className="space-y-8 bg-[#0c0c0e] border border-zinc-900 p-6 md:p-8 rounded-2xl shadow-2xl" validationBehavior="aria">
          <Fieldset className="space-y-6 w-full">
            <legend className="text-xl font-bold text-zinc-100 border-b border-zinc-900 w-full pb-3 mb-2 flex items-center justify-between">
              {company ? "Update Company Information" : "Register New Company"}
              <span className="text-xs font-normal text-zinc-500">All fields are required</span>
            </legend>

            {/* Row 1: Company Name & Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField name="companyName" defaultValue={company?.name || ""} isRequired className="flex flex-col gap-1 w-full">
                <Label className="text-zinc-400 font-medium text-sm">Company Name</Label>
                <Input placeholder="e.g. Acme Corp" className={textInputClass} />
              </TextField>

              <Select className="w-full flex flex-col gap-1" name="industry" defaultSelectedKeys={[company?.industry || "technology"]} isRequired>
                <Label className="text-zinc-400 font-medium text-sm block">Industry / Category</Label>
                <Select.Trigger className={triggerClasses}>
                  <Select.Value className="text-white" />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className={popoverClasses}>
                  <ListBox className="outline-none">
                    <ListBox.Item id="technology" className={listItemClasses} textValue="Technology">Technology</ListBox.Item>
                    <ListBox.Item id="finance" className={listItemClasses} textValue="Finance & Banking">Finance & Banking</ListBox.Item>
                    <ListBox.Item id="healthcare" className={listItemClasses} textValue="Healthcare">Healthcare</ListBox.Item>
                    <ListBox.Item id="education" className={listItemClasses} textValue="Education">Education</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Row 2: Website URL & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField name="websiteUrl" type="text" defaultValue={company?.website || ""} isRequired className="flex flex-col gap-1 w-full">
                <Label className="text-zinc-400 font-medium text-sm">Website URL</Label>
                <Input placeholder="www.company.com" className={textInputClass} />
              </TextField>

              <TextField name="location" defaultValue={company?.location || ""} isRequired className="flex flex-col gap-1 w-full">
                <Label className="text-zinc-400 font-medium text-sm">Location</Label>
                <div className="relative flex items-center">
                  <MapPin size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                  <Input placeholder="City, Country" className={`${textInputClass} pl-10`} />
                </div>
              </TextField>
            </div>

            {/* Row 3: Employee Count & ImgBB Logo Uploader */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <Select className="w-full flex flex-col gap-1" name="employeeCount" defaultSelectedKeys={[company?.employeeCount || "1-10"]} isRequired>
                <Label className="text-zinc-400 font-medium text-sm block">Employee Count Range</Label>
                <Select.Trigger className={triggerClasses}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className={popoverClasses}>
                  <ListBox className="outline-none">
                    <ListBox.Item id="1-10" className={listItemClasses} textValue="1-10 employees">1-10 employees</ListBox.Item>
                    <ListBox.Item id="11-50" className={listItemClasses} textValue="11-50 employees">11-50 employees</ListBox.Item>
                    <ListBox.Item id="51-200" className={listItemClasses} textValue="51-200 employees">51-200 employees</ListBox.Item>
                    <ListBox.Item id="201+" className={listItemClasses} textValue="201+ employees">201+ employees</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* ImgBB Custom Logo Upload System */}
              <div className="flex flex-col gap-1">
                <span className="text-zinc-400 font-medium text-sm mb-1 block">Company Logo</span>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleLogoUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-11 bg-[#1d1d20]/30 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl px-3.5 flex items-center gap-3 cursor-pointer transition-colors group"
                >
                  <div className="w-6 h-6 rounded-md bg-[#1d1d20] border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 shrink-0 overflow-hidden">
                    {logoUrl ? (
                      <img src={logoUrl} alt="ImgBB Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ArrowUpToLine className="size-3.5" />
                    )}
                  </div>
                  <div className="flex flex-col text-left truncate">
                    <span className="text-xs font-medium text-zinc-300 group-hover:text-zinc-200 truncate">
                      {isUploading ? "Uploading to ImgBB..." : logoUrl ? "Logo Ready (Click to change)" : "Upload logo image"}
                    </span>
                    {!logoUrl && !isUploading && <span className="text-[10px] text-zinc-600">PNG, JPG up to 5MB</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: Brief Description */}
            <TextField name="description" defaultValue={company?.description || ""} isRequired className="flex flex-col gap-1 w-full">
              <Label className="text-zinc-400 font-medium text-sm">Brief Description</Label>
              <TextArea
                placeholder="Tell us about your company's mission and culture..."
                rows={4}
                className={textAreaClass}
              />
            </TextField>
          </Fieldset>

          {/* Form Control Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900 w-full">
            {company && (
              <Button
                type="button"
                variant="bordered"
                onPress={() => setIsEditing(false)}
                className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-xl px-6 font-medium h-11"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isUploading}
              className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-xl px-6 transition-colors h-11"
            >
              {company ? "Save Changes" : "Register Company"}
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}