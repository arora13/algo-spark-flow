import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FloatingElements from '@/components/FloatingElements';
import { analytics } from '@/lib/analytics';
import { 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  RefreshCw,
  Activity,
  Globe
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalImpressions: number;
    totalContacts: number;
    recentImpressions: number;
    recentContacts: number;
  };
  pageViews: Record<string, number>;
  recentActivity: Array<{
    type: string;
    page?: string;
    name?: string;
    subject?: string;
    timestamp: string;
  }>;
  timestamp: string;
}

const Analytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await analytics.getAnalytics();
      if (result.success) {
        setData(result.data);
      } else {
        setError('Failed to fetch analytics data');
      }
    } catch (err) {
      setError('Error connecting to analytics server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <FloatingElements />
        <div className="section-padding pt-32">
          <div className="container-width">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-slate-300">Loading analytics...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative">
        <FloatingElements />
        <div className="section-padding pt-32">
          <div className="container-width">
            <div className="text-center">
              <div className="glass-panel p-8 rounded-2xl max-w-md mx-auto">
                <Activity className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">Analytics Unavailable</h2>
                <p className="text-slate-300 mb-4">{error}</p>
                <Button onClick={fetchAnalytics} className="btn-primary">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <section className="relative section-padding pt-32">
        <div className="container-width relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Analytics <span className="bg-gradient-primary bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-slate-300">
                Track user engagement and website performance
              </p>
            </div>
            <Button onClick={fetchAnalytics} className="btn-secondary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {data && (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="glass-panel border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Users</p>
                        <p className="text-3xl font-bold text-white">{data.overview.totalUsers}</p>
                      </div>
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Impressions</p>
                        <p className="text-3xl font-bold text-white">{data.overview.totalImpressions}</p>
                      </div>
                      <Eye className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Contact Submissions</p>
                        <p className="text-3xl font-bold text-white">{data.overview.totalContacts}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Recent Activity</p>
                        <p className="text-3xl font-bold text-white">
                          {data.overview.recentImpressions + data.overview.recentContacts}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Page Views */}
                <Card className="glass-panel border-0">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Page Views
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(data.pageViews).map(([page, views]) => (
                        <div key={page} className="flex justify-between items-center">
                          <span className="text-slate-300">{page}</span>
                          <Badge variant="secondary" className="bg-primary/20 text-primary">
                            {views} views
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="glass-panel border-0">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {data.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === 'pageview' ? 'bg-primary' : 'bg-emerald-400'
                          }`} />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-white text-sm">
                                  {activity.type === 'pageview' 
                                    ? `Viewed ${activity.page}` 
                                    : `Contact from ${activity.name}`
                                  }
                                </p>
                                {activity.subject && (
                                  <p className="text-slate-400 text-xs">{activity.subject}</p>
                                )}
                              </div>
                              <span className="text-slate-500 text-xs">
                                {getTimeAgo(activity.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Last Updated */}
              <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm">
                  Last updated: {formatDate(data.timestamp)}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Analytics;
