import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockSettings } from '../../mock';
import { Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const [settings, setSettings] = useState(mockSettings);

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' && section !== 'logo'
        ? { ...prev[section], [field]: value }
        : value
    }));
  };

  const handleSave = (section) => {
    toast.success(`${section} settings saved! (Frontend mock only)`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your portfolio settings</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="supabase">Supabase</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', null, e.target.value)}
                  placeholder="Architect Studio"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={settings.tagline}
                  onChange={(e) => handleInputChange('tagline', null, e.target.value)}
                  placeholder="Designing spaces that inspire"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="footerDescription">Footer Description</Label>
                <Textarea
                  id="footerDescription"
                  value={settings.footerDescription}
                  onChange={(e) => handleInputChange('footerDescription', null, e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Logo Image</Label>
                <div className="flex items-center gap-4">
                  <img
                    src={settings.logo}
                    alt="Logo"
                    className="h-16 w-32 object-contain bg-gray-100 rounded-lg p-2"
                  />
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => handleSave('General')}
                className="bg-[#b8d71b] hover:bg-[#a0c018] text-black"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  value={settings.whatsappNumber}
                  onChange={(e) => handleInputChange('whatsappNumber', null, e.target.value)}
                  placeholder="+1234567890"
                />
                <p className="text-sm text-gray-500">Include country code (e.g., +1 for USA)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappMessage">Default WhatsApp Message</Label>
                <Textarea
                  id="whatsappMessage"
                  value={settings.whatsappMessage}
                  onChange={(e) => handleInputChange('whatsappMessage', null, e.target.value)}
                  rows={3}
                  placeholder="Hello! I am interested in your services."
                />
              </div>

              <Button
                onClick={() => handleSave('Contact')}
                className="bg-[#b8d71b] hover:bg-[#a0c018] text-black"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  value={settings.socialLinks.instagram}
                  onChange={(e) => handleInputChange('socialLinks', 'instagram', e.target.value)}
                  placeholder="https://instagram.com/yourusername"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={settings.socialLinks.linkedin}
                  onChange={(e) => handleInputChange('socialLinks', 'linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="behance">Behance URL</Label>
                <Input
                  id="behance"
                  value={settings.socialLinks.behance}
                  onChange={(e) => handleInputChange('socialLinks', 'behance', e.target.value)}
                  placeholder="https://behance.net/yourusername"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pinterest">Pinterest URL</Label>
                <Input
                  id="pinterest"
                  value={settings.socialLinks.pinterest}
                  onChange={(e) => handleInputChange('socialLinks', 'pinterest', e.target.value)}
                  placeholder="https://pinterest.com/yourusername"
                />
              </div>

              <Button
                onClick={() => handleSave('Social Media')}
                className="bg-[#b8d71b] hover:bg-[#a0c018] text-black"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Supabase Settings */}
        <TabsContent value="supabase" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supabase Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> After saving Supabase credentials, the app will automatically connect to your database and storage.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supabaseUrl">Supabase Project URL</Label>
                <Input
                  id="supabaseUrl"
                  type="url"
                  placeholder="https://your-project.supabase.co"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supabaseKey">Supabase API Key (anon/public)</Label>
                <Input
                  id="supabaseKey"
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supabaseStorageBucket">Storage Bucket Name</Label>
                <Input
                  id="supabaseStorageBucket"
                  placeholder="portfolio-images"
                  defaultValue="portfolio-images"
                />
              </div>

              <Button
                onClick={() => handleSave('Supabase')}
                className="bg-[#b8d71b] hover:bg-[#a0c018] text-black"
              >
                <Save className="w-4 h-4 mr-2" />
                Save & Connect
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;