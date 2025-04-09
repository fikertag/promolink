import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Briefcase } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex flex-col ">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor your marketing campaigns and influencer connections
            </p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Spending</p>
                    <h3 className="text-2xl font-bold">$12,500</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">
                      Total Influencers Hired
                    </p>
                    <h3 className="text-2xl font-bold">28</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Jobs</p>
                    <h3 className="text-2xl font-bold">42</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
