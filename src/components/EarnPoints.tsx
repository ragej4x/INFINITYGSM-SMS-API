import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Play, 
  Gift, 
  TrendingUp,
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Ad {
  id: string;
  title: string;
  duration: number;
  credits: number;
  thumbnail: string;
  category: string;
  available: boolean;
}

interface WatchHistory {
  id: string;
  adTitle: string;
  credits: number;
  timestamp: string;
}

export const EarnPoints = () => {
  const [totalEarned, setTotalEarned] = useState(156);
  const [todayEarned, setTodayEarned] = useState(12);
  const [watchingAd, setWatchingAd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentAd, setCurrentAd] = useState<Ad | null>(null);

  const [availableAds] = useState<Ad[]>([
    {
      id: '1',
      title: 'Mobile App Advertisement',
      duration: 30,
      credits: 5,
      thumbnail: '📱',
      category: 'Technology',
      available: true,
    },
    {
      id: '2',
      title: 'E-commerce Promo',
      duration: 45,
      credits: 8,
      thumbnail: '🛍️',
      category: 'Shopping',
      available: true,
    },
    {
      id: '3',
      title: 'Food Delivery Service',
      duration: 30,
      credits: 5,
      thumbnail: '🍔',
      category: 'Food',
      available: true,
    },
    {
      id: '4',
      title: 'Gaming Platform',
      duration: 60,
      credits: 10,
      thumbnail: '🎮',
      category: 'Gaming',
      available: true,
    },
    {
      id: '5',
      title: 'Financial Services',
      duration: 30,
      credits: 5,
      thumbnail: '💳',
      category: 'Finance',
      available: false,
    },
    {
      id: '6',
      title: 'Travel Booking',
      duration: 45,
      credits: 8,
      thumbnail: '✈️',
      category: 'Travel',
      available: true,
    },
  ]);

  const [watchHistory] = useState<WatchHistory[]>([
    {
      id: '1',
      adTitle: 'Mobile App Advertisement',
      credits: 5,
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      adTitle: 'E-commerce Promo',
      credits: 8,
      timestamp: '5 hours ago',
    },
    {
      id: '3',
      adTitle: 'Food Delivery Service',
      credits: 5,
      timestamp: 'Yesterday',
    },
  ]);

  const watchAd = (ad: Ad) => {
    if (!ad.available) {
      toast.error('This ad is currently unavailable');
      return;
    }

    setWatchingAd(true);
    setCurrentAd(ad);
    setProgress(0);

    // Simulate ad watching progress
    const duration = ad.duration * 1000; // Convert to milliseconds
    const interval = 100; // Update every 100ms
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setWatchingAd(false);
        setProgress(0);
        setCurrentAd(null);
        setTotalEarned(prev => prev + ad.credits);
        setTodayEarned(prev => prev + ad.credits);
        toast.success(`You earned ${ad.credits} credits!`, {
          description: 'Credits have been added to your account',
        });
      }
    }, interval);
  };

  const availableCount = availableAds.filter(ad => ad.available).length;

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto">
      {watchingAd && currentAd && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3>Watching: {currentAd.title}</h3>
                  <p className="text-muted-foreground">
                    Earn {currentAd.credits} credits • {currentAd.duration}s
                  </p>
                </div>
                <div className="text-6xl">{currentAd.thumbnail}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
                <p className="text-muted-foreground text-center">
                  Please watch the entire ad to earn credits
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Earned</CardTitle>
            <CardDescription>Credits earned from watching ads</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">{totalEarned}</p>
            <p className="text-muted-foreground mt-2">lifetime credits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Earnings</CardTitle>
            <CardDescription>Credits earned today</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">{todayEarned}</p>
            <p className="text-muted-foreground mt-2">credits earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Ads</CardTitle>
            <CardDescription>Ads ready to watch</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">{availableCount}</p>
            <p className="text-muted-foreground mt-2">ads available</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Watch Ads to Earn Credits</CardTitle>
          <CardDescription>
            Watch advertisements and earn free SMS credits. The longer the ad, the more credits you earn!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {availableAds.map((ad) => (
              <div
                key={ad.id}
                className={`border rounded-lg p-4 transition-all ${
                  ad.available
                    ? 'hover:border-primary cursor-pointer'
                    : 'opacity-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{ad.thumbnail}</div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4>{ad.title}</h4>
                        {!ad.available && (
                          <Badge variant="outline" className="bg-muted">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{ad.category}</p>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{ad.duration}s</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Gift className="h-4 w-4 text-primary" />
                        <span className="text-primary">
                          {ad.credits} credits
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => watchAd(ad)}
                      disabled={!ad.available || watchingAd}
                      className="w-full"
                      size="sm"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Watch Ad
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Watch History</CardTitle>
          <CardDescription>Your recently watched ads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {watchHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                </div>
                <div className="flex-1">
                  <p>{item.adTitle}</p>
                  <p className="text-muted-foreground">{item.timestamp}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 dark:text-green-500">+{item.credits}</p>
                  <p className="text-muted-foreground">credits</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Earning Tips</CardTitle>
          <CardDescription>Maximize your credit earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex gap-3 p-4 rounded-lg border">
              <Award className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p>Watch Longer Ads</p>
                <p className="text-muted-foreground">
                  Longer advertisements offer more credits per watch
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-lg border">
              <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p>Daily Consistency</p>
                <p className="text-muted-foreground">
                  Watch ads daily to build up your credit balance
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-lg border">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p>Check Back Often</p>
                <p className="text-muted-foreground">
                  New ads are added regularly throughout the day
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-lg border">
              <Gift className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p>Bonus Campaigns</p>
                <p className="text-muted-foreground">
                  Special promotions offer extra credits during holidays
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
