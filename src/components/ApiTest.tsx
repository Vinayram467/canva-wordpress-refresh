import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { healthCheck } from '@/services/api';
import API_CONFIG from '@/config/api';

const ApiTest = () => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const testConnection = async () => {
    setLoading(true);
    setError('');
    setStatus('');

    try {
      console.log('🔧 Testing API connection...');
      console.log('📡 API Base URL:', API_CONFIG.BASE_URL);
      
      const result = await healthCheck();
      setStatus(`✅ Connected! Server: ${result.message}`);
      console.log('✅ API test successful:', result);
    } catch (err: any) {
      const errorMessage = err.message || 'Unknown error';
      setError(`❌ Connection failed: ${errorMessage}`);
      console.error('❌ API test failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">API Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p><strong>Current API URL:</strong></p>
          <p className="font-mono text-xs break-all">{API_CONFIG.BASE_URL}</p>
        </div>
        
        <Button 
          onClick={testConnection} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </Button>

        {status && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">{status}</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiTest; 