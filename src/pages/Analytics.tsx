import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp, FileText, Clock, Users, CheckCircle } from 'lucide-react';

const stats = [
  { 
    label: 'Documents Today', 
    value: '47', 
    change: '+12%', 
    trend: 'up',
    icon: FileText 
  },
  { 
    label: 'Avg Resolution Time', 
    value: '2.4m', 
    change: '-18%', 
    trend: 'up',
    icon: Clock 
  },
  { 
    label: 'Self-Service Rate', 
    value: '38%', 
    change: '+5%', 
    trend: 'up',
    icon: Users 
  },
  { 
    label: 'Resolution Rate', 
    value: '94%', 
    change: '+2%', 
    trend: 'up',
    icon: CheckCircle 
  },
];

const errorTypes = [
  { type: 'Missing field', count: 23, percentage: 35 },
  { type: 'Invalid format', count: 18, percentage: 27 },
  { type: 'OCR failure', count: 12, percentage: 18 },
  { type: 'Template mismatch', count: 8, percentage: 12 },
  { type: 'Other', count: 5, percentage: 8 },
];

const Analytics = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Performance metrics and insights
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-surface">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-muted">
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Error distribution */}
          <Card className="bg-surface">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Top Error Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {errorTypes.map((error) => (
                  <div key={error.type}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{error.type}</span>
                      <span className="text-muted-foreground">{error.count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${error.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resolution time trend */}
          <Card className="bg-surface">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Resolution Time Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end justify-between gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const heights = [65, 45, 55, 70, 40, 30, 35];
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-primary/20 rounded-t"
                        style={{ height: `${heights[i]}%` }}
                      >
                        <div 
                          className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                          style={{ height: `${heights[i] * 0.6}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team performance */}
        <Card className="bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: 'Samantha K.', docs: 156, avg: '1.8m', rate: '97%' },
                { name: 'Marcus T.', docs: 142, avg: '2.1m', rate: '95%' },
                { name: 'Elena R.', docs: 128, avg: '2.3m', rate: '93%' },
              ].map((member) => (
                <div key={member.name} className="p-3 rounded-lg bg-muted/50">
                  <p className="font-medium text-sm">{member.name}</p>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Processed</p>
                      <p className="font-medium">{member.docs}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Time</p>
                      <p className="font-medium">{member.avg}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Success</p>
                      <p className="font-medium text-emerald-600">{member.rate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Analytics;
