import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Calendar 
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Transaction {
  id: string;
  type: 'purchase' | 'usage' | 'refund';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

const creditPackages = [
  { id: 1, credits: 100, price: 500, popular: false },
  { id: 2, credits: 500, price: 2250, popular: true },
  { id: 3, credits: 1000, price: 4000, popular: false },
  { id: 4, credits: 5000, price: 17500, popular: false },
];

export const Credits = () => {
  const [currentCredits] = useState(247);
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'usage',
      amount: -15,
      description: 'SMS sent to +1234567890',
      date: '2 hours ago',
      status: 'completed',
    },
    {
      id: '2',
      type: 'purchase',
      amount: 500,
      description: 'Credit package purchase',
      date: '1 day ago',
      status: 'completed',
    },
    {
      id: '3',
      type: 'usage',
      amount: -238,
      description: 'Bulk SMS campaign',
      date: '3 days ago',
      status: 'completed',
    },
    {
      id: '4',
      type: 'purchase',
      amount: 100,
      description: 'Credit package purchase',
      date: '1 week ago',
      status: 'completed',
    },
    {
      id: '5',
      type: 'refund',
      amount: 10,
      description: 'Failed delivery refund',
      date: '1 week ago',
      status: 'completed',
    },
  ]);

  const handlePurchase = (credits: number, price: number) => {
    toast.success(`Successfully purchased ${credits} credits for ₱${price.toLocaleString()}`);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'usage':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'refund':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Available Credits</CardTitle>
            <CardDescription>Your current SMS credit balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">{currentCredits.toLocaleString()}</p>
            <p className="text-muted-foreground mt-2">credits remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
            <CardDescription>Credits used this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">253</p>
            <p className="text-muted-foreground mt-2">SMS sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Daily</CardTitle>
            <CardDescription>Daily average usage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">12</p>
            <p className="text-muted-foreground mt-2">credits per day</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Credits</CardTitle>
          <CardDescription>Choose a credit package that fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {creditPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative p-6 rounded-lg border-2 transition-all ${
                  pkg.popular
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-2 right-4">Most Popular</Badge>
                )}
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl">{pkg.credits.toLocaleString()}</p>
                    <p className="text-muted-foreground">credits</p>
                  </div>
                  <div>
                    <p className="text-2xl">₱{pkg.price.toLocaleString()}</p>
                    <p className="text-muted-foreground">
                      ₱{(pkg.price / pkg.credits).toFixed(2)} per credit
                    </p>
                  </div>
                  <Button
                    onClick={() => handlePurchase(pkg.credits, pkg.price)}
                    className="w-full"
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Purchase
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent credit transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1">
                  <p>{transaction.description}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{transaction.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={
                      transaction.amount > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {transaction.amount > 0 ? '+' : ''}
                    {transaction.amount}
                  </p>
                  <p className="text-muted-foreground">credits</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auto-Recharge</CardTitle>
          <CardDescription>Automatically purchase credits when your balance is low</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <p>Enable Auto-Recharge</p>
              <p className="text-muted-foreground">
                Automatically purchase 500 credits when balance falls below 50
              </p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
