import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Send, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SentMessage {
  id: string;
  phoneNumber: string;
  message: string;
  status: 'sent' | 'failed' | 'pending';
  timestamp: string;
  credits: number;
}

export const SendSMS = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([
    {
      id: '1',
      phoneNumber: '+639171234567',
      message: 'Test message sent successfully',
      status: 'sent',
      timestamp: '2 hours ago',
      credits: 1,
    },
    {
      id: '2',
      phoneNumber: '+639281234567',
      message: 'Your verification code is 123456',
      status: 'sent',
      timestamp: '5 hours ago',
      credits: 1,
    },
    {
      id: '3',
      phoneNumber: '+639191234567',
      message: 'Failed to deliver',
      status: 'failed',
      timestamp: '1 day ago',
      credits: 0,
    },
  ]);

  const maxLength = 160;
  const messageLength = message.length;
  const creditsRequired = Math.ceil(messageLength / 160);

  const handleSendSMS = async () => {
    if (!phoneNumber || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    setSending(true);

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newMessage: SentMessage = {
      id: Date.now().toString(),
      phoneNumber,
      message,
      status: 'sent',
      timestamp: 'Just now',
      credits: creditsRequired,
    };

    setSentMessages([newMessage, ...sentMessages]);
    setPhoneNumber('');
    setMessage('');
    setSending(false);

    toast.success('SMS sent successfully!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Sent</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Send Test SMS</CardTitle>
          <CardDescription>Send a test SMS message to any phone number</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+639171234567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p className="text-muted-foreground">Philippine mobile number (e.g., +639171234567)</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="message">Message</Label>
              <span className="text-muted-foreground">
                {messageLength}/{maxLength} characters
              </span>
            </div>
            <Textarea
              id="message"
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Messages longer than 160 characters will be split into multiple SMS
              </p>
              {messageLength > 0 && (
                <p className="text-muted-foreground">
                  Credits required: <span className="text-primary">{creditsRequired}</span>
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={handleSendSMS}
            disabled={sending || !phoneNumber || !message}
            className="w-full sm:w-auto"
          >
            <Send className="mr-2 h-4 w-4" />
            {sending ? 'Sending...' : 'Send SMS'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>Your recently sent SMS messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sentMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card"
              >
                <div className="mt-1">{getStatusIcon(msg.status)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-muted-foreground">{msg.phoneNumber}</p>
                    {getStatusBadge(msg.status)}
                  </div>
                  <p>{msg.message}</p>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{msg.timestamp}</span>
                    {msg.credits > 0 && <span>• {msg.credits} credit{msg.credits > 1 ? 's' : ''}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
