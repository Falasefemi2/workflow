import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const jobOffersData = [
  { month: "Jan", accepted: 15, rejected: 12 },
  { month: "Feb", accepted: 20, rejected: 10 },
  { month: "Mar", accepted: 21, rejected: 8 },
  { month: "Apr", accepted: 18, rejected: 14 },
  { month: "May", accepted: 28, rejected: 7 },
  { month: "Jun", accepted: 32, rejected: 5 },
];

const departmentData = [
  { dept: "Brands and Comms", staff: 6, total: 10 },
  { dept: "Business development", staff: 3, total: 10 },
  { dept: "Customer support", staff: 12, total: 12 },
  { dept: "Human resource", staff: 5, total: 10 },
  { dept: "Technology", staff: 6, total: 16 },
  { dept: "Research", staff: 5, total: 16 },
];

export default function DashboardContent() {
  return (
    <div className="space-y-8 pb-12">
      {/* Job Offers Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-md border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-2xl font-bold text-accent">
                Job Offers
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-foreground">Accepted offers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <span className="text-foreground">Rejected offers</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={jobOffersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accepted"
                    stroke="#22c55e"
                    dot={{ fill: "#22c55e" }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="rejected"
                    stroke="hsl(var(--accent))"
                    dot={{ fill: "hsl(var(--accent))" }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Employee Count Card */}
        <div>
          <Card className="shadow-md border-0 h-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-accent">
                Employee Count
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {departmentData.slice(0, 3).map((dept) => (
                <div key={dept.dept} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {dept.dept}
                    </span>
                    <span className="text-muted-foreground">
                      {dept.staff} staff members
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-accent"
                      style={{ width: `${(dept.staff / dept.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
