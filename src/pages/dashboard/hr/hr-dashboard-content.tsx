import {
  Users,
  Calendar,
  Building,
  Grid3x3,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const jobOffersData = [
  { month: "Jan", accepted: 15, rejected: 12 },
  { month: "Feb", accepted: 20, rejected: 10 },
  { month: "Mar", accepted: 21, rejected: 8 },
  { month: "Apr", accepted: 18, rejected: 14 },
  { month: "May", accepted: 28, rejected: 7 },
  { month: "Jun", accepted: 32, rejected: 5 },
];

const leaveData = [
  { name: "Approved Leaves", value: 200, color: "#22c55e" },
  { name: "Pending Leaves", value: 120, color: "#eab308" },
  { name: "Rejected Leaves", value: 18, color: "#ef4444" },
];

const departmentData = [
  { dept: "Brands and Comms", staff: 6, total: 10 },
  { dept: "Business development", staff: 3, total: 10 },
  { dept: "Customer support", staff: 12, total: 12 },
  { dept: "Human resource", staff: 5, total: 10 },
  { dept: "Technology", staff: 6, total: 16 },
  { dept: "Research", staff: 5, total: 16 },
];

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  changeDirection: "up" | "down";
  previousValue: string;
  icon: React.ReactNode;
}

function StatCard({
  title,
  value,
  change,
  changeDirection,
  previousValue,
  icon,
}: StatCardProps) {
  return (
    <Card className="bg-card border-0 shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
            <div className="mt-2 flex items-center gap-1">
              <div
                className={`flex items-center text-sm font-medium ${changeDirection === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {changeDirection === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="ml-1">{change}%</span>
              </div>
              <span className="text-sm text-muted-foreground">
                from {previousValue}
              </span>
            </div>
          </div>
          <div className="text-muted-foreground">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HRDashboardContent() {
  return (
    <main className="min-h-screen p-8">
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StatCard
              title="Total Staff"
              value="2000"
              change={15}
              changeDirection="up"
              previousValue="75%"
              icon={<Users className="h-8 w-8" />}
            />
            <StatCard
              title="Total Staff on Leave"
              value="200"
              change={5}
              changeDirection="down"
              previousValue="69%"
              icon={<Calendar className="h-8 w-8" />}
            />
            <StatCard
              title="Total Department"
              value="20"
              change={15}
              changeDirection="up"
              previousValue="75%"
              icon={<Building className="h-8 w-8" />}
            />

            <StatCard
              title="Total Designation"
              value="200"
              change={15}
              changeDirection="up"
              previousValue="75%"
              icon={<Grid3x3 className="h-8 w-8" />}
            />
          </div>
        </div>

        {/* Right: Job Offers Chart */}
        <div>
          <Card className="border-0 shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-primary">
                Job Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span className="text-gray-600">Accepted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-600"></div>
                  <span className="text-gray-600">Rejected</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={jobOffersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accepted"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: "#22c55e", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rejected"
                    stroke="#FF0000"
                    strokeWidth={2}
                    dot={{ fill: "#ff0000", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Leave Overview */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-primary">
            Leave Overview
          </h3>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leaveData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {leaveData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 text-center">
                <p className="text-4xl font-bold text-gray-900">350</p>
                <p className="text-sm text-gray-600">Total Leave Request</p>
              </div>
              <div className="mt-6 space-y-2">
                {leaveData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Employee Count */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-primary">
            Employee Count
          </h3>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6 space-y-4">
              {departmentData.map((dept) => (
                <div key={dept.dept}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-900">
                      {dept.dept}
                    </span>
                    <span className="text-gray-600">
                      {dept.staff} staff members
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(dept.staff / dept.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
