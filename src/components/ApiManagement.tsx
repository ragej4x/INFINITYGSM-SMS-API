import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  Trash2, 
  Plus,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  requests: number;
}

export const ApiManagement = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'My API Key',
      key: 'sk_4f3e8d9a2b1c6e7f8g9h0i1j2k3l4m5n',
      created: '2024-09-15',
      lastUsed: '2 hours ago',
      requests: 1234,
    },
  ]);
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [newKeyName, setNewKeyName] = useState('');

  const maskApiKey = (key: string) => {
    return `${key.slice(0, 12)}${'•'.repeat(20)}${key.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const generateNewKey = () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for the API key');
      return;
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      requests: 0,
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    toast.success('New API key generated successfully');
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast.success('API key deleted successfully');
  };

  const curlExample = `curl -X POST https://api.yourservice.ph/v1/sms/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+639171234567",
    "message": "Hello from your SMS API!"
  }'`;

  const phpExample = `<?php
$ch = curl_init('https://api.yourservice.ph/v1/sms/send');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'to' => '+639171234567',
    'message' => 'Hello from your SMS API!'
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
?>`;

  const nodeExample = `const axios = require('axios');

const sendSMS = async () => {
  try {
    const response = await axios.post(
      'https://api.yourservice.ph/v1/sms/send',
      {
        to: '+639171234567',
        message: 'Hello from your SMS API!'
      },
      {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

sendSMS();`;

  const pythonExample = `import requests

url = "https://api.yourservice.ph/v1/sms/send"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "to": "+639171234567",
    "message": "Hello from your SMS API!"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API keys for programmatic access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1 w-full min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p>{apiKey.name}</p>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto">
                    <code className="text-muted-foreground bg-muted px-2 py-1 rounded text-sm">
                      {showKeys[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {showKeys[apiKey.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(apiKey.key)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-muted-foreground">
                    <span>Created: {apiKey.created}</span>
                    <span>Last used: {apiKey.lastUsed}</span>
                    <span>{apiKey.requests.toLocaleString()} requests</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Learn how to integrate our SMS API into your application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-2">Base URL</h3>
            <code className="block bg-muted p-3 rounded">
              https://api.yourservice.ph/v1
            </code>
          </div>

          <div>
            <h3 className="mb-2">Authentication</h3>
            <p className="text-muted-foreground mb-2">
              Include your API key in the Authorization header:
            </p>
            <code className="block bg-muted p-3 rounded">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>

          <div>
            <h3 className="mb-4">Endpoints</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>POST</Badge>
                  <code>/sms/send</code>
                </div>
                <p className="text-muted-foreground mb-3">Send an SMS message</p>
                <div className="space-y-2">
                  <p>Request Body:</p>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "to": "+639171234567",      // Required: Philippine phone number
  "message": "Your message"    // Required: Message content
}`}
                  </pre>
                  <p>Response:</p>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "message_id": "msg_abc123",
  "credits_used": 1,
  "status": "sent"
}`}
                  </pre>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>GET</Badge>
                  <code>/sms/status/:message_id</code>
                </div>
                <p className="text-muted-foreground">Check message delivery status</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>GET</Badge>
                  <code>/credits/balance</code>
                </div>
                <p className="text-muted-foreground">Get your current credit balance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
          <CardDescription>Ready-to-use code snippets for popular languages</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl">
            <TabsList className="mb-4">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="php">PHP</TabsTrigger>
              <TabsTrigger value="node">Node.js</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>

            <TabsContent value="curl">
              <div className="relative">
                <pre className="bg-muted p-4 rounded overflow-x-auto">
                  <code>{curlExample}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(curlExample)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="php">
              <div className="relative">
                <pre className="bg-muted p-4 rounded overflow-x-auto">
                  <code>{phpExample}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(phpExample)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="node">
              <div className="relative">
                <pre className="bg-muted p-4 rounded overflow-x-auto">
                  <code>{nodeExample}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(nodeExample)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="python">
              <div className="relative">
                <pre className="bg-muted p-4 rounded overflow-x-auto">
                  <code>{pythonExample}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(pythonExample)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rate Limits</CardTitle>
          <CardDescription>API usage limits and best practices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p>Standard Plan</p>
              </div>
              <p className="text-muted-foreground">100 requests per minute</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <p>Premium Plan</p>
              </div>
              <p className="text-muted-foreground">1000 requests per minute</p>
            </div>
          </div>
          <div className="bg-muted p-4 rounded">
            <p>
              <strong>Note:</strong> Rate limits are applied per API key. Exceeding the limit will result in a 429 status code. Contact support for custom rate limits.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
