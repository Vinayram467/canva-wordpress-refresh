import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  getSEOData, 
  updateSEOData, 
  validateSEOData, 
  getAllPageKeys,
  type SEOData 
} from '@/utils/seoManager';
import { Save, Eye, Copy, CheckCircle, AlertCircle } from 'lucide-react';

interface SEOEditorProps {
  pageKey: string;
  onSave?: (data: SEOData) => void;
}

export const SEOEditor: React.FC<SEOEditorProps> = ({ pageKey, onSave }) => {
  const [seoData, setSeoData] = useState<SEOData>(getSEOData(pageKey));
  const [validation, setValidation] = useState<{ isValid: boolean; errors: string[] }>({ isValid: true, errors: [] });
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setSeoData(getSEOData(pageKey));
  }, [pageKey]);

  const handleInputChange = (field: keyof SEOData, value: string) => {
    const newData = { ...seoData, [field]: value };
    setSeoData(newData);
    setValidation(validateSEOData(newData));
    setIsSaved(false);
  };

  const handleSave = () => {
    if (validation.isValid) {
      updateSEOData(pageKey, seoData);
      onSave?.(seoData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const getCharacterCount = (text: string) => {
    return text?.length || 0;
  };

  const getCharacterStatus = (count: number, max: number) => {
    if (count === 0) return 'text-gray-400';
    if (count <= max * 0.8) return 'text-green-600';
    if (count <= max) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">SEO Editor - {pageKey}</h2>
          <p className="text-muted-foreground">Manage meta tags and SEO data for this page</p>
        </div>
        <div className="flex items-center gap-2">
          {isSaved && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Saved
            </Badge>
          )}
          <Button onClick={handleSave} disabled={!validation.isValid}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {validation.errors.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside">
              {validation.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic SEO Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <div className="relative">
                  <Input
                    id="title"
                    value={seoData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter page title (50-60 characters recommended)"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <span className={`text-xs ${getCharacterStatus(getCharacterCount(seoData.title), 60)}`}>
                      {getCharacterCount(seoData.title)}/60
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <div className="relative">
                  <Textarea
                    id="description"
                    value={seoData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter meta description (150-160 characters recommended)"
                    rows={3}
                  />
                  <div className="absolute right-2 top-2">
                    <span className={`text-xs ${getCharacterStatus(getCharacterCount(seoData.description), 160)}`}>
                      {getCharacterCount(seoData.description)}/160
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={seoData.keywords || ''}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="Enter keywords separated by commas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonical">Canonical URL</Label>
                <Input
                  id="canonical"
                  value={seoData.canonical || ''}
                  onChange={(e) => handleInputChange('canonical', e.target.value)}
                  placeholder="https://yourdomain.com/page"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ogTitle">Open Graph Title</Label>
                  <Input
                    id="ogTitle"
                    value={seoData.ogTitle || ''}
                    onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                    placeholder="Open Graph title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogDescription">Open Graph Description</Label>
                  <Textarea
                    id="ogDescription"
                    value={seoData.ogDescription || ''}
                    onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                    placeholder="Open Graph description"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImage">Open Graph Image URL</Label>
                  <Input
                    id="ogImage"
                    value={seoData.ogImage || ''}
                    onChange={(e) => handleInputChange('ogImage', e.target.value)}
                    placeholder="https://yourdomain.com/og-image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterTitle">Twitter Title</Label>
                  <Input
                    id="twitterTitle"
                    value={seoData.twitterTitle || ''}
                    onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
                    placeholder="Twitter title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterDescription">Twitter Description</Label>
                  <Textarea
                    id="twitterDescription"
                    value={seoData.twitterDescription || ''}
                    onChange={(e) => handleInputChange('twitterDescription', e.target.value)}
                    placeholder="Twitter description"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterImage">Twitter Image URL</Label>
                  <Input
                    id="twitterImage"
                    value={seoData.twitterImage || ''}
                    onChange={(e) => handleInputChange('twitterImage', e.target.value)}
                    placeholder="https://yourdomain.com/twitter-image.jpg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Google Search Result Preview</h3>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="text-blue-600 text-sm mb-1">
                      {seoData.canonical || 'https://yourdomain.com'}
                    </div>
                    <div className="text-xl text-blue-800 font-medium mb-1">
                      {seoData.title || 'Page Title'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {seoData.description || 'Meta description will appear here...'}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Social Media Preview</h3>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="text-sm text-gray-500 mb-1">Open Graph</div>
                    <div className="font-medium mb-1">
                      {seoData.ogTitle || seoData.title || 'Title'}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {seoData.ogDescription || seoData.description || 'Description'}
                    </div>
                    {seoData.ogImage && (
                      <div className="text-xs text-blue-600">{seoData.ogImage}</div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(seoData.title || '', 'title')}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copied === 'title' ? 'Copied!' : 'Copy Title'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(seoData.description || '', 'description')}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copied === 'description' ? 'Copied!' : 'Copy Description'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 