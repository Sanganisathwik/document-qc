import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp, FileText, Clock, Users, CheckCircle, AlertTriangle, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for charts
const volumeData = [
  { date: 'Mon', processed: 145, errors: 12, resolved: 138 },
  { date: 'Tue', processed: 178, errors: 15, resolved: 165 },
  { date: 'Wed', processed: 156, errors: 8, resolved: 152 },
  { date: 'Thu', processed: 189, errors: 22, resolved: 175 },
  { date: 'Fri', processed: 201, errors: 18, resolved: 190 },
  { date: 'Sat', processed: 87, errors: 5, resolved: 85 },
  { date: 'Sun', processed: 62, errors: 3, resolved: 61 },
];

const resolutionTimeData = [
  { hour: '6am', time: 3.2 },
  { hour: '8am', time: 2.8 },
  { hour: '10am', time: 2.1 },
  { hour: '12pm', time: 2.5 },
  { hour: '2pm', time: 1.9 },
  { hour: '4pm', time: 2.3 },
  { hour: '6pm', time: 2.7 },
  { hour: '8pm', time: 3.1 },
];

const errorDistribution = [
  { name: 'Missing Fields', value: 35, color: 'hsl(var(--chart-1))' },
  { name: 'Invalid Format', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'OCR Failures', value: 20, color: 'hsl(var(--chart-3))' },
  { name: 'Template Mismatch', value: 12, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 8, color: 'hsl(var(--chart-5))' },
];

const customerMetrics = [
  { customer: 'Acme Corp', documents: 456, errorRate: 4.2, avgResolution: '1.8m' },
  { customer: 'TechStart Inc', documents: 389, errorRate: 6.8, avgResolution: '2.4m' },
  { customer: 'Global Trade', documents: 312, errorRate: 3.1, avgResolution: '1.5m' },
  { customer: 'FastShip LLC', documents: 278, errorRate: 8.2, avgResolution: '3.1m' },
  { customer: 'DataFlow', documents: 234, errorRate: 2.4, avgResolution: '1.2m' },
];

const stats = [
  { 
    label: 'Documents Today', 
    value: '1,247', 
    change: '+12.5%', 
    trend: 'up',
    icon: FileText,
    gradient: 'gradient-primary'
  },
  { 
    label: 'Avg Resolution', 
    value: '2.4m', 
    change: '-18%', 
    trend: 'up',
    icon: Clock,
    gradient: 'gradient-secondary'
  },
  { 
    label: 'Self-Service Rate', 
    value: '38%', 
    change: '+5.2%', 
    trend: 'up',
    icon: Users,
    gradient: 'gradient-success'
  },
  { 
    label: 'Error Rate', 
    value: '4.2%', 
    change: '-2.1%', 
    trend: 'up',
    icon: AlertTriangle,
    gradient: 'gradient-warning'
  },
];

const teamPerformance = [
  { name: 'Samantha K.', processed: 312, avgTime: 1.8, successRate: 98.2, trend: 'up' },
  { name: 'Marcus T.', processed: 287, avgTime: 2.1, successRate: 96.5, trend: 'up' },
  { name: 'Elena R.', processed: 256, avgTime: 2.3, successRate: 95.8, trend: 'down' },
  { name: 'James L.', processed: 234, avgTime: 2.0, successRate: 97.1, trend: 'up' },
];

const Analytics = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time performance metrics and insights
            </p>
          </div>
          <Select defaultValue="7d">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats grid with gradients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="relative overflow-hidden border-0 shadow-lg">
              <div className={`absolute inset-0 ${stat.gradient} opacity-10`} />
              <CardContent className="p-5 relative">
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl ${stat.gradient}`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.trend === 'up' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Volume Chart */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Document Processing Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeData}>
                    <defs>
                      <linearGradient id="gradientProcessed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gradientResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="processed" 
                      stroke="hsl(var(--chart-1))" 
                      fill="url(#gradientProcessed)" 
                      strokeWidth={2}
                      name="Processed"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="resolved" 
                      stroke="hsl(var(--chart-4))" 
                      fill="url(#gradientResolved)" 
                      strokeWidth={2}
                      name="Resolved"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-1" />
                  <span className="text-muted-foreground">Processed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-4" />
                  <span className="text-muted-foreground">Resolved</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Distribution Pie Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Error Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={errorDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {errorDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {errorDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resolution Time Trend */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-chart-3" />
                Resolution Time by Hour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resolutionTimeData}>
                    <defs>
                      <linearGradient id="gradientTime" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="hsl(var(--chart-3))" />
                        <stop offset="100%" stopColor="hsl(var(--chart-2))" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="m" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}m`, 'Avg Time']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="time" 
                      stroke="url(#gradientTime)" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: 'hsl(var(--chart-2))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Customer Metrics */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-chart-2" />
                Top Customers by Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customerMetrics.map((customer, index) => (
                  <div key={customer.customer} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{customer.customer}</p>
                      <p className="text-xs text-muted-foreground">{customer.documents} docs</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${customer.errorRate > 5 ? 'text-destructive' : 'text-status-resolved'}`}>
                        {customer.errorRate}% errors
                      </p>
                      <p className="text-xs text-muted-foreground">{customer.avgResolution} avg</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Performance */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-status-resolved" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamPerformance.map((member) => (
                <div key={member.name} className="relative p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all">
                  <div className="absolute top-3 right-3">
                    {member.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-status-resolved" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center text-white font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="font-medium">{member.name}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold">{member.processed}</p>
                      <p className="text-xs text-muted-foreground">Processed</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{member.avgTime}m</p>
                      <p className="text-xs text-muted-foreground">Avg Time</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-status-resolved">{member.successRate}%</p>
                      <p className="text-xs text-muted-foreground">Success</p>
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