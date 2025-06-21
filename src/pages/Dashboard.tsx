
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trophy, BookOpen, Code, Star, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const totalAlgorithms = 10;
  const totalProblems = 15;
  const completionRate = Math.round(
    ((user.progress.completedAlgorithms.length + user.progress.solvedProblems.length) / (totalAlgorithms + totalProblems)) * 100
  );

  const recentActivity = [
    { type: 'algorithm', name: 'Merge Sort', date: '2 days ago', score: 100 },
    { type: 'problem', name: 'Two Sum', date: '3 days ago', score: 50 },
    { type: 'problem', name: 'Reverse String', date: '5 days ago', score: 50 }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Completed your first algorithm', earned: user.progress.completedAlgorithms.length > 0 },
    { name: 'Problem Solver', description: 'Solved 5 coding problems', earned: user.progress.solvedProblems.length >= 5 },
    { name: 'Algorithm Master', description: 'Completed 5 algorithms', earned: user.progress.completedAlgorithms.length >= 5 },
    { name: 'Dedicated Learner', description: 'Earned 500 points', earned: user.progress.totalScore >= 500 }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Track your progress and continue your algorithm mastery journey.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-algo-blue to-algo-purple text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Score</p>
                  <p className="text-2xl font-bold">{user.progress.totalScore}</p>
                </div>
                <Star className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-algo-pink to-algo-purple text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Algorithms</p>
                  <p className="text-2xl font-bold">{user.progress.completedAlgorithms.length}/{totalAlgorithms}</p>
                </div>
                <BookOpen className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-algo-cyan to-algo-blue text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Problems Solved</p>
                  <p className="text-2xl font-bold">{user.progress.solvedProblems.length}/{totalProblems}</p>
                </div>
                <Code className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Completion</p>
                  <p className="text-2xl font-bold">{completionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins text-xl">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Algorithm Mastery</span>
                    <span className="text-sm text-gray-500">{user.progress.completedAlgorithms.length}/{totalAlgorithms}</span>
                  </div>
                  <Progress value={(user.progress.completedAlgorithms.length / totalAlgorithms) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Problem Solving</span>
                    <span className="text-sm text-gray-500">{user.progress.solvedProblems.length}/{totalProblems}</span>
                  </div>
                  <Progress value={(user.progress.solvedProblems.length / totalProblems) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm text-gray-500">{completionRate}%</span>
                  </div>
                  <Progress value={completionRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === 'algorithm' ? 'bg-algo-blue text-white' : 'bg-green-500 text-white'
                          }`}>
                            {activity.type === 'algorithm' ? <BookOpen className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{activity.name}</p>
                            <p className="text-sm text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-green-600">+{activity.score} pts</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No recent activity</p>
                    <p className="text-sm">Start learning to see your progress here!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins text-xl flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        achievement.earned
                          ? 'border-yellow-300 bg-yellow-50 text-yellow-800'
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Trophy className={`h-6 w-6 ${
                          achievement.earned ? 'text-yellow-500' : 'text-gray-400'
                        }`} />
                        <div>
                          <h4 className="font-medium">{achievement.name}</h4>
                          <p className="text-sm">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins text-xl">Continue Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate('/learn')}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white rounded-full py-3"
                >
                  Learn New Algorithm
                </Button>
                <Button
                  onClick={() => navigate('/practice')}
                  variant="outline"
                  className="w-full rounded-full py-3 border-2 border-algo-blue text-algo-blue hover:bg-algo-blue hover:text-white"
                >
                  Solve Problems
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
